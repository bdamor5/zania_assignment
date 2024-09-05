import { Dispatch, SetStateAction } from 'react';
import { SortedListInterface } from '../Interfaces/sortedListInterface';
import { isEqual } from "lodash";

export const savingListsApi = async (setSavingStatus: Dispatch<SetStateAction<boolean>>, payload: SortedListInterface[]) => {
    try {

        const storedLists = localStorage.getItem("lists")
            ? JSON.parse(localStorage.getItem("lists") || "")
            : "";

        //using lodash 'isEqual', doing a deep check to make sure that the save api gets called only when the previous state and the new state are different
        if (!isEqual(payload, storedLists)) {

            await fetch("post/lists", {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            setSavingStatus(true)

            //to display saving progress text, have provided a timeout for 3 sec
            setTimeout(async () => {
                setSavingStatus(false)
            }, 3000)
        }

    } catch (error) {
        console.log(error);
        setSavingStatus(false)
    }
}
