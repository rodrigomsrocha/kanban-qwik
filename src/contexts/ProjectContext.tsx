import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { api } from "~/lib/axios";
import type { CreateTaskData, Project, ProjectAndTasks } from "~/types/project";

type ProjectContext = {
  projectsStore: { data: Project[] };
  currentProjectStore: { data: ProjectAndTasks };
  createProject: (title: string) => Promise<void>;
  createTask: (task: CreateTaskData) => Promise<void>;
  deleteProject: (projectId: number) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
};

export const ProjectContext = createContextId<ProjectContext>(
  "io.builder.project.context"
);

export const ProjectContextProvider = component$(() => {
  const projectsStore = useStore<{ data: Project[] }>({
    data: [],
  });
  const currentProjectStore = useStore<{ data: ProjectAndTasks }>(
    {
      data: {} as ProjectAndTasks,
    },
    { deep: true }
  );

  const createProject = $(async (title: string) => {
    const { data } = await api.post<ProjectAndTasks>("/projects", {
      title: title,
      createdAt: new Date(),
    });
    projectsStore.data = [...projectsStore.data, data];
  });

  const getProjects = $(async () => {
    const { data } = await api.get("/projects");
    projectsStore.data = data;
  });

  const getTasksFromCurrentProject = $(async () => {
    const { data } = await api.get(
      `/projects/${currentProjectStore.data.id}/?_embed=tasks`
    );
    currentProjectStore.data.tasks = [...data.tasks];
  });

  const deleteProject = $(async (projectId: number) => {
    await api.delete(`projects/${projectId}`);
    getProjects();
  });

  const createTask = $(async (task: CreateTaskData) => {
    const { data } = await api.post("/tasks", { ...task });
    currentProjectStore.data.tasks = [...currentProjectStore.data.tasks, data];
  });

  const deleteTask = $(async (taskId: number) => {
    await api.delete(`tasks/${taskId}`);
    getTasksFromCurrentProject();
  });

  useContextProvider(ProjectContext, {
    projectsStore,
    createProject,
    currentProjectStore,
    createTask,
    deleteProject,
    deleteTask,
  });

  return (
    <>
      <Slot />
    </>
  );
});
