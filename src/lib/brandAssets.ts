
export const SHADEWATER_LABS_MARK_ALT = 'Shadewater Labs logo mark';
export const SHADEWATER_LABS_MARK_SRC = '/shadewater-labs-logo.webp';
export const SHADEWATER_LABS_MARK_CROPPED_SRC = '/shadewater-labs-logo-cropped.webp';
export const SHADEWATER_LABS_MARK_CROPPED_WIDTH = 408;
export const SHADEWATER_LABS_MARK_CROPPED_HEIGHT = 712;
// The chrome renders the mark 36-44px tall. This is the same crop at a size a 3x screen
// can still use (168px tall), a few KB instead of 114. Lighthouse 2026-09-05: the 408x712
// file was 113 KB wasted on the mobile home page, and the site's LCP was the hero logo
// below, served the same way.
export const SHADEWATER_LABS_MARK_CROPPED_SMALL_SRC = '/shadewater-labs-logo-cropped-96w.webp';
export const SHADEWATER_LABS_MARK_CROPPED_SMALL_WIDTH = 96;
export const SHADEWATER_LABS_MARK_CROPPED_SMALL_HEIGHT = 168;
export const SHADEWATER_LABS_MARK_SRCSET =
  '/shadewater-labs-logo-320w.webp 320w, /shadewater-labs-logo-640w.webp 640w, /shadewater-labs-logo-900w.webp 900w, /shadewater-labs-logo.webp 1200w';
export const SHADEWATER_LABS_MARK_SIZES =
  '(min-width: 1024px) 13rem, (min-width: 640px) 11rem, 38vw';
export const SHADEWATER_LABS_MARK_WIDTH = 408;
export const SHADEWATER_LABS_MARK_HEIGHT = 712;

export const SHADEWATER_LABS_TEXT_LOGO_ALT = 'Shadewater Labs';
export const SHADEWATER_LABS_TEXT_LOGO_SRC = '/shadewater-labs-text-logo.webp';
export const SHADEWATER_LABS_TEXT_LOGO_CROPPED_SRC = '/shadewater-labs-text-logo-cropped.webp';
// The hero renders this at 245x350 CSS px; 1x, 2x and the 602px original for 3x.
export const SHADEWATER_LABS_TEXT_LOGO_CROPPED_SRCSET =
  '/shadewater-labs-text-logo-cropped-245w.webp 245w, /shadewater-labs-text-logo-cropped-490w.webp 490w, /shadewater-labs-text-logo-cropped.webp 602w';
export const SHADEWATER_LABS_TEXT_LOGO_CROPPED_SIZES = '245px';
export const SHADEWATER_LABS_TEXT_LOGO_SRCSET =
  '/shadewater-labs-text-logo-320w.webp 320w, /shadewater-labs-text-logo-640w.webp 640w, /shadewater-labs-text-logo-900w.webp 900w, /shadewater-labs-text-logo.webp 1200w';
export const SHADEWATER_LABS_TEXT_LOGO_WIDTH = 602;
export const SHADEWATER_LABS_TEXT_LOGO_HEIGHT = 875;
