import "./Detail.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "./axios/config";
import Modal from "react-modal";

Modal.setAppElement("#root");

const contactsURL = import.meta.env.VITE_API;

const Detail = ({ contact }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const valorInput = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const [data, setData] = useState({
    name: `${contact.name}`,
    number: `${contact.number}`,
    email: `${contact.email}`,
  });

  //função para atualizar contactos
  const updateContact = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await baseURL
      .patch(`${contact._id}`, data, headers)
      .then((response) => {
        setMessage(response.data.message);

        setData({
          name: "",
          number: "",
          email: "",
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
      });
  };

  //função para deletar contactos
  const deleteData = async (id) => {
    try {
      const response = await baseURL.delete(`${contact._id}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(response.data.message);
    }
  };

  //funções para gerir os modals
  const [updtModalIsOpen, setUpdIsOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openUpdModal() {
    setUpdIsOpen(true);
  }

  function closeUpdModal() {
    setUpdIsOpen(false);
  }

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
    <div className="detailCard">
      <div className="left">
        <i class="bx bxs-user-detail"></i>
      </div>
      <div className="right">
        <div className="text">
          <Link id="backBtn" to={"/list"}>
            <i class="bx bx-arrow-back"></i>
          </Link>

          <h1>{contact.name}</h1>
          <div className="infoNumber">
            <i class="bx bx-phone-call"></i>
            <h4>{contact.number}</h4>
          </div>
          <div className="infoEmail">
            <i class="bx bx-at"></i>
            <h4>{contact.email}</h4>
          </div>

          <br />
        </div>
        <div className="actions">
          <button id="editBtn" onClick={openUpdModal}>
            <i class="bx bxs-edit-alt"></i> Editar
          </button>
          <button id="deleteBtn" onClick={openModal}>
            <i class="bx bx-trash"></i> Apagar
          </button>
          <Modal
            id="delModal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Exemple Modal"
            overlayClassName="deleteModalOverlay"
            className="deleteModalContent"
          >
            <div className="delContent">
              <div className="modalTop">
                <h2>Tem certeza que deseja apagar este contacto?</h2>
              </div>
              <div className="modalDown">
                <div className="message">
                  {" "}
                  {message ? <p>{message}</p> : ""}
                </div>
                <div className="buttons">
                  <div>
                    <Link id="backLink" to={"/list"}>
                      Voltar para lista
                    </Link>
                  </div>
                  <div>
                    <button onClick={deleteData} id="confirmYes">
                      Sim!
                    </button>
                    <button onClick={() => setIsOpen(false)} id="cancelBtn">
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            id="updateModal"
            isOpen={updtModalIsOpen}
            onRequestClose={closeUpdModal}
            contentLabel="Exemple Modal"
            overlayClassName="modal-overlay"
            className="modal-content"
          >
            <div className="conteudo">
              <div className="modalTop">
                <h2>Editar informações de Contacto</h2>
                <button id="closeBtn" onClick={closeUpdModal}>
                  +
                </button>
              </div>
              <form onSubmit={updateContact} id="addForm" action="">
                {message ? <p>{message}</p> : ""}

                <div className="formUp">
                  <div className="image">
                    <i class="bx bxs-edit"></i>
                  </div>
                  <div className="inputs">
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
                  </div>
                </div>
                <div className="formDown">
                  <Link id="backEdit" onClick={`/contact/${contact._id}`}>
                    Voltar
                  </Link>
                  <input id="enviar" type="submit" value="Guardar" />
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Detail;
