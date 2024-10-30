import React from "react";
import { useMatchStore } from "../store/useMatchStore";

const getFeedbackStyle = (swipeFeedback) => {
  if (swipeFeedback === "passed") return "text-red-500";
  if (swipeFeedback === "liked") return "text-green-500";
  if (swipeFeedback === "matched") return "text-pink-500";
  return "";
};
const getFeedbackText = (swipeFeedback) => {
  if (swipeFeedback === "passed") return "Passed";
  if (swipeFeedback === "liked") return "Liked";
  if (swipeFeedback === "matched") return "It is a Match!";
  return "";
};

const SwipeFeedback = () => {
  const { swipeFeedback } = useMatchStore();

  return (
    <div
      className={`absolute top-10 left-0 right-0 text-center text-2xl font-bold ${getFeedbackStyle(
        swipeFeedback
      )}`}
    >
      {getFeedbackText(swipeFeedback)}
    </div>
  );
};

export default SwipeFeedback;