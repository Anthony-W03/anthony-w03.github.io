<!-- ProjectCarousel.svelte -->
<script lang="ts">
  import { cubicOut } from "svelte/easing"
  import type { Project } from "./types"

  const { projects, hoveredProject, onProjectHover, onProjectSelect } = $props<{
    projects: Project[]
    hoveredProject: Project | null
    onProjectHover: (project: Project | null) => void
    onProjectSelect: (project: Project) => void
  }>()

  let currentIndex = $state(0)
  let isTransitioning = $state(false)
  let animationDirection = $state(0)

  // Track position and scale for each card
  let positions = $state([-100, 0, 100]) // [prev, current, next] positions
  let scales = $state([0.75, 1, 0.75]) // [prev, current, next] scales
  let opacities = $state([0.6, 1, 0.6]) // [prev, current, next] opacities

  // Track which project is visually in focus during animation
  let visualFocusIndex = $state(0)

  // Initialize positions
  $effect(() => {
    resetAnimationState()
    visualFocusIndex = currentIndex
  })

  function resetAnimationState() {
    positions = [-100, 0, 100] // Left, center, right positions (in %)
    scales = [0.75, 1, 0.75] // Small, large, small
    opacities = [0.6, 1, 0.6] // Dim, full, dim
    animationDirection = 0
  }

  async function nextProject() {
    if (isTransitioning) return //play around with this later
    isTransitioning = true
    animationDirection = 1

    // Start with current values
    let startPositions = [...positions]
    let startScales = [...scales]
    let startOpacities = [...opacities]

    // Calculate next index
    const nextIndex = (currentIndex + 1) % projects.length

    // Prepare the new off-screen element (will come from right)
    // Add a new position for the incoming element (further right)
    positions = [...startPositions, 200]
    scales = [...startScales, 0.5] // Start small
    opacities = [...startOpacities, 0] // Start invisible

    // Add a small delay to ensure the DOM is ready
    await new Promise((r) => setTimeout(r, 10))

    // Animate the transition
    for (let i = 0; i <= 100; i += 4) {
      // Calculate progress with easing
      const progress = cubicOut(i / 100)

      // Update positions - slide everything left
      positions[0] = startPositions[0] - 100 * progress // prev moves further left (off-screen)
      positions[1] = startPositions[1] - 100 * progress // current moves left
      positions[2] = startPositions[2] - 100 * progress // next moves to center
      positions[3] = 200 - 100 * progress // new element moves in from far right

      // Update scales - current shrinks, next grows
      scales[0] = startScales[0] * (1 - progress) + 0.5 * progress // prev gets smaller
      scales[1] = startScales[1] * (1 - progress) + 0.75 * progress // current shrinks
      scales[2] = startScales[2] * (1 - progress) + 1 * progress // next grows
      scales[3] = 0.5 * (1 - progress) + 0.75 * progress // new element grows slightly

      // Update opacities - ensure next element stays visible
      opacities[0] = Math.max(0, startOpacities[0] * (1 - progress)) // prev fades out
      opacities[1] = Math.max(
        0.6,
        startOpacities[1] * (1 - progress) + 0.6 * progress
      ) // current dims
      opacities[2] = Math.max(0.6, startOpacities[2]) // next stays visible throughout
      opacities[3] = 0 * (1 - progress) + 0.6 * progress // new element fades in

      // Update visual focus at halfway point
      if (i >= 50 && visualFocusIndex !== nextIndex) {
        visualFocusIndex = nextIndex
        onProjectHover(projects[nextIndex])
      }

      await new Promise((r) => setTimeout(r, 10)) // 10ms delay between frames
    }

    // Update index after animation
    currentIndex = nextIndex
    resetAnimationState()
    isTransitioning = false

    onProjectHover(getCurrentProject())
  }

  async function prevProject() {
    if (isTransitioning) return
    isTransitioning = true
    animationDirection = -1

    // Start with current values
    let startPositions = [...positions]
    let startScales = [...scales]
    let startOpacities = [...opacities]

    // Calculate next index
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length

    // Prepare the new off-screen element (will come from left)
    positions = [-200, ...startPositions] // Add new position for incoming element (further left)
    scales = [0.5, ...startScales] // Start small
    opacities = [0, ...startOpacities] // Start invisible

    // Add a small delay to ensure the DOM is ready
    await new Promise((r) => setTimeout(r, 10))

    // Animate the transition
    for (let i = 0; i <= 100; i += 4) {
      // Calculate progress with easing
      const progress = cubicOut(i / 100)

      // Update positions - slide everything right
      positions[0] = -200 + 100 * progress // new element moves in from far left
      positions[1] = startPositions[0] + 100 * progress // prev moves to center
      positions[2] = startPositions[1] + 100 * progress // current moves right
      positions[3] = startPositions[2] + 100 * progress // next moves further right (off-screen)

      // Update scales
      scales[0] = 0.5 * (1 - progress) + 0.75 * progress // new element grows slightly
      scales[1] = startScales[0] * (1 - progress) + 1 * progress // prev grows
      scales[2] = startScales[1] * (1 - progress) + 0.75 * progress // current shrinks
      scales[3] = startScales[2] * (1 - progress) + 0.5 * progress // next gets smaller

      // Update opacities
      opacities[0] = 0 * (1 - progress) + 0.6 * progress // new element fades in
      opacities[1] = Math.max(
        0.6,
        startOpacities[0] * (1 - progress) + 1 * progress
      ) // prev becomes fully visible
      opacities[2] = Math.max(
        0.6,
        startOpacities[1] * (1 - progress) + 0.6 * progress
      ) // current dims
      opacities[3] = Math.max(0, startOpacities[2] * (1 - progress)) // next fades out

      // Update visual focus at halfway point
      if (i >= 50 && visualFocusIndex !== prevIndex) {
        visualFocusIndex = prevIndex
        onProjectHover(projects[prevIndex])
      }

      await new Promise((r) => setTimeout(r, 10)) // 10ms delay between frames
    }

    // Update index after animation
    currentIndex = prevIndex
    resetAnimationState()
    isTransitioning = false

    onProjectHover(getCurrentProject())
  }

  function getProjectIndex(offset: number) {
    return (currentIndex + offset + projects.length) % projects.length
  }

  function getCurrentProject() {
    return projects[currentIndex]
  }

  export function next() {
    if (!isTransitioning) {
      nextProject()
    }
  }

  export function prev() {
    if (!isTransitioning) {
      prevProject()
    }
  }

  export function goTo(index: number) {
    if (isTransitioning || index === currentIndex) return

    const direction = index > currentIndex ? 1 : -1
    const distance = Math.min(
      Math.abs(index - currentIndex),
      projects.length - Math.abs(index - currentIndex)
    )

    // Determine which animation to use
    if (direction > 0) {
      for (let step = 0; step < distance; step++) {
        nextProject()
      }
    } else {
      for (let step = 0; step < distance; step++) {
        prevProject()
      }
    }
  }

  // Auto-hover the current project on initial load
  $effect(() => {
    if (projects.length > 0 && !isTransitioning) {
      onProjectHover(projects[currentIndex])
    }
  })
</script>

<!--onmouseleave={()=>!isTransitioning && onProjectHover(projects[currentIndex])}-->
<div class="carousel-container mb-8 mt-auto w-full">
  <div class="carousel-content">
    <div class="mb-4 flex items-center justify-between">
      <button
        class="carousel-nav-btn z-10 rounded-full bg-green-700 p-3 text-white shadow-lg transition-colors duration-200 hover:bg-green-600"
        onclick={prevProject}
        aria-label="Previous project"
        disabled={isTransitioning}
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

      <div
        class="carousel-items relative mx-4 h-[160px] flex-1 overflow-hidden"
      >
        <div
          class="carousel-track absolute inset-0 flex items-center justify-center"
        >
          <!-- New Previous Element (Far Left) - Only visible during prev animation -->
          {#if positions.length > 3}
            <div
              class="carousel-item absolute"
              style="transform: translateX({positions[0]}%) scale({scales[0]}); opacity: {opacities[0]};"
            >
              <button
                class="hexagon-btn relative
                        {visualFocusIndex === getProjectIndex(-2)
                  ? 'bg-green-500'
                  : 'bg-green-700 hover:bg-green-600'}"
              >
                <div
                  class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"
                >
                  {projects[getProjectIndex(-2)].title}
                </div>
              </button>
            </div>
          {/if}

          <!-- Previous Project (Left) -->
          <div
            class="carousel-item absolute"
            style="transform: translateX({positions[
              positions.length > 3 ? 1 : 0
            ]}%) scale({scales[
              positions.length > 3 ? 1 : 0
            ]}); opacity: {opacities[positions.length > 3 ? 1 : 0]};"
          >
            <button
              class="hexagon-btn relative
                      {visualFocusIndex === getProjectIndex(-1)
                ? 'bg-green-500'
                : 'bg-green-700 hover:bg-green-600'}"
              onmouseenter={() =>
                !isTransitioning &&
                onProjectHover(projects[getProjectIndex(-1)])}
              onmouseleave={() =>
                !isTransitioning && onProjectHover(getCurrentProject())}
              onclick={() => !isTransitioning && prevProject()}
            >
              <div
                class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"
              >
                {isTransitioning && animationDirection === 1
                  ? projects[currentIndex].title
                  : projects[getProjectIndex(-1)].title}
              </div>
            </button>
          </div>

          <!-- Current Project (Center) -->
          <div
            class="carousel-item absolute z-10"
            style="transform: translateX({positions[
              positions.length > 3 ? 2 : 1
            ]}%) scale({scales[
              positions.length > 3 ? 2 : 1
            ]}); opacity: {opacities[positions.length > 3 ? 2 : 1]};"
          >
            <button
              class="hexagon-btn relative
                      {visualFocusIndex === currentIndex
                ? 'bg-green-500'
                : 'bg-green-700 hover:bg-green-600'}"
              onmouseenter={() =>
                !isTransitioning && onProjectHover(getCurrentProject())}
              onmouseleave={() =>
                !isTransitioning && onProjectHover(getCurrentProject())}
              onclick={() =>
                !isTransitioning && onProjectSelect(projects[currentIndex])}
            >
              <div
                class="absolute inset-0 flex items-center justify-center font-bold text-white"
              >
                {isTransitioning && animationDirection === 1
                  ? projects[getProjectIndex(1)].title
                  : projects[currentIndex].title}
              </div>
            </button>
          </div>

          <!-- Next Project (Right) -->
          <div
            class="carousel-item absolute"
            style="transform: translateX({positions[
              positions.length > 3 ? 3 : 2
            ]}%) scale({scales[
              positions.length > 3 ? 3 : 2
            ]}); opacity: {opacities[positions.length > 3 ? 3 : 2]};"
          >
            <button
              class="hexagon-btn relative
                      {visualFocusIndex === getProjectIndex(1)
                ? 'bg-green-500'
                : 'bg-green-700 hover:bg-green-600'}"
              onmouseenter={() =>
                !isTransitioning &&
                onProjectHover(projects[getProjectIndex(1)])}
              onmouseleave={() =>
                !isTransitioning && onProjectHover(getCurrentProject())}
              onclick={() => !isTransitioning && nextProject()}
            >
              <div
                class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"
              >
                {isTransitioning && animationDirection === 1
                  ? projects[getProjectIndex(2)].title
                  : projects[getProjectIndex(1)].title}
              </div>
            </button>
          </div>

          <!-- New Next Element (Far Right) - Only visible during next animation -->
          {#if positions.length > 3}
            <div
              class="carousel-item absolute"
              style="transform: translateX({positions[
                positions.length - 1
              ]}%) scale({scales[scales.length - 1]}); opacity: {opacities[
                opacities.length - 1
              ]};"
            >
              <button
                class="hexagon-btn relative
                        {visualFocusIndex === getProjectIndex(2)
                  ? 'bg-green-500'
                  : 'bg-green-700 hover:bg-green-600'}"
              >
                <div
                  class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"
                >
                  {projects[getProjectIndex(2)].title}
                </div>
              </button>
            </div>
          {/if}
        </div>
      </div>

      <button
        class="carousel-nav-btn z-10 rounded-full bg-green-700 p-3 text-white shadow-lg transition-colors duration-200 hover:bg-green-600"
        onclick={nextProject}
        aria-label="Next project"
        disabled={isTransitioning}
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
    </div>

    <div class="carousel-indicators mt-4 flex justify-center space-x-2">
      {#each projects as _, i}
        <button
          class="h-2 w-8 rounded-full transition-colors duration-200 {i ===
          currentIndex
            ? 'bg-green-500'
            : 'bg-gray-600 hover:bg-gray-500'}"
          onclick={async () => {
            if (isTransitioning || i === currentIndex) return

            const direction = i > currentIndex ? 1 : -1
            const distance = Math.min(
              Math.abs(i - currentIndex),
              projects.length - Math.abs(i - currentIndex)
            )

            // Determine which animation to use
            if (direction > 0) {
              for (let step = 0; step < distance; step++) {
                await nextProject()
              }
            } else {
              for (let step = 0; step < distance; step++) {
                await prevProject()
              }
            }
          }}
          aria-label={`Go to project ${i + 1}`}
        ></button>
      {/each}
    </div>
  </div>
</div>

<style lang="postcss">
  .carousel-container {
    position: relative;
  }

  .carousel-items {
    position: relative;
  }

  .carousel-track {
    width: 100%;
  }

  .carousel-item {
    will-change: transform, opacity;
  }

  .hexagon-btn {
    width: 140px;
    height: 160px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    position: relative;
    transition: background-color 0.2s ease;
  }

  .hexagon-btn:hover {
    transform: scale(1.05);
  }

  .carousel-nav-btn {
    flex-shrink: 0;
  }

  .carousel-nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .carousel-indicators {
    margin-top: 1rem;
  }
</style>
