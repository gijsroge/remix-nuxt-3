import { action as AsyncComponentAction } from "~/storyblok/components/AsyncComponent";
import { action as NormalComponentAction } from "~/storyblok/components/NormalComponent";
import { DataFunctionArgs } from "@remix-run/server-runtime";

export default async function actionHandler(context: DataFunctionArgs) {
  const formData = await context.request.formData();
  const component: FormDataEntryValue | null = formData.get("component");

  if (component) {
    return ComponentActions[component as string](context);
  }

  return null;
}

export const ComponentActions: any = {
  "async-component": AsyncComponentAction,
  "normal-component": NormalComponentAction,
};
