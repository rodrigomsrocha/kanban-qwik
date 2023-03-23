import { component$ } from "@builder.io/qwik";
import { TaskItem } from "~/components/TaskItem";

export default component$(() => {
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
          <h1>Qwik project</h1>
        </nav>
        <div class="flex gap-4">
          <button class="bg-transparent border-2 border-[#8177fe] w-11 rounded-md text-[#8177fe] transition-colors hover:bg-[#8177fe]/20">
            <i class="text-xl ph ph-funnel"></i>
          </button>
          <button class="bg-[#8177fe] px-4 py-2 rounded-md flex gap-2 items-center text-lg transition-opacity hover:opacity-80">
            <i class="text-xl ph ph-plus"></i>
            New task
          </button>
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
            <TaskItem />
            <TaskItem />
          </div>
          <div class="flex flex-col gap-4">
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </div>
          <div class="flex flex-col gap-4">
            <TaskItem />
          </div>
        </div>
      </div>
    </div>
  );
});
