import type { QwikDragEvent } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import type { Task, TaskByStatus } from "~/types/project";
import { TaskItem } from "../TaskItem";
import { ProjectContext } from "~/contexts/ProjectContext";

interface DragDropTaskProps {
  data: TaskByStatus;
}

export const DragDropTasks = component$(({ data }: DragDropTaskProps) => {
  const { updateTaskStatus$ } = useContext(ProjectContext);
  const dragStarted = useSignal(false);
  const draggingTask = useStore<{ data: Task | null }>({ data: {} as Task });

  const handleDragEvent$ = $((status: boolean) => {
    dragStarted.value = status;
  });

  const setDraggingTask$ = $((task: Task | null) => {
    if (!task) return;
    draggingTask.data = task;
  });

  const dragover = $(
    (_: QwikDragEvent<HTMLDivElement>, element: HTMLDivElement) => {
      element.classList.add("bg-[#8177fe]/20");
    }
  );

  const dragleave = $(
    (_: QwikDragEvent<HTMLDivElement>, element: HTMLDivElement) => {
      element.classList.remove("bg-[#8177fe]/20");
    }
  );

  const drop = $(
    (
      _: QwikDragEvent<HTMLDivElement>,
      element: HTMLDivElement,
      columnStatus: string
    ) => {
      if (!draggingTask.data) return;
      element.classList.remove("bg-[#8177fe]/20");

      updateTaskStatus$(draggingTask.data.id, columnStatus);
    }
  );

  return (
    <div class="grid gap-4 grid-cols-3 justify-between p-6 text-gray-200">
      <div class="flex flex-col gap-4">
        <span class="before:w-2 before:h-2 before:bg-red-600 before:rounded-full flex items-center gap-2 px-4">
          To Do
        </span>
        <div
          preventdefault:dragover
          onDragOver$={dragover}
          onDragLeave$={dragleave}
          onDrop$={(_, element) => drop(_, element, "todo")}
          class={`flex flex-col gap-4 h-full p-4 rounded-md transition-all ${
            dragStarted.value && "bg-[#333536]/30"
          }`}
        >
          {data.todo?.map((task) => (
            <TaskItem
              setDraggingTask$={setDraggingTask$}
              handleDragEvent$={handleDragEvent$}
              data={task}
              key={task.id}
            />
          ))}
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <span class="before:w-2 before:h-2 before:bg-yellow-600 before:rounded-full flex items-center gap-2 px-4">
          Doing
        </span>
        <div
          preventdefault:dragover
          onDragOver$={dragover}
          onDragLeave$={dragleave}
          onDrop$={(_, element) => drop(_, element, "doing")}
          class={`flex flex-col gap-4 h-full p-4 rounded-md transition-all ${
            dragStarted.value && "bg-[#333536]/30"
          }`}
        >
          {data.doing?.map((task) => (
            <TaskItem
              setDraggingTask$={setDraggingTask$}
              handleDragEvent$={handleDragEvent$}
              data={task}
              key={task.id}
            />
          ))}
        </div>
      </div>
      <div class="flex flex-col">
        <span class="before:w-2 before:h-2 before:bg-green-600 before:rounded-full flex items-center gap-2 mb-4 px-4">
          Done
        </span>
        <div
          preventdefault:dragover
          onDragOver$={dragover}
          onDragLeave$={dragleave}
          onDrop$={(_, element) => drop(_, element, "done")}
          class={`flex flex-col gap-4 h-full p-4 rounded-md transition-all ${
            dragStarted.value && "bg-[#333536]/30"
          }`}
        >
          {data.done?.map((task) => (
            <TaskItem
              setDraggingTask$={setDraggingTask$}
              handleDragEvent$={handleDragEvent$}
              data={task}
              key={task.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
