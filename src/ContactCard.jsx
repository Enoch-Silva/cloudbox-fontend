import { Link } from "react-router-dom";
import "./ContactCard.css";

const ContactCard = ({ contact, showLink = true }) => {
  function changePage() {
    window.location.href = `/contact/${contact._id}`;
  }

  return (
    <div className="contactCard" onClick={changePage}>
      <div className="col1">
        <i class="bx bxs-user-rectangle"></i>
        <h2>{contact.name}</h2>
      </div>
      <div className="col2">
        <i class="bx bx-phone-call"></i>
        <h4>{contact.number}</h4>
      </div>
      <div className="col3">
        <i class="bx bx-at"></i>
        <h4>{contact.email}</h4>
      </div>
      {showLink && (
        <Link id="detailBtn" to={`/contact/${contact._id}`}>
          Ver
        </Link>
      )}
    </div>
  );
};

export default ContactCard;
