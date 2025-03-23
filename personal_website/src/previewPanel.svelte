<!-- PreviewPanel.svelte -->
<script lang="ts">
  import { fade } from "svelte/transition"
  import type { Project } from "./types"

  const props = $props<{
    hoveredProject: Project | null
  }>()
  
</script>

<div
  class=" mt-[5vh] flex h-[55vh] w-full flex-col rounded-lg bg-gray-800 p-6 transition-all duration-300"
>
  <div class="relative h-full w-full">
    {#if props.hoveredProject}
      <div class="flex h-full flex-col overflow-y-auto rounded-lg pt-4"
      
      >
      <img
      src={props.hoveredProject.imageUrl}
      alt={props.hoveredProject.title}
      class="h-3/4 w-full rounded-lg object-cover"
      in:fade={{ duration: 800 }}
      out:fade={{ duration: 50 }}
        />
        <div class="h-1/4 space-y-2 p-4">
          <h2 class="text-2xl font-bold text-white">{props.hoveredProject.title}</h2>
          <p class="text-gray-300">{props.hoveredProject.description}</p>
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
