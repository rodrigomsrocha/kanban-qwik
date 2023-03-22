import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ProjectItem } from "~/components/ProjectItem";

export default component$(() => {
  return (
    <div class="max-w-4xl px-8 mx-auto flex flex-col justify-center min-h-screen">
      <div>
        <header class="flex justify-between text-gray-200 items-center mb-8">
          <h1 class="text-3xl">My projects</h1>
          <button class="bg-[#8177fe] px-4 py-2 rounded-md flex gap-2 items-center text-lg transition-opacity hover:opacity-80">
            <i class="text-xl ph ph-plus"></i>
            New Project
          </button>
        </header>
        <div class="w-full bg-[#242529] rounded-md">
          <ul class="gap-4 flex-wrap p-6 grid grid-cols-4 grid-rows-3">
            <ProjectItem />
            <ProjectItem />
            <ProjectItem />
            <ProjectItem />
            <ProjectItem />
          </ul>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Home",
};
