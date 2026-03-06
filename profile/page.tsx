"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";

type ProfileForm = {
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [form, setForm] = useState<ProfileForm>({
    phone: "",
    emergencyContactName: "",
    emergencyContactPhone: ""
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const ref = doc(firestore, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data() as any;
        setForm({
          phone: data.phone ?? "",
          emergencyContactName: data.emergencyContactName ?? "",
          emergencyContactPhone: data.emergencyContactPhone ?? ""
        });
      }
    };
    load();
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setStatus(null);
    try {
      const ref = doc(firestore, "users", user.uid);
      await setDoc(
        ref,
        {
          phone: form.phone,
          emergencyContactName: form.emergencyContactName,
          emergencyContactPhone: form.emergencyContactPhone
        },
        { merge: true }
      );
      setStatus("Profile updated successfully.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Profile
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Safety profile & emergency contact
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Keep your contact information up to date so alerts reach the right
          people at the right time.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="sg-card space-y-4 p-5 sm:p-6 text-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-[0.7rem] text-slate-400">Name</p>
            <p className="text-sm font-semibold text-slate-200">
              {user.displayName ?? "Unnamed Guardian"}
            </p>
            <p className="text-[0.7rem] text-slate-500">{user.email}</p>
          </div>
          <div className="space-y-1">
            <label className="text-slate-200" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm outline-none ring-cyan-500/40 focus:border-cyan-400 focus:ring-1"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              required
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-slate-200" htmlFor="emergencyName">
              Emergency contact name
            </label>
            <input
              id="emergencyName"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm outline-none ring-cyan-500/40 focus:border-cyan-400 focus:ring-1"
              value={form.emergencyContactName}
              onChange={(e) =>
                setForm((f) => ({ ...f, emergencyContactName: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-200" htmlFor="emergencyPhone">
              Emergency contact phone
            </label>
            <input
              id="emergencyPhone"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm outline-none ring-cyan-500/40 focus:border-cyan-400 focus:ring-1"
              value={form.emergencyContactPhone}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  emergencyContactPhone: e.target.value
                }))
              }
              required
            />
          </div>
        </div>

        {status && (
          <p className="text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-700/60 rounded-md px-3 py-2">
            {status}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="sg-button-primary px-6 py-2.5 text-sm"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}

