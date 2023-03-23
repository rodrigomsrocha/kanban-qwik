/* eslint-disable qwik/no-react-props */
/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import * as Dialog from "@radix-ui/react-dialog";

export const CreateTaskModal = qwikify$(() => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        type="button"
        className="bg-[#8177fe] px-4 py-2 rounded-md flex gap-2 items-center text-lg transition-opacity hover:opacity-80"
      >
        <i className="text-xl ph ph-plus"></i>
        New task
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0">
          <Dialog.Content className="absolute p-6 bg-[#242529] rounded-md w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <header className="flex justify-between items-center mb-12">
              <Dialog.Title className="text-3xl text-gray-200">
                Create task
              </Dialog.Title>
              <Dialog.Close className="flex items-center text-gray-200 rounded-lg px-2 py-1 transition-colors hover:bg-[#333536] focus:outline-none focus:ring-2 focus:ring-[#8177fe]">
                <i className="text-xl ph ph-x"></i>
              </Dialog.Close>
            </header>
            <form className="flex flex-col gap-2">
              <label className="text-gray-300 text-lg" htmlFor="name">
                Task title
              </label>
              <input
                className="border-none bg-[#333536] rounded-md text-gray-200 p-3 focus:outline-2 focus:outline-[#8177fe] mb-4"
                type="text"
                id="name"
              />
              <label className="text-gray-300 text-lg" htmlFor="description">
                Task description
              </label>
              <textarea
                rows={5}
                className="border-none bg-[#333536] rounded-md text-gray-200 p-3 focus:outline-2 focus:outline-[#8177fe] mb-4"
                id="description"
              />
              <label
                className="text-gray-300 text-lg flex flex-col gap-2"
                htmlFor="tags"
              >
                Task tags
                <div className="flex">
                  <input
                    className="border-none bg-[#333536] rounded-l-md text-gray-200 p-3 focus:outline-2 focus:outline-[#8177fe] flex-1"
                    type="text"
                    id="tags"
                  />
                  <button
                    type="button"
                    className="px-3 bg-transparent border-2 border-[#8177fe] rounded-r-md text-[#8177fe] transition-colors hover:bg-[#8177fe]/20"
                  >
                    <i className="text-xl ph ph-plus"></i>
                  </button>
                </div>
              </label>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-2 py-1 bg-[#8177fe]/20 rounded-md text-[#8177fe]">
                  dev
                </span>
                <span className="px-2 py-1 bg-[#8177fe]/20 rounded-md text-[#8177fe]">
                  learning
                </span>
              </div>
              <button
                type="submit"
                className="text-gray-200 flex items-center gap-2 justify-center p-2 bg-[#8177fe] rounded-md transition-colors hover:bg-[#8177fe]/80"
              >
                <i className="text-xl ph ph-plus"></i>
                Create task
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
