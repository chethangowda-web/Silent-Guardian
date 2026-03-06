"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { ThreatMap } from "@/components/ThreatMap";
import {
  simulateDeviceActivity,
  toggleGuardianMode,
  triggerEmergencyAlert
} from "@/services/guardianService";

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  guardianMode: boolean;
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [guardianBusy, setGuardianBusy] = useState(false);
  const [sosBusy, setSosBusy] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const ref = doc(firestore, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data() as UserProfile);
      }
    };
    loadProfile();
  }, [user]);

  const handleGuardianToggle = async () => {
    if (!user || !profile) return;
    try {
      setGuardianBusy(true);
      const next = !profile.guardianMode;
      await toggleGuardianMode(user.uid, next);
      await simulateDeviceActivity(user.uid, next ? "elevated" : "normal");
      setProfile({ ...profile, guardianMode: next });
      setStatusMessage(
        next
          ? "Guardian Mode armed. Monitoring for anomalies."
          : "Guardian Mode disarmed."
      );
    } finally {
      setGuardianBusy(false);
    }
  };

  const handleQuickSOS = async () => {
    if (!user) return;
    try {
      setSosBusy(true);
      await simulateDeviceActivity(user.uid, "critical");
      const alertId = await triggerEmergencyAlert(user.uid, {
        type: "QUICK_SOS"
      });
      setStatusMessage(`Emergency workflow simulated (Alert ${alertId}).`);
    } finally {
      setSosBusy(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Safety Overview
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
              {profile?.name ?? user.email}
            </span>
          </h1>
          <p className="text-xs text-slate-400 max-w-md mt-1.5">
            Your AI guardian is ready. Monitor your safety status, manage Guardian
            Mode, and simulate emergency workflows.
          </p>
        </div>
        <button
          onClick={logout}
          className="text-xs rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-slate-300 hover:border-red-500/70 hover:text-red-300 transition"
        >
          Log out
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-[1.4fr,1fr]">
        <section className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sg-card p-4">
              <p className="text-xs text-slate-400">Current Status</p>
              <p className="mt-1 text-lg font-semibold text-emerald-400">
                {profile?.guardianMode ? "Guarded" : "Idle"}
              </p>
              <p className="mt-1 text-[0.7rem] text-slate-400">
                {profile?.guardianMode
                  ? "Guardian Mode is actively monitoring your context."
                  : "Guardian Mode can be armed for commutes or high-risk situations."}
              </p>
            </div>
            <div className="sg-card p-4">
              <p className="text-xs text-slate-400">Primary Contact</p>
              <p className="mt-1 text-sm font-semibold">
                {profile?.emergencyContactName ?? "Not set"}
              </p>
              <p className="text-xs text-slate-400">
                {profile?.emergencyContactPhone ?? "—"}
              </p>
            </div>
            <div className="sg-card p-4">
              <p className="text-xs text-slate-400">Guardian Link</p>
              <p className="mt-1 text-[0.7rem] text-slate-400">
                In a real deployment this would expose a secure link for your
                contacts to see live status.
              </p>
            </div>
          </div>

          <div className="sg-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-slate-400">Guardian Mode</p>
              <p className="text-sm font-semibold">
                {profile?.guardianMode ? "Armed & watching" : "Disarmed"}
              </p>
              <p className="text-[0.7rem] text-slate-400 max-w-xs">
                When armed, Silent Guardian continuously simulates device motion,
                location changes, and anomaly detection.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                type="button"
                onClick={handleGuardianToggle}
                disabled={guardianBusy || !profile}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  profile?.guardianMode
                    ? "bg-emerald-500 text-slate-950 shadow-glow-primary hover:bg-emerald-400"
                    : "bg-slate-800 text-slate-100 hover:bg-slate-700"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-slate-950" />
                {guardianBusy
                  ? "Updating..."
                  : profile?.guardianMode
                  ? "Disarm Guardian Mode"
                  : "Arm Guardian Mode"}
              </button>
              <button
                type="button"
                onClick={handleQuickSOS}
                disabled={sosBusy}
                className="sg-button-danger text-xs"
              >
                {sosBusy ? "Simulating SOS..." : "Quick SOS Simulation"}
              </button>
            </div>
          </div>

          {statusMessage && (
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs text-cyan-100">
              {statusMessage}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <ThreatMap />
          <div className="sg-card p-4 text-[0.75rem] text-slate-400 space-y-1.5">
            <p className="font-semibold text-slate-200 text-xs">
              Emergency Alert Simulation
            </p>
            <p>
              When an alert is triggered, Silent Guardian would notify your emergency
              contacts, share live GPS, and start silent evidence capture. In this
              demo, we simulate those flows and persist events in Firestore and the
              Realtime Database.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

