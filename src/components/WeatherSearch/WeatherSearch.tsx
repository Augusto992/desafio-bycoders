import { useState } from "react";
import { CardInfo, Coordinates, InputError } from "../../types/general";
import { fetchWeatherData } from "../../utils/fetcher";
import { Button, TextField, Snackbar } from '@mui/material';
import styles from "./weathersearch.module.css";

const WeatherSearch = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
    hourly: "temperature_2m",
    timezone: "America/Sao_Paulo"
  });
  const [inputError, setInputError] = useState<InputError>({
    latitude: false,
    longitude: false
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isNumber = /^[-]?\d*?[.,,]?\d*?$/.test(e.target.value);
    setCoordinates(prevCoord => ({
      ...prevCoord,
      [e.target.name]: e.target.value,
    }));

    if (!isNumber)
      setInputError(prevError => ({
        ...prevError,
        [e.target.name]: true,
      }));
    else if (inputError[e.target.name as keyof InputError] === true)
      setInputError(prevError => ({
        ...prevError,
        [e.target.name]: false,
      }));
  }

  const handleSearch = async () => {
    const cardInfo: CardInfo = await fetchWeatherData(coordinates);
    const cardsString: null|string = window.localStorage.getItem("cardsArray");
    let cardsArray: CardInfo[] = [];

    if (cardsString === null) {
      cardsArray[0] = cardInfo;
    }
    else {
      cardsArray = JSON.parse(cardsString);
      cardsArray.push(cardInfo);
    }
    window.localStorage.setItem("cardsArray", JSON.stringify(cardsArray));
    setOpenSnackbar(true);
  };

  const handleCitiesCoordinates = (cityLat: number, cityLon: number) => {
    setCoordinates(prevCoord => ({
      ...prevCoord,
      latitude: cityLat,
      longitude: cityLon
    }));
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.coordinatesInputs}>
        <TextField 
          type="text" 
          onChange={handleChange}
          name="latitude"
          label="Latitude"
          size="small"
          value={coordinates.latitude}
          error={inputError.latitude}
          helperText={inputError.latitude ? "Latitude inválida." : ""}
        />
        <TextField 
          type="text"
          onChange={handleChange}
          name="longitude"
          label="Longitude"
          size="small"
          value={coordinates.longitude}
          error={inputError.longitude}
          helperText={inputError.longitude ? "Longitude inválida." : ""}
        />
      </div>
      <Button 
        onClick={handleSearch}
        variant="contained"
        disabled={Object.values(inputError).some(Boolean)}
      >
        Buscar
      </Button>
      <div className={styles.citiesWrapper}>
        <h3>Coordenadas de cidades:</h3>
        <div className={styles.citiesGrid}>
        <h4><a onClick={() => handleCitiesCoordinates(52.52, 13.41)}>Berlim</a></h4>
        <h4><a onClick={() => handleCitiesCoordinates(-15.77, -47.92)}>Brasília</a></h4>
        <h4><a onClick={() => handleCitiesCoordinates(-34.61, -58.37)}>Buenos Aires</a></h4>
        <h4><a onClick={() => handleCitiesCoordinates(51.50, -0.12)}>Londres</a></h4>
        <h4><a onClick={() => handleCitiesCoordinates(55.75, 37.61)}>Moscou</a></h4>
        <h4><a onClick={() => handleCitiesCoordinates(40.71, -74.00)}>Nova Iorque</a></h4>
        <h4><a onClick={() => handleCitiesCoordinates(48.85, 2.34)}>Paris</a></h4>
        <h4><a onClick={() => handleCitiesCoordinates(39.90, 116.39)}>Pequim</a></h4>
        <h4><a onClick={() => handleCitiesCoordinates(-23.54, -46.63)}>São Paulo</a></h4>
        <h4><a onClick={() => handleCitiesCoordinates(-33.86, 151.20)}>Sydney</a></h4>
        <h4><a onClick={() => handleCitiesCoordinates(-22.90, -43.18)}>Rio de Janeiro</a></h4>
        <h4><a onClick={() => handleCitiesCoordinates(35.68, 139.69)}>Tóquio</a></h4>
        </div>
      </div>
      <Snackbar
        message="Previsão adicionada com sucesso."
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        autoHideDuration={2000}
      />
    </div>
  )
};

export default WeatherSearch;