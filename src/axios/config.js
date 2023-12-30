import axios from "axios";

const contactFetch = axios.create({
  baseURL: "https://contacts-project-9kh6.onrender.com/contacts",
  headers: {
    "Content-Type": "application/json",
  },
});

export default contactFetch;
