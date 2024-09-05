import { useContext, useEffect, useState } from "react";
import { fetchingListsApi } from "./apis/fetchingListsApi";
import { Context } from "./context/ContextProvider";
import ImageOverlay from "./components/ImageOverlay";
import SaveStatusComponent from "./components/SaveStatusComponent";
import DetailsGrid from "./components/DetailsGrid";
import Loader from "./common/Loader";

const App = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null); //handles selection of card to display overlay
  const [loading, setLoading] = useState<boolean>(true); //handles loading for get api call

  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const { setListState } = context;

  //making a get call to fetch lists
  useEffect(() => {
    fetchingListsApi(setListState, setLoading);
  }, []);

  return (
    <div className="flex flex-col items-center relative">
      <div className="text-white text-lg md:text-4xl mt-10 text-center">
        Common Bank Terminologies
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {/*component displays save status */}
          <SaveStatusComponent />

          {/*component handles the draggable cards feature */}
          <DetailsGrid setSelectedId={setSelectedId} />

          {/*component handles car image overlay */}
          <ImageOverlay selectedId={selectedId} setSelectedId={setSelectedId} />
        </>
      )}
    </div>
  );
};

export default App;
