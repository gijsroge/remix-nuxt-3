import { createElement } from "react";
import {AsyncComponent} from "~/components/AsyncComponent";
import {NormalComponent} from "~/components/NormalComponent";

export const Components = {
  "async-component": AsyncComponent,
  "normal-component": NormalComponent,
};

const DynamicComponent = (props) => {
  const block = props.component;
  if (typeof Components[block?.component] !== "undefined") {
    return createElement(Components[block?.component], {
      key: block?._uid,
      block,
    });
  }
  return createElement(
    () => <div>The component {block?.component} has not been created yet.</div>,
    { key: block?._uid }
  );
};

export default DynamicComponent;
