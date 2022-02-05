import { createElement } from "react";
import { component as AsyncComponent } from "~/storyblok/components/AsyncComponent";
import { component as NormalComponent } from "~/storyblok/components/NormalComponent";
import SbEditable from "storyblok-react";

export const Components: any = {
  "async-component": AsyncComponent,
  "normal-component": NormalComponent,
};

const DynamicComponent = (props: any) => {
  const content = props.component;
  if (typeof Components[content?.component] !== "undefined") {
    const Component = Components[content?.component];
    const props = {
      key: content?._uid,
      content,
    };

    return (
      <SbEditable {...props}>
        <Component {...props} />
      </SbEditable>
    );
  }
  return createElement(
    () => (
      <div>The component {content?.component} has not been created yet.</div>
    ),
    { key: content?._uid }
  );
};

export default DynamicComponent;
