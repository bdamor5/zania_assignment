import { Dispatch, SetStateAction } from "react";
import { SortedListInterface } from "../Interfaces/sortedListInterface";

export const fetchingListsApi = async (setListState: Dispatch<SetStateAction<SortedListInterface[]>>, setLoading: Dispatch<SetStateAction<boolean>>) => {
    try {
        const response = await fetch("get/lists");
        let { data } = await response.json();

        //to display loader, have provided a timeout for 3 sec
        setTimeout(() => {
            setLoading(false)
            setListState(data)
        }, 3000)

    } catch (error) {
        console.log(error);
        setListState([])
    }
}

