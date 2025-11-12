// Local (public/) paths - place your images in the project's `public/assets/` folder.
export const PROFILE_PIC_LOCAL = '/assets/Fullshot.jpg';
export const HERO_PORTRAIT_LOCAL = '/assets/Headshot.jpg';

// Fallback remote images (used if local files aren't present)
export const PROFILE_PIC_FALLBACK = 'https://picsum.photos/seed/profile-pic/400/400';
export const HERO_PORTRAIT_FALLBACK = 'https://picsum.photos/seed/hero-portrait/500/500';

// Convenience exports used by components. Components will try the local path
// and fall back to the remote URL if the image cannot be loaded.
export const PROFILE_PIC = PROFILE_PIC_LOCAL;
export const HERO_PORTRAIT = HERO_PORTRAIT_LOCAL;

// NOTE: To use local images, create the folder `public/assets/` and add:
// - public/assets/Headshot.jpg
// - public/assets/Fullshot.jpeg
// If you prefer bundler-managed imports, replace these exports with
// `import profile from './assets/Headshot.jpg'` and export that instead.
