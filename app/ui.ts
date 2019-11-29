import document from "document";

export const loadUI = (viewName: string) =>
  document.replaceSync(`./resources/views/${viewName}.gui`);
