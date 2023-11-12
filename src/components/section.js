class MenuItem {
  constructor(href, text, controls, isSubItem = false, container) {
    this.href = href;
    this.text = text;
    this.controls = controls;
    this.isSubItem = isSubItem;
    this.container = container; // コンテナ ID を保存
  }


  toHTML() {
    const menuItemClass = this.isSubItem ? "list-group-item list-group-item-action mx-3" : "list-group-item list-group-item-action fs-5";
    return `
      <a href="${this.href}" class="${menuItemClass}" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${this.controls}">
        ${this.text}
        <i class="fas fa-chevron-down float-end"></i>
      </a>`;
  }
}

class MenuManager {
  constructor(menuItems) {
    this.menuItems = menuItems.map(item => {
      // SubContainer か container のどちらかを使用する
      const isSubItem = !!item.SubContainer;
      const container = isSubItem ? item.SubContainer : item.container;

      return new MenuItem(item.href, item.text, item.controls, isSubItem, container);
    });
  }
  addMenuItemsToContainers() {
    this.menuItems.forEach(item => {
      const container = document.getElementById(item.container);
      if (container) {
        container.innerHTML += item.toHTML();
      } else {
        console.error('Container not found for ID:', item.container);
      }
    });
  }
  
}

// 既

// 以下は section.js の内容
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
  {
    SubContainer: "ms-Submenu",
    href: "#ms-Subctr",
    text: "Sub-フォント",
    controls: "ms-Subctr",
  },
  // 他のメニューアイテムも同様に追加
];