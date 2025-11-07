import React from "react";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { ViteSSG } from "vite-ssg";

const routes = [
  "/", 
  "/about", 
  "/contact", 
  "/privacy", 
  "/terms", 
  "/help", 
  "/parents", 
  "/community", 
  "/education", 
  "/safety"
];

export const createApp = ViteSSG(
  () => (
    <HelmetProvider>
      <App />
    </HelmetProvider>
  ),
  { routes: routes as unknown as import("vue-router").RouteRecordRaw[], base: "/" }
);

if (typeof window !== "undefined") {
  import("react-dom/client").then(({ createRoot }) => {
    createRoot(document.getElementById("root")!).render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
  });
}
