<!-- PreviewPanel.svelte -->
<script lang="ts">
  import { fade } from "svelte/transition"
  import type { Project } from "./types"

  export let hoveredProject: Project | null
</script>

<div
  class="mb-8 mt-12 flex h-60% w-full flex-col rounded-lg bg-gray-800 p-6 transition-all duration-300"
>
  <div class="relative h-full w-full">
    {#if hoveredProject}
      <div
        class="h-full overflow-y-auto"
        in:fade={{ duration: 200 }}
        out:fade={{ duration: 50 }}
      >
        <div class="space-y-4">
          <img
            src={hoveredProject.imageUrl}
            alt={hoveredProject.title}
            class="h-48 w-full rounded-lg object-cover"
          />
          <h2 class="text-2xl font-bold text-white">{hoveredProject.title}</h2>
          <p class="text-gray-300">{hoveredProject.description}</p>
        </div>
      </div>
    {:else}
      <div
        class="flex h-full items-center justify-center text-gray-400"
        in:fade={{ duration: 800 }}
      >
        Hover over a project to see details
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
</style>
