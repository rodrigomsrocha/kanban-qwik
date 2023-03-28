import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { api } from "~/lib/axios";
import type { ProjectAndTasks } from "~/types/project";

type ProjectContext = {
  projectsStore: { data: ProjectAndTasks[] };
  createProject: (title: string) => void;
};

export const ProjectContext = createContextId<ProjectContext>(
  "io.builder.project.context"
);

export const ProjectContextProvider = component$(() => {
  const projectsStore = useStore<{ data: ProjectAndTasks[] }>({
    data: [],
  });

  const createProject = $(async (title: string) => {
    const { data } = await api.post<ProjectAndTasks>("/projects", {
      title: title,
      createdAt: new Date(),
    });
    projectsStore.data = [...projectsStore.data, data];
  });

  useTask$(async () => {
    const { data } = await api.get("/projects?_embed=tasks");
    projectsStore.data = data;
  });

  useContextProvider(ProjectContext, { projectsStore, createProject });

  return (
    <>
      <Slot />
    </>
  );
});
