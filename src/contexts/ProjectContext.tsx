import type { QRL } from "@builder.io/qwik";
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
  updateProject: (projectId: number, title: string) => Promise<void>;
  updateTaskStatus$: QRL<(taskId: number, taskStatus: string) => Promise<void>>;
};

export const ProjectContext = createContextId<ProjectContext>(
  "io.builder.project.context"
);

export const ProjectContextProvider = component$(() => {
  const projectsStore = useStore<{ data: Project[] }>(
    {
      data: [],
    },
    { deep: true }
  );
  const currentProjectStore = useStore<{ data: ProjectAndTasks }>(
    {
      data: {} as ProjectAndTasks,
    },
    { deep: true }
  );

  const updateProjectsStore = $(async () => {
    const { data } = await api.get("/projects");
    projectsStore.data = data;
  });

  const createProject = $(async (title: string) => {
    const { data } = await api.post<ProjectAndTasks>("/projects", {
      title: title,
      createdAt: new Date(),
    });
    projectsStore.data = [...projectsStore.data, data];
  });

  const updateCurrentProject = $(async () => {
    const { data } = await api.get(
      `/projects/${currentProjectStore.data.id}/?_embed=tasks`
    );
    currentProjectStore.data.tasks = [...data.tasks];
  });

  const deleteProject = $(async (projectId: number) => {
    await api.delete(`projects/${projectId}`);
    updateProjectsStore();
  });

  const updateProject = $(async (projectId: number, title: string) => {
    await api.patch(`/projects/${projectId}`, { title });
    const projectToUpdate = projectsStore.data.findIndex(
      (project) => project.id === projectId
    );
    projectsStore.data[projectToUpdate].title = title;
  });

  const createTask = $(async (task: CreateTaskData) => {
    const { data } = await api.post("/tasks", { ...task });
    currentProjectStore.data.tasks = [...currentProjectStore.data.tasks, data];
  });

  const deleteTask = $(async (taskId: number) => {
    await api.delete(`tasks/${taskId}`);
    updateCurrentProject();
  });

  const updateTaskStatus$ = $(async (taskId: number, taskStatus: string) => {
    await api.patch(`/tasks/${taskId}`, { status: taskStatus });

    const taskToUpdate = currentProjectStore.data.tasks.findIndex(
      (task) => task.id === taskId
    );
    currentProjectStore.data.tasks[taskToUpdate].status = taskStatus;
  });

  useContextProvider(ProjectContext, {
    projectsStore,
    createProject,
    currentProjectStore,
    createTask,
    deleteProject,
    deleteTask,
    updateProject,
    updateTaskStatus$,
  });

  return (
    <>
      <Slot />
    </>
  );
});
