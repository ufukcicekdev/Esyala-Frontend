import BlogDetail from "@/lib/fetch_data";



const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    <BlogDetail slug={slug} />
  );
}
