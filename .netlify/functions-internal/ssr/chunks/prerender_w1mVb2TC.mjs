/* empty css                         */
import { e as createComponent, r as renderTemplate, g as addAttribute, h as createAstro, s as spreadAttributes, u as unescapeHTML, i as renderComponent, m as maybeRenderHead, j as Fragment, k as renderHead, l as renderTransition, n as renderSlot } from './astro_CMQAdMmn.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */
import { getIconData, iconToSVG } from '@iconify/utils';
/* empty css                         */
import { jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

const $$Astro$f = createAstro();
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$e = createAstro();
const $$OpenGraphArticleTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro", void 0);

const $$Astro$d = createAstro();
const $$OpenGraphBasicTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}><meta property="og:type"${addAttribute(openGraph.basic.type, "content")}><meta property="og:image"${addAttribute(openGraph.basic.image, "content")}><meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro", void 0);

const $$Astro$c = createAstro();
const $$OpenGraphImageTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}${height ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}${alt ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/node_modules/astro-seo/src/components/OpenGraphImageTags.astro", void 0);

const $$Astro$b = createAstro();
const $$OpenGraphOptionalTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro", void 0);

const $$Astro$a = createAstro();
const $$ExtendedTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}${props.extend.meta?.map(({ content, httpEquiv, media, name, property }) => renderTemplate`<meta${addAttribute(name, "name")}${addAttribute(property, "property")}${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(media, "media")}>`)}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/node_modules/astro-seo/src/components/ExtendedTags.astro", void 0);

const $$Astro$9 = createAstro();
const $$TwitterTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/node_modules/astro-seo/src/components/TwitterTags.astro", void 0);

const $$Astro$8 = createAstro();
const $$LanguageAlternatesTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro", void 0);

const $$Astro$7 = createAstro();
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || (props.openGraph.basic.title ?? void 0) == void 0 || (props.openGraph.basic.type ?? void 0) == void 0 || (props.openGraph.basic.image ?? void 0) == void 0) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is strongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}<link rel="canonical"${addAttribute(Astro2.props.canonical || Astro2.url.href, "href")}>${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/node_modules/astro-seo/src/SEO.astro", void 0);

const $$Seo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "SEO", $$SEO, { "title": "Peluquer\xEDa Imagen", "description": "Academia de peluquer\xEDa y est\xE9tica. Aprende las \xFAltimas tendencias en cortes de pelo, peinados y tratamientos de belleza. Cursos y formaci\xF3n profesional para convertirte en un experto en el mundo de la belleza.", "openGraph": {
    basic: {
      title: "Peluquer\xEDa Imagen",
      type: "A type.",
      image: "https://user-images.githubusercontent.com/5182256/131216951-8f74f425-f775-463d-a11b-0e01ad9fce8d.png"
    }
  }, "twitter": {
    creator: "@jonasmerlins1"
  }, "extend": {
    // extending the default link tags
    link: [{ rel: "icon", href: "/assets/icons/favicon/photo_1" }],
    // extending the default meta tags
    meta: [
      {
        name: "twitter:image",
        content: "https://user-images.githubusercontent.com/5182256/131216951-8f74f425-f775-463d-a11b-0e01ad9fce8d.png"
      },
      { name: "twitter:title", content: "Tinker Tailor Soldier Spy" },
      { name: "twitter:description", content: "Agent" }
    ]
  } })}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/layouts/SEO/Seo.astro", void 0);


const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$6 = createAstro();
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
    }
  }
  const req = Astro2.request;
  const { name = "", title, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "xlink:href")}></use> ` })}`} </svg>`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Astro$5 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-5ql2mvdm> <h3 class="header-text-logo" data-astro-cid-5ql2mvdm>Imagen</h3> <!-- <Headernav fields={['Inicio','Peluqueria','Tienda','Sobre','FAQ']}/> --> <div class="flex" data-astro-cid-5ql2mvdm> <div class="flex" data-astro-cid-5ql2mvdm> <button id="login" data-astro-cid-5ql2mvdm>Login</button> <button id="logout" data-astro-cid-5ql2mvdm>Logout</button> </div> <a href="/profile" data-astro-cid-5ql2mvdm> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:account", "size": 22, "class": "mx-3", "data-astro-cid-5ql2mvdm": true })} </a> <a href="#" data-astro-cid-5ql2mvdm> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:menu", "size": 22, "data-astro-cid-5ql2mvdm": true })} </a> </div> </header>  `;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/sections/Header.astro", void 0);

/** @returns {void} */

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;

/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 * @param {unknown} value
 * @returns {string}
 */
function escape(value, is_attr = false) {
	const str = String(value);
	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;
	let escaped = '';
	let last = 0;
	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}
	return escaped + str.substring(last);
}

let on_destroy;

/** @returns {{ render: (props?: {}, { $$slots, context }?: { $$slots?: {}; context?: Map<any, any>; }) => { html: any; css: { code: string; map: any; }; head: string; }; $$render: (result: any, props: any, bindings: any, slots: any, context: any) => any; }} */
function create_ssr_component(fn) {
	function $$render(result, props, bindings, slots, context) {
		const parent_component = current_component;
		const $$ = {
			on_destroy,
			context: new Map(context || (parent_component ? parent_component.$$.context : [])),
			// these will be immediately discarded
			on_mount: [],
			before_update: [],
			after_update: [],
			callbacks: blank_object()
		};
		set_current_component({ $$ });
		const html = fn(result, props, bindings, slots);
		set_current_component(parent_component);
		return html;
	}
	return {
		render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
			on_destroy = [];
			const result = { title: '', head: '', css: new Set() };
			const html = $$render(result, props, {}, $$slots, context);
			run_all(on_destroy);
			return {
				html,
				css: {
					code: Array.from(result.css)
						.map((css) => css.code)
						.join('\n'),
					map: null // TODO
				},
				head: result.title + result.head
			};
		},
		$$render
	};
}

/* C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/components/getdate.svelte generated by Svelte v4.2.15 */

const Getdate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { field } = $$props;
	const now = new Date();
	const time = now.toLocaleTimeString();
	const year = now.getFullYear();
	const month = now.getMonth() + 1; // Los meses en JavaScript empiezan en 0
	const day = now.getDate();
	let displayField;

	switch (field) {
		case 'Time':
			displayField = time;
			break;
		case 'Year':
			displayField = year;
			break;
		case 'Month':
			displayField = month;
			break;
		case 'Day':
			displayField = day;
			break;
		default:
			displayField = 'Field not recognized';
	}

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	return `${escape(displayField)}`;
});

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const cr = "all rights reserved";
  return renderTemplate`${maybeRenderHead()}<footer> <div class="container"> <div class="row"> <div class="col-md-12"> <p class="italic">&copy; ${cr}, ${renderComponent($$result, "CurrentDate", Getdate, { "client:idle": true, "field": "Year", "client:component-hydration": "idle", "client:component-path": "@/components/getdate.svelte", "client:component-export": "default" })}</p> </div> </div> </div> </footer>`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/sections/Footer.astro", void 0);

const $$Astro$4 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, slider } = Astro2.props;
  return renderTemplate`<html lang="es" data-astro-cid-sckkx6r4> <head>${renderComponent($$result, "Seo", $$Seo, { "data-astro-cid-sckkx6r4": true })}<meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png" href="/icons/favicon/photo_1.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body data-astro-cid-sckkx6r4> <div id="App" class="relative h-screen p-2 gap-2" data-astro-cid-sckkx6r4> <!-- grid actúa como container --> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-sckkx6r4": true })} <main class="[grid-area:main]" data-astro-cid-sckkx6r4${addAttribute(renderTransition($$result, "2ufxhwun"), "data-astro-transition-scope")}> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "class": "[grid-area:footer]", "data-astro-cid-sckkx6r4": true })} </div>   </body></html>`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/layouts/Layout.astro", "self");

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Página no encontrada</h1> <p>Lo sentimos, la página que estás buscando no existe.</p> ` })}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/404.astro", void 0);

const $$file$4 = "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/404.astro";
const $$url$4 = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file$4,
	url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Profile = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/profile.astro", void 0);

const $$file$3 = "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/profile.astro";
const $$url$3 = "/profile";

const profile = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Profile,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Shop = createComponent(async ($$result, $$props, $$slots) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const response = await fetch(`${"https://tfggestoracademia.local/graphql"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
          query PageQuery {
              nodeByUri(uri: "http://tfgwpacademia.local/sample-page/") {
                  ... on Page {
                  id
                  blocks
                  }
              }
          }`
    })
  });
  const { data } = await response.json();
  console.log(data.nodeByUri);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "tienda" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <!-- Aquí puedes agregar el contenido principal de tu página de peluquería --> <h1>Bienvenido a nuestra peluquería</h1> <p>
¡Ofrecemos una amplia gama de servicios de peluquería para hombres y
        mujeres!
</p> <!-- Agrega más contenido aquí --> </div> ` })}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/shop.astro", void 0);
const $$file$2 = "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/shop.astro";
const $$url$2 = "/shop";

const shop = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Shop,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Tienda = createComponent(async ($$result, $$props, $$slots) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const response = await fetch(`${"https://tfggestoracademia.local/graphql"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
          query PageQuery {
              nodeByUri(uri: "http://tfgwpacademia.local/sample-page/") {
                  ... on Page {
                  id
                  blocks
                  }
              }
          }`
    })
  });
  const { data } = await response.json();
  console.log(data.nodeByUri);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "tienda" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <!-- Aquí puedes agregar el contenido principal de tu página de peluquería --> <h1>Bienvenido a nuestra peluquería</h1> <p>
¡Ofrecemos una amplia gama de servicios de peluquería para hombres y
        mujeres!
</p> <!-- Agrega más contenido aquí --> </div> ` })}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/tienda.astro", void 0);
const $$file$1 = "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/tienda.astro";
const $$url$1 = "/tienda";

const tienda = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Tienda,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Slider = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-wc3ihiqi> <div class="section-div-color" data-astro-cid-wc3ihiqi></div> <div class="section-div-contenido" data-astro-cid-wc3ihiqi> <h1 class="header-text-promoTitle" data-astro-cid-wc3ihiqi>
Imagen <i data-astro-cid-wc3ihiqi>Estética</i> <br data-astro-cid-wc3ihiqi> <i data-astro-cid-wc3ihiqi>Practica</i> Fórmate
<br data-astro-cid-wc3ihiqi>
Emprende <i data-astro-cid-wc3ihiqi>Aprende</i> </h1> </div> </section> `;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/sections/Slider.astro", void 0);

const $$Astro$3 = createAstro();
const $$ButtonAnimatedPromo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ButtonAnimatedPromo;
  const { href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex align-middle justify-center container" data-astro-cid-frlptmdm> <a${addAttribute(href, "href")} data-astro-cid-frlptmdm> <div class="flex justify-center" data-astro-cid-frlptmdm> <!-- <Esphera class="animate_vertical animated_entity"/>
            <Esphera class="animate_vertical animated_entity mx-4"/>
            <Esphera class="animate_vertical animated_entity"/> --> </div> </a> </div> `;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/components/buttons/Button_animated_promo.astro", void 0);

const $$SectionPlans = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="w-full bg-current colored-bg flex justify-evenly p-10" data-astro-cid-ayg7mvmt> ${renderComponent($$result, "Button_animated_promo", $$ButtonAnimatedPromo, { "href": "#", "data-astro-cid-ayg7mvmt": true })} ${renderComponent($$result, "Button_animated_promo", $$ButtonAnimatedPromo, { "href": "#", "data-astro-cid-ayg7mvmt": true })} ${renderComponent($$result, "Button_animated_promo", $$ButtonAnimatedPromo, { "href": "#", "data-astro-cid-ayg7mvmt": true })} </section> `;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/sections/Section_plans.astro", void 0);

const $$Astro$2 = createAstro();
const $$AnimatedMainDiv = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AnimatedMainDiv;
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`container ${className}`, "class")}${addAttribute(Number, "data-initial-zoom")}${spreadAttributes(rest)} data-astro-cid-lhjlwtvi> <div${addAttribute(`zoomDiv-${Date.now()}`, "id")} class="big-div" data-astro-cid-lhjlwtvi> ${renderSlot($$result, $$slots["default"])} </div> </div>  `;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/components/Animated_main_div.astro", void 0);

const $$Main = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="container" data-astro-cid-ivdev4kk> ${renderSlot($$result, $$slots["default"])} </div> `;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/components/Main.astro", void 0);

const Div_images = ({ images }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1e3);
    return () => clearInterval(interval);
  }, [images]);
  return /* @__PURE__ */ jsx("div", { className: "image-container", children: /* @__PURE__ */ jsx("img", { src: images[index], alt: "Imagen", className: "image" }) });
};

const $$Astro$1 = createAstro();
const $$DivImages = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$DivImages;
  let images = Astro2.props.images;
  return renderTemplate`${renderComponent($$result, "Div_images", Div_images, { "images": images, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/components/Div_images/Div_images", "client:component-export": "default" })}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/components/Div_images.astro", void 0);

const $$Astro = createAstro();
const $$ButtonSuggestion = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ButtonSuggestion;
  const { texto, href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<astro:button data-astro-cid-y6muprki>  ${renderTemplate`<a${addAttribute(href, "href")} data-astro-cid-y6muprki> <button data-astro-cid-y6muprki><p class="font-normal" data-astro-cid-y6muprki>${texto}</p></button> </a>`} </astro:button>`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/components/buttons/Button_suggestion.astro", void 0);

const promos = [
	{
		title: "IMAGY",
		subtitle: "Descuento del 50%",
		description: "¡Aprovecha esta oferta única y obtén un descuento del 50% en todos nuestros cursos de peluquería y estética!",
		hrefImage: "/img/promotional/photo_1.jpg"
	},
	{
		title: "Curso intensivo de peinados",
		subtitle: "Aprende las últimas tendencias",
		description: "Descubre las técnicas más innovadoras en peinados y conviértete en un experto en el mundo de la peluquería.",
		hrefImage: "/img/promotional/photo_2.jpg"
	},
	{
		title: "Especialización en maquillaje",
		subtitle: "Potencia tu talento",
		description: "Conviértete en un profesional del maquillaje y aprende las técnicas más avanzadas para resaltar la belleza de tus clientes.",
		hrefImage: "/img/promotional/photo_3.jpg"
	},
	{
		title: "Curso de uñas acrílicas",
		subtitle: "Crea diseños únicos",
		description: "Aprende a realizar increíbles diseños de uñas acrílicas y conviértete en un experto en el arte de la manicura.",
		hrefImage: "/img/promotional/photo_4.jpg"
	}
];
const main_promo = {
	promos: promos
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const hrefImages = main_promo.promos.map(
    (item) => item.hrefImage
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Slider", $$Slider, {})} ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Animated_main_div", $$AnimatedMainDiv, { "class": "mt-40 grid-cols-2" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="w-1/2 text-left p-3"> <h1 class="main-text-promoTitle pb-4">APÚNTATE A NUESTROS CURSOS</h1> ${renderComponent($$result4, "Button_suggestion", $$ButtonSuggestion, { "texto": "INF\xD3RMATE", "href": "/cursos" })} </div> <div class="w-1/2"> ${renderComponent($$result4, "Div_images", $$DivImages, { "images": hrefImages })} </div> ` })} ${renderComponent($$result3, "Animated_main_div", $$AnimatedMainDiv, { "class": "mt-40" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Section_plans", $$SectionPlans, {})} ` })} ${renderComponent($$result3, "Animated_main_div", $$AnimatedMainDiv, { "class": "mt-40" }, { "default": ($$result4) => renderTemplate` <h1 class="main-text-promoTitle pb-4 text-center">
CIENTOS DE PERSONAS ACUDEN A NUESTRA ACADEMIA A DIARIO , EDUCACIÓN
        PROFESIONAL Y PERSONALIZADA A TU ALCANCE. VARIEDAD DE CURSOS DE
        ESTÉTICA, PELUQUERÍA, MAQUILLAJE Y UÑAS.
</h1> ` })} ${renderComponent($$result3, "Main", $$Main, {})} ` })} ` })}`;
}, "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/index.astro", void 0);

const $$file = "C:/Users/vvaldes/Documents/VisualStudioCode/TFC_gestor_academia/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _404 as _, index as i, profile as p, shop as s, tienda as t };