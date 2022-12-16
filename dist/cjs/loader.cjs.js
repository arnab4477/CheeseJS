'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9d39a049.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

/*
 Stencil Client Patch Esm v2.20.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    // NOTE!! This fn cannot use async/await!
    // @ts-ignore
    if (index.BUILD.cssVarShim && !(index.CSS && index.CSS.supports && index.CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return Promise.resolve().then(function () { return require(/* webpackChunkName: "polyfills-css-shim" */ './css-shim-211819bc.js'); }).then(() => {
            if ((index.plt.$cssShim$ = index.win.__cssshim)) {
                return index.plt.$cssShim$.i();
            }
            else {
                // for better minification
                return 0;
            }
        });
    }
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  appGlobals.globalScripts();
  return index.bootstrapLazy([["checker-board.cjs",[[1,"checker-board",{"lightSquare":[1025,"light-square"],"darkSquare":[1025,"dark-square"]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
