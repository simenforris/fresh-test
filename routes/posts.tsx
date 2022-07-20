/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from '$fresh/server.ts';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const handler: Handlers<Post[] | null> = {
  async GET(_, ctx) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      return ctx.render(null);
    }
    const posts: Post[] = await response.json();
    return ctx.render(posts);
  }
}

export default function Posts({ data }: PageProps<Post[] | null>) {
  if (!data) return <h1>Posts not found</h1>;

  return (
    <div>
      <h1>Posts</h1>
      <main>
        {data.map(post => (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
