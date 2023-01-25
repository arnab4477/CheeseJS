'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1fbd0a00.js');

/*
 Stencil Client Patch Esm v2.20.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["analysis-board.cjs",[[1,"analysis-board",{"light":[1025],"dark":[1025]}]]],["checker-board.cjs",[[1,"checker-board",{"light":[1025],"dark":[1025]}]]],["chess-board.cjs",[[1,"chess-board",{"light":[1025],"dark":[1025],"fen":[1025]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
