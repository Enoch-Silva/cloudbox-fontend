import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ContactCard from "./ContactCard";
import Detail from "./Detail";
import "./ContactDetail.css";

const contactsURL = import.meta.env.VITE_API;

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  const getContact = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setContact(data);
  };

  useEffect(() => {
    const oneContactUrl = `${contactsURL}${id}`;

    console.log(oneContactUrl);

    getContact(oneContactUrl);
  }, []);

  // Display mode change Codification
  const holePage = document.querySelector("html");

  function toggleToLight() {
    holePage.classList.toggle("light");
  }
  //load dark or light mode
  function loadTheme() {
    const lightMode = localStorage.getItem("light");

    if (lightMode) {
      toggleToLight();
    }
  }
  loadTheme();
  useEffect(() => {
    localStorage.setItem("light", 1);
  }, []);

  return (
    <div className="detalhe">
      {contact && (
        <div className="contactData">
          <Detail key={contact._id} contact={contact} />
        </div>
      )}
    </div>
  );
};

export default ContactDetail;
