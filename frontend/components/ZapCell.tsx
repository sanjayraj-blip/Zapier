const ZapCell = ({
  name,
  index,
  onClick,
}: {
  name?: string;
  index: number;
  onClick: () => void;
}) => {
  return (
    <div
      className="border border-black pt-8 pl-8 pb-8 flex w-[300px] justify-center items-center cursor-pointer rounded-lg"
      onClick={onClick}
    >
      <div className="flex text-xl gap-4 items-center">
        <div className="font-bold text-2xl">{index}</div>
        <div className="text-base">{name ? name : "Trigger"}</div>
      </div>
    </div>
  );
};

export default ZapCell;
