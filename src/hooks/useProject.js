import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";

export function useProject(slug) {
  const [project, setProject] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    async function load() {
      const { data: proj, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

      if (cancelled) return;

      if (error || !proj) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data: shots } = await supabase
        .from("project_screenshots")
        .select("*")
        .eq("project_id", proj.id)
        .order("position", { ascending: true });

      if (cancelled) return;

      const normalized = Array.from({ length: 8 }, (_, i) => {
        const pos = i + 1;
        const shot = shots?.find((s) => s.position === pos);
        return {
          position: pos,
          src: shot?.storage_path
            ? `${SUPABASE_URL}/storage/v1/object/public/screenshots/${shot.storage_path}`
            : null,
          caption: shot?.caption ?? "",
        };
      });

      setProject(proj);
      setScreenshots(normalized);
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  return { project, screenshots, loading, notFound };
}
