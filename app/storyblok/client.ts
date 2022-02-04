import { useState } from "react";
import { StoryData } from "storyblok-js-client";

const StoryblokClient = require("storyblok-js-client");

let Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN,
});

export function useStoryBlokBridge(storyData?: StoryData) {
  const [story, setStory] = useState<StoryData | undefined>(storyData);
  function initEventListeners() {
    const { StoryblokBridge } = window as any;
    if (typeof StoryblokBridge !== "undefined") {
      const storyblokInstance = new StoryblokBridge({
        resolveRelations: ["featured-posts.posts", "selected-posts.posts"],
      });
      storyblokInstance.on(["change", "published"], () =>
        window.location.reload()
      );
      storyblokInstance.on("input", (event: any) => {
        setStory(event.story);
      });
    }
  }
  function addBridge() {
    const existingScript = document.getElementById("storyblokBridge");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
      script.id = "storyblokBridge";
      document.body.appendChild(script);
      script.onload = () => {
        initEventListeners();
      };
    } else {
      initEventListeners();
    }
  }
  return { story, setStory, addBridge };
}

export default Storyblok;
