import { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";

const helmetContext = { helmet: {} as HelmetServerState };

export const generateStaticPage = (Page: ReactNode) => {
  const Jsx = () => <HelmetProvider context={helmetContext}>{Page}</HelmetProvider>;

  const html = renderToString(<Jsx />);

  const helmet = helmetContext.helmet || {};

  const finalHtml = `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes ? helmet.htmlAttributes.toString() : "ja"}>
  <head>
    ${helmet.title ? helmet.title.toString() : ""}
    ${helmet.meta ? helmet.meta.toString() : ""}
    ${helmet.link ? helmet.link.toString() : ""}
    ${helmet.script ? helmet.script.toString() : ""}
  </head>
  <body>
    ${html}
  </body>
  </html>
  `;

  return finalHtml;
};
