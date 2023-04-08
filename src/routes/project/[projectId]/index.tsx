import { component$, useContext, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { DragDropTasks } from "~/components/DragDropTasks";
import { ProjectContext } from "~/contexts/ProjectContext";
import { CreateTaskModal } from "~/integrations/react/CreateTaskModal";
import { api } from "~/lib/axios";
import type { ProjectAndTasks, TaskByStatus } from "~/types/project";

export const useGetCurrentProject = routeLoader$(async ({ params }) => {
  const { data } = await api.get<ProjectAndTasks>(
    `/projects/${params.projectId}/?_embed=tasks`
  );
  return { data };
});

export default component$(() => {
  const { params } = useLocation();
  const { value } = useGetCurrentProject();
  const { createTask, currentProjectStore } = useContext(ProjectContext);

  useTask$(() => {
    currentProjectStore.data = value.data;
  });

  const formattedTasks = currentProjectStore.data.tasks.reduce(
    (acc, task) => {
      if (task.status === "todo") acc.todo.push(task);
      if (task.status === "doing") acc.doing.push(task);
      if (task.status === "done") acc.done.push(task);
      return acc;
    },
    {
      todo: [],
      doing: [],
      done: [],
    } as TaskByStatus
  );

  return (
    <div>
      <header class="flex justify-between items-center text-gray-200 mb-8">
        <nav class="text-3xl flex items-baseline gap-2">
          <a
            class="text-xl flex items-center px-2 py-1 transition-colors hover:bg-[#242529] rounded-md"
            href="/"
          >
            <i class="ph ph-arrow-left"></i>
          </a>
          <h1>{currentProjectStore.data.title}</h1>
        </nav>
        <div class="flex gap-4">
          <button
            type="button"
            class="bg-transparent border-2 border-[#8177fe] w-11 rounded-md text-[#8177fe] transition-colors hover:bg-[#8177fe]/20"
          >
            <i class="text-xl ph ph-funnel"></i>
          </button>
          <CreateTaskModal
            createTask={createTask}
            projectId={params.projectId}
            client:visible
          />
        </div>
      </header>
      <div class="w-full bg-[#242529] rounded-md">
        <DragDropTasks data={formattedTasks} />
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const project = resolveValue(useGetCurrentProject);
  return { title: project.data.title };
};
