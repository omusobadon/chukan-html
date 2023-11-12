// script.js
//MSフォントのリンク
class FontLink {
  constructor(href, text, sub = false) {
    this.href = href;
    this.text = text;
    this.sub = sub;
  }

  static createSubLinks(links) {
    return links.map(link => new FontLink(link.href, link.text, true));
  }
}

//--------------------メニューのアイテム-----------------------
const ms_font_lis = [
  new FontLink('ms-mincho.html', 'MS明朝フォント'),
  // 他のリンクも同様に追加
];

const aneki_font_lis = [
  new FontLink('KleeOne.html', 'AnekiKleeOneフォント'),
  new FontLink('Zenkurenaido.html', 'AnekiKurenaidoフォント'),
    // 他のリンクも同様に追加
  ];

//--------------------サブメニューのアイテム--------------------
// MSサブフォントのリンク
const rawSubMsFonts = [
  new FontLink('subfont.html', 'MSゴシックフォント'),
];
const sub_ms_font_lis = FontLink.createSubLinks(rawSubMsFonts);


  
  function createLink(href, text, sub) {
    const mxValue = sub ? 'mx-5' : 'mx-3'; // サブリンクの場合は mx-1、そうでなければ mx-3
    return `<a href="./docs/${href}" target="contentFrame" class="list-group-item list-group-item-action text-decoration-underline ${mxValue}">${text}</a>`;
  }
  
  function addLinksToContainer(containerId, links) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = links.map(link => createLink(link.href, link.text, link.sub)).join('');
    }
  }