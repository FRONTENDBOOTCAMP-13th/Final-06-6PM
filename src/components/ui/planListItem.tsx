export type PlanListItemProps = {
  id?: number;
  number?: number;
  title: string;
  tag: string;
};

const PlanListItem = ({ number, title, tag }: PlanListItemProps) => {
  return (
    <div className="flex items-center gap-2 text-travel-text100">
      {/* 숫자 */}
      <div className="w-6 h-6 bg-travel-gray200  rounded-full flex items-center justify-center text-14 font-bold">
        {number}
      </div>

      {/* 관광지명과 태그 */}
      <span className="text-16 font-medium">{title}</span>
      <span className="text-10 text-white bg-travel-secondary200 px-2 py-1 rounded-4xl">
        {tag}
      </span>
    </div>
  );
};

export default PlanListItem;
