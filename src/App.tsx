import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortedListInterface } from "./Interfaces/sortedListInterface";
import { v4 as uuidv4 } from "uuid";
import { cloneDeep } from "lodash";
import CatDetailsItem from "./components/CatDetailsItem";
import MainLayout from "./layout/mainLayout";
import { cn } from "./utils/cn";

const initialList: SortedListInterface[] = [
  {
    id: uuidv4(),
    type: "bank-draft",
    title: "Bank Draft",
    position: 0,
    img: "https://www.investopedia.com/thmb/eNOLBrNduqWVXXaZoL7TBrz5K3Q=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bank_draft.asp-final-35945f3f9c564736ac750dbae92cd7bb.png",
  },
  {
    id: uuidv4(),
    type: "bill-of-lading",
    title: "Bill of Lading",
    position: 1,
    img: "https://www.investopedia.com/thmb/9WQw7ZFVunm-zPuXhZ-Vdv84-OU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Bill-of-Lading-aa8fd78edd1c4c0b831659a00a3980b3.jpg",
  },
  {
    id: uuidv4(),
    type: "invoice",
    title: "Invoice",
    position: 2,
    img: "https://www.investopedia.com/thmb/cggyGUqIdTYbDpVNtTtKzAC1eFg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/invoice-e524b818ade24effb189a44b3f013098.jpg",
  },
  {
    id: uuidv4(),
    type: "bill-of-exchange",
    title: "Bill of Exchange",
    position: 3,
    img: "https://www.investopedia.com/thmb/j1qHQxNmnB3UDZlhpF9as0W8W04=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/billofexchange-d2089df9129c4a3ea1088e909096e63c.jpg",
  },
  {
    id: uuidv4(),
    type: "personal-bank-loans",
    title: "Personal Bank Loans",
    position: 4,
    img: "https://www.investopedia.com/thmb/MJ3BM5Wzw3HbWiEpR9Ddn9Qr094=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-are-personal-bank-loans-7852430-FINAL-1-1d61a8a81f294a969ef9845bf5a916cf.png",
  },
];

const App = () => {
  const [listState, setListState] =
    useState<SortedListInterface[]>(initialList);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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

        return updatedItems;
      });
    }
  }

  return (
    <MainLayout className="flex flex-col items-center relative">
      <div className="text-white text-lg md:text-4xl my-10 text-center">Common Bank Terminologies</div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={listState} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {listState.map((item) => (
              <CatDetailsItem
                key={item.id}
                item={item}
                setSelectedId={setSelectedId}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div
        className={cn(
          "absolute inset-0",
          selectedId
            ? "flex backdrop-blur-md justify-center items-start md:items-center pt-36 md:pt-0"
            : "hidden"
        )}
      >
        <div className="absolute top-1 md:top-5 right-1 md:right-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="50px"
            color="#fff"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedId(null)}
          >
            <title>Close</title>
            <path
              fill="currentColor"
              d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
            />
          </svg>
        </div>
        <img
          src={listState?.find((item: any) => item.id === selectedId)?.img}
          loading="lazy"
          alt="overlay-image"
          draggable="false"
          className="object-contain md:object-cover w-[80%] md:w-[45vw] h-auto md:h-[50vh] shadow-lg"
        />
      </div>
    </MainLayout>
  );
};

export default App;
