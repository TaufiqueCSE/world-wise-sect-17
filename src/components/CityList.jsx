import { useContext } from "react";
import Spinner from "../components/Spinner";
import Cityitem from "./Cityitem";
import styles from "./CityList.module.css";
import Message from "./Message";
import {useCities} from './../contexts/citiesContexts'

function CityList() {
  const {cities,isLoading} = useCities()   //useContext(CitiesContext) //ye usecities ki jagah aayega mene function banaya heus fike me wo return ktna he ye
  if (isLoading) return <Spinner />; 
  if (!cities.length) {
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <Cityitem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
