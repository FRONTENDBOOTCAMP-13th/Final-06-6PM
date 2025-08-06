import FeedDetailContainer from "@/components/feed/feedDetailContainer";

interface FeedDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FeedDetailPage({ params }: FeedDetailPageProps) {
  const { id } = await params;
  return (
    <>
      <h1 className="bg-white sr-only">여행후기 상세페이지</h1>
      <FeedDetailContainer reviewId={id} />
    </>
  );
}
