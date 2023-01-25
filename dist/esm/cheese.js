import { p as promiseResolve, b as bootstrapLazy } from './index-e0c21bd2.js';

/*
 Stencil Client Patch Browser v2.20.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["analysis-board",[[1,"analysis-board",{"light":[1025],"dark":[1025]}]]],["checker-board",[[1,"checker-board",{"light":[1025],"dark":[1025]}]]],["chess-board",[[1,"chess-board",{"light":[1025],"dark":[1025],"fen":[1025]}]]]], options);
});
