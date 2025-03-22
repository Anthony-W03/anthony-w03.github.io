<script lang="ts">
  import { fade } from "svelte/transition"
  import PreviewPanel from "./previewPanel.svelte"
  import ProjectCarousel from "./projectCarousel.svelte"
  import ProjectModal from "./projectModal.svelte"
  import Audio from "./audioControls.svelte"
  import { projects } from "./projects"

  import type { Project } from "./types"

  // Reactive variables
  let hoveredProject: Project | null = $state(null)
  let selectedProject: Project | null = $state(null)

  let carouselComponent: {
    next: () => void
    prev: () => void
    goTo: (index: number) => void
  } | null = $state(null)

  // Function to handle keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    // If modal is open, don't handle carousel navigation
    if (selectedProject) return

    // Prevent default behavior for arrow keys to avoid page scrolling
    if (["ArrowLeft", "ArrowRight", "Enter", " "].includes(event.key)) {
      event.preventDefault()
    }

    switch (event.key) {
      case "ArrowLeft":
        // Navigate to previous project
        carouselComponent?.prev()
        break
      case "ArrowRight":
        // Navigate to next project
        carouselComponent?.next()
        break
      case " ":
      case "Enter":
        if (hoveredProject) {
          selectedProject = hoveredProject
          // Navigate to the project
          console.log(`Navigating to ${hoveredProject.path}`)
        }
        break
    }
  }

  // Lifecycle
  import { onMount, onDestroy } from "svelte"
  import AudioControls from "./audioControls.svelte"

  onMount(() => {
    window.addEventListener("keydown", handleKeydown)

    if (projects.length > 0) {
      hoveredProject = projects[0]
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

  function closeModal() {
    console.log(selectedProject + " is closing")
    selectedProject = null
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<main
  class="flex min-h-screen flex-col items-center overflow-hidden bg-gray-700 p-6"
>
  <Audio />
  <div class="relative w-full max-w-5xl flex-1">
    <PreviewPanel {hoveredProject} />
    <ProjectCarousel
      {projects}
      {hoveredProject}
      onProjectHover={handleProjectHover}
      onProjectSelect={handleProjectSelect}
      bind:this={carouselComponent}
    />
  </div>

  <ProjectModal project={selectedProject} onClose={closeModal} />
</main>

<style lang="postcss">
</style>
