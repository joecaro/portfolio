import type { SerializeResult } from 'next-mdx-remote-client/serialize';

export type Project = {
    title: string;
    slug: string;
    date: string;
    image: string;
    tags: string[];
    description: string;
    name: string;
    stack: string[];
    content?: string;
    demo?: string;
    github?: string;
    isMDX?: boolean;
    mdxSource?: SerializeResult<Record<string, unknown>, Record<string, unknown>> | null;
};
