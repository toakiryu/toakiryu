"use client";

import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import remarkDirective from "remark-directive";
import { remarkAlerts } from "@/src/lib/remark/remark-alerts";
import { useMDXComponents } from "mdx-components";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <Markdown
      components={useMDXComponents() as Components}
      remarkPlugins={[remarkDirective, remarkGfm, remarkAlerts]}
      rehypePlugins={[
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeRaw,
        [rehypeExternalLinks, { rel: ["nofollow"], target: "_blank" }],
        rehypeHighlight,
      ]}
    >
      {content}
    </Markdown>
  );
}
