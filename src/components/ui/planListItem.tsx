export type PlanListItemProps = {
  id?: number;
  number?: number;
  title: string;
  tag: string;
};

const PlanListItem = ({ id, number, title, tag }: PlanListItemProps) => {
  return (
    <div className="flex items-center gap-2 px-6 py-3">
      {/* 숫자 */}
      <div className="w-6 h-6 bg-travel-gray300 text-black rounded-full flex items-center justify-center text-14 font-bold">
        {number}
      </div>

      {/* 관광지명과 태그 */}
      <div className="flex-1">
        <span className="text-16 font-medium text-travel-text200 mb-1">
          {title}
        </span>
        <span className="text-10 ml-1 text-white bg-travel-primary200 px-2 py-1 rounded-4xl">
          {tag}
        </span>
      </div>
    </div>
  );
};

export default PlanListItem;
