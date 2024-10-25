<script lang="ts">
  interface PageData {
    posts: {
      title: string;
      content: string;
    }[];
  }

  export let data: PageData;
</script>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Posts</h1>
  
  <div class="grid gap-4">
    {#if data.posts && data.posts.length > 0}
      {#each data.posts as post}
        <div class="p-4 border rounded-lg shadow">
          <h2 class="text-xl font-semibold">{post.title}</h2>
          <p class="text-gray-600">{post.content}</p>
        </div>
      {/each}
    {:else}
      <p>No posts available.</p>
    {/if}
  </div>
</div>
