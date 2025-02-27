<script lang="ts">
  import { fade } from "svelte/transition"
  import HexagonGrid from "./hexagonGrid.svelte";
  import PreviewPanel from "./previewPanel.svelte";
  import type { Project } from "./types"
  // Types


  // Sample projects data
  const projects: Project[] = [
    {
      id: "1",
      title: "Project Alpha",
      description:
        "A revolutionary project that showcases innovative technology",
      imageUrl: "/placeholder-image-1.jpg",
      path: "/project-alpha",
    },
    {
      id: "2",
      title: "Project Beta",
      description: "Exploring the boundaries of what's possible",
      imageUrl: "/placeholder-image-2.jpg",
      path: "/project-beta",
    },
    {
      id: "3",
      title: "Project Gamma",
      description: "Pushing the envelope of development",
      imageUrl: "/placeholder-image-3.jpg",
      path: "/project-gamma",
    },
    {
      id: "4",
      title: "Project Gamma",
      description: "Pushing the envelope of development",
      imageUrl: "/placeholder-image-3.jpg",
      path: "/project-gamma",
    },
    {
      id: "5",
      title: "Project Alpha",
      description:
        "A revolutionary project that showcases innovative technology",
      imageUrl: "/placeholder-image-1.jpg",
      path: "/project-alpha",
    },
    {
      id: "6",
      title: "Project Alpha",
      description:
        "A revolutionary project that showcases innovative technology",
      imageUrl: "/placeholder-image-1.jpg",
      path: "/project-alpha",
    },
    {
      id: "7",
      title: "Project Alpha",
      description:
        "A revolutionary project that showcases innovative technology",
      imageUrl: "/placeholder-image-1.jpg",
      path: "/project-alpha",
    },
    {
      id: "8",
      title: "Project Alpha",
      description:
        "A revolutionary project that showcases innovative technology",
      imageUrl: "/placeholder-image-1.jpg",
      path: "/project-alpha",
    },
  ]

  // Reactive variables
  let hoveredProject: Project | null = null
  let selectedProject: Project | null = null

  // Function to handle keyboard navigation
  //This function needs to be fixed to be able to go through all the rows, or im just handling things incorrectly
  function handleKeydown(event: KeyboardEvent) {
    const currentIndex = hoveredProject
      ? projects.findIndex((p) => p.id === hoveredProject?.id)
      : -1

    switch (event.key) {
      case "ArrowLeft":
        hoveredProject = projects[(currentIndex + 1) % projects.length]
        break
      case "ArrowRight":
        hoveredProject =
          projects[(currentIndex - 1 + projects.length) % projects.length]
        break
      case "Enter":
        if (hoveredProject) {
          selectedProject = hoveredProject
          // TODO: Implement navigation
          console.log(`Navigating to ${hoveredProject.path}`)
        }
        break
    }
  }

  // Lifecycle
  import { onMount, onDestroy } from "svelte"

  onMount(() => {
    window.addEventListener("keydown", handleKeydown)
  })

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeydown)
  })

  function handleProjectHover(project: Project | null) {
    hoveredProject = project
  }

  function handleProjectSelect(project: Project) {
    selectedProject = project
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<main class="flex min-h-screen flex-col items-center bg-gray-700 p-4 overflow-hidden">
  <div class="flex-1 w-full max-w-4xl relative">
    <PreviewPanel {hoveredProject}/>
    <HexagonGrid 
      {projects} 
      {hoveredProject} 
      onProjectHover={handleProjectHover} 
      onProjectSelect={handleProjectSelect}
    />
    </div>
  </main>
    <!-- Hexagon Grid
    <div class="hexagon-grid grid grid-cols-3 gap-2 w-3/5 ml-6">
      {#each projects as project (project.id)}
        <button
          class=" relative aspect-square transition-all duration-100
            {hoveredProject?.id === project.id
            ? 'scale-105 bg-green-500'
            : 'bg-green-700 hover:bg-green-600'}"
          on:mouseenter={() => (hoveredProject = project)}
          on:mouseleave={() => (hoveredProject = null)}
          on:click={() => {
            selectedProject = project
            console.log(`Navigating to ${project.path}`)
          }}
        >
          <div
            class="absolute inset-0 flex items-center justify-center text-white"
          >
            {project.title}
          </div>
        </button>
      {/each}
    </div>
    -->
    <!-- Preview Panel -->
    <!-- <div class="duration-3oo w-1/3 rounded-lg bg-gray-800 p-6 ml-6 transition-all float-right">
      {#if hoveredProject}
        <div class="space-y-4" in:fade={{ duration: 200 }}>
          <img
            src={hoveredProject.imageUrl}
            alt={hoveredProject.title}
            class="h-48 w-full rounded-lg object-cover"
          />
          <h2 class="text-2xl font-bold text-white">{hoveredProject.title}</h2>
          <p class="text-gray-300">{hoveredProject.description}</p>
        </div>
      {:else}
        <div class="flex h-full items-center justify-center text-gray-400">
          Hover over a project to see details
        </div>
      {/if}
    </div> -->

<style lang="postcss">
</style>
