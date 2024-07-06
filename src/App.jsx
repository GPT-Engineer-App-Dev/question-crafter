import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, PlusCircle, ClipboardList } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar";
import Index from "./pages/Index";
import CreateSurvey from "./pages/CreateSurvey";
import MySurveys from "./pages/MySurveys";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Create Survey",
    to: "/create",
    icon: <PlusCircle className="h-4 w-4" />,
  },
  {
    title: "My Surveys",
    to: "/my-surveys",
    icon: <ClipboardList className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="create" element={<CreateSurvey />} />
              <Route path="my-surveys" element={<MySurveys />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;