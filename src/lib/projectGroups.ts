// These are deeper views of the operations suite, not separate headline projects.
export const operationsProjects = [
  { slug: "enterprise-voice-ai", label: "Agent evaluation" },
  { slug: "conversation-explorer", label: "Call review" },
  { slug: "scout-evidence-engine", label: "Scout investigations" },
  { slug: "platform-chat", label: "Platform Chat" },
];

export const isOperationsProject = (slug: string) =>
  operationsProjects.some(project => project.slug === slug);
