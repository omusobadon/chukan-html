// script.js
const ms_font_lis = [
    { href: './docs/ms-mincho.html', text: 'MS明朝フォント' },
    // 他のリンクも同様に追加
  ];


const aneki_font_lis = [
    { href: './docs/Zenkurenaido.html', text: 'Zenkurenaidoフォント' },
    { href: './docs/KleeOne.html', text: 'KleeOneフォント' },
    // 他のリンクも同様に追加
  ];
  
  function createLink(href, text) {
    return `<a href="${href}" target="contentFrame" class="list-group-item list-group-item-action mx-3">${text}</a>`;
  }
  
  function addLinksToContainer(containerId, links) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = links.map(link => createLink(link.href, link.text)).join('');
    }
  }
  