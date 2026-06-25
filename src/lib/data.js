export const categoryData = {
  concepts: "Khái niệm",
  signs: "Biển báo",
  shapes: "Sa hình",
};

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
