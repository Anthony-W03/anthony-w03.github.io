import type { ServerLoad } from '@sveltejs/kit';

interface Post {
  title: string;
  content: string;
}

export const load: ServerLoad = async ({ fetch }) => {
  try {
    const response = await fetch('http://localhost:3000/api/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts: Post[] = await response.json();
    
    return {
      posts
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: []
    };
  }
};
