import { doc, setDoc, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { ref, set, push } from "firebase/database";
import { firestore, realtimeDb } from "@/lib/firebase";

export async function toggleGuardianMode(userId: string, enabled: boolean) {
  const userRef = doc(firestore, "users", userId);
  await setDoc(
    userRef,
    {
      guardianMode: enabled,
      guardianModeUpdatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

export async function simulateDeviceActivity(userId: string, riskLevel: "normal" | "elevated" | "critical") {
  const logRef = collection(firestore, "deviceActivityLogs");
  await addDoc(logRef, {
    userId,
    createdAt: serverTimestamp(),
    riskLevel,
    // In a real app attach sensor-derived features here
    activitySummary:
      riskLevel === "normal"
        ? "Routine movement, low-risk zone."
        : riskLevel === "elevated"
        ? "Late-night movement in medium-risk area."
        : "Abrupt stop and erratic path in high-risk area."
  });

  const rtRef = ref(realtimeDb, `deviceActivity/${userId}`);
  await set(rtRef, {
    lastHeartbeat: Date.now(),
    lastRiskLevel: riskLevel
  });
}

export async function triggerEmergencyAlert(userId: string, options?: { type?: string }) {
  const alertsRef = collection(firestore, "alerts");
  const alertDoc = await addDoc(alertsRef, {
    userId,
    timestamp: serverTimestamp(),
    location: {
      // In production, fill from real GPS
      lat: null,
      lng: null
    },
    alertType: options?.type ?? "SIMULATED_GUARDIAN_ALERT",
    status: "ACTIVE"
  });

  const signalsRef = collection(firestore, "safetySignals");
  await addDoc(signalsRef, {
    alertId: alertDoc.id,
    userId,
    createdAt: serverTimestamp(),
    type: "RISK_SIGNAL",
    riskZone: "SIMULATED_ZONE",
    anonymized: true
  });

  const evidenceRef = push(ref(realtimeDb, `evidence/${userId}/${alertDoc.id}`));
  await set(evidenceRef, {
    createdAt: Date.now(),
    audioCapture: "SIMULATED_AUDIO_RECORDING_REFERENCE",
    locationSnapshots: [],
    notes: "Simulated silent evidence capture for demo."
  });

  return alertDoc.id;
}

