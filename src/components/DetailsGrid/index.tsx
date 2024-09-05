import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DetailsItem from "../DetailsItem";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import { cloneDeep } from "lodash";

const DetailsGrid = ({
  setSelectedId,
}: {
  setSelectedId: Dispatch<SetStateAction<string | null>>;
}) => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const { listState, setListState } = context;
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  //closing image overlay when esc key is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setListState((prev: any) => {
        //finding old & new index as per active & over value
        const oldIndex = prev.findIndex((item: any) => item.id === active.id);
        const newIndex = prev.findIndex((item: any) => item.id === over.id);

        const updatedItems = cloneDeep(prev);

        //will remove value from old index and then insert that same value at new index
        const [movedItem] = updatedItems.splice(oldIndex, 1);
        updatedItems.splice(newIndex, 0, movedItem);

        return updatedItems?.map((curr: any, index: number) => ({
          ...curr,
          position: index,
        }));
      });
    }
  }

  return (
    <div>
      {listState?.length ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={listState} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {listState?.map((item) => (
                <DetailsItem
                  key={item.id}
                  item={item}
                  setSelectedId={setSelectedId}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="text-white text-2xl mt-10">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>alert-circle-outline</title>
              <path
                fill="#fff"
                d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
              />
            </svg>
          </div>
          Data Not Found
        </div>
      )}
    </div>
  );
};

export default DetailsGrid;
