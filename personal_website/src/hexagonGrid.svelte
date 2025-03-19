<!-- HexagonGrid.svelte -->
<script lang="ts">
    import type { Project } from './types'
  
    export let projects: Project[]
    export let hoveredProject: Project | null
    export let onProjectHover: (project: Project | null) => void
    export let onProjectSelect: (project: Project) => void

    const itemsPerRow = 12; // Adjust based on your needs
    const firstRowProjects = projects.slice(0, itemsPerRow);
    const secondRowProjects = projects.slice(itemsPerRow, itemsPerRow * 2);
  
    function handleHover(project: Project | null) {
      onProjectHover(project)
    }
  
    function handleSelect(project: Project) {
      onProjectSelect(project)
      console.log(`Navigating to ${project.path}`)
    }
  </script>
  
  <!-- <div class="hexagon-grid grid grid-cols-3 gap-y-0 w-full h-[200px]">
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
  </div> -->

  <div class="hexagon-container w-full mt-auto mb-8">
    <!-- First row -->
    <div class="hexagon-row flex justify-center">
      {#each firstRowProjects as project (project.id)}
        <button
          class="hexagon-btn relative transition-all duration-100
            {hoveredProject?.id === project.id
              ? 'scale-105 bg-green-500'
              : 'bg-green-700 hover:bg-green-600'}"
          on:mouseenter={() => handleHover(project)}
          on:mouseleave={() => handleHover(null)}
          on:click={() => handleSelect(project)}
        >
          <div class="absolute inset-0 flex items-center justify-center text-white text-sm">
            {project.title}
          </div>
        </button>
      {/each}
    </div>
    
    <!-- Second row (offset) -->
    <div class="hexagon-row flex justify-center second-row">
      {#each secondRowProjects as project (project.id)}
        <button
          class="hexagon-btn relative transition-all duration-100
            {hoveredProject?.id === project.id
              ? 'scale-105 bg-green-500'
              : 'bg-green-700 hover:bg-green-600'}"
          on:mouseenter={() => handleHover(project)}
          on:mouseleave={() => handleHover(null)}
          on:click={() => handleSelect(project)}
        >
          <div class="absolute inset-0 flex items-center justify-center text-white text-sm">
            {project.title}
          </div>
        </button>
      {/each}
    </div>
  </div>


  
  <!-- <style lang="postcss">
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

  </style> -->

  <style lang="postcss">
    .hexagon-container {
      position: relative;
      padding: 20px 0;
    }
  
    .hexagon-row {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: -30px; /* Negative margin to pull rows closer */
    }
  
    .second-row {
      margin-left: 88px; /* Offset for interlocking effect */
      margin-top: 11px;
    }
  
    .hexagon-btn {
      width: 80px;
      height: 92px; /* Height is ~115% of width for regular hexagon */
      margin: 0 4px;
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      position: relative;
    }
  
    /* Make text more readable */
    .hexagon-btn div {
      padding: 0 10px;
      text-align: center;
      font-weight: bold;
    }
  </style>