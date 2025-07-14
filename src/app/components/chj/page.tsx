import ProfileCard from "@/components/ui/profileItem";

export default function ComponentPage() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div>
        <h2 className="mb-2">ProfileItem</h2>
        <div>
          <ProfileCard userName="여행덕후"></ProfileCard>
        </div>
      </div>
    </div>
  );
}
