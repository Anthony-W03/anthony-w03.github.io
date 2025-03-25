<!-- ProjectModal.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { fade, fly } from "svelte/transition"
  import { tick } from "svelte"
  import { cubicOut } from "svelte/easing"
  import type { Project } from "./types"
  import { sfx } from "./store.svelte"

  const props = $props<{
    project: Project | null
    onClose: () => void
  }>()

  // State for the modal element and gallery
  let modalElement: HTMLDivElement | null = $state(null)
  let currentImageIndex: number = $state(0)

  const projectOpenAudio: HTMLAudioElement = new Audio(
    "/media/audio/modalOpen.wav"
  )
  projectOpenAudio.volume = 0.05

  const projectCloseAudio: HTMLAudioElement = new Audio(
    "/media/audio/modalClose.wav"
  )
  projectCloseAudio.volume = 0.05

  // Function to handle gallery navigation
  function nextImage() {
    if (props.project?.galleryImages?.length) {
      currentImageIndex =
        (currentImageIndex + 1) % props.project.galleryImages.length
    }
  }

  function prevImage() {
    if (props.project?.galleryImages?.length) {
      currentImageIndex =
        (currentImageIndex - 1 + props.project.galleryImages.length) %
        props.project.galleryImages.length
    }
  }

  // Reset gallery index when project changes
  $effect(() => {
    if (props.project) {
      currentImageIndex = 0
    }
  })

  // Handle click outside
  function handleOutsideClick(event: MouseEvent) {
    if (modalElement && !modalElement.contains(event.target as Node)) {
      props.onClose()
    }
  }

  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "Escape":
      case "x":
      case "X":
        props.onClose()
        break
      case "ArrowLeft":
        if (props.project?.galleryImages?.length) {
          prevImage()
        }
        break
      case "ArrowRight":
        if (props.project?.galleryImages?.length) {
          nextImage()
        }
        break
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeydown)
      // Restore body scrolling when modal is closed
      document.body.style.overflow = ""
    }
  })

  function playOpenProjectSFX() {
    if (!sfx.sfxMuted && projectOpenAudio) {
      projectOpenAudio.currentTime = 0
      projectOpenAudio.play().catch((error) => {
        console.error("Playback failed:", error)
      })
    }
  }

  function playCloseProjectSFX() {
    if (!sfx.sfxMuted && projectCloseAudio) {
      projectCloseAudio.currentTime = 0
      projectCloseAudio.play().catch((error) => {
        console.error("Playback failed:", error)
      })
    }
  }

  function expandAnimation(
    node: HTMLElement,
    { duration = 1200, easing = cubicOut }
  ) {
    // Store target dimensions once the element is laid out.
    const targetWidth = node.offsetWidth
    const targetHeight = node.offsetHeight
    const THIN_HEIGHT = 12
    playOpenProjectSFX()

    return {
      duration,
      easing,
      css: (t: number) => {
        let width: number, height: number

        if (t < 0.35) {
          // Step 1: Animate the width from 0 to full
          const horizontalProgress = t / 0.65
          width = targetWidth * horizontalProgress
          height = THIN_HEIGHT // a very thin horizontal line
        } else {
          // Step 2: height grows to full height.
          const verticalProgress = (t - 0.65) / 0.35
          width = targetWidth
          height = THIN_HEIGHT + (targetHeight - THIN_HEIGHT) * verticalProgress
        }

        return `
        width: ${width}px;
        height: ${height}px;
        opacity: 1;
      `
      },
    }
  }

  export function shrinkAnimation(
    node: HTMLElement,
    { duration = 1200, easing = cubicOut }
  ) {
    const targetWidth = node.offsetWidth
    const targetHeight = node.offsetHeight
    const THIN_HEIGHT = 12 // use the same thin value
    console.log("smol")

    return {
      duration,
      easing,
      css: (t: number, u: number) => {
        // For out transitions, u is 1 - t.
        let width: number, height: number, opacity: number
        if (u > 0.35) {
          // Phase 1: vertical shrink
          // u goes from 1 to 0.35; map that to a verticalProgress from 1 to 0.
          const verticalProgress = (u - 0.35) / 0.65
          // At u = 1, verticalProgress = 1 → height = THIN_HEIGHT + (targetHeight - THIN_HEIGHT) * 1 = targetHeight.
          // At u = 0.35, verticalProgress = 0 → height = THIN_HEIGHT.
          height = THIN_HEIGHT + (targetHeight - THIN_HEIGHT) * verticalProgress
          width = targetWidth
          opacity = 1
        } else {
          // Phase 2: horizontal shrink.
          // u goes from 0.35 down to 0; map to horizontalProgress from 1 to 0.
          const horizontalProgress = u / 0.35
          width = targetWidth * horizontalProgress
          height = THIN_HEIGHT
          opacity = horizontalProgress
        }
        return `
        width: ${width}px;
        height: ${height}px;
        opacity: ${opacity};
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-${width / 2}px, -${height / 2}px);
        overflow: hidden;
      `
      },
    }
  }

  // Show content after animation completes
  let animationComplete = $state(false)

  $effect(() => {
    if (props.project) {
      animationComplete = false
      tick().then(() => {
        setTimeout(() => {
          animationComplete = true
          if (modalElement) {
            modalElement.classList.add("animation-complete")
          }
        }, 600) // Match this to your animation duration
      })
    }
  })

  $effect(() => {
  if (modalElement) {
    modalElement.focus()
  }
})

  onDestroy(() => {
    if (modalElement) {
      modalElement.classList.remove("animation-complete")
      playCloseProjectSFX()
    }
  })
</script>

{#if props.project}
  <!-- Modal overlay -->
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
    transition:fade={{ duration: 200 }}
  >
    <!-- Backdrop overlay -->
    <div
      class="absolute inset-0 bg-black/70"
      onclick={() => props.onClose()}
      onkeydown={(e) => e.key === "Enter" && props.onClose()}
      tabindex="0"
      role="button"
      aria-label="Close modal"
    ></div>

    <!-- Modal container -->
    <div
      bind:this={modalElement}
      class="modal-container relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-gray-800"
      in:expandAnimation={{ duration: 1000 }}
      onoutroend={() => props.onClose()}
    >
      <!-- Close button -->

      <div class="absolute right-4 top-4 z-10 flex flex-col items-center">
        <button
          class="rounded-full bg-white/80 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700"
          onclick={() => props.onClose()}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <span class="text-s text-white dark:text-gray-400">esc</span>
      </div>

      <!-- <button
        class="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700"
        onclick={() => props.onClose()}
        aria-label="Close modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button> -->

      <!-- Scrollable content container -->
      <div class="modal-content flex-grow overflow-y-auto"
      >
        <!-- Image gallery -->
        <div class="relative h-72 w-full bg-gray-800 sm:h-80 md:h-96">
          {#if props.project.galleryImages.length > 0}
            <!-- Gallery image -->
            <img
              src={props.project.galleryImages[currentImageIndex]}
              alt={`${props.project.title} - Image ${currentImageIndex + 1}`}
              class="h-full w-full object-contain"
            />

            <!-- Gallery navigation buttons -->
             {#if props.project.galleryImages.length > 1}
            <button
              class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              onclick={prevImage}
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              onclick={nextImage}
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            

            <!-- Gallery indicator -->
            <div
              class="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2"
            >
              {#each props.project.galleryImages as _, i}
                <button
                  class="h-2.5 w-2.5 rounded-full {i === currentImageIndex
                    ? 'bg-white'
                    : 'bg-white/50'}"
                  onclick={() => (currentImageIndex = i)}
                  aria-label={`Go to image ${i + 1}`}
                ></button>
              {/each}
            </div>
            {/if}
          {:else}
            <!-- Fallback to main image if no gallery -->
            <img
              src={props.project.imageUrl}
              alt={props.project.title}
              class="h-full w-full object-cover"
            />
          {/if}
        </div>

        <!-- Project details -->
        <div class="p-6 md:p-8 bg-gray-900">
          <h2
            id="modal-title"
            class="mb-4 text-2xl font-bold text-white sm:text-3xl dark:text-white"
          >
            {props.project.title}
          </h2>

          <p class="mb-8 text-lg text-white dark:text-white">
            {props.project.description}
          </p>

          <!-- Project sections -->
          <div class="space-y-8">
            {#if props.project.detailedDescription}
            <section>
              <h3
              class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-white dark:border-gray-700 dark:text-white"
              >
              About this project
            </h3>
            <div class="prose prose-lg dark:prose-invert max-w-none">
              <p class="text-white dark:text-white">
                {props.project.detailedDescription}
              </p>
            </div>
          </section>
          {/if}
          
          {#if props.project.technologies && props.project.technologies.length > 0}
            <section>
              <h3
                class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-white dark:border-gray-700 dark:text-white"
              >
                Technologies Used
              </h3>
              <div class="mt-3 flex flex-wrap gap-2">
                {#each props.project.technologies as tech}
                  <span
                    class="rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-white dark:bg-gray-700 dark:text-white"
                  >
                    {tech}
                  </span>
                {/each}
              </div>
            </section>
          {/if}
          
            {#if props.project.problem}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-white dark:border-gray-700 dark:text-white"
                >
                  Problem Statement
                </h3>
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <p class="text-white dark:text-white">
                    {props.project.problem}
                  </p>
                </div>
              </section>
            {/if}

            {#if props.project.solution}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-white dark:border-gray-700 dark:text-white"
                >
                  Solution
                </h3>
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <p class="text-white dark:text-white">
                    {props.project.solution}
                  </p>
                </div>
              </section>
            {/if}

            {#if props.project.currentFocus}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-white dark:border-gray-700 dark:text-white"
                >
                  Current Focus
                </h3>
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <p class="text-white dark:text-white">
                    {props.project.currentFocus}
                  </p>
                </div>
              </section>
            {/if}

            {#if props.project.futurePlans}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-white dark:border-gray-700 dark:text-white"
                >
                  Future Plans
                </h3>
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <p class="text-white dark:text-white">
                    {props.project.futurePlans}
                  </p>
                </div>
              </section>
            {/if}
            
            {#if props.project.funfacts}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-white dark:border-gray-700 dark:text-white"
                >
                  Fun Facts
                </h3>
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <p class="text-white dark:text-white">
                    {props.project.funfacts}
                  </p>
                </div>
              </section>
            {/if}

            {#if props.project.features && props.project.features.length > 0}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-white dark:border-gray-700 dark:text-white"
                >
                  Key Features
                </h3>
                <ul
                  class="list-disc space-y-2 pl-5 text-white dark:text-white"
                >
                  {#each props.project.features as feature}
                    <li class="text-white dark:text-white">{feature}</li>
                  {/each}
                </ul>
              </section>
            {/if}

            {#if props.project.sources && props.project.sources.length > 0}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-white dark:border-gray-700 dark:text-white"
                >
                  Sources
                </h3>
                <ul
                  class="list-disc space-y-2 pl-5 text-white dark:text-white"
                >
                  {#each props.project.sources as source}
                    <li class="text-white dark:text-white">{source}</li>
                  {/each}
                </ul>
              </section>
            {/if}

            {#if props.project.challenges}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-white dark:border-gray-700 dark:text-gray-200"
                >
                  Challenges & Learnings
                </h3>
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <p class="text-white dark:text-white">
                    {props.project.challenges}
                  </p>
                </div>
              </section>
            {/if}

          </div>

          <!-- Project links -->
          <div
            class="mt-10 flex flex-wrap justify-center gap-4 border-t border-gray-200 pt-6 sm:justify-start dark:border-gray-700"
          >
            {#if props.project.demoUrl}
              <a
                href={props.project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Live Website
              </a>
            {/if}

            {#if props.project.githubUrl}
              <a
                href={props.project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                <img src={"/media/images/github.svg"} alt="SFX Muted" class="mr-2 h-5 w-5" />
                GitHub Repo
              </a>
            {/if}

            {#if props.project.linkedinUrl}
              <a
                href={props.project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                <img src={"/media/images/linkedin.svg"} alt="SFX Muted" class="mr-2 h-5 w-5" />
                Linkedin
              </a>
            {/if}

          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Custom scrollbar styling */
  .modal-content {
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent; /* Firefox */
  }

  /* For Webkit browsers (Chrome, Safari, etc.) */
  .modal-content::-webkit-scrollbar {
    width: 8px;
  }

  .modal-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .modal-content::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 20px;
  }

  /* For dark mode */
  :global(.dark) .modal-content {
    scrollbar-color: rgba(75, 85, 99, 0.5) transparent; /* Firefox */
  }

  :global(.dark) .modal-content::-webkit-scrollbar-thumb {
    background-color: rgba(75, 85, 99, 0.5);
  }

  /* Animation container styles */
  .modal-container {
    transform-origin: center center;
    will-change: transform, width, height, opacity;
  }

  /* Hide content during animation */
  .modal-container:not(.animation-complete) > * {
    opacity: 0;
  }

  /* Show content when animation is complete */
  /* .modal-container.animation-complete > * {
    opacity: 1;
    transition: opacity 0.2s ease-out;
  } */
</style>
