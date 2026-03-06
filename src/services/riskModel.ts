export type RiskLevel = "low" | "medium" | "high";

export type BehaviorSignals = {
  // metres / second – 0 for stationary
  speed: number;
  // 0–1, how unusual this route is for the user (simulated for now)
  routeDeviationScore: number;
  // seconds since last interaction with device
  secondsSinceLastInteraction: number;
  // user explicitly pressed a SOS control
  manualSOS: boolean;
};

export type EnvironmentSignals = {
  // 0–1, from external data (simulated)
  areaCrimeIndex: number;
  // count of alerts raised near this area in the last window
  recentAlertsNearby: number;
  // local hour 0–23
  hourOfDay: number;
};

export type RiskModelInput = {
  behavior: BehaviorSignals;
  environment: EnvironmentSignals;
};

export type RiskModelOutput = {
  score: number;
  level: RiskLevel;
  reasons: string[];
};

/**
 * Simple, transparent risk model inspired by the PRD:
 * combines behavioural anomaly, environmental risk, and explicit SOS.
 * In a production system this would be backed by a learned model.
 */
export function computeRiskScore(input: RiskModelInput): RiskModelOutput {
  const { behavior, environment } = input;
  const reasons: string[] = [];

  // Behavioural component
  let behaviorComponent = 0;
  if (behavior.manualSOS) {
    behaviorComponent = 1;
    reasons.push("Manual SOS trigger");
  }
  behaviorComponent += 0.4 * clamp01(behavior.routeDeviationScore);

  if (behavior.secondsSinceLastInteraction > 600 && behavior.speed > 0.5) {
    behaviorComponent += 0.2;
    reasons.push("Movement with no device interaction for >10min");
  }

  // Environmental component
  let environmentComponent = 0.3 * clamp01(environment.areaCrimeIndex);

  if (environment.recentAlertsNearby >= 3) {
    environmentComponent += 0.2;
    reasons.push("Multiple recent alerts nearby");
  } else if (environment.recentAlertsNearby === 2) {
    environmentComponent += 0.1;
    reasons.push("Several alerts nearby");
  }

  const isLateNight =
    environment.hourOfDay >= 22 || environment.hourOfDay <= 5;
  if (isLateNight) {
    environmentComponent += 0.1;
    reasons.push("Late‑night activity window");
  }

  // Combine with simple weights
  const rawScore =
    0.6 * clamp01(behaviorComponent) + 0.4 * clamp01(environmentComponent);
  const score = clamp01(rawScore);

  let level: RiskLevel = "low";
  if (score >= 0.75) level = "high";
  else if (score >= 0.4) level = "medium";

  if (reasons.length === 0) {
    reasons.push("Within normal behavioural and environmental bounds");
  }

  return { score, level, reasons };
}

function clamp01(v: number): number {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

