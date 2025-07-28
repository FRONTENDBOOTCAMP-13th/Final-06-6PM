import FeedDetailContent from "@/components/feature/feedDetailContent";

interface FeedViewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FeedViewPage({ params }: FeedViewPageProps) {
  const { id } = await params;
  return <FeedDetailContent reviewId={id} />;
}
