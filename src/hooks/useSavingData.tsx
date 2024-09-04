import { useState, useEffect, useContext } from "react";
import { savingListsApi } from "../apis/savingListsApi";
import { debounce, isEqual } from "lodash";
import { SortedListInterface } from "../Interfaces/sortedListInterface";

const useSavingData = (listState: SortedListInterface[], timer = 5000) => {
  const [timerStatus, setTimerStatus] = useState<boolean>(true);

  const storedLists = localStorage.getItem("lists")
    ? JSON.parse(localStorage.getItem("lists") || "")
    : "";

  useEffect(() => {
    let interval = setInterval(() => {
      console.log("0-check", storedLists, listState);
      if (isEqual(listState, storedLists)) {
        console.log("1-equal");
        setTimerStatus(false);
      } else {
        console.log("2-not-equal");
        setTimerStatus(true);
      }
    }, timer);

    return () => {
      clearInterval(interval);
    };
  }, [timerStatus, listState, localStorage.getItem("lists")]);

  let savingUpdatedLists = () => {
    savingListsApi(setTimerStatus, listState);
  };

  if (timerStatus && listState?.length) {
    console.log("3-api-call");
    debounce(savingUpdatedLists, 500);
  }

  return [timerStatus];
};

export default useSavingData;
