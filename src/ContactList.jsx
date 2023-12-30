import { useState, useEffect, useMemo } from "react";
import ContactCard from "./ContactCard";

import "./ContactList.css";

const contactsURL = import.meta.env.VITE_API;

const ContactList = () => {
  // API Data reception codification
  const [topContacts, setTopContacts] = useState([]);
  // function to acuire data from the API
  const getMyContacts = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopContacts(data);
  };

  useEffect(() => {
    const topContactsUrl = `${contactsURL}list`;

    getMyContacts(topContactsUrl);
  }, []);

  // Search filter codification
  const [search, setSearch] = useState("");

  const lowerSearch = search.toLowerCase();

  const filteredContacts = topContacts.filter(
    (contact) => contact.name.toLowerCase().includes(lowerSearch)
    /*   contact.number.toLowerCase().includes(search) */
  );

  return (
    <div className="contactsContent">
      <form>
        <input
          type="search"
          id="search-form"
          placeholder="Buscar contacto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="contacts-container">
        {filteredContacts.length === 0 && <p>Carregando...</p>}
        {filteredContacts.length > 0 &&
          filteredContacts.map((contact) => (
            <ContactCard key={contact._id} contact={contact} />
          ))}
      </div>
    </div>
  );
};

export default ContactList;
