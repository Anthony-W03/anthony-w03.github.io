<!-- ProjectModal.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { fade, fly } from "svelte/transition"
  import { tick } from 'svelte';
  import { cubicOut } from "svelte/easing"
  import type { Project } from "./types"

  const props = $props<{
    project: Project | null
    onClose: () => void
  }>()

  // State for the modal element and gallery
  let modalElement: HTMLDivElement | null = $state(null)
  let currentImageIndex: number = $state(0)

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
      props.onClose();
    }
  }

  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      props.onClose()
    } else if (
      event.key === "ArrowLeft" &&
      props.project?.galleryImages?.length
    ) {
      prevImage()
    } else if (
      event.key === "ArrowRight" &&
      props.project?.galleryImages?.length
    ) {
      nextImage()
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"
  })

  onDestroy(() => {
    document.removeEventListener("keydown", handleKeydown)
    // Restore body scrolling when modal is closed
    document.body.style.overflow = ""
  })

  // Custom animations
  function expandAnimation(
  node: HTMLElement,
  { duration = 1200, easing = cubicOut }
) {
  // Store target dimensions once the element is laid out.
  const targetWidth = node.offsetWidth;
  const targetHeight = node.offsetHeight;

  return {
    duration,
    easing,
    css: (t: number) => {
      let width: number, height: number;

      if (t < 0.4) {
        // Phase 1: animate the width from 0 to full, height is a thin line.
        const horizontalProgress = t / 0.65;
        width = targetWidth * horizontalProgress;
        height = 12; // a very thin horizontal line
      } else {
        // Phase 2: width is fixed; height grows from a thin line to full height.
        const verticalProgress = (t - 0.65) / 0.35;
        width = targetWidth;
        height = 2 + (targetHeight - 2) * verticalProgress;
      }

      // Only animate dimensions (and optionally opacity).
      return `
        width: ${width}px;
        height: ${height}px;
        opacity: 1;
      `;
    }
  };
}



function shrinkAnimation(node: HTMLElement, { 
  duration = 400,
  easing = cubicOut
}) {
  // Store original dimensions
  const startWidth = node.offsetWidth;
  const startHeight = node.offsetHeight;
  
  return {
    duration,
    easing,
    css: (t: number, u: number) => {
      let width: number, height: number, opacity: number;
      
      if (u > 0.6) {
        // Phase 1: Vertical shrinking. u decreases from 1 to 0.6.
        const verticalProgress = (u - 0.6) / 0.4; // normalize 0-1 over first phase
        height = startHeight * verticalProgress + 2 * (1 - verticalProgress);
        width = startWidth;
        opacity = 1;
      } else {
        // Phase 2: Horizontal shrinking and fade out. u decreases from 0.6 to 0.
        const horizontalProgress = u / 0.6; // normalize 0-1 over second phase
        width = startWidth * horizontalProgress;
        height = 2;
        opacity = horizontalProgress; // fade out linearly
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
      `;
    }
  };
}


// Show content after animation completes
let animationComplete = $state(false);

$effect(() => {
  if (props.project) {
    animationComplete = false;
    tick().then(() => {
      setTimeout(() => {
        animationComplete = true;
        if (modalElement) {
          modalElement.classList.add('animation-complete');
        }
      }, 600); // Match this to your animation duration
    });
  }
});

onDestroy(() => {
  if (modalElement) {
    modalElement.classList.remove('animation-complete');
  }
});

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
      onkeydown={(e) => e.key === "Enter" && !props.isClosing && props.onClose()}
      tabindex="0"
      role="button"
      aria-label="Close modal"
    ></div>

    <!-- Modal container -->
    <div
      bind:this={modalElement}
      class="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden flex flex-col modal-container"
      in:expandAnimation={{ duration: 1000 }}
    >
      <!-- Close button -->
      <button
        class="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700"
        onclick={() => props.onClose}
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

      <!-- Scrollable content container -->
      <div class="flex-grow overflow-y-auto modal-content">
        <!-- Image gallery -->
        <div class="relative h-72 w-full bg-gray-900 sm:h-80 md:h-96">
          {#if props.project.galleryImages.length > 0}
            <!-- Gallery image -->
            <img
              src={props.project.galleryImages[currentImageIndex]}
              alt={`${props.project.title} - Image ${currentImageIndex + 1}`}
              class="h-full w-full object-contain"
            />

            <!-- Gallery navigation buttons -->
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
        <div class="p-6 md:p-8">
          <h2
            id="modal-title"
            class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white"
          >
            {props.project.title}
          </h2>

          <p class="mb-8 text-lg text-gray-700 dark:text-gray-300">
            {props.project.description}
          </p>

          <!-- Project sections -->
          <div class="space-y-8">
            {#if props.project.detailedDescription}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200"
                >
                  About this project
                </h3>
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <p class="text-gray-700 dark:text-gray-300">
                    {props.project.detailedDescription}
                  </p>
                </div>
              </section>
            {/if}

            {#if props.project.problem}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200"
                >
                  Problem Statement
                </h3>
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <p class="text-gray-700 dark:text-gray-300">
                    {props.project.problem}
                  </p>
                </div>
              </section>
            {/if}

            {#if props.project.solution}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200"
                >
                  Solution
                </h3>
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <p class="text-gray-700 dark:text-gray-300">
                    {props.project.solution}
                  </p>
                </div>
              </section>
            {/if}

            {#if props.project.features && props.project.features.length > 0}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200"
                >
                  Key Features
                </h3>
                <ul
                  class="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300"
                >
                  {#each props.project.features as feature}
                    <li>{feature}</li>
                  {/each}
                </ul>
              </section>
            {/if}

            {#if props.project.challenges}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200"
                >
                  Challenges & Learnings
                </h3>
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <p class="text-gray-700 dark:text-gray-300">
                    {props.project.challenges}
                  </p>
                </div>
              </section>
            {/if}

            {#if props.project.technologies && props.project.technologies.length > 0}
              <section>
                <h3
                  class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200"
                >
                  Technologies Used
                </h3>
                <div class="mt-3 flex flex-wrap gap-2">
                  {#each props.project.technologies as tech}
                    <span
                      class="rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tech}
                    </span>
                  {/each}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Live Demo
              </a>
            {/if}

            {#if props.project.githubUrl}
              <a
                href={props.project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center rounded-md bg-gray-800 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                GitHub Repository
              </a>
            {/if}

            <!-- {#if props.project.path}
                <a 
                  href={props.project.path} 
                  class="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md transition-colors font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  More Details
                </a>
              {/if} -->
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