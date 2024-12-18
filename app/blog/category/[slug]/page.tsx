
import { fetchBlogs } from "@/lib/blogApi/blog_api";
import BlogCategoryData from "./get_data";

const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CategoryBlog {
  title: string;
  short_description: string;
  created_at: string;
  banner: string;
  views: number;
  slug:string;
  category?: {
      name: string;
      slug: string;
  };
}



export async function generateStaticParams() {
  const response = await fetch(`${prodUrl}/blog/`);
  
  const categories = await response.json();

  return categories.data.map((category: { slug: string }) => ({
      slug: category.slug,  
  }));
}





export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
 
      <BlogCategoryData slug={slug} />

  );
}
