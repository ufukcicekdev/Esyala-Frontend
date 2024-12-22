import { fetchBlogs } from "@/lib/blogApi/blog_api";
import BlogDetail from "@/lib/fetchData/fetch_data";



const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function generateStaticParams() {
  try {
    const response = await fetch(`${prodUrl}/blog/`);

    if (!response.ok) {
      throw new Error(`API isteği başarısız oldu: ${response.statusText}`);
    }

    const response2 = await response.json();
    console.log('API Yanıtı:', response2);  // Yanıtı logla

    return response2.data?.map((blog: { slug: string }) => ({
      slug: blog.slug,
    })) || [];  // Eğer data yoksa boş dizi döndür
  } catch (error) {
    console.error('Blog verisi alınırken hata oluştu:', error);
    return [];
  }
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
