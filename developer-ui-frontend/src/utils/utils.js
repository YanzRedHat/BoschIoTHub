/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import uuid from "uuid/v4";
import _ from "lodash";

export const camelCase = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, "")
    .replace(/-/g, "");
};

export const formatDateString = date => {
  const dateObj = new Date(date); // date is stored as ms timestamp
  const tzoffset = dateObj.getTimezoneOffset() * 60000;
  const dateString = new Date(date - tzoffset)
    .toISOString()
    .replace("T", " ")
    .substring(0, 19);
  return dateString;
};

export const calculateLogId = message =>
  JSON.parse(message.body).deviceId + "-" + message.timestamp;

export const calculateFilterId = (category, value) =>
  category.toLowerCase() + "-" + value.toLowerCase();

export const autogenerateAuthId = deviceId =>
  deviceId + "-" + uuid().replace(/-/g, "");

export const extractDeviceIdFromLog = logId => {
  if (!logId.includes("-")) {
    return new Error("Invalid LogId");
  }
  const logIdSplitted = logId.split("-");
  let deviceId;
  if (logIdSplitted.length > 2) {
    // Log Id includes the separator character '-' itself
    deviceId = logIdSplitted.slice(0, logIdSplitted.length - 1).join("");
  } else {
    deviceId = logIdSplitted[0];
  }
  return deviceId;
};

export const extractTimestampFromLog = logId =>
  logId.includes("-") ? logId.split("-")[1] : new Error("Invalid LogId");

export const randomDate = start => {
  const startTime = start || 1512748821755; // === new Date('2017-12-08T16:00:21.755Z').getTime();
  return new Date(
    startTime + Math.random() * (Date.now() - startTime)
  ).getTime();
};

export const checkLog = (log, filterList) => {
  let filteredOut = false;
  let filterIndex = 0;
  while (!filteredOut && filterIndex < filterList.size) {
    const currentFilter = filterList.get(filterIndex);
    const filterCategory = camelCase(currentFilter.get("type"));
    // indexOf returns -1 if the parameter string does no match the string it is called on.
    const matchingIndex = log
      .getIn(["message", filterCategory])
      .indexOf(currentFilter.get("value"));
    if (matchingIndex === -1) {
      filteredOut = true;
    }
    filterIndex++;
  }
  return !filteredOut;
};

export const deepDiff = (object, base) => {
  const changes = (obj, bs) => {
    return _.transform(obj, (result, value, key) => {
      if (!_.isEqual(value, bs[key])) {
        result[key] =
          _.isObject(value) && _.isObject(bs[key])
            ? changes(value, bs[key])
            : value;
      }
    });
  };
  return changes(object, base);
};
