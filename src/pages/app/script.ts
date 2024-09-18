import { createRoot } from "react-dom/client";
import { App } from "~/components/App";

const initApp = () => {
  const rootElement = document.getElementById("app");

  if (!rootElement) {
    throw new Error("Failed to find the root element");
  }

  const root = createRoot(rootElement);
  root.render(App());
};

document.addEventListener("DOMContentLoaded", initApp);
