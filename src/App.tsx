import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Chat from "./pages/Chat";
import Messages from "./pages/Messages";
import TMUA from "./pages/TMUA";
import TMUAPastPapers from "./pages/TMUAPastPapers";
import MAT from "./pages/MAT";
import MATPastPapers from "./pages/MATPastPapers";
import ESAT from "./pages/ESAT";
import ESATPastPapers from "./pages/ESATPastPapers";
import InterviewPrep from "./pages/InterviewPrep";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="team" element={<Team />} />
            <Route path="contact/:tutorId" element={<Contact />} />
            <Route path="chat/:tutorId" element={<Chat />} />
            <Route path="messages" element={<Messages />} />
            <Route path="tmua" element={<TMUA />} />
            <Route path="tmua/past-papers" element={<TMUAPastPapers />} />
            <Route path="mat" element={<MAT />} />
            <Route path="mat/past-papers" element={<MATPastPapers />} />
            <Route path="esat" element={<ESAT />} />
            <Route path="esat/past-papers" element={<ESATPastPapers />} />
            <Route path="interview-prep" element={<InterviewPrep />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
