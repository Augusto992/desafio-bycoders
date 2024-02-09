import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <h1>Previsão do Tempo</h1>
      <h2>
        <Link to={"/forecasts"}>Lista de previsões</Link> |&nbsp;
        <Link to={"/add-forecast"}>Nova previsão</Link>
      </h2>
    </div>
  )
};

export default Header;