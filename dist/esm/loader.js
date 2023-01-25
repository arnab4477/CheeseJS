import { p as promiseResolve, b as bootstrapLazy } from './index-e0c21bd2.js';

/*
 Stencil Client Patch Esm v2.20.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["analysis-board",[[1,"analysis-board",{"light":[1025],"dark":[1025]}]]],["checker-board",[[1,"checker-board",{"light":[1025],"dark":[1025]}]]],["chess-board",[[1,"chess-board",{"light":[1025],"dark":[1025],"fen":[1025]}]]]], options);
  });
};

export { defineCustomElements };
