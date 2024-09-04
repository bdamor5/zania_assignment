
export const fetchingListsApi = async () => {
    try {
        const response = await fetch("get/lists");
        let data = await response.json();
        return data

    } catch (error) {
        console.log(error);
    }
}

