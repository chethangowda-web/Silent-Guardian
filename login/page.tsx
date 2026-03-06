"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (user) {
    router.replace("/dashboard");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-4">
      <div className="grid w-full gap-10 md:grid-cols-[1.1fr,0.9fr] items-center">
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-glow-primary" />
            Live Guardian Network Active
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Log in to your{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
              Silent Guardian
            </span>{" "}
            console.
          </h1>
          <p className="max-w-xl text-sm text-slate-400">
            Access your AI-powered safety dashboard, manage Guardian Mode, and
            keep your trusted circle in sync in real-time.
          </p>
          <div className="grid gap-3 text-xs text-slate-400 sm:grid-cols-3">
            <div className="sg-card p-3">
              <p className="font-semibold text-slate-200">Guardian Mode</p>
              <p>Continuous background safety monitoring with AI anomaly detection.</p>
            </div>
            <div className="sg-card p-3">
              <p className="font-semibold text-slate-200">Silent SOS</p>
              <p>Trigger discreet emergency workflows without exposing your phone.</p>
            </div>
            <div className="sg-card p-3">
              <p className="font-semibold text-slate-200">Threat Network</p>
              <p>See anonymous risk zones powered by the global safety mesh.</p>
            </div>
          </div>
        </section>

        <section className="sg-gradient-border">
          <div className="sg-card p-6 sm:p-7">
            <h2 className="mb-1 text-lg font-semibold">Welcome back</h2>
            <p className="mb-5 text-xs text-slate-400">
              Enter your credentials to continue to your safety dashboard.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1 text-sm">
                <label htmlFor="email" className="text-slate-200">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm outline-none ring-cyan-500/40 focus:border-cyan-400 focus:ring-1"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="password" className="text-slate-200">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm outline-none ring-cyan-500/40 focus:border-cyan-400 focus:ring-1"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && (
                <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded-md px-3 py-2">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="sg-button-primary w-full justify-center py-2.5"
              >
                {loading ? "Securing session..." : "Enter safety hub"}
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-slate-400">
              New here?{" "}
              <Link
                href="/signup"
                className="font-medium text-cyan-400 hover:text-cyan-300"
              >
                Create your Silent Guardian profile
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

