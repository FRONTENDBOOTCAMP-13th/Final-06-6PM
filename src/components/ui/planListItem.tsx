import TagItem from "@/components/feature/tagItem";

export type PlanListItemProps = {
  id?: number;
  number?: number;
  place: string;
  tag?: string;
};

function PlanListItem({ number, place, tag }: PlanListItemProps) {
  return (
    <div className="flex items-center gap-2 text-travel-text100">
      {/* 숫자 */}
      <div className="text-center rounded-full size-6 bg-travel-gray200 text-14">
        {number}
      </div>

      {/* 관광지명과 태그 */}
      <div className="font-medium leading-none contents">
        <span>{place}</span>
        <TagItem variant="primary" size="sm">
          {tag}
        </TagItem>
      </div>
    </div>
  );
}

export default PlanListItem;
