import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <h1 class="text-3xl text-purple-500 decoration-wavy">hello world</h1>;
});

export const head: DocumentHead = {
  title: "Home",
};
