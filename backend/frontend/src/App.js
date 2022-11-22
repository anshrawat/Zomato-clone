import logo from './logo.svg';
import './App.css';

import Home from './components/Home/Home';
import RestaurantDetail from './components/RestaurantDetails/RestaurantDetail';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Filter from './components/RestaurantDetails/Filter';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/details/:rName" element={<RestaurantDetail></RestaurantDetail>}></Route>
      <Route path='/filter' element={<Filter/>}></Route>
    </Routes>
    // <div>
    //   {/* <Home/>  */}
    //  <RestaurantDetail/>
    // </div>
  );
}

export default App;
