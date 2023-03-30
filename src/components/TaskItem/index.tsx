import { component$, useContext } from "@builder.io/qwik";
import { ProjectContext } from "~/contexts/ProjectContext";
import { TaskPopover } from "~/integrations/react/TaskPopover";
import type { Task } from "~/types/project";

interface TaskItemProps {
  data: Task;
}

export const TaskItem = component$(({ data }: TaskItemProps) => {
  const { deleteTask } = useContext(ProjectContext);
  return (
    <div class="cursor-grab bg-[#333536] p-4 rounded-md">
      <header class="flex justify-between items-center mb-4">
        <strong class="text-gray-200 text-lg block">{data.title}</strong>
        <TaskPopover taskId={data.id} deleteTask={deleteTask} client:visible />
      </header>
      <p class="text-gray-300 mb-4">{data.description}</p>
      <div class="flex flex-wrap gap-2">
        {data.tags.map((tag) => {
          return (
            <span
              key={tag}
              class="px-2 py-1 bg-[#8177fe]/20 rounded-md text-[#8177fe]"
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
});
