import { useContext, useEffect, useMemo, useState } from "react";
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
import { cloneDeep } from "lodash";
import CatDetailsItem from "./components/CatDetailsItem";
import MainLayout from "./layout/mainLayout";
import { cn } from "./utils/cn";
import useSavingData from "./hooks/useSavingData";
import { fetchingListsApi } from "./apis/fetchingListsApi";
import { Context } from "./context/ContextProvider";

const App = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const { listState, setListState } = context;
  const [timerStatus] = useSavingData(listState);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    const getListsApiCall = async () => {
      let { data } = await fetchingListsApi();
      setListState(data);
      setLoading(false);
    };

    let timeout = setTimeout(() => {
      getListsApiCall();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

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

  let lastSavedTime = localStorage.getItem("lastSavedTime");

  //1 - Display a placeholder spinner for each image that is loading.
  //2 - Have the frontend call the REST API for saving every five seconds (not every action).
  //3 - Display a loading spinner whenever it is saving
  //4 - how long has passed since the last
  //5 - Avoid saving if no changes have been made.
  //6 - readme file for features added & approach breakdown
  //7 - ui improvements

  return (
    <MainLayout className="flex flex-col items-center relative">
      <div className="text-white text-lg md:text-4xl mt-10 text-center">
        Common Bank Terminologies
      </div>

      {loading && !listState?.length ? (
        <div className="py-40 grid place-items-center ">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="text-white my-6">
            {timerStatus ? "Saving..." : `Last saved at ${lastSavedTime}`}
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={listState} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {listState?.map((item) => (
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
        </>
      )}
    </MainLayout>
  );
};

export default App;
