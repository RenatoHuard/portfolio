import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("projects")
      .select("id, slug, title, tag, status, summary, stack, color, display_order")
      .order("display_order", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setProjects(data);
        setLoading(false);
      });
  }, []);

  return { projects, loading };
}
