import { useState, useEffect } from "react";
import { savingListsApi } from "../apis/savingListsApi";
import { SortedListInterface } from "../Interfaces/sortedListInterface";

const useSavingData = (listState: SortedListInterface[], timer = 5000) => {
  const [savingStatus, setSavingStatus] = useState<boolean>(false);

  let savingUpdatedLists = () => {
    console.log("00000-save");
    savingListsApi(setSavingStatus, listState);
  };

  //for every interval of 'timer' seconds, we will invoke savingUpdatedLists which handles making the save api call only when the change to the lists is made
  useEffect(() => {
    let interval = setInterval(() => {
      savingUpdatedLists();
    }, timer);

    //cleaning the interval
    return () => {
      clearInterval(interval);
    };
  }, [savingStatus, listState]);

  return [savingStatus];
};

export default useSavingData;
