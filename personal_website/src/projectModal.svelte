<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import type { Project } from './types';
  
    const props = $props<{
      project: Project | null;
      onClose: () => void;
    }>();
  
    let modalElement: HTMLDivElement;
    
    // Handle click outside
    function handleOutsideClick(event: MouseEvent) {
      if (modalElement && !modalElement.contains(event.target as Node)) {
        props.onClose();
      }
    }
  
    // Handle escape key
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        props.onClose();
      }
    }
  
    onMount(() => {
      document.addEventListener('keydown', handleKeydown);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    });
  
    onDestroy(() => {
      document.removeEventListener('keydown', handleKeydown);
      // Restore body scrolling when modal is closed
      document.body.style.overflow = '';
    });
  </script>
  
  {#if props.project}
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      aria-label="Project Modal"
      onclick={handleOutsideClick}
      transition:fade={{ duration: 200 }}
    >
      <div
        bind:this={modalElement}
        class="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col"
        transition:fly={{ y: 20, duration: 300, easing: cubicOut }}
      >
        <!-- Close button -->
        <button 
          class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onclick={props.onClose}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
  
        <!-- Modal content -->
        <div class="overflow-y-auto flex-grow">
          <!-- Project image -->
          <div class="relative w-full h-64 sm:h-80 md:h-96 bg-gray-200 dark:bg-gray-700">
            <img 
              src={props.project.imageUrl} 
              alt={props.project.title}
              class="w-full h-full object-cover"
            />
          </div>
  
          <!-- Project details -->
          <div class="p-6">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {props.project.title}
            </h2>
            
            <p class="text-gray-700 dark:text-gray-300 mb-6">
              {props.project.description}
            </p>
  
            {#if props.project.detailedDescription}
              <div class="mb-6">
                <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  About this project
                </h3>
                <p class="text-gray-700 dark:text-gray-300">
                  {props.project.detailedDescription}
                </p>
              </div>
            {/if}
  
            {#if props.project.features && props.project.features.length > 0}
              <div class="mb-6">
                <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Key Features
                </h3>
                <ul class="list-disc pl-5 text-gray-700 dark:text-gray-300">
                  {#each props.project.features as feature}
                    <li class="mb-1">{feature}</li>
                  {/each}
                </ul>
              </div>
            {/if}
  
            {#if props.project.technologies && props.project.technologies.length > 0}
              <div class="mb-6">
                <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Technologies Used
                </h3>
                <div class="flex flex-wrap gap-2">
                  {#each props.project.technologies as tech}
                    <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200">
                      {tech}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}
  
            <!-- Project links -->
            <div class="flex flex-wrap gap-4 mt-6">
              {#if props.project.demoUrl}
                <a 
                  href={props.project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Live Demo
                </a>
              {/if}
              
              {#if props.project.githubUrl}
                <a 
                  href={props.project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md transition-colors"
                >
                  View Code
                </a>
              {/if}
              
              <a 
                href={props.project.path} 
                class="px-6 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
              >
                Project Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  