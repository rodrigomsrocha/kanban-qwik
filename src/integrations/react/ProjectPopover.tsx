/* eslint-disable qwik/no-react-props */
/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import * as Popover from "@radix-ui/react-popover";

export const ProjectPopover = qwikify$(() => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="flex items-center rounded-md transition-colors px-2 py-1 hover:bg-[#242529]"
        >
          <i className="ph ph-dots-three"></i>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5}>
          <div className="bg-[#1d1e22] p-4 rounded-md flex flex-col gap-2 w-48 shadow-md shadow-zinc-900">
            <button className="bg-transparent border-none px-2 py-1 rounded-md transition-colors text-gray-300 hover:bg-[#242529] text-left flex gap-2 items-center">
              <i className="ph ph-pencil-simple"></i>
              Edit
            </button>
            <button className="bg-transparent border-none px-2 py-1 rounded-md transition-colors text-red-500 hover:bg-red-500/20 text-left flex gap-2 items-center">
              <i className="ph ph-trash-simple"></i>
              Delete
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
});
