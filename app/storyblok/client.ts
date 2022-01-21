const StoryblokClient = require('storyblok-js-client')

let Storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_TOKEN
})

export default Storyblok