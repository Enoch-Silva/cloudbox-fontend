import { Link } from "react-router-dom";
import "./Home.css";
import baseURL from "./axios/config";
import { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const home = () => {
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
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
    <div className="homeContainer">
      <h1>Adicione aqui os seus Contactos</h1>
      <br />
      <p>
        A plataforma cloudBox foi criada para facilitar o armazenamento dos seus
        contactos na núvem para que nunca os percas!
      </p>

      <button className="verBtn">
        <Link to={"/list"}>Meus Contactos</Link>
      </button>

      <button onClick={openModal} className="addBtn">
        <Link>Adicionar Contacto</Link>
      </button>

      <Modal
        id="addModal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Exemple Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div className="conteudo">
          <div className="modalTop">
            <h2>Adicionar Contacto</h2>
            <button id="closeBtn" onClick={closeModal}>
              +
            </button>
          </div>
          <form onSubmit={sendContact} className="addForm" action="">
            <br />
            {message ? <p>{message}</p> : ""}

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
              type="number"
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
      </Modal>
    </div>
  );
};

export default home;
