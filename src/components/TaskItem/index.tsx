import { component$ } from "@builder.io/qwik";

export const TaskItem = component$(() => {
  return (
    <div class="cursor-grab bg-[#333536] p-4 rounded-md">
      <header class="flex justify-between items-center mb-4">
        <strong class="text-gray-200 text-lg block">
          Implementar autenticação
        </strong>
        <button
          type="button"
          class="flex items-center rounded-md transition-colors px-2 py-1 hover:bg-[#242529]"
        >
          <i class="ph ph-dots-three"></i>
        </button>
      </header>
      <p class="text-gray-300 mb-4">
        implementar autenticação no aplicativo com o auth 0
      </p>
      <div class="flex flex-wrap gap-2">
        <span class="px-2 py-1 bg-[#8177fe]/20 rounded-md text-[#8177fe]">
          dev
        </span>
        <span class="px-2 py-1 bg-[#8177fe]/20 rounded-md text-[#8177fe]">
          learning
        </span>
      </div>
    </div>
  );
});
