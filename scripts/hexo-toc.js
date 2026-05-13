/* globals hexo */

'use strict';

const assign = require('object-assign');
const cheerio = require('cheerio');
const toc = require('markdown-toc');

function loadSlugify(name) {
  if (name === 'transliteration') {
    return require('transliteration').slugify;
  }

  return require('uslug');
}

const config = hexo.config.toc || {};
hexo.config.toc = assign({}, config, {
  slugify: loadSlugify(config.slugify)
});

hexo.extend.filter.register('before_post_render', function insertToc(data) {
  const options = assign({}, this.config.toc);

  if (options.class) {
    data.content = data.content.replace(
      '<!-- toc -->',
      `<div class="${options.class}Start"></div><!-- toc --><div class="${options.class}End"></div>`
    );
  }

  data.content = toc.insert(data.content, options);
  return data;
});

hexo.extend.filter.register('after_post_render', function addHeadingAnchors(data) {
  const options = assign({}, this.config.toc);
  const $ = cheerio.load(data.content, {
    decodeEntities: options.decodeEntities !== undefined ? options.decodeEntities : false
  });

  $('h1, h2, h3, h4, h5, h6').each(function addAnchor() {
    const $title = $(this);
    const id = toc.slugify($title.text(), options);

    $title.attr('id', id);

    if (options.anchor) {
      const anchorOpts = assign({
        position: 'after',
        symbol: '#',
        style: 'header-anchor'
      }, options.anchor);
      const link = `<a href="#${id}" class="${anchorOpts.style}">${anchorOpts.symbol}</a>`;

      if (anchorOpts.position === 'before') {
        $title.prepend(link);
      } else {
        $title.append(link);
      }
    }
  });

  data.content = $.html();

  if (options.class) {
    data.content = data.content
      .replace(`<div class="${options.class}Start"></div>`, `<div class="${options.class}">`)
      .replace(`<div class="${options.class}End"></div>`, '</div>');
  }

  return data;
});
