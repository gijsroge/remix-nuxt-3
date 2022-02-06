import { Form } from "remix";
import { actionTarget } from "~/utils/forms";
import DynamicComponent from "~/storyblok/components/index";

export function component({ content }: { content: any }) {
  return (
    <div className="p-8 bg-black text-white">
      {content?.body.map((component: any) => (
        <DynamicComponent key={component._uid} component={component} />
      ))}
    </div>
  );
}
