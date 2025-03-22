<script lang="ts">
  import { onMount } from "svelte";

  // Reactive variables for mute states.
  let isBackgroundMuted = $state(false);
  let isSfxMuted = $state(false);

  // Reference to the audio element.
  let bgAudio: HTMLAudioElement;

  // On component mount, assign the audio element.
  onMount(() => {
    bgAudio = new Audio("/media/audio/background.mp3");
    // Optionally, start playing immediately (with user interaction, autoplay
    // policies may require a click)
    // bgAudio.loop = true;
    // bgAudio.play();
  });

  function toggleBackground() {
    isBackgroundMuted = !isBackgroundMuted;
    if (bgAudio) {
      bgAudio.muted = isBackgroundMuted;
    }
  }

  function toggleSfx() {
    isSfxMuted = !isSfxMuted;
    // Here you would control your SFX audio logic.
    // For example, if you have an SFX audio element in your DOM:
    // const sfxAudio = document.getElementById("sfx-audio") as HTMLAudioElement;
    // if (sfxAudio) sfxAudio.muted = isSfxMuted;
  }

  // Paths for your SVG icons (located in public/media/svgs)
  const bgIcon = "./media/images/backgroundmusic.svg";
  const sfxIcon = "./media/images/sfx.svg";
  const mutedIcon = "./media/images/mute.svg";
</script>

<!-- Container for the buttons in the top-left, arranged horizontally -->
<div class="absolute top-4 left-4 flex flex-row gap-2 z-50">
  <!-- Background Music Toggle Button -->
  <button
    onclick={toggleBackground}
    class="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition"
    aria-label="Toggle Background Music"
  >
    {#if isBackgroundMuted}
      <img src={mutedIcon} alt="Background Muted" class="w-6 h-6" />
    {:else}
      <img src={bgIcon} alt="Background Unmuted" class="w-6 h-6" />
    {/if}
  </button>

  <!-- SFX Toggle Button -->
  <button
    onclick={toggleSfx}
    class="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition"
    aria-label="Toggle SFX"
  >
    {#if isSfxMuted}
      <img src={mutedIcon} alt="SFX Muted" class="w-6 h-6" />
    {:else}
      <img src={sfxIcon} alt="SFX Unmuted" class="w-6 h-6" />
    {/if}
  </button>
</div>
