import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import LandingPage from "./pages/LandingPage";
import ServiceDetail from "./pages/ServiceDetail";
import VantaBackground from "./components/VantaBackground";
import DirectorsVision from "./pages/DirectorsVision";
import ShaderBackground from "./components/ui/shader-background";
import { ThemeProvider } from "next-themes";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative w-full">
      <ShaderBackground />
      {children}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="App">
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/services/:serviceName" element={<ServiceDetail />} />
              <Route path="/directors-vision" element={<DirectorsVision />} />
            </Routes>
            <Toaster position="top-right" />
          </AppLayout>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
