import { useContext } from "react";
import useSavingData from "../../hooks/useSavingData";
import { Context } from "../../context/ContextProvider";

const SaveStatusComponent = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const { listState } = context;

  const [savingStatus] = useSavingData(listState); //custom hook handling saving any changes every 5 sec

  //this function calculates how much time has been passed since the data was last saved
  let lastSavedTime = () => {
    let dateString = localStorage.getItem("lastSavedTime");

    const inputDate = dateString ? new Date(dateString) : new Date();
    const currentDate = new Date();

    const diffInMs = currentDate.getTime() - inputDate.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));

    if (diffInMins < 60) {
      return `${diffInMins} minute(s) ago`;
    }

    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour(s) ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day(s) ago`;
  };

  return (
    <div className="text-slate-400 my-6">
      {savingStatus ? (
        <div className="flex items-center">
          <div className="animate-bounce -mb-1.5 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25px"
            >
              <title>piggy-bank-outline</title>
              <path
                fill="#8DB8FE"
                d="M15 10C15 9.45 15.45 9 16 9C16.55 9 17 9.45 17 10S16.55 11 16 11 15 10.55 15 10M8 9H13V7H8V9M22 7.5V14.47L19.18 15.41L17.5 21H12V19H10V21H4.5C4.5 21 2 12.54 2 9.5S4.46 4 7.5 4H12.5C13.41 2.79 14.86 2 16.5 2C17.33 2 18 2.67 18 3.5C18 3.71 17.96 3.9 17.88 4.08C17.74 4.42 17.62 4.81 17.56 5.23L19.83 7.5H22M20 9.5H19L15.5 6C15.5 5.35 15.59 4.71 15.76 4.09C14.79 4.34 14 5.06 13.67 6H7.5C5.57 6 4 7.57 4 9.5C4 11.38 5.22 16.15 6 19H8V17H14V19H16L17.56 13.85L20 13.03V9.5Z"
              />
            </svg>
          </div>
          <div>Saving your progress</div>
        </div>
      ) : (
        `Last saved ${lastSavedTime()}`
      )}
    </div>
  );
};

export default SaveStatusComponent;
