<script lang="ts">
  import { sfx } from "./store.svelte"
  import { onMount, onDestroy } from "svelte"

  const bgIcon = "src/media/images/backgroundmusic.svg"
  const sfxIcon = "src/media/images/sfx.svg"
  const mutedIcon = "src/media/images/mute.svg"

  // Reactive variables for mute states.
  let isBackgroundMuted = $state(true)

  // Reference to the audio element.
  const bgAudio: HTMLAudioElement = new Audio(
    "src/media/audio/backgroundMusic.mp3"
  )
  bgAudio.volume = 0.2
  bgAudio.loop = true

  function toggleBackground() {
    isBackgroundMuted = !isBackgroundMuted
    if (bgAudio) {
      bgAudio.muted = isBackgroundMuted

      if (!isBackgroundMuted) {
        bgAudio.play().catch((error) => {
          console.error("Playback failed:", error)
        })
      } else {
        bgAudio.pause()
      }
    }
  }

  function toggleSfx() {
    sfx.sfxMuted = !sfx.sfxMuted
  }

  function handleKeydown(event: KeyboardEvent) {
    console.log("Key pressed:", event.key)

    if (event.key === "m" || event.key === "M") {
      toggleBackground()
      toggleSfx()
    } else if (event.key === "b" || event.key === "B") {
      toggleBackground()
    } else if (event.key === "n" || event.key === "N") {
      toggleSfx()
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  })
</script>

<!-- Container for the buttons in the top-left, arranged horizontally -->
<div class="absolute left-4 top-4 z-50 flex flex-row gap-2">
  <!-- Background Music Toggle Button -->
  <button
    onclick={toggleBackground}
    class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 transition hover:bg-blue-600"
    aria-label="Toggle Background Music"
  >
    {#if isBackgroundMuted}
      <img src={mutedIcon} alt="Background Muted" class="h-6 w-6" />
    {:else}
      <img src={bgIcon} alt="Background Unmuted" class="h-6 w-6" />
    {/if}
  </button>

  <!-- SFX Toggle Button -->
  <button
    onclick={toggleSfx}
    class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 transition hover:bg-green-600"
    aria-label="Toggle SFX"
  >
    {#if sfx.sfxMuted}
      <img src={mutedIcon} alt="SFX Muted" class="h-6 w-6" />
    {:else}
      <img src={sfxIcon} alt="SFX Unmuted" class="h-6 w-6" />
    {/if}
  </button>
</div>
