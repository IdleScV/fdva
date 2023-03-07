import { ElementType } from "react";
import { Routes } from "./Routes";

export type NavData = Array<{
  title: string;
  to?: string;
  icon?: ElementType;
  items?: Array<{ icon: ElementType; label: string; href: string }>;
}>;

export const data: NavData = [
  {
    title: "Home",
    to: Routes.HOME,
  },
  {
    title: "About",
    to: Routes.ABOUT,
  },
  {
    title: "Our Instructors",
    to: Routes.INSTRUCTORS,
  },
  {
    title: "Lesson Descriptions",
    to: Routes.LESSONS,
  },
  {
    title: "Gallery",
    to: Routes.GALLERY,
  },
];
