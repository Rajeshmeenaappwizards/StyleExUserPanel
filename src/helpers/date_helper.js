export const formatDate = (date) => {
  const year = date?.getFullYear();
  const day = String(date?.getDate()).padStart(2, "0");
  const month = String(date?.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function flattenProduct(data) {
  let options = [];
  data?.forEach((item) => {
    options.push({
      value: item._id || item?.key?._id || item.value || item.smartlockId,
      label:
        item.productName ||
        item.name ||
        item?.key?.name ||
        item.title ||
        item.label,
    });
  });
  return options;
}

export const FormatedDate = (DateData) => {
  const date = new Date(DateData);

  // If the time is very close to midnight, adjust the date to ensure it shows the correct day
  if (
    date.getUTCHours() === 23 &&
    date.getUTCMinutes() === 59 &&
    date.getUTCSeconds() === 59
  ) {
    date.setUTCHours(0, 0, 0, 0);
  }

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedDate = date.toLocaleString("en-GB", options);
  return formattedDate;
};

export const FormatTime = (newDate) => {
  const date = new Date(newDate);
  if (!(date instanceof Date)) return "";
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const FormatedTime = (newDate) => {
  const date = new Date(newDate);
  if (isNaN(date)) return "";
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatTermDate = (date) => {
  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatDateTime = (date) => {
  let dateFormat = date.split("T")[0];
  let timeFormat = date.split("T")[1].slice(0, 5);
  return { date: dateFormat, time: timeFormat };
};

export function getDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (month.toString().length == 1) {
    month = "0" + month;
  }
  if (day.toString().length == 1) {
    day = "0" + day;
  }
  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }
  if (second.toString().length == 1) {
    second = "0" + second;
  }
  let dateFormat = `${year}-${month}-${day}`;
  let timeFormat = `${hour}:${minute}`;
  return { date: dateFormat, time: timeFormat };
}
