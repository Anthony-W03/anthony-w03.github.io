<!-- HexagonGrid.svelte -->
<script lang="ts">
    import type { Project } from './types'
  
    export let projects: Project[]
    export let hoveredProject: Project | null
    export let onProjectHover: (project: Project | null) => void
    export let onProjectSelect: (project: Project) => void
  
    function handleHover(project: Project | null) {
      onProjectHover(project)
    }
  
    function handleSelect(project: Project) {
      onProjectSelect(project)
      console.log(`Navigating to ${project.path}`)
    }
  </script>
  
  <div class="hexagon-grid grid grid-cols-3 gap-y-0 w-full h-[200px]">
    {#each projects as project (project.id)}
      <button
        class="clip-path-hexagon relative aspect-square transition-all duration-100
          {hoveredProject?.id === project.id
          ? 'scale-105 bg-green-500'
          : 'bg-green-700 hover:bg-green-600'}"
        on:mouseenter={() => handleHover(project)}
        on:mouseleave={() => handleHover(null)}
        on:click={() => handleSelect(project)}
      >
        <div class="absolute inset-0 flex items-center justify-center text-white">
          {project.title}
        </div>
      </button>
    {/each}
  </div>
  
  <style lang="postcss">
    .hexagon-grid { 
      display: grid;
      position: relative;
      grid-template-columns: repeat(3, 1fr);
      overflow: hidden;
    }

    .clip-path-hexagon {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    width: 80%%;
    margin: 0 -10%;
    transform: translateY(25%);
  }
  /* Offset every other row */
  .hexagon-grid button:nth-child(n+4) {
    transform: translateX(50%,-40%);
    margin-top: -25%;
  }

  .hexagon-grid > * {
    max-height: 80px; /* Adjust based on your needs */
  }

  </style>