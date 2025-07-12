"use client";

import axios from "axios";

const useTravelInstance = () => {
  const instance = axios.create({
    timeout: 1000 * 5,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return instance;
};

export default useTravelInstance;
