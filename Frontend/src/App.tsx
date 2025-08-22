import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Marketplace from "./pages/Marketplace";
import Create from "./pages/Create";
import Settings from "./pages/Settings";
import Friends from "./pages/Friends";
import FriendProfile from "./pages/FriendProfile";
import Robux from "./pages/Robux";
import Subscription from "./pages/Subscription";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Parents from "./pages/Parents";
import Help from "./pages/Help";
import DeveloperHub from "./pages/DeveloperHub";
import Education from "./pages/Education";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import Safety from "./pages/Safety";
import Terms from "./pages/Terms";
import Privacy from '@/pages/Privacy';
import Cookies from '@/pages/Cookies';
import CookieConsent from '@/components/CookieConsent';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
      
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <CookieConsent />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/friends/:id" element={<FriendProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/create" element={<Create />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/robux" element={<Robux />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/help" element={<Help />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/developer-hub" element={<DeveloperHub />} />
            <Route path="/education" element={<Education />} />
            <Route path="/community" element={<Community />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
             <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
// This code sets up the main application structure using React Router for navigation.
// It includes routes for various pages like games, profile, login, signup, marketplace, and more.
// The `QueryClientProvider` is used for managing server state with React Query, and the `AuthProvider` provides authentication context.
// The `TooltipProvider` wraps the application to enable tooltips throughout the app.
// The `Toaster` and `Sonner` components are used for displaying notifications and alerts.
// The `ScrollToTop` component ensures that the page scrolls to the top when navigating between routes.
// The `NotFound` route handles any undefined paths, displaying a 404 page.