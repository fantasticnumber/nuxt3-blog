import type { HeaderTabUrl, ItemBase } from "./types";

/**
 * 生成唯一id
 */
let uniqueId = 0;
export function getUniqueId(): typeof uniqueId {
  return uniqueId++;
}

/**
 * 创建一个新item
 */
export function createNewItem(url: HeaderTabUrl) {
  const baseInfo: ItemBase = {
    id: 0,
    time: 0,
    modifyTime: 0,
    _show: true,
    _visitors: 0,
    showComments: false,
    encrypt: false
  };
  switch (url) {
    case "/articles":
      return {
        title: "",
        len: 0,
        tags: [],
        ...baseInfo
      };
    case "/records":
      return {
        images: [],
        ...baseInfo
      };
    case "/knowledges":
      return {
        title: "",
        summary: "",
        link: "",
        cover: "",
        type: "book",
        ...baseInfo
      };
  }
}

export function escapeHtml(s: string) {
  return s.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// 用在两个地方：提交时，获取时
export function escapeNewLine(s: string) {
  return s.replace(/\r\n/g, "\n");
}

export function toggleCodeBlockTheme(theme?: string) {
  const html = document.documentElement;
  theme = theme || (html.getAttribute("code-theme") === "light" ? "dark" : "light");
  html.setAttribute("code-theme", theme);
  localStorage.setItem("code-theme", theme);
}
