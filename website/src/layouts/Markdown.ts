import { stringify } from 'yaml';

interface MarkdownProps {
  data: Record<string, unknown>;
  body: string;
}

/** メタデータをYAMLフロントマター、本文をMarkdownとして返す。 */
export function Markdown({ data, body }: MarkdownProps): Response {
  const frontmatter = stringify(data);
  const content = `---\n${frontmatter}---\n\n${body}`;

  return new Response(`${content.trimEnd()}\n`, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
