import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function shuffleArray(array) {
  return array.sort(() => 0.5 - Math.random());
}

export function selectRandomElements(array, count) {
  return shuffleArray([...array]).slice(0, count);
}

export const historyDate = (date) => {
  const dateString = new Date(date);

  const day = dateString.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const time = dateString.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${day} - ${time}`;
};

export const historyResult = (isPassed) => {
  return isPassed ? "Đạt" : "Không đạt";
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
