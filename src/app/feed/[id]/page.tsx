import FeedDetailContent from "@/components/feature/feedDetailContent";

interface FeedViewPageProps {
  params: {
    id: string;
  };
}

export default function FeedViewPage({ params }: FeedViewPageProps) {
  return <FeedDetailContent reviewId={params.id} />;
}
