<script lang="ts">
  import { fade } from "svelte/transition"
  import HexagonGrid from "./hexagonGrid.svelte";
  import PreviewPanel from "./previewPanel.svelte";
  import ProjectCarousel from "./projectCarousel.svelte";
  import ProjectModal from "./projectModal.svelte";
  import type { Project } from "./types"
  // Types


  // Sample projects data
  const projects: Project[] = [
    {
      id: "1",
      title: "Project A",
      description:
        "A revolutionary project that showcases innovative technology",
      imageUrl: "/placeholder-image-1.jpg",
      path: "/project-alpha",
    },
    {
      id: "2",
      title: "Project B",
      description: "Exploring the boundaries of what's possible",
      imageUrl: "/placeholder-image-2.jpg",
      path: "/project-beta",
    },
    {
      id: "3",
      title: "Project C",
      description: "Pushing the envelope of development",
      imageUrl: "/placeholder-image-3.jpg",
      path: "/project-gamma",
    },
    {
      id: "4",
      title: "Project D",
      description: "Pushing the envelope of development",
      imageUrl: "/placeholder-image-3.jpg",
      path: "/project-gamma",
    },
    {
      id: "5",
      title: "Project E",
      description:
        "A revolutionary project that showcases innovative technology",
      imageUrl: "/placeholder-image-1.jpg",
      path: "/project-alpha",
    },
    {
      id: "6",
      title: "Project F",
      description:
        "A revolutionary project that showcases innovative technology",
      imageUrl: "/placeholder-image-1.jpg",
      path: "/project-alpha",
    },
    {
      id: "7",
      title: "Project G",
      description:
        "A revolutionary project that showcases innovative technology",
      imageUrl: "/placeholder-image-1.jpg",
      path: "/project-alpha",
    },
    {
      id: "8",
      title: "Project H",
      description:
        "A revolutionary project that showcases innovative technology",
      imageUrl: "/placeholder-image-1.jpg",
      path: "/project-alpha",
    },
  ]

  // Reactive variables
  let hoveredProject: Project | null = null
  let selectedProject: Project | null = null
  let carouselComponent: { next: () => void; prev: () => void; goTo: (index: number) => void };

  // Function to handle keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    // Prevent default behavior for arrow keys to avoid page scrolling
    if (["ArrowLeft", "ArrowRight", "Enter"].includes(event.key)) {
      event.preventDefault();
    }
    
    switch (event.key) {
      case "ArrowLeft":
        // Navigate to previous project
        carouselComponent?.prev();
        break;
      case "ArrowRight":
        // Navigate to next project
        carouselComponent?.next();
        break;
      case "Enter":
        if (hoveredProject) {
          selectedProject = hoveredProject;
          // Navigate to the project
          console.log(`Navigating to ${hoveredProject.path}`);
          // You could add actual navigation here
          // window.location.href = hoveredProject.path;
        }
        break;
    }
  }

  // Lifecycle
  import { onMount, onDestroy } from "svelte"

  onMount(() => {
    window.addEventListener("keydown", handleKeydown)

    if (projects.length > 0) {
      hoveredProject = projects[0];
    }
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
    <ProjectCarousel 
      {projects} 
      {hoveredProject} 
      onProjectHover={handleProjectHover} 
      onProjectSelect={handleProjectSelect}
      bind:this={carouselComponent}
    />
    </div>
  </main>
<style lang="postcss">
</style>
