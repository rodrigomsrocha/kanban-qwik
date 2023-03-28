import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./styles/global.css";
import "@phosphor-icons/web/regular";
import { ProjectContextProvider } from "./contexts/ProjectContext";

export default component$(() => {
  return (
    <ProjectContextProvider>
      <QwikCityProvider>
        <head>
          <meta charSet="utf-8" />
          <RouterHead />
        </head>
        <body class="bg-[#1d1e22]" lang="en">
          <RouterOutlet />
          <ServiceWorkerRegister />
        </body>
      </QwikCityProvider>
    </ProjectContextProvider>
  );
});
