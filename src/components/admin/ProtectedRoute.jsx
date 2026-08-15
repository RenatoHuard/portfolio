import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const ADMIN_EMAIL = "admin@renatohuard.com.br";

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined); // undefined = verificando

  useEffect(() => {
    // getSession também processa o hash do OAuth callback automaticamente
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
      // SIGNED_IN dispara após retorno do Google OAuth
      setSession(s ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Verificando sessão...
        </span>
      </div>
    );
  }

  // Bloqueia qualquer conta que não seja o admin (ex: usuários do CrushDex)
  if (!session || session.user?.email !== ADMIN_EMAIL) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
