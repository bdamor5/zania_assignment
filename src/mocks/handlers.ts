// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
import { v4 as uuidv4 } from "uuid";

export const handlers = [

  //get - to fetch lists
  http.get('get/lists', () => {

    let lists = []

    const storedLists = localStorage.getItem('lists');

    //if the lists key is present in the LS, then we will simply initialize with it
    if (storedLists) {
      lists = JSON.parse(storedLists)
    } else {
      //but if there is no lists key present in LS, then we will save it to the LS
      lists = [
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
      localStorage.setItem('lists', JSON.stringify(lists))

      //same as lists key, if no 'lastSavedTime' key is present in Ls, then will save the current time as we are already saving the list in LS at current time
      if (!localStorage.getItem("lastSavedTime")) {
        const now = new Date();

        localStorage.setItem("lastSavedTime", now.toLocaleString());
      }
    }

    return HttpResponse.json({ data: lists }, { status: 200 });
  }),

  //post - save changes made to lists to LS
  http.post("post/lists", async ({ request }) => {
    const lists = await request.json();

    //saving payload to LS
    localStorage.setItem('lists', JSON.stringify(lists))

    //will update the lastSavedTime to the current time 
    const now = new Date();
    localStorage.setItem("lastSavedTime", now.toLocaleString());

    return HttpResponse.json(
      {
        message: "Success",
      },
      { status: 200 },
    );
  }),
]