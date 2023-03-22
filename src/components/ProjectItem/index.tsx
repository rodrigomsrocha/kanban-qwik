import { component$ } from "@builder.io/qwik";

export const ProjectItem = component$(() => {
  return (
    <div class="bg-[#333536] flex flex-col justify-between p-4 h-[150px] rounded-md">
      <a
        href="#"
        class="font-bold text-gray-200 underline-offset-2 hover:underline"
      >
        Qwik Project
      </a>
      <footer class="text-gray-400 flex justify-between items-center">
        <time class="flex items-center gap-2">
          <i class="ph ph-clock"></i>1 min ago
        </time>
        <button class="flex items-center rounded-sm transition-colors px-2 py-1 hover:bg-[#242529]">
          <i class="ph ph-dots-three"></i>
        </button>
      </footer>
    </div>
  );
});
