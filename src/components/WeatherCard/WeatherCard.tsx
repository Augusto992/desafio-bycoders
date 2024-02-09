import { CardInfo } from "../../types/general";
import styles from "./weathercard.module.css";
import { useRecoilState } from "recoil";
import { cardsState } from "../../utils/store";
import { fetchWeatherData } from "../../utils/fetcher";
import Button from '@mui/material/Button';


const WeatherCard = (props: { cardInfo:CardInfo, cardIndex:number }) => {
  const [cards, setCards] = useRecoilState(cardsState);

  const formatCoordinatesName = (latitude:number, longitude:number) => {
    const roundedLatitude = Math.abs(latitude).toFixed(2);
    const roundedLongitude = Math.abs(longitude).toFixed(2);
    let cardinalDirectionLat = '';
    let cardinalDirectionLon = '';

    latitude < 0 ? cardinalDirectionLat = 'S' : cardinalDirectionLat = 'N';
    longitude < 0 ? cardinalDirectionLon = 'O' : cardinalDirectionLon = 'L';

      return `${roundedLatitude}° ${cardinalDirectionLat} ${roundedLongitude}° ${cardinalDirectionLon}`  
  }

  const assembleWeatherInfo = () => {
    return props.cardInfo.weatherData.time.map((time, index) => {
      const dateObj = new Date(time);
      const hour = dateObj.getUTCHours();
      const day = dateObj.getUTCDate();
      const month = dateObj.getUTCMonth() + 1;
      return (
        <div className={styles.weatherInfoItem}>
          {hour === 0 ? (
            <div>
              {day}/{month}
            </div>
          ) : (
            <div>---</div>
          )}
          <div>{hour}:00</div>
          <div>{props.cardInfo.weatherData.temperature2m[index].toFixed(2)}°C</div>
        </div>
      )
    })
  }

  const handleUpdate = async () => {
    const updatedCard = await fetchWeatherData(props.cardInfo.coordinates);
    if (cards !== null) {
      const updatedCardsArray = cards.map((card, index) => (props.cardIndex === index) ? updatedCard : card);
      setCards(updatedCardsArray);
      window.localStorage.setItem("cardsArray", JSON.stringify(updatedCardsArray));
    }
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h3>Coordenadas: {formatCoordinatesName(props.cardInfo.coordinates.latitude, props.cardInfo.coordinates.longitude)}</h3>
        <Button onClick={handleUpdate} variant="contained">Atualizar</Button>
      </div>
    <div className={styles.cardBody}>
        <div className={styles.weatherInfoDescription}>
          <span>Dia:</span>
          <span>Hora:</span>
          <span>Temp.:</span>
        </div>
        <div className={styles.weatherInfoContainer}>
          {assembleWeatherInfo()}
        </div>
      </div>
    </div>
  )
};

export default WeatherCard;