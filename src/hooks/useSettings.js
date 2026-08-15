import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const DEFAULTS = {
  contact_email: "renato.jhs@gmail.com",
  whatsapp_number: "5513982126596",
  whatsapp_message: "Olá! Vi o seu portfolio e gostaria de conversar.",
  github_url: "https://github.com/RenatoHuard",
  linkedin_url: "https://www.linkedin.com/in/renato-huard/",
  instagram_url: "https://www.instagram.com/renatohuard",
  crushdex_apk_url: "",
  profile_photo_url: "",
  brand_logo_url: "",
};

// Cache de módulo — uma única query por page load
let cache = null;
let inflight = null;

function load() {
  if (inflight) return inflight;
  inflight = supabase
    .from("site_settings")
    .select("key, value")
    .then(({ data }) => {
      const obj = { ...DEFAULTS };
      (data ?? []).forEach(({ key, value }) => { obj[key] = value; });
      cache = obj;
      return obj;
    });
  return inflight;
}

export function useSettings() {
  const [settings, setSettings] = useState(cache ?? DEFAULTS);

  useEffect(() => {
    if (cache) { setSettings(cache); return; }
    load().then(setSettings);
  }, []);

  return settings;
}
