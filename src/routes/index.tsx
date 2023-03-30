import { component$, useContext, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ProjectItem } from "~/components/ProjectItem";
import { ProjectContext } from "~/contexts/ProjectContext";
import { CreateProjectModal } from "~/integrations/react/CreateProjectModal";
import { api } from "~/lib/axios";
import type { Project } from "~/types/project";

export const useGetProjects = routeLoader$(async () => {
  const { data } = await api.get<Project[]>("/projects");
  return { data };
});

export default component$(() => {
  const { value } = useGetProjects();
  const { projectsStore, createProject } = useContext(ProjectContext);

  useTask$(() => {
    projectsStore.data = value.data;
  });

  return (
    <div>
      <header class="flex justify-between text-gray-200 items-center mb-8">
        <h1 class="text-3xl">My projects</h1>
        <CreateProjectModal createProject={createProject} client:visible />
      </header>
      <div class="w-full bg-[#242529] rounded-md">
        <ul class="gap-4 flex-wrap p-6 grid grid-cols-4 grid-rows-3">
          {projectsStore.data.length === 0 ? (
            <span class="text-gray-200 text-xl col-start-2 col-end-4 row-start-2 place-self-center">
              No projects created
            </span>
          ) : (
            projectsStore.data.map((project) => (
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
