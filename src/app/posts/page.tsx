import { createPost } from "@/actions/actions";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await prisma.post.findMany();

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">All Posts ({posts.length}) </h1>
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between">
            <Link href={`/posts/${post?.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <form action={createPost} className="flex flex-col gap-y-2 w-[300px]">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="px-2 py-1 rounded-sm"
        />
        <textarea
          name="content"
          placeholder="Content"
          className="px-2 py-1 rounded-sm"
        />
        <button type="submit" className="bg-black text-white rounded-sm py-2">
          Create Post
        </button>
      </form>
    </main>
  );
}
