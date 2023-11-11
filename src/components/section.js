//section.js
const allMenuItems = [
  {
    container: "ms-menu",
    href: "#ms-ctr",
    text: "MSフォント",
    controls: "ms-ctr",
  },
  {
    container: "aneki-menu",
    href: "#aneki-ctr",
    text: "Anekiフォント",
    controls: "aneki-ctr",
  },
  // 他のメニューアイテムも同様に追加
];

function createMenuItem(href, text, controls) {
  return `
  <a href="${href}" class="list-group-item list-group-item-action fs-5" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${controls}">
  ${text}
  <i class="fas fa-chevron-down float-end"></i>
</a>

    `;
}

function addMenuItemsToContainers(allMenuItems) {
  allMenuItems.forEach((item) => {
    const container = document.getElementById(item.container);
    if (container) {
      const menuItemHtml = createMenuItem(item.href, item.text, item.controls);
      container.innerHTML += menuItemHtml;
    }
  });
}
