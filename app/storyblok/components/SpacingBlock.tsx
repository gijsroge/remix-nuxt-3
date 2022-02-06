import DynamicComponent from "~/storyblok/components/index";

export function component({ content }: { content: any }) {
  return (
    <div className={`mb-${content.margin}`}>
      {content?.body.map((component: any) => (
        <DynamicComponent key={component._uid} component={component} />
      ))}
    </div>
  );
}
