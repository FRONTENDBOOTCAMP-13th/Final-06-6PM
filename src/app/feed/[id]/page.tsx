import FeedDetailContainer from "@/components/feature/feedDetailContainer";

interface FeedDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FeedDetailPage({ params }: FeedDetailPageProps) {
  const { id } = await params;
  return <FeedDetailContainer reviewId={id} />;
}
