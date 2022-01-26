import { action as AsyncComponentAction } from "~/storyblok/components/AsyncComponent";
import { action as NormalComponentAction } from "~/storyblok/components/NormalComponent";
import { DataFunctionArgs } from "@remix-run/server-runtime";

export default async function actionHandler(context: DataFunctionArgs) {
  const formData = await context.request.formData();
  const component = formData.get("component");

  return ComponentActions[component](context);
}

export const ComponentActions = {
  "async-component": AsyncComponentAction,
  "normal-component": NormalComponentAction,
};
