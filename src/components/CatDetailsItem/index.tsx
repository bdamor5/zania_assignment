import { CatDetailsItemInterface } from "../../Interfaces/catDetailsItemInterface";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "../../utils/cn";
import { Dispatch, SetStateAction } from "react";
import useLoading from "../../hooks/useLoading";

const CatDetailsItem = ({
  item,
  setSelectedId,
}: {
  item: CatDetailsItemInterface;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
}) => {
  const { id, title, img } = item;

  const sortable = useSortable({ id });
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes} // Attach attributes to the entire item
      className={cn(
        "bg-[#273a57] border-2 border-slate-300 hover:border-[#75aaff] w-60 h-auto rounded-lg shadow-md ",
        isDragging ? "opacity-75" : ""
      )}
      onClick={() => {
        setSelectedId(id);
        window.scrollTo(0, 0);
      }}
    >
      <div className="bg-white rounded-md rounded-b-none text-center bold relative">
        {title}
        <div
          className="absolute top-0.5 right-1.5 cursor-grab"
          {...listeners} // Apply listeners only to the drag handle
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20px"
            height="20px"
            color="#000"
          >
            <title>Grab</title>
            <path d="M12 16C13.1 16 14 16.9 14 18S13.1 20 12 20 10 19.1 10 18 10.9 16 12 16M12 10C13.1 10 14 10.9 14 12S13.1 14 12 14 10 13.1 10 12 10.9 10 12 10M12 4C13.1 4 14 4.9 14 6S13.1 8 12 8 10 7.1 10 6 10.9 4 12 4M6 16C7.1 16 8 16.9 8 18S7.1 20 6 20 4 19.1 4 18 4.9 16 6 16M6 10C7.1 10 8 10.9 8 12S7.1 14 6 14 4 13.1 4 12 4.9 10 6 10M6 4C7.1 4 8 4.9 8 6S7.1 8 6 8 4 7.1 4 6 4.9 4 6 4M18 16C19.1 16 20 16.9 20 18S19.1 20 18 20 16 19.1 16 18 16.9 16 18 16M18 10C19.1 10 20 10.9 20 12S19.1 14 18 14 16 13.1 16 12 16.9 10 18 10M18 4C19.1 4 20 4.9 20 6S19.1 8 18 8 16 7.1 16 6 16.9 4 18 4Z" />
          </svg>
        </div>
      </div>
      <div className="p-2 ">
        <div>
          <img src={img} loading="lazy" alt={title} draggable="false" />
        </div>
      </div>
    </div>
  );
};

export default CatDetailsItem;
