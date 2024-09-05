# Zania Assignment For Frontend Position made with React + TypeScript + Vite

### To run the project 

```js
npm install
```

```js
npm run dev
```
# Insights
* Styling was achieved using `Tailwind` and drag-and-drop feature was implemented using `@dnd-kit` package. Also have used `lodash` & `uuid` packages for accessibilities.
* To perform a drag-and-drop operation for a card, grab the card from the top-right 'grab' icon.
* To observe the `image overlay feature`, click on a card. Also, you can close the overlay by clicking on the `top-right icon` or by pressing the `ESC` key.
* Have added `3 seconds` of delay for both fetching & saving responses to make loaders visible.
* Lists state is managed using `useContext` Api. Also saving both lists & last updated time in the Local storage to keep data consistent in the application.

# Future Improvements 
* Adding a key-based or arrow-based navigation in the image overlay to browse through all the available cards.
* Adding a custom button to save the list changes.
* Infinite loading for displaying more cards.
