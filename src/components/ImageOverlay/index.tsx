import { Dispatch, SetStateAction, useContext } from "react";
import { cn } from "../../utils/cn";
import { Context } from "../../context/ContextProvider";

const ImageOverlay = ({
  selectedId,
  setSelectedId,
}: {
  selectedId: string | null;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
}) => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const { listState } = context;
  return (
    <div
      className={cn(
        "absolute inset-0 transition-all",
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
            fill="#8CBCFF"
            d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
          />
        </svg>
      </div>
      <img
        src={listState?.find((item: any) => item.id === selectedId)?.img}
        loading="lazy"
        alt="overlay-image"
        draggable="false"
        className="object-contain w-[80%] md:w-[40vw] h-auto rounded shadow-2xl"
      />
    </div>
  );
};

export default ImageOverlay;
