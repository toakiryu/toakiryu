import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/src/lib/utils";

export function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  return (
    <Highlight theme={themes.github} code={code} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(
            "relative w-full h-full px-1 py-2 bg-muted border rounded-md text-sm leading-relaxed overflow-hidden",
            className
          )}
        >
          <code className="w-full h-full overflow-auto">
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line })}
                className="font-mono text-foreground whitespace-pre"
              >
                <span className="inline-block text-foreground/50 text-right w-6 pr-1 mr-4 border-r select-none">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
