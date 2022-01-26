import type { MetaFunction, LoaderFunction, ActionFunction } from "remix";
import { useLoaderData } from "remix";
import Storyblok from "~/storyblok/client";
import DynamicComponent from "~/components";
import dataLoader from "~/storyblok/dataLoader";

export let loader: LoaderFunction = async ({ params }) => {
  // catch all slugs, or if no params we can assume
  const slug = params["*"] || "home";
  const page = await Storyblok.get(`cdn/stories/${slug}`, {
    version: "draft",
  });
  const data = await dataLoader(page);
  return {
    headers: page.headers,
    meta: page.data.story.content.meta,
    content: page.data.story.content,
    data,
  };
};

export let action: ActionFunction = async ({ request, params }) => {
  return null;
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = ({ data }) => {
  return {
    title: data?.meta?.title,
    description: data?.meta?.description,
  };
};

// https://remix.run/guides/routing#index-routes
export default function Catch() {
  let { content } = useLoaderData<any>();
  return (
    <div>
      <h1>test</h1>
      {content?.body.map((component) => (
        <DynamicComponent key={component._uid} component={component} />
      ))}
    </div>
  );
}
