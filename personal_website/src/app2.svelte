<script lang="ts">
  let count = $state(0);
</script>

<main class="flex min-h-screen flex-col items-center justify-center bg-gray-700">
  <h1 class="mb-4 text-4xl font-bold text-white">Welcome to my portfolio</h1>
  <button
    class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
    onclick={() => count++}
  >
    Count is {count}
  </button>
</main>
