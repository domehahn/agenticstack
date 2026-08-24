export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Blog", href: "/blog" },
  { label: "Topics", href: "/topics" },
  { label: "Series", href: "/series" },
  { label: "About", href: "/about" },
];

export const footerNavigation: { title: string; items: NavItem[] }[] = [
  {
    title: "Read",
    items: [
      { label: "All articles", href: "/blog" },
      { label: "Topics", href: "/topics" },
      { label: "Series", href: "/series" },
    ],
  },
  {
    title: "Publication",
    items: [{ label: "About", href: "/about" }],
  },
];
