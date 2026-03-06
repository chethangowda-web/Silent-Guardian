import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Silent Guardian – AI Powered Personal Safety System",
  description:
    "An AI-powered personal safety assistant that monitors your environment and silently protects you in emergencies."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-xl">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-400 flex items-center justify-center shadow-glow-primary">
                    <span className="text-xs font-bold tracking-tight text-slate-950">
                      SG
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-wide uppercase text-slate-200">
                      Silent Guardian
                    </span>
                    <span className="text-xs text-slate-400">
                      AI Powered Personal Safety System
                    </span>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

