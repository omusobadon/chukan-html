import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import relativeLinks from "astro-relative-links";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "オムそば丼",
      pagefind: false,
      logo: {
        src: "./public/オムそば丼キャラ切り抜き.png",
      },
      social: {
        github: "https://github.com/omusobadon",
      },
      sidebar: [
        {
          label: "Guides",
          autogenerate: {
            directory: "guides",
          },
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
        },
        {
          label: "スライド",
          autogenerate: {
            directory: "Slides",
          },
        },
      ],
    }),
    tailwind({ applyBaseStyles: false }),
    relativeLinks(),
  ],
});
