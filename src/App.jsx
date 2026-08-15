import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import CrushDex from "./pages/CrushDex";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProjectEdit from "./pages/admin/ProjectEdit";
import Settings from "./pages/admin/Settings";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  // Admin layout — sem Navbar, Footer, CursorGlow ou WhatsApp
  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/projetos"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin/projetos/novo"
          element={<ProtectedRoute><ProjectEdit /></ProtectedRoute>}
        />
        <Route
          path="/admin/projetos/:id/editar"
          element={<ProtectedRoute><ProjectEdit /></ProtectedRoute>}
        />
        <Route
          path="/admin/configuracoes"
          element={<ProtectedRoute><Settings /></ProtectedRoute>}
        />
        <Route path="/admin" element={<Navigate to="/admin/projetos" replace />} />
      </Routes>
    );
  }

  // Layout público
  return (
    <div className="flex min-h-screen flex-col">
      <CursorGlow />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
            <Route path="/projetos/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
            <Route path="/crushdex" element={<PageTransition><CrushDex /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
