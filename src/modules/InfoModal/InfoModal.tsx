import "./InfoModal.css";

const InfoModal = ({ setOpenInfoModal }) => {
  const Close = (e) => {
    e.preventDefault();
    setOpenInfoModal(false);
  };
  return (
    <div className="info-container">
      <h1>Already in cart!</h1>
      <button className="info-button" onClick={(e) => Close(e)}>
        Close
      </button>
    </div>
  );
};
export default InfoModal;
