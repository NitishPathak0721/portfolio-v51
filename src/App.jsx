import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer";


// ==========================================
// Lazy Loaded Pages
// ==========================================

const Portofolio = lazy(
  () => import("./Pages/Portofolio")
);

const ContactPage = lazy(
  () => import("./Pages/Contact")
);

const ProjectDetails = lazy(
  () => import("./components/ProjectDetail")
);

const WelcomeScreen = lazy(
  () => import("./Pages/WelcomeScreen")
);

const NotFoundPage = lazy(
  () => import("./Pages/404")
);


// ==========================================
// AUTH / ADMIN
// Lazy loading prevents Supabase/Auth code
// from loading on the public homepage.
// ==========================================

const Login = lazy(
  () => import("./Pages/Login")
);

const Dashboard = lazy(
  () => import("./Pages/Dashboard")
);

const ProtectedRoute = lazy(
  () => import("./components/ProtectedRoute")
);


// ==========================================
// Loading Component
// ==========================================

const PageLoader = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[#030014]
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          w-10
          h-10
          border-4
          border-purple-500/30
          border-t-purple-500
          rounded-full
          animate-spin
        "
      />
    </div>
  );
};


// ==========================================
// Landing Page
// ==========================================

const LandingPage = ({
  showWelcome,
  setShowWelcome,
}) => {
  return (
    <>
      {/* =====================================
          Welcome Screen
      ===================================== */}

      <AnimatePresence mode="wait">
        {showWelcome && (
          <Suspense fallback={null}>
            <WelcomeScreen
              onLoadingComplete={() =>
                setShowWelcome(false)
              }
            />
          </Suspense>
        )}
      </AnimatePresence>


      {/* =====================================
          Main Portfolio
      ===================================== */}

      {!showWelcome && (
        <>
          <Navbar />

          <Home />

          <About />

          <Suspense
            fallback={
              <div className="h-20" />
            }
          >
            <Portofolio />

            <ContactPage />
          </Suspense>

          <Footer />
        </>
      )}
    </>
  );
};


// ==========================================
// Project Details Page
// ==========================================

const ProjectPageLayout = () => {
  return (
    <>
      <Suspense
        fallback={<PageLoader />}
      >
        <ProjectDetails />
      </Suspense>

      <Footer />
    </>
  );
};


// ==========================================
// Main App
// ==========================================

function App() {

  const [showWelcome, setShowWelcome] =
    useState(true);


  return (
    <HelmetProvider>

      {/* =====================================
          Animated Background
      ===================================== */}

      <div className="pointer-events-none">
        <AnimatedBackground />
      </div>


      <BrowserRouter>

        <Routes>

          {/* =================================
              PUBLIC HOME
          ================================= */}

          <Route
            path="/"
            element={
              <LandingPage
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
              />
            }
          />


          {/* =================================
              PROJECT DETAILS
          ================================= */}

          <Route
            path="/project/:slug"
            element={
              <ProjectPageLayout />
            }
          />


          {/* =================================
              LOGIN
          ================================= */}

          <Route
            path="/login"
            element={
              <Suspense
                fallback={<PageLoader />}
              >
                <Login />
              </Suspense>
            }
          />


          {/* =================================
              PROTECTED DASHBOARD
          ================================= */}

          <Route
            path="/dashboard/*"
            element={
              <Suspense
                fallback={<PageLoader />}
              >
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Suspense>
            }
          />


          {/* =================================
              404
          ================================= */}

          <Route
            path="*"
            element={
              <Suspense
                fallback={<PageLoader />}
              >
                <NotFoundPage />
              </Suspense>
            }
          />

        </Routes>

      </BrowserRouter>

    </HelmetProvider>
  );
}


export default App;