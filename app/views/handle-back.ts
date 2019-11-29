import document from "document";

export default (onBack: () => void) => {
  document.onkeypress = e => {
    if (e.key === "back") {
      onBack();
      e.preventDefault();
    }
  };
};
