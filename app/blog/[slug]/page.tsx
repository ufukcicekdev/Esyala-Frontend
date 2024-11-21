import BlogDetail from "./fetch_data";

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
