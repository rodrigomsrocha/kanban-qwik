import type { PropFunction } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { $, component$, useContext } from "@builder.io/qwik";
import { ProjectContext } from "~/contexts/ProjectContext";
import { TaskPopover } from "~/integrations/react/TaskPopover";
import type { Task } from "~/types/project";

interface TaskItemProps {
  data: Task;
  handleDragEvent$: PropFunction<(status: boolean) => void>;
  setDraggingTask$: PropFunction<(task: Task | null) => void>;
}

export const TaskItem = component$(
  ({ data, handleDragEvent$, setDraggingTask$ }: TaskItemProps) => {
    const { deleteTask, updateTaskStatus$ } = useContext(ProjectContext);
    const isDragging = useSignal(false);

    const dragstart = $(() => {
      handleDragEvent$(true);
      setDraggingTask$(data);
      isDragging.value = true;
    });

    const dragend = $(() => {
      handleDragEvent$(false);
      setDraggingTask$(null);
      isDragging.value = false;
      // console.log("> end drag");
    });

    return (
      <div
        onDragStart$={dragstart}
        onDragEnd$={dragend}
        draggable
        class={`cursor-grab bg-[#333536] p-4 rounded-md transition-all ${
          isDragging.value && "cursor-move opacity-30"
        }`}
      >
        <header class="flex justify-between items-center mb-4">
          <strong class="text-gray-200 text-lg block">{data.title}</strong>
          <TaskPopover
            updateTaskStatus={updateTaskStatus$}
            currentStatus={data.status}
            taskId={data.id}
            deleteTask={deleteTask}
            client:visible
          />
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
  }
);
