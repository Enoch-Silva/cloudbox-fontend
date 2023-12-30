import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "./axios/config";
import "./ContactAdd.css";

const ContactAdd = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    number: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const valorInput = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const sendContact = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await baseURL
      .post("/add", data, headers)
      .then((response) => {
        setMessage(response.data.message);

        setData({
          name: "",
          number: "",
          email: "",
        });
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });

    // navigate("/list");
  };

  return (
    <div className="addContainer">
      <h1>Adicionar Contacto</h1>
      {message ? <p>{message}</p> : ""}
      <form onSubmit={sendContact} className="addForm" action="">
        <input
          placeholder="Digite o nome"
          type="text"
          id="name"
          name="name"
          onChange={valorInput}
          value={data.name}
        />

        <input
          placeholder="Digite o número"
          id="number"
          type="text"
          name="number"
          onChange={valorInput}
          value={data.number}
        />

        <input
          placeholder="Digite o e-mail"
          id="email"
          name="email"
          onChange={valorInput}
          value={data.email}
        />

        <input id="enviar" type="submit" value="Adicionar" />
      </form>
    </div>
  );
};

export default ContactAdd;
