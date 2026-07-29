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
    role: "Editor, AgenticStack",
    bio: "Writes about the shift from DevSecOps to agentic, AI-native engineering.",
  },
};

export function getAuthor(id: string): Author {
  return authors[id] ?? authors.dome;
}
