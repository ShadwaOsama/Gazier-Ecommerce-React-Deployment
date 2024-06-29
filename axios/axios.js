import axios from "axios";
export const request = axios.create({
  baseURL: "https://gazierproject.vercel.app/",
});

export const url = "https://gazierproject.vercel.app/";
export const urlLocal = "http://localhost:4021"