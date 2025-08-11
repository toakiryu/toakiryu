import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import { renderToString } from "react-dom/server";
import { AlertIcon } from "@/src/components/ui/markdown/alert-block";

export const remarkAlerts: Plugin = () => {
  return (tree) => {
    visit(
      tree,
      "blockquote",
      (node: any, index: number | null, parent: any) => {
        if (index === null || index === undefined) return;
        const first = node.children[0];
        if (
          first?.type === "paragraph" &&
          first.children[0]?.type === "text" &&
          /^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/.test(
            first.children[0].value
          )
        ) {
          const match = first.children[0].value.match(/^\[!(.+?)\]/);
          const type = match?.[1].toLowerCase();
          first.children[0].value = first.children[0].value.replace(
            /^\[!.+?\]\s*/,
            ""
          );

          const Icon = AlertIcon({ type });

          parent.children[index] = {
            type: "html",
            value: renderToString(
              <div className={`alert alert-${type}`}>
                <p className="alert-title" dir="auto">
                  <Icon size={16} className="mr-1" />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </p>
                {toString(node)}
              </div>
            ),
          };
        }
      }
    );
  };
};
