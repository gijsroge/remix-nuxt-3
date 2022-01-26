import { Story } from "storyblok-js-client";
import { Components } from "~/components";
import { AsyncComponentLoader } from "~/components/AsyncComponent";

export default async function dataLoader(story: Story) {
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
};
