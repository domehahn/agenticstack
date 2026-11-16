export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  url?: string;
};

export const authors: Record<string, Author> = {
  dome: {
    id: "dome",
    name: "Dominik Hahn",
    role: "Senior DevSecOps Engineer & Software Architect (M.Sc., CPSA-F)",
    bio: "Over a decade of experience across backend software engineering, enterprise consulting, cloud-native microservices, Kubernetes platforms, and DevSecOps in regulated environments.",
  },
};

export function getAuthor(id: string): Author {
  return authors[id] ?? authors.dome;
}
