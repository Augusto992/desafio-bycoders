/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import WeatherCard from "../../components/WeatherCard";
import { CardInfo } from "../../types/general.tsx";
import { cardsState } from "../../utils/store";
import Button from '@mui/material/Button';
import styles from "./cardsgrid.module.css";

const CardsGrid = () => {
  const [cards, setCards] = useRecoilState(cardsState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cardsString = window.localStorage.getItem("cardsArray");
    if(cardsString !== null) {
      setCards(JSON.parse(cardsString));
    }
    setLoading(false);
  }, []);

  const handleDelete = () => {
    localStorage.removeItem("cardsArray");
    setCards(null);
  }

  return (
  <div className={styles.gridContainer}>
      {loading ? (
        "Carregando..."
      ) : (
        <>
          {cards === null ? (
            "Lista de previsões vazia."
            ) : (
              <>
              <div className={styles.gridWrapper}>
                {cards.map((card:CardInfo, index:number) => {
                  return (
                    <WeatherCard cardInfo={card} cardIndex={index} />
                  )
                })}
              </div>
              <Button onClick={handleDelete} variant="contained" >Limpar lista</Button>
              </>
          )}
        </>
      )}
    </div>
  );
};

export default CardsGrid;