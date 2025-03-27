import BlogDetailsData from "./_components/data";

type Props = {
  params: {
    slug: string;
  };
};

export default function BlogDetailsPage({ params }: Props) {
  return (
    <main className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-4 pb-16">
      <div className="container mx-auto max-w-7xl">
        <BlogDetailsData slug={params.slug} />
      </div>
    </main>
  );
}
