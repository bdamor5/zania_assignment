// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
import { v4 as uuidv4 } from "uuid";

export const handlers = [

  http.get('get/lists', () => {

    let lists = []

    const storedLists = localStorage.getItem('lists');
    if (storedLists) {
      lists = JSON.parse(storedLists)
    } else {
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

      if (!localStorage.getItem("lastSavedTime")) {
        const now = new Date();

        localStorage.setItem("lastSavedTime", now.toLocaleString());
      }
    }

    return HttpResponse.json({ data: lists }, { status: 200 });
  }),

  http.post("post/lists", async ({ request }) => {
    const lists = await request.json();
    console.log(lists);

    localStorage.setItem('lists', JSON.stringify(lists))

    const now = new Date();
    localStorage.setItem("lastSavedTime", now.toLocaleString());

    return HttpResponse.json(
      {
        message: "Success",
        data: lists,
      },
      { status: 200 },
    );
  }),
]