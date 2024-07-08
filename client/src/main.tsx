import ReactDOM from "react-dom/client";
import App, { queryClient } from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./lib/context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Toaster />
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
