/* eslint-disable qwik/no-react-props */
/** @jsxImportSource react */
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import type { FormEvent } from "react";

interface EditProjectModalProps {
  projectId: number;
  updateProject: (projectId: number, title: string) => Promise<void>;
}

export const EditProjectModal = ({
  updateProject,
  projectId,
}: EditProjectModalProps) => {
  const [title, setTitle] = useState("");

  const handleEditProject = (e: FormEvent) => {
    e.preventDefault();
    if (!title) return;

    updateProject(projectId, title);

    setTitle("");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger
        type="button"
        className="bg-transparent border-none px-2 py-1 rounded-md transition-colors text-gray-300 hover:bg-[#242529] text-left flex gap-2 items-center"
      >
        <i className="ph ph-pencil-simple"></i>
        Edit
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0">
          <Dialog.Content className="absolute p-6 bg-[#242529] rounded-md w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <header className="flex justify-between items-center mb-12">
              <Dialog.Title className="text-3xl text-gray-200">
                Edit project
              </Dialog.Title>
              <Dialog.Close className="flex items-center text-gray-200 rounded-lg px-2 py-1 transition-colors hover:bg-[#333536] focus:outline-none focus:ring-2 focus:ring-[#8177fe]">
                <i className="text-xl ph ph-x"></i>
              </Dialog.Close>
            </header>
            <form onSubmit={handleEditProject} className="flex flex-col gap-2">
              <label className="text-gray-300 text-lg" htmlFor="name">
                Project name
              </label>
              <input
                className="border-none bg-[#333536] rounded-md text-gray-200 p-3 focus:outline-2 focus:outline-[#8177fe] mb-8"
                type="text"
                id="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                type="submit"
                className="text-gray-200 flex items-center gap-2 justify-center p-2 bg-[#8177fe] rounded-md transition-colors hover:bg-[#8177fe]/80"
              >
                <i className="text-xl ph ph-plus"></i>
                Edit project
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
