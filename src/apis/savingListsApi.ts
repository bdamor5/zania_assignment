import { Dispatch, SetStateAction } from 'react';
import { SortedListInterface } from '../Interfaces/sortedListInterface';

export const savingListsApi = async (setTimerStatus: Dispatch<SetStateAction<boolean>>, payload: SortedListInterface[]) => {
    try {
        const response = await fetch("post/lists", {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        let data = await response.json();
        setTimeout(async () => {
            console.log('4-res')
            setTimerStatus(false)
            return data

        }, 2000)


    } catch (error) {
        console.log(error);
    }
}
