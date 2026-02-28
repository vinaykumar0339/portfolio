import Link from "next/link";
import { parseResumeMarkdown, tokenizeInlineText } from "@/lib/resume-markdown";

function InlineText({ text }) {
  const tokens = tokenizeInlineText(text);

  return tokens.map((token, index) => {
    if (token.type === "link") {
      return (
        <Link
          key={`${token.href}-${index}`}
          href={token.href}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          {token.text}
        </Link>
      );
    }

    return <span key={`${token.text}-${index}`}>{token.text}</span>;
  });
}

export function ResumeMarkdown({ markdown }) {
  const blocks = parseResumeMarkdown(markdown);

  return (
    <article className="space-y-3">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.level === 1) {
            return (
              <h1 key={`h1-${index}`} className="text-3xl font-semibold tracking-tight">
                <InlineText text={block.text} />
              </h1>
            );
          }

          if (block.level === 2) {
            return (
              <h2 key={`h2-${index}`} className="pt-2 text-xl font-semibold tracking-tight">
                <InlineText text={block.text} />
              </h2>
            );
          }

          return (
            <h3 key={`h3-${index}`} className="text-base font-semibold">
              <InlineText text={block.text} />
            </h3>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={`list-${index}`} className="list-disc space-y-1 pl-5 text-sm leading-6">
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>
                  <InlineText text={item} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`p-${index}`} className="text-sm leading-6 text-muted-foreground">
            <InlineText text={block.text} />
          </p>
        );
      })}
    </article>
  );
}
