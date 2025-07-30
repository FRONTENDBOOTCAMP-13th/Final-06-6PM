import TagItem from "@/components/feature/tagItem";

export type PlanListItemProps = {
  id?: number;
  number?: number;
  place: string;
  tag?: string;
};

export default function PlanListItem({ number, place, tag }: PlanListItemProps) {
  return (
    <div className="flex items-start gap-3 text-travel-text100">
      {/* 숫자 */}
      <div className="flex-shrink-0 text-center rounded-full size-5 bg-travel-gray200 text-14 mt-0.5">{number}</div>

      {/* 관광지명과 태그 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-medium text-16">{place}</span>
          {tag && (
            <TagItem variant="primary" size="sm">
              {tag}
            </TagItem>
          )}
        </div>
      </div>
    </div>
  );
}
