import { fetchBlogs } from "@/lib/blogApi/blog_api";
import BlogDetail from "@/lib/fetchData/fetch_data";



const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function generateStaticParams() {
  const response = await fetch(`${prodUrl}/blog/`);
  const response2 = await response.json();
  return response2.data.map((blog: { slug: string }) => ({
    slug: blog.slug,  
  }));
}


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <BlogDetail slug={slug} />
  );
}
