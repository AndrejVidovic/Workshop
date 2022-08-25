import { useEffect, useState } from "react";
import dateformat from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./Transactions.css";
import { fetchData } from "../../service/Fetch";
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetchData(`https://locastic-server.herokuapp.com/orders`).then(response=>{
      setTransactions(response)
    })
  }, []);
  const getDate = (data) => {
    let date = dateformat(data.date, "dd.mm.yyyy.");
    return date;
  };
  const getTime = (data) => {
    let time = dateformat(data.date, "HH:MM");
    return time;
  };
  return (
    <table className="table">
      <thead>
        <tr className="table-header">
          <th>BROJ</th>
          <th>DATUM</th>
          <th>VRIJEME</th>
          <th>CIJENA</th>
          <th>AKCIJE</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((data) => {
          return (
            <tr key={data.id}>
              <td className="transaction-id">000000{data.id}</td>
              <td className="transaction-date">{getDate(data)}</td>
              <td className="transaction-time">{getTime(data)}</td>
              <td className="transaction-total">{data.total},00 €</td>
              <td className="transaction-button">
                <button className="details-button">Detalji</button>
              </td>
              <td className="transaction-icon">
                <FontAwesomeIcon icon={faChevronRight} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Transactions;
