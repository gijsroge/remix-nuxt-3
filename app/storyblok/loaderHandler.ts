import { Story } from "storyblok-js-client";
import { loader as AsyncComponentLoader } from "~/storyblok/components/AsyncComponent";
import { loader as NormalComponentLoader } from "~/storyblok/components/NormalComponent";

export default async function loaderHandler(story: Story) {
  const loaders = story.data.story.content.body.map(async (component) => {
    return await extractLoaderFromComponent(component);
  });

  // Assign data to an uid indexed Record
  return (await Promise.all(loaders)).reduce((previousValue, currentValue) => {
    previousValue[currentValue.uid] = currentValue.data;
    return previousValue;
  }, {});
}

async function extractLoaderFromComponent(component) {
  const componentData = await ComponentLoaders[component.component](component);
  return {
    data: componentData,
    uid: component._uid,
  };
}

export const ComponentLoaders = {
  "async-component": AsyncComponentLoader,
  "normal-component": NormalComponentLoader,
};
