import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="max-w-6xl px-8 mx-auto flex flex-col justify-center min-h-screen">
      <Slot />
    </div>
  );
});
