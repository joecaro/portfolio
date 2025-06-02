"use client";

import Markdown from "react-markdown";
import { MDXClient } from "next-mdx-remote-client";
import { InteractiveDemo } from "./InteractiveDemo";
import { CodePlayground } from "./CodePlayground";
import { ETLPipelineDemo } from "./ETLPipelineDemo";
import type { SerializeResult } from "next-mdx-remote-client/serialize";
import { PageLockDemo } from "./PageLockDemo";

// Interactive components that can be used in MDX
const mdxComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-2xl font-extrabold mt-8 mb-4 text-left" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl font-bold mt-6 mb-3 text-left" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-bold mt-6 mb-3 text-left" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-base leading-relaxed mb-4 text-left" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc pl-5 mb-4 text-left" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal pl-5 mb-4 text-left" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="mb-2 text-left" {...props}>
      {children}
    </li>
  ),
  a: ({ children, ...props }: any) => (
    <a
      className="text-blue-500 hover:underline text-left"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 italic my-4 text-left"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: any) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre
      className="bg-gray-900 text-gray-100 p-4 rounded-md mb-4 overflow-auto text-left"
      {...props}
    >
      {children}
    </pre>
  ),
  // Table components
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: any) => (
    <tbody
      className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
      {...props}
    >
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
  th: ({ children, ...props }: any) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </td>
  ),
  // Interactive components
  InteractiveDemo,
  CodePlayground,
  ETLPipelineDemo,
  PageLockDemo,
};

interface MDXRendererProps {
  content: string;
  isMDX?: boolean;
  mdxSource?: SerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  > | null;
}

export function MDXRenderer({ content, isMDX, mdxSource }: MDXRendererProps) {
  // For MDX files, use MDXClient with the serialized source
  if (isMDX && mdxSource) {
    if ("error" in mdxSource) {
      return (
        <div className="text-red-500 p-4 border border-red-300 rounded">
          <h3>MDX Error:</h3>
          <pre>{mdxSource.error.message}</pre>
        </div>
      );
    }

    return <MDXClient {...mdxSource} components={mdxComponents} />;
  }

  // For regular markdown files, use react-markdown
  return <Markdown components={mdxComponents}>{content}</Markdown>;
}
