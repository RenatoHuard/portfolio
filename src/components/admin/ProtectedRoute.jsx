import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const ADMIN_EMAIL = "renato.jhs@gmail.com";

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined); // undefined = still checking

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
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

  // Usuários do CrushDex (mesmo projeto Supabase) são bloqueados aqui
  if (!session || session.user?.email !== ADMIN_EMAIL) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
