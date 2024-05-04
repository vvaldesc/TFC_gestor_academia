export default function isPreview() {
    return import.meta.env.VITE_STORYBLOK_IS_PREVIEW === 'yes'
  }