import { action as AsyncComponentAction } from "~/storyblok/components/AsyncComponent";
import { action as NormalComponentAction } from "~/storyblok/components/NormalComponent";
import { DataFunctionArgs } from "@remix-run/server-runtime";

export default async function actionHandler(context: DataFunctionArgs) {
  const formData = await context.request.formData();
  const component = formData.get("component");

  return ComponentActions[component](context);
}

async function extractActionFromComponent(uid, context) {
  const componentData = await ComponentLoaders[uid](context);
  return {
    data: componentData,
    uid: component._uid,
  };
}

export const ComponentActions = {
  "async-component": AsyncComponentAction,
  "normal-component": NormalComponentAction,
};
