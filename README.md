# Kiddof Roblox Game Platform

A modern Roblox-inspired web platform for discovering, creating, and sharing kid-friendly games. Built with React, Supabase, and TypeScript.

---

## Features

- **User Authentication** (Sign up, Login, Profile)
- **Game Discovery** (Popular, Trending, Categories)
- **Game Details** (Screenshots, Description, Play)
- **Favorites** (Save and view favorite games)
- **Friend System** (Add, remove, and message friends)
- **Notifications** (Friend requests, system, chat)
- **Subscriptions** (Premium plans, Paystack integration)
- **Robux Balance** (Earn and spend virtual currency)
- **Game Creation** (Upload and manage your own games)
- **Responsive UI** (Mobile and desktop friendly)
- **Infinite Scroll & Lazy Loading** for games

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** [Supabase](https://supabase.com/) (Postgres, Auth, Storage, Edge Functions)
- **Payments:** Paystack (via Supabase Edge Functions)
- **State/Data:** React Query
- **Icons:** Lucide

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/kiddof.git
cd kiddof
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure Supabase

- Create a project at [supabase.com](https://supabase.com/)
- Copy your Supabase URL and anon/public key to `.env`:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

- Run the SQL in `/supabase/schema.sql` to set up tables and policies.

### 4. Start the development server

```sh
npm run dev
```

---

## Project Structure

```
Frontend/
  src/
    components/        # Reusable UI components (Navbar, Footer, GameCard, etc.)
    hooks/             # Custom React hooks (useGames, useProfile, useSubscriptions, etc.)
    pages/             # Page components (Index, Games, Profile, FriendProfile, etc.)
    integrations/      # Supabase client and types
    assets/            # Images and static assets
  supabase/
    functions/         # Edge Functions (e.g., paystack-webhook)
    schema.sql         # Database schema and policies
```

---

## Key Files

- `src/pages/Index.tsx` — Home page, featured games, categories carousel
- `src/pages/Games.tsx` — Game browser with filters and infinite scroll
- `src/pages/Profile.tsx` — User profile, Robux balance, subscription status
- `src/pages/FriendProfile.tsx` — View another user's profile, favorites, and games
- `src/components/NotificationBell.tsx` — Notification dropdown
- `src/hooks/useProfile.ts` — Profile fetching and updating logic
- `src/hooks/useSubscriptions.ts` — Subscription plans and user subscription logic
- `supabase/functions/paystack-webhook/index.ts` — Paystack payment webhook (Deno)

---

## Supabase Table Policies

- **games:** Anyone can read, only creators can insert/update/delete their own games.
- **user_subscriptions:** Only the user can read/write their own subscription.
- **notifications:** Only the user can read/write their own notifications.
- **profiles:** Only the user can update their own profile.

See `/supabase/schema.sql` for full policy details.

---

## Payments

- **Paystack** is integrated via a Supabase Edge Function webhook.
- After successful payment, user subscription and Kiddoverse balance are updated automatically.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Credits

- Kiddoverse branding and inspiration
- [Supabase](https://supabase.com/)
- [Lucide Icons](https://lucide.dev/)
