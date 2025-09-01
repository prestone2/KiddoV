# 🌍 Kiddoverse

**Kiddoverse** is a safe, fun, and interactive Roblox-style platform for kids where they can play, learn, and socialize. Our mission is to create a secure digital playground powered by **AI-driven safety, content moderation, and gamified learning experiences**.

---

## ✨ Features

* 🎮 **Game Hub** – Explore, play, and create games in a kid-friendly environment.
* 🛡 **AI Safety & Moderation**

  * Chat moderation (bad language, bullying prevention).
  * Image moderation (safe avatars & uploads).
  * Voice moderation (speech-to-text + filters).
* 🎨 **Custom Avatars** – Creative expression while staying safe.
* 📚 **Learning Elements** – Educational mini-games & challenges.
* 🔑 **Authentication** – Secure login with email, Google, or guest play.
* ☁️ **Cloud Storage** – Game assets and progress stored with Supabase.

---

## 🛠 Tech Stack

* **Frontend:** React + TailwindCSS
* **Backend:** Supabase (Postgres, Auth, Storage)
* **Authentication:** Supabase Auth + Google OAuth
* **AI Tools:** OpenAI Moderation API, Perspective API, Hive AI
* **Hosting:** Vercel (frontend) + Supabase (backend)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/kiddoverse.git
cd kiddoverse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env.local` file and configure:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GOOGLE_CLIENT_ID=your-google-client-id
SMTP_SERVER=smtp.sendgrid.net
SMTP_LOGIN=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

### 4. Run the app locally

```bash
npm run dev
```

---

## 🤖 AI Roadmap

* ✅ Phase 1: Chat & Image Moderation
* 🔄 Phase 2: Real-time Voice Moderation
* 🔮 Phase 3: Personalized learning suggestions for kids
* 🧩 Phase 4: AI-powered parental dashboards

---

## 📌 Contributing

We welcome contributions! Please fork the repo, create a feature branch, and submit a pull request.

---

## 📄 License

MIT License © 2025 Kiddoverse

---

## 🌟 Support

If you like this project, please **star ⭐ the repo** and share Kiddoverse with others.
