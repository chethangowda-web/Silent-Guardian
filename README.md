
<div align="center">

```
███████╗██╗██╗     ███████╗███╗   ██╗████████╗
██╔════╝██║██║     ██╔════╝████╗  ██║╚══██╔══╝
███████╗██║██║     █████╗  ██╔██╗ ██║   ██║   
╚════██║██║██║     ██╔══╝  ██║╚██╗██║   ██║   
███████║██║███████╗███████╗██║ ╚████║   ██║   
╚══════╝╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝  

 ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗ ██╗ █████╗ ███╗   ██╗
██╔════╝ ██║   ██║██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗████╗  ██║
██║  ███╗██║   ██║███████║██████╔╝██║  ██║██║███████║██╔██╗ ██║
██║   ██║██║   ██║██╔══██║██╔══██╗██║  ██║██║██╔══██║██║╚██╗██║
╚██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝██║██║  ██║██║ ╚████║
 ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
```

### `[ THREAT DETECTION ACTIVE ] [ SYSTEM ONLINE ] [ ALL SENSORS OPERATIONAL ]`

---

![Status](https://img.shields.io/badge/STATUS-OPERATIONAL-00ff41?style=for-the-badge&logo=statuspage&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![AI Powered](https://img.shields.io/badge/AI-POWERED-FF0000?style=for-the-badge&logo=openai&logoColor=white)

</div>

---

## 🛡️ What is Silent Guardian?

> *"The best security system is the one the threat never sees coming."*

**Silent Guardian** is an AI-powered, real-time safety monitoring platform that operates silently in the background — watching, listening, and analyzing. It fuses camera and microphone input streams through intelligent detection algorithms to identify suspicious activity before it escalates, then triggers a precision distress protocol when it counts most.

This isn't just a security dashboard. It's a **digital sentinel** — always vigilant, never sleeping, never distracted.

---

## 🔴 Live Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     SILENT GUARDIAN CORE                        │
│                                                                 │
│   📷 Camera Feed ──┐                                            │
│                    ├──▶ [ Multi-Modal AI Engine ] ──▶ THREAT?  │
│   🎤 Microphone ───┘         ↑                        │        │
│                              │                        ▼        │
│   🔐 Auth Layer ────────▶ Identity Vault         DISTRESS 🚨   │
│                                                   PROTOCOL     │
│   📊 Operator HUD ◀──── Real-time Data ◀──────────────┘        │
│                                                                 │
│   🔥 Firebase ◀──── Persistent Storage + Auth Backend          │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Feature Matrix

| Module | Description | Status |
|---|---|---|
| 🟢 **Vigilance Initialization** | Advanced boot-up sequence with system checks | `ACTIVE` |
| 🎥 **Camera Detection** | Real-time visual threat recognition via feed analysis | `ACTIVE` |
| 🎙️ **Audio Detection** | Microphone-based anomaly and distress sound identification | `ACTIVE` |
| 🚨 **Distress Protocol** | Automated emergency trigger and alert escalation system | `ACTIVE` |
| 📡 **Operator HUD** | Futuristic real-time monitoring dashboard for live oversight | `ACTIVE` |
| 🔐 **Identity Vault** | Secure user authentication with protected credential storage | `ACTIVE` |
| 💾 **Persistent Storage** | Firestore-backed incident logging and session persistence | `ACTIVE` |

---

## 🗂️ Project Structure

```
silent-guardian/
│
├── 📁 app/                        # Next.js App Router
│   ├── 📁 (auth)/                 # Authentication Routes
│   │   ├── login/                 # Operator Login
│   │   └── register/              # Identity Vault Registration
│   ├── 📁 dashboard/              # Operator HUD
│   │   ├── page.tsx               # Main monitoring panel
│   │   └── components/            # HUD widgets & modules
│   ├── 📁 monitor/                # Active Surveillance Module
│   │   ├── camera/                # Visual input handler
│   │   └── audio/                 # Audio stream handler
│   └── layout.tsx                 # Root layout
│
├── 📁 components/                 # Shared UI components
│   ├── ThreatAlert.tsx            # Distress protocol UI
│   ├── SensorPanel.tsx            # Live sensor readouts
│   └── VigilanceHUD.tsx           # Main operator display
│
├── 📁 lib/                        # Core logic
│   ├── firebase.ts                # Firebase configuration
│   ├── auth.ts                    # Authentication handlers
│   ├── detection.ts               # AI threat detection engine
│   └── distress.ts                # Emergency protocol manager
│
├── 📁 types/                      # TypeScript interfaces
│   └── index.ts
│
├── .env.local                     # 🔒 Environment secrets (never commit)
├── next.config.ts
└── README.md
```
## Stargazers over time
[![Stargazers over time](https://starchart.cc/caarlos0/starcharts.svg?variant=adaptive)](https://starchart.cc/caarlos0/starcharts)
---

## 🚀 Deployment Guide

### Prerequisites

Before initiating system boot, ensure you have:

- Node.js `v18+`
- A Firebase project with **Authentication** and **Firestore** enabled
- A package manager: `npm`, `yarn`, or `pnpm`

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/silent-guardian.git
cd silent-guardian
```

### Step 2 — Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3 — Configure Firebase Credentials

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> ⚠️ **NEVER** commit your `.env.local` file. Add it to `.gitignore` immediately.

### Step 4 — Boot the System

```bash
npm run dev
```

Navigate to `http://localhost:3000` — **Silent Guardian is now online.**

---

## 🧠 Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 15 (App Router) | UI Rendering & Routing |
| **Language** | TypeScript | Type-safe development |
| **Auth** | Firebase Authentication | Secure operator login |
| **Database** | Cloud Firestore | Real-time incident storage |
| **Styling** | Tailwind CSS | Futuristic UI design |
| **AI Engine** | *(Expanding)* | Threat detection models |

</div>

---

## 🔮 Roadmap — What's Next

```
Phase 1 ✅  Core Platform         → Authentication, HUD, Sensor Input
Phase 2 🔄  AI Integration        → Real-time threat classification via ML model
Phase 3 📅  Automation Engine     → Auto-response triggers & smart notifications  
Phase 4 📅  Mobile Companion      → React Native app for on-the-go monitoring
Phase 5 📅  Multi-Site Network    → Monitor multiple locations from one dashboard
Phase 6 📅  Analytics & Reports   → Historical threat data, heatmaps & trends
```

---

## 💡 What I Learned Building This

- 🔐 Architecting **secure authentication** flows using Firebase Auth with protected routes
- 🎨 Designing **responsive, futuristic UI** dashboards that feel immersive and functional
- ☁️ Integrating **cloud-based backends** (Firestore) for real-time, persistent data
- 🏗️ Structuring **scalable full-stack applications** using Next.js App Router patterns
- 📡 Handling **multi-modal sensor data** (camera + microphone) in a browser environment
- 🚨 Building **emergency protocol systems** that are reliable under pressure

---

## 🤝 Contributing

Contributions, ideas, and feature suggestions are welcome. To contribute:

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Author

<div align="center">

**Built with purpose by Chethan Gowda**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/YOUR_PROFILE)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/YOUR_USERNAME)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5733?style=for-the-badge&logo=firefox&logoColor=white)](https://your-portfolio.com)

---

*"In a world of noise, Silent Guardian listens for what matters."*

⭐ **Star this repo** if Silent Guardian inspired you.

</div>
