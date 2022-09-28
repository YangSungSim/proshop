import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from "./screens/CartScreen"; 
import LoginScreen from "./screens/LoginScreen"; 
import RegisterScreen from "./screens/RegisterScreen"; 
import ProfileScreen from "./screens/ProfileScreen"; 
import ShippingScreen from "./screens/ShippingScreen"; 

function App() {
  return (
    <Router>
      <Header />
        <main className="py-3">
          <Container>
          <Routes>
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/login' element={<LoginScreen />}  />
              <Route path='/profile' element={<ProfileScreen />}  />
              <Route path='/shipping' element={<ShippingScreen />}  />
              <Route path='/register' element={<RegisterScreen />}  />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart/:id/*' element={<CartScreen />} />
              <Route path='/cart' element={<CartScreen />} />
          </Routes>
          </Container>
      </main>
     <Footer />
    </Router>
  );
}

export default App;
