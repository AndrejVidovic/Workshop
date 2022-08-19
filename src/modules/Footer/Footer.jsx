import "./Footer.css";
const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="footerContainer">
      <p>&copy; TINEL Meetup {date}.</p>
    </div>
  );
};
export default Footer;
