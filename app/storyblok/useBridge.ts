import { StoryData } from "storyblok-js-client";
import { useState } from "react";

export function useBridge(storyData?: StoryData) {
  const [story, setStory] = useState<StoryData | undefined>(storyData);
  function initEventListeners() {
    const { StoryblokBridge } = window as any;
    if (typeof StoryblokBridge !== "undefined") {
      const storyblokInstance = new StoryblokBridge();
      storyblokInstance.on(["change", "published"], () =>
        window.location.reload()
      );
      storyblokInstance.on("input", (event: any) => {
        setStory(event.story);
      });
    }
  }

  if (
    typeof window !== "undefined" &&
    window.location.search.includes("_storyblok")
  ) {
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

  return { story, setStory };
}
