import { component$, Resource, useResource$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ProjectItem } from "~/components/ProjectItem";
import { CreateProjectModal } from "~/integrations/react/CreateProjectModal";
import { api } from "~/lib/axios";

type ProjectType = {
  id: number;
  title: string;
  createdAt: string;
};

export default component$(() => {
  const projectsResource = useResource$<ProjectType[]>(async () => {
    const { data } = await api.get("/");
    return data;
  });

  return (
    <div>
      <header class="flex justify-between text-gray-200 items-center mb-8">
        <h1 class="text-3xl">My projects</h1>
        <CreateProjectModal client:visible />
      </header>
      <div class="w-full bg-[#242529] rounded-md">
        <ul class="gap-4 flex-wrap p-6 grid grid-cols-4 grid-rows-3">
          <Resource
            value={projectsResource}
            onPending={() => <div>Loading...</div>}
            onRejected={() => <div>Failed to load weather</div>}
            onResolved={(projects) => {
              return (
                <>
                  {projects.length === 0 ? (
                    <span class="text-gray-200 text-xl col-start-2 col-end-4 row-start-2 place-self-center">
                      No projects created
                    </span>
                  ) : (
                    projects.map((project) => (
                      <ProjectItem
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        createdAt={project.createdAt}
                      />
                    ))
                  )}
                </>
              );
            }}
          />
        </ul>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "My projects",
};
