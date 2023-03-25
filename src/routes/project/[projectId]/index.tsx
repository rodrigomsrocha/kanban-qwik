import { $, component$, useStore, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { TaskItem } from "~/components/TaskItem";
import { CreateTaskModal } from "~/integrations/react/CreateTaskModal";
import { api } from "~/lib/axios";
import type { ProjectAndTasks, Task } from "~/types/project";

export default component$(() => {
  const { params } = useLocation();
  const project = useStore<{ data: ProjectAndTasks }>(
    {
      data: {} as ProjectAndTasks,
    },
    { deep: true }
  );

  useTask$(async () => {
    const { data } = await api.get<ProjectAndTasks>(
      `/projects/${params.projectId}?_embed=tasks`
    );
    project.data = data;
  });

  const updateTasksArray = $((task: Task) => {
    project.data.tasks = [...project.data.tasks, task];
  });

  const todo = project.data.tasks?.filter((task) => task.status === "todo");
  const doing = project.data.tasks?.filter((task) => task.status === "doing");
  const done = project.data.tasks?.filter((task) => task.status === "done");

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
          <h1>{project.data.title}</h1>
        </nav>
        <div class="flex gap-4">
          <button
            type="button"
            class="bg-transparent border-2 border-[#8177fe] w-11 rounded-md text-[#8177fe] transition-colors hover:bg-[#8177fe]/20"
          >
            <i class="text-xl ph ph-funnel"></i>
          </button>
          <CreateTaskModal
            updateTasksArray={updateTasksArray}
            projectId={params.projectId}
            client:visible
          />
        </div>
      </header>
      <div class="w-full bg-[#242529] rounded-md">
        <div class="grid gap-4 grid-cols-3 justify-between p-6 text-gray-200">
          <span class="before:w-2 before:h-2 before:bg-red-600 before:rounded-full flex items-center gap-2">
            To Do
          </span>
          <span class="before:w-2 before:h-2 before:bg-yellow-600 before:rounded-full flex items-center gap-2">
            Doing
          </span>
          <span class="before:w-2 before:h-2 before:bg-green-600 before:rounded-full flex items-center gap-2">
            Done
          </span>
          <div class="flex flex-col gap-4">
            {todo?.map((task) => (
              <TaskItem data={task} key={task.id} />
            ))}
          </div>
          <div class="flex flex-col gap-4">
            {doing?.map((task) => (
              <TaskItem data={task} key={task.id} />
            ))}
          </div>
          <div class="flex flex-col gap-4">
            {done?.map((task) => (
              <TaskItem data={task} key={task.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik project",
};
