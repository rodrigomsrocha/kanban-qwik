import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ProjectItem } from "~/components/ProjectItem";
import { CreateProjectModal } from "~/integrations/react/CreateProjectModal";

export default component$(() => {
  return (
    <div>
      <header class="flex justify-between text-gray-200 items-center mb-8">
        <h1 class="text-3xl">My projects</h1>
        <CreateProjectModal client:visible />
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
  );
});

export const head: DocumentHead = {
  title: "My projects",
};
