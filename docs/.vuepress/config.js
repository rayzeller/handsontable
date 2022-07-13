const path = require('path');
const stylusNodes = require('stylus/lib/nodes');
const highlight = require('./highlight');
const examples = require('./containers/examples');
const sourceCodeLink = require('./containers/sourceCodeLink');
const nginxRedirectsPlugin = require('./plugins/generate-nginx-redirects');
const nginxVariablesPlugin = require('./plugins/generate-nginx-variables');
const extendPageDataPlugin = require('./plugins/extend-page-data');
const dumpDocsDataPlugin = require('./plugins/dump-docs-data');
const { getThisDocsVersion, getDocsBaseUrl } = require('./helpers');

const docsBase = process.env.DOCS_BASE ? process.env.DOCS_BASE : getThisDocsVersion();
const buildMode = process.env.BUILD_MODE;
const isProduction = buildMode === 'production';
const environmentHead = isProduction ?
  [
    // Google Tag Manager, an extra element within the `ssr.html` file.
    ['script', {}, `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-55L5D3');
    `],
  ]
  : [];

module.exports = {
  define: {
    GA_ID: 'UA-33932793-7',
  },
  patterns: [
    'content/**/*.md'
  ],
  description: 'Handsontable',
  base: `/docs/${docsBase === 'latest' ? '' : `${docsBase}/`}`,
  head: [
    ['link', {
      rel: 'icon',
      href: `${getDocsBaseUrl()}/static/images/template/ModCommon/favicon-32x32.png`
    }],
    ['link', {
      rel: 'preload',
      href: isProduction ? `${getDocsBaseUrl()}/docs/data/common.json` : '/data/common.json',
      as: 'fetch',
      crossorigin: ''
    }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    // Cookiebot - cookie consent popup
    ['script', {
      id: 'Cookiebot',
      src: 'https://consent.cookiebot.com/uc.js',
      'data-cbid': 'ef171f1d-a288-433f-b680-3cdbdebd5646'
    }],
    ...environmentHead
  ],
  markdown: {
    toc: {
      includeLevel: [2, 3],
      containerHeaderHtml: '<div class="toc-container-header">Table of contents</div>'
    },
    externalLinks: {
      target: '_blank',
      rel: 'nofollow noopener noreferrer'
    },
  },
  stylus: {
    preferPathResolver: 'webpack',
    define: {
      versionedUrl: (expression) => {
        return new stylusNodes
          .Literal(`url("${expression.string.replace('{docsVersion}', getThisDocsVersion())}")`);
      },
    }
  },
  plugins: [
    extendPageDataPlugin,
    'tabs',
    ['sitemap', {
      hostname: getDocsBaseUrl(),
      exclude: ['/404.html']
    }],
    ['@vuepress/active-header-links', {
      sidebarLinkSelector: '.table-of-contents a',
      headerAnchorSelector: '.header-anchor'
    }],
    ['container', examples(getThisDocsVersion())],
    ['container', sourceCodeLink],
    {
      extendMarkdown(md) {
        const imageOrig = md.renderer.rules.image;

        // Add support for markdown images and links to have ability to substitute the
        // docs latest version variable to the "src" or "href" attributes.
        md.renderer.rules.image = function(tokens, ...rest) {
          tokens.forEach((token) => {
            token.attrs.forEach(([name, value], index) => {
              if (name === 'src') {
                token.attrs[index][1] = (
                  decodeURIComponent(value).replace('{{$page.currentVersion}}', getThisDocsVersion())
                );
              }
            });
          });

          return imageOrig.apply(this, [tokens, ...rest]);
        };

        const linkOrig = md.renderer.rules.link_open;

        md.renderer.rules.link_open = function(tokens, ...rest) {
          tokens.forEach((token) => {
            if (token.type !== 'link_open') {
              return;
            }

            token.attrs.forEach(([name, value], index) => {
              if (name === 'href') {
                token.attrs[index][1] = (
                  decodeURIComponent(value).replace('{{$page.currentVersion}}', getThisDocsVersion())
                );
              }
            });
          });

          return linkOrig.apply(this, [tokens, ...rest]);
        };

        const render = function(tokens, options, env) {
          let i; let type;
          let result = '';
          const rules = this.rules;

          for (i = 0; i < tokens.length; i++) { // overwritten here
            type = tokens[i].type;

            if (type === 'inline') {
              result += this.renderInline(tokens[i].children, options, env);
            } else if (typeof rules[type] !== 'undefined') {
              result += rules[tokens[i].type](tokens, i, options, env, this, getThisDocsVersion());
            } else {
              result += this.renderToken(tokens, i, options, env);
            }
          }

          return result;
        };

        // overwrite markdown `render` function to allow extending tokens array (remove caching before loop).
        md.renderer.render = (tokens, options, env) => render.call(md.renderer, tokens, options, env);
      },
      chainMarkdown(config) {
        // inject custom markdown highlight with our snippet runner
        config
          .options
          .highlight(highlight)
          .end();
      },
      chainWebpack: (config) => {
        config.module
          .rule('md')
          .test(/\.md$/)
          .use(path.resolve(__dirname, 'docs-links'))
          .loader(path.resolve(__dirname, 'docs-links'))
          .end();
      },
    },
    [dumpDocsDataPlugin, {
      outputDir: path.resolve(__dirname, './public/data/')
    }],
    [nginxRedirectsPlugin, {
      outputFile: path.resolve(__dirname, '../docker/redirects-autogenerated.conf')
    }],
    [nginxVariablesPlugin, {
      outputFile: path.resolve(__dirname, '../docker/variables.conf')
    }]
  ],
  themeConfig: {
    nextLinks: true,
    prevLinks: true,
    repo: 'handsontable/handsontable',
    docsRepo: 'handsontable/handsontable',
    docsDir: 'docs',
    docsBranch: 'develop',
    editLinks: true,
    editLinkText: 'Suggest edits',
    lastUpdated: true,
    smoothScroll: false,
    nav: [
      // Guide & API Reference has defined in: theme/components/NavLinks.vue
      { text: 'GitHub', link: 'https://github.com/handsontable/handsontable' },
      { text: 'Blog', link: 'https://handsontable.com/blog' },
      { text: 'Support',
        items: [
          { text: 'Contact support', link: 'https://handsontable.com/contact?category=technical_support' },
          { text: 'Report an issue', link: 'https://github.com/handsontable/handsontable/issues/new/choose' },
          { text: 'Forum', link: 'https://forum.handsontable.com' },
        ]
      },
    ],
    displayAllHeaders: true, // collapse other pages
    activeHeaderLinks: true,
    sidebarDepth: 0,
    search: true,
    searchOptions: {
      placeholder: 'Search...',
      guidesMaxSuggestions: 5,
      apiMaxSuggestions: 10,
      fuzzySearchDomains: ['Core', 'Hooks', 'Options'],
      // The list modifies the search results position. When the search phrase matches the pages
      // below, the search suggestions are placed before the rest results. The pages declared in
      // the array at the beginning have the highest display priority.
      apiSearchDomainPriorityList: ['Options'],
      guidesSearchDomainPriorityList: [],
    }
  }
};
