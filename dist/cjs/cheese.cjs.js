'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a38c56e.js');

/*
 Stencil Client Patch Browser v2.22.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('cheese.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["analysis-board.cjs",[[1,"analysis-board",{"light":[1025],"dark":[1025]}]]],["checker-board.cjs",[[1,"checker-board",{"light":[1025],"dark":[1025]}]]],["chess-board.cjs",[[1,"chess-board",{"light":[1025],"dark":[1025],"fen":[1025]}]]]], options);
});

exports.setNonce = index.setNonce;
