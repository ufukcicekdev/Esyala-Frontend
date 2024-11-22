import BlogDetail from "@/lib/fetch_data";



export async function generateStaticParams() {
  const response = await fetch('https://esyala-backend-production.up.railway.app/blog/');
  
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
    <main id="mt-main">

      <BlogDetail slug={slug} />

    </main>
  );
}
