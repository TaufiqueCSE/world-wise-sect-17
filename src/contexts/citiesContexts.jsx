import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:3000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error:''
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading:true
      };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return{
        ...state,
        isLoading:false,
        cities:[...state.cities, action.payload],   //state ke andar jo city he use spread krke add krdo ek or
        currentCity:action.payload,
      }
    case "city/deleted":
      return{
        ...state,
        isLoading:false,
        cities:state.cities.filter((city) => city.id !== action.payload),   //state ke andar jo city he use spread krke add krdo ek or
        currentCity:{},
      }
    case "rejected":
      return {
        ...state,
        isLoading:false,
        error:action.payload
      }

    default: throw new Error('unkown action type')
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity } = state;
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({type:"loading"})
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({type:"cities/loaded",payload:data})

      } catch {
        dispatch({type:"rejected",payload:"There was an error loading data...."})
      }
      
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if(Number(id) === currentCity.id)  return
    try {
      dispatch({type:"loading"})
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({type:"city/loaded",payload:data})
    } catch {
      dispatch({type:"rejected",payload:"There was an error loading city...."})
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({type:"loading"})
      const res = await fetch(`${BASE_URL}/cities`, {
        //way of sending data to api
        method: "post",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({type:"city/created",payload:data})
    } catch {
      dispatch({type:"rejected",payload:"There was an error creating city...."})
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({type:"loading"})
      await fetch(`${BASE_URL}/cities/${id}`, {
        //way of sending data to api
        method: "delete",
      });
      dispatch({type:"city/deleted",payload:id})
      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      dispatch({type:"rejected",payload:"There was an error deleting city...."})
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        createCity,
        getCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
}

export { CitiesProvider, CitiesContext, useCities };
