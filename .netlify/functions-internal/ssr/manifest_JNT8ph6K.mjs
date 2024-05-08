import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import './chunks/astro_CMQAdMmn.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"profile/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/profile","isIndex":false,"type":"page","pattern":"^\\/profile\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profile.astro","pathname":"/profile","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"shop/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/shop","isIndex":false,"type":"page","pattern":"^\\/shop\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/shop.astro","pathname":"/shop","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"tienda/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tienda","isIndex":false,"type":"page","pattern":"^\\/tienda\\/?$","segments":[[{"content":"tienda","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tienda.astro","pathname":"/tienda","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/auth/[...auth]","pattern":"^\\/api\\/auth(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"...auth","dynamic":true,"spread":true}]],"params":["...auth"],"component":"node_modules/auth-astro/src/api/[...auth].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"redirect","isIndex":false,"route":"/home","pattern":"^\\/home\\/?$","segments":[[{"content":"home","dynamic":false,"spread":false}]],"params":[],"component":"/home","pathname":"/home","prerender":false,"redirect":"/","redirectRoute":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}},"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/shop.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/tienda.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/shop@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tienda@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/auth-astro/src/api/[...auth].ts":"chunks/pages/__D5fvUDIh.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_CKExC-xU.mjs","\u0000@astrojs-manifest":"manifest_JNT8ph6K.mjs","C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DHi_PKVw.mjs","\u0000@astro-page:node_modules/auth-astro/src/api/[...auth]@_@ts":"chunks/_.._COslboAF.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_DvS0HuQu.mjs","\u0000@astro-page:src/pages/profile@_@astro":"chunks/profile_C1VXITY0.mjs","\u0000@astro-page:src/pages/shop@_@astro":"chunks/shop_7v5yPJrL.mjs","\u0000@astro-page:src/pages/tienda@_@astro":"chunks/tienda_7NoOqsNW.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_DK_gcZ1z.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BvFqrGpp.js","C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/components/Div_images/Div_images":"_astro/Div_images.DMczAisw.js","@astrojs/svelte/client.js":"_astro/client.Cx1FBVJX.js","@/components/getdate.svelte":"_astro/getdate.Czy_A7Uo.js","/astro/hoisted.js?q=1":"_astro/hoisted.B8e_A8KY.js","@astrojs/react/client.js":"_astro/client.J7s0XX1m.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.vYOeKZWo.css","/_astro/client.Cx1FBVJX.js","/_astro/client.J7s0XX1m.js","/_astro/Div_images.DMczAisw.js","/_astro/getdate.Czy_A7Uo.js","/_astro/hoisted.B8e_A8KY.js","/_astro/hoisted.BvFqrGpp.js","/_astro/index.BPlZYgCX.css","/_astro/index.DhYZZe0J.js","/fonts/Julius/JuliusSansOne-Regular.ttf","/fonts/Floelly/floelly-italic.otf","/fonts/Floelly/floelly.otf","/fonts/Roboto/Roboto-Black.ttf","/fonts/Roboto/Roboto-BlackItalic.ttf","/fonts/Roboto/Roboto-Bold.ttf","/fonts/Roboto/Roboto-BoldItalic.ttf","/fonts/Roboto/Roboto-Italic.ttf","/fonts/Roboto/Roboto-Light.ttf","/fonts/Roboto/Roboto-LightItalic.ttf","/fonts/Roboto/Roboto-Medium.ttf","/fonts/Roboto/Roboto-MediumItalic.ttf","/fonts/Roboto/Roboto-Regular.ttf","/fonts/Roboto/Roboto-Thin.ttf","/fonts/Roboto/Roboto-ThinItalic.ttf","/icons/favicon/Corte de pelo - Iconos gratis de moda.url","/icons/favicon/favicon.svg","/icons/favicon/photo_1.png","/icons/favicon/photo_2.png","/icons/favicon/photo_3.png","/icons/favicon/photo_4.png","/icons/favicon/renombrado.bat","/icons/favicon/Tinte para el cabello - Iconos gratis de moda.url","/img/promotional/photo_1.jpg","/img/promotional/photo_2.jpg","/img/promotional/photo_3.jpg","/img/promotional/photo_4.jpg","/img/promotional/renombrado.bat","/404.html","/profile/index.html","/shop/index.html","/tienda/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false});

export { manifest };
