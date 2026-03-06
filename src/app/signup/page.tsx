"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/lib/firebase";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !fullName ||
      !email ||
      !phone ||
      !emergencyName ||
      !emergencyPhone ||
      !password
    ) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: fullName });

      await setDoc(doc(firestore, "users", cred.user.uid), {
        name: fullName,
        email,
        phone,
        emergencyContactName: emergencyName,
        emergencyContactPhone: emergencyPhone,
        guardianMode: false,
        createdAt: new Date().toISOString()
      });

      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Failed to sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-4">
      <div className="grid w-full gap-8 md:grid-cols-[1.1fr,0.9fr] items-center">
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-glow-primary" />
            Encrypted Guardian Profile
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Create your{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
              Silent Guardian
            </span>{" "}
            identity.
          </h1>
          <p className="max-w-xl text-sm text-slate-400">
            We&apos;ll use this information to route emergency alerts, share live
            locations, and keep your trusted circle informed when it matters most.
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>• Data is encrypted in transit and at rest.</li>
            <li>• You control who gets notified and what they can see.</li>
            <li>• You can update emergency contacts at any time.</li>
          </ul>
        </section>

        <section className="sg-gradient-border">
          <div className="sg-card p-6 sm:p-7">
            <h2 className="mb-1 text-lg font-semibold">Sign up</h2>
            <p className="mb-5 text-xs text-slate-400">
              Build your safety profile and connect your Guardian Mode.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1 text-sm">
                  <label htmlFor="name" className="text-slate-200">
                    Full name
                  </label>
                  <input
                    id="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm outline-none ring-cyan-500/40 focus:border-cyan-400 focus:ring-1"
                    placeholder="Ayesha Rao"
                    required
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="phone" className="text-slate-200">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm outline-none ring-cyan-500/40 focus:border-cyan-400 focus:ring-1"
                    placeholder="+1 555 123 4567"
                    required
                  />
                </div>
              </div>

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
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1 text-sm">
                  <label htmlFor="emergencyName" className="text-slate-200">
                    Emergency contact name
                  </label>
                  <input
                    id="emergencyName"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm outline-none ring-cyan-500/40 focus:border-cyan-400 focus:ring-1"
                    placeholder="Parent, partner, roommate..."
                    required
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="emergencyPhone" className="text-slate-200">
                    Emergency contact phone
                  </label>
                  <input
                    id="emergencyPhone"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm outline-none ring-cyan-500/40 focus:border-cyan-400 focus:ring-1"
                    placeholder="+1 555 987 6543"
                    required
                  />
                </div>
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
                  placeholder="At least 6 characters"
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
                {loading ? "Creating guardian profile..." : "Create guardian profile"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

