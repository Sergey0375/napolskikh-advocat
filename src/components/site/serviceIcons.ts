import { Briefcase, Gavel, Copyright, HeartHandshake, Home, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  info: Briefcase,
  business: Gavel,
  ip: Copyright,
  family: HeartHandshake,
  property: Home,
  criminal: ShieldAlert,
};

export const fallbackServiceIcon = Briefcase;
