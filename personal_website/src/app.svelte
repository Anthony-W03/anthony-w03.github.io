<script lang="ts">
    import {fade} from 'svelte/transition'
    // Types
  interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    path: string;
  }

  // Sample projects data
  const projects: Project[] = [
    {
      id: '1',
      title: 'Project Alpha',
      description: 'A revolutionary project that showcases innovative technology',
      imageUrl: '/placeholder-image-1.jpg',
      path: '/project-alpha'
    },
    {
      id: '2',
      title: 'Project Beta',
      description: 'Exploring the boundaries of what\'s possible',
      imageUrl: '/placeholder-image-2.jpg',
      path: '/project-beta'
    },
    {
      id: '3',
      title: 'Project Gamma',
      description: 'Pushing the envelope of development',
      imageUrl: '/placeholder-image-3.jpg',
      path: '/project-gamma'
    },
  ];

  // Reactive variables
  let hoveredProject: Project | null = null;
  let selectedProject: Project | null = null;

  // Function to handle keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    const currentIndex = hoveredProject ? projects.findIndex(p => p.id === hoveredProject?.id) : -1;

    switch(event.key) {
      case 'ArrowLeft':
        hoveredProject = projects[(currentIndex + 1) % projects.length];
        break;
      case 'ArrowRight':
        hoveredProject = projects[(currentIndex - 1 + projects.length) % projects.length];
        break;
      case 'Enter':
        if (hoveredProject) {
          selectedProject = hoveredProject;
          // TODO: Implement navigation
          console.log(`Navigating to ${hoveredProject.path}`);
        }
        break;
    }
  }

  // Lifecycle
  import { onMount, onDestroy } from 'svelte';

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

<svelte:window on:keydown={handleKeydown}/>

<main class="flex min-h-screen flex-col items-center bg-gray-700">

    <div class="w-full h-full flex gap-8 p-8">
        <!-- Hexagon Grid -->
        <div class="flex-1 grid grid-cols-3 gap-4">
            {#each projects as project (project.id)}
            <button
            class="aspect-square relative clip-path-hexagon transition-all duration-300
            {hoveredProject?.id === project.id ? 'bg-green-500 scale-105' : 'bg-green-700 hover:bg-green-600'}"
            on:mouseenter={() => hoveredProject = project}
            on:mouseleave={() => hoveredProject = null}
            on:click={() => {
                selectedProject = project;
                console.log(`Navigating to ${project.path}`);
            }}
      >
      <div class="absolute inset-0 flex items-center justify-center text-white">
          {project.title}
        </div>
    </button>
    {/each}
    </div>

<!-- Preview Panel -->
<div class="w-96 bg-gray-800 rounded-lg p-6 transition-all duration-300">
    {#if hoveredProject}
    <div class="space-y-4" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
        <img 
        src={hoveredProject.imageUrl} 
        alt={hoveredProject.title}
        class="w-full h-48 object-cover rounded-lg"
        />
        <h2 class="text-2xl font-bold text-white">{hoveredProject.title}</h2>
        <p class="text-gray-300">{hoveredProject.description}</p>
    </div>
    {:else}
    <div class="h-full flex items-center justify-center text-gray-400">
        Hover over a project to see details
    </div>
    {/if}
</div>
</div>
</main>

<style lang="postcss">
  /* Hexagon clip path */
  .clip-path-hexagon {
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  /* Add any additional custom styles here */
</style>