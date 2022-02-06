export function component({ content }: { content: any }) {
  const Tag = content.tag || "h3";
  return <Tag>{content.title}</Tag>;
}
