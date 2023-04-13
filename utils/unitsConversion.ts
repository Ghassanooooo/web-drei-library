/**
 * Body
 * get screen size with js and make it vw
 * max-width args[0] is 5.1 = 100vw = 1632px
 * Half width 816px
 * height args[0] is 3 = 100vh 960px
 * 75px = 1.2
 *
 * 1px = 0.016
 * position left 0 = -11.85,
 * position right 0 = 11.85,
 * font-size 0.32 = 16px
 */

export const pxToThreeFloatUnit = (px: number) => {
  return px * 0.0158;
};
// pxToThreeFloatUnit(816)
