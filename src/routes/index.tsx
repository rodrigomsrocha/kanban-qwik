import { $, component$, useStore, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ProjectItem } from "~/components/ProjectItem";
import { CreateProjectModal } from "~/integrations/react/CreateProjectModal";
import { api } from "~/lib/axios";
import type { Project } from "~/types/project";

export default component$(() => {
  const projects = useStore<{ data: Project[] }>({ data: [] });

  useTask$(async () => {
    const { data } = await api.get("/projects");
    projects.data = data;
  });

  const updateProjectsArray = $((project: Project) => {
    projects.data = [...projects.data, project];
  });

  return (
    <div>
      <header class="flex justify-between text-gray-200 items-center mb-8">
        <h1 class="text-3xl">My projects</h1>
        <CreateProjectModal
          updateProjectsArray={updateProjectsArray}
          client:visible
        />
      </header>
      <div class="w-full bg-[#242529] rounded-md">
        <ul class="gap-4 flex-wrap p-6 grid grid-cols-4 grid-rows-3">
          {projects.data.length === 0 ? (
            <span class="text-gray-200 text-xl col-start-2 col-end-4 row-start-2 place-self-center">
              No projects created
            </span>
          ) : (
            projects.data.map((project) => (
              <ProjectItem
                key={project.id}
                id={project.id}
                title={project.title}
                createdAt={project.createdAt}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "My projects",
};
