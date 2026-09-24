"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  seedContent,
  type ContactInfo,
  type Project,
  type Service,
  type SiteContent,
} from "@/lib/content/seed";

const KEY = "db-site-content-v3";

let memoryRaw: string | null | undefined;
let memoryValue: SiteContent = seedContent;

function normalize(value: Partial<SiteContent> | null): SiteContent {
  if (!value) return seedContent;
  return {
    services: Array.isArray(value.services) ? value.services : seedContent.services,
    projects: Array.isArray(value.projects) ? value.projects : seedContent.projects,
    contact: { ...seedContent.contact, ...value.contact },
  };
}

function read(): SiteContent {
  if (typeof window === "undefined") return seedContent;
  const raw = window.localStorage.getItem(KEY);
  if (memoryRaw === raw) return memoryValue;
  memoryRaw = raw;
  if (!raw) {
    memoryValue = seedContent;
    return memoryValue;
  }
  try {
    memoryValue = normalize(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    memoryValue = seedContent;
  }
  return memoryValue;
}

function write(next: SiteContent) {
  const raw = JSON.stringify(next);
  memoryRaw = raw;
  memoryValue = next;
  window.localStorage.setItem(KEY, raw);
  window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function useSiteContent() {
  const content = useSyncExternalStore(subscribe, read, () => seedContent);

  const setContent = useCallback((next: SiteContent) => {
    write(next);
  }, []);

  const addService = useCallback((service: Service) => {
    const current = read();
    write({ ...current, services: [...current.services, service] });
  }, []);

  const removeService = useCallback((id: string) => {
    const current = read();
    write({
      ...current,
      services: current.services.filter((item) => item.id !== id),
    });
  }, []);

  const addProject = useCallback((project: Project) => {
    const current = read();
    write({ ...current, projects: [...current.projects, project] });
  }, []);

  const updateProject = useCallback((slug: string, project: Project) => {
    const current = read();
    write({
      ...current,
      projects: current.projects.map((item) => (item.slug === slug ? project : item)),
    });
  }, []);

  const removeProject = useCallback((slug: string) => {
    const current = read();
    write({
      ...current,
      projects: current.projects.filter((item) => item.slug !== slug),
    });
  }, []);

  const updateContact = useCallback((contact: ContactInfo) => {
    const current = read();
    write({ ...current, contact });
  }, []);

  return {
    content,
    setContent,
    addService,
    removeService,
    addProject,
    updateProject,
    removeProject,
    updateContact,
  };
}
