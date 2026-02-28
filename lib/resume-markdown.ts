const HEADING_PATTERN = /^(#{1,6})\s+(.*)$/;
const LIST_PATTERN = /^[-*]\s+(.*)$/;
const URL_SPLIT_PATTERN = /(https?:\/\/[^\s)]+)/g;
const URL_PATTERN = /^https?:\/\/[^\s)]+$/;

interface HeadingBlock {
  type: "heading";
  level: number;
  text: string;
}

interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

interface ListBlock {
  type: "list";
  items: string[];
}

export type ResumeMarkdownBlock = HeadingBlock | ParagraphBlock | ListBlock;

export type InlineTextToken =
  | {
      type: "link";
      href: string;
      text: string;
    }
  | {
      type: "text";
      text: string;
    };

function normalizeInlineMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1 ($2)")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .trim();
}

function pushParagraph(blocks: ResumeMarkdownBlock[], lines: string[]): void {
  if (!lines.length) {
    return;
  }

  blocks.push({
    type: "paragraph",
    text: normalizeInlineMarkdown(lines.join(" "))
  });
  lines.length = 0;
}

function pushList(blocks: ResumeMarkdownBlock[], items: string[]): void {
  if (!items.length) {
    return;
  }

  blocks.push({ type: "list", items: [...items] });
  items.length = 0;
}

export function parseResumeMarkdown(markdown: string): ResumeMarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ResumeMarkdownBlock[] = [];
  const paragraph: string[] = [];
  const listItems: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      pushParagraph(blocks, paragraph);
      pushList(blocks, listItems);
      continue;
    }

    const headingMatch = line.match(HEADING_PATTERN);
    if (headingMatch) {
      pushParagraph(blocks, paragraph);
      pushList(blocks, listItems);

      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: normalizeInlineMarkdown(headingMatch[2])
      });
      continue;
    }

    const listMatch = line.match(LIST_PATTERN);
    if (listMatch) {
      pushParagraph(blocks, paragraph);
      listItems.push(normalizeInlineMarkdown(listMatch[1]));
      continue;
    }

    pushList(blocks, listItems);
    paragraph.push(line);
  }

  pushParagraph(blocks, paragraph);
  pushList(blocks, listItems);

  return blocks;
}

export function tokenizeInlineText(text: string): InlineTextToken[] {
  const parts = text.split(URL_SPLIT_PATTERN);
  return parts
    .filter(Boolean)
    .map((value) =>
      URL_PATTERN.test(value)
        ? { type: "link", href: value, text: value }
        : { type: "text", text: value }
    );
}
