import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/components.css";

/**
 * HashRouter keeps every route inside the URL fragment (/portfolio/#/about),
 * so GitHub Pages never has to resolve a path it does not have a file for.
 * That makes deep links and refreshes work without any server rewrite.
 *
 * To switch to clean URLs (/portfolio/about) instead, swap this for
 * `<BrowserRouter basename={import.meta.env.BASE_URL}>`. The 404.html emitted
 * by vite.config.js is what makes that work on Pages.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
