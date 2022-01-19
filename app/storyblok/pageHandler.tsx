import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import Storyblok from "~/storyblok/client";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ params }) => {
  // catch all slugs, or if no params we can assume
  const slug = params["*"] || "home";
  const data = await Storyblok.get(`cdn/stories/${slug}`, {
    version: "draft",
  });
  return {
    headers: data.headers,
    meta: data.data.story.content.meta,
    content: data.data.story.content,
  };
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
  let data = useLoaderData<any>();
  return (
    <div>
      <h1>test</h1>
      {data?.content?.body.map((component) => (
        <div key={component._uid}>
          <h3>{component.title}</h3>
        </div>
      ))}
    </div>
  );
}
