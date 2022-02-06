import type { MetaFunction, LoaderFunction, ActionFunction } from "remix";
import { useLoaderData, Link } from "remix";
import Storyblok from "~/storyblok/client";
import { useBridge } from "~/storyblok/useBridge";
import DynamicComponent from "~/storyblok/components";
import loaderHandler from "~/storyblok/loaderHandler";
import actionHandler from "~/storyblok/actionHandler";

export let loader: LoaderFunction = async ({ params }) => {
  // catch all slugs, or if no params we can assume
  const language = params["language"] || "nl-be";
  const slug = params["*"] || "index";
  const page = await Storyblok.getStory(`${language}/${slug}`, {
    version: "draft",
  });

  const data = await loaderHandler(page);
  return {
    headers: page.headers,
    meta: page.data.story.content.meta,
    story: page.data.story,
    page,
    data,
  };
};

export let action: ActionFunction = async (context) => {
  return await actionHandler(context);
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
  let { story: StoryData } = useLoaderData<any>();

  // load storyblok bridge only in storyblok editor, this also auto updates story data
  const { story } = useBridge(StoryData);

  return (
    <div>
      {story?.content?.body.map((component: any) => (
        <DynamicComponent key={component._uid} component={component} />
      ))}
    </div>
  );
}
