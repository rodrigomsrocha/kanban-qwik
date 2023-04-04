/* eslint-disable qwik/no-react-props */
/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";

import { EditProjectModal } from "./EditProjectModal";

interface ProjectPopoverProps {
  projectId: number;
  deleteProject: (projectId: number) => Promise<void>;
  updateProject: (projectId: number, title: string) => Promise<void>;
}

export const ProjectPopover = qwikify$(
  ({ projectId, deleteProject, updateProject }: ProjectPopoverProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [userWantsToDelete, setUserWantsToDelete] = useState(false);

    const handleDelete = (confirmDelete: boolean) => {
      if (!confirmDelete) {
        setUserWantsToDelete(false);
        return;
      }
      deleteProject(projectId);
      setIsPopoverOpen(false);
    };

    return (
      <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <Popover.Trigger
          asChild
          type="button"
          className="flex items-center rounded-md transition-colors px-2 py-1 hover:bg-[#242529]"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <i className="ph ph-dots-three"></i>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content sideOffset={5}>
            <div className="bg-[#1d1e22] p-4 rounded-md flex flex-col gap-2 w-48 shadow-md shadow-zinc-900">
              <EditProjectModal
                projectId={projectId}
                updateProject={updateProject}
              />
              {userWantsToDelete ? (
                <div className="flex items-center gap-2 text-gray-300 px-2 py-1">
                  <span>Sure?</span>
                  <button
                    onClick={() => handleDelete(true)}
                    className="bg-transparent border-none px-2 py-1 rounded-md transition-colors text-red-500 hover:bg-red-500/20 text-left flex gap-2 items-center"
                  >
                    yes
                  </button>
                  <button
                    onClick={() => handleDelete(false)}
                    className="bg-transparent border-none px-2 py-1 rounded-md transition-colors text-gray-300 hover:bg-[#242529] text-left flex gap-2 items-center"
                  >
                    cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setUserWantsToDelete(true)}
                  className="bg-transparent border-none px-2 py-1 rounded-md transition-colors text-red-500 hover:bg-red-500/20 text-left flex gap-2 items-center"
                >
                  <i className="ph ph-trash-simple"></i>
                  Delete
                </button>
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }
);
