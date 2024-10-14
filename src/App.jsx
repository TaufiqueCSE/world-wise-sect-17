import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/citiesContexts";

function App() {
  // console.log(cities)

  return (
    <div>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<AppLayout />}>
              {/* <Route index element={<CityList cities={cities} isLoading={isLoading} />} /> */}
              <Route index element={<Navigate replace to="cities" />} />{" "}
              {/* aisa krne se defdault me ab cities bhi route me rahge means url me */}
              {/* replace lagane se hum back jayenge sahi se ye jaruri he  */}
              {/*   //ye default he index path k amtalab he outlet use kya he sidebar me wo iska dikhayega childs ka */}
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountriesList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </div>
  );
}

export default App;
