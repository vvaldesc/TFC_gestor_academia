import { renderers } from './renderers.mjs';
import { manifest } from './manifest_JNT8ph6K.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_DHi_PKVw.mjs');
const _page1 = () => import('./chunks/_.._COslboAF.mjs');
const _page2 = () => import('./chunks/404_DvS0HuQu.mjs');
const _page3 = () => import('./chunks/profile_C1VXITY0.mjs');
const _page4 = () => import('./chunks/shop_7v5yPJrL.mjs');
const _page5 = () => import('./chunks/tienda_7NoOqsNW.mjs');
const _page6 = () => import('./chunks/index_DK_gcZ1z.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/auth-astro/src/api/[...auth].ts", _page1],
    ["src/pages/404.astro", _page2],
    ["src/pages/profile.astro", _page3],
    ["src/pages/shop.astro", _page4],
    ["src/pages/tienda.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "7274e50c-fc6a-4051-badc-beefdaf964fe"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
