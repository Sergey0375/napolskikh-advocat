import { Briefcase, Gavel, HeartHandshake, Home, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  info: Briefcase,
  business: Gavel,
  family: HeartHandshake,
  property: Home,
  education: GraduationCap,
};

export const fallbackServiceIcon = Briefcase;
