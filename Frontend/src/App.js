import logo from './logo.svg';
import './App.css';
import Layout from './pages/layout';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/Product';
import MobileDetails from './pages/MobileDetails';
import Home from './pages/Home';
import CreateMobileForm from './crud/CreateMobileForm';
import EditMobileForm from './crud/EditMobileForm';
import MobileDetails1 from './pages/Crud';
import LoginForm from './pages/LoginForm';
import FackMobileCardList from './pages/FackProduct';
import './assets/fonts/sfpro.OTF';







function App() {
  return  (
   <>
   
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="product" element={<Product/>}></Route>
        <Route path="add" element={<CreateMobileForm/>}></Route>
        <Route path="/edit/mobiles/:id" element={<EditMobileForm/>}></Route>
        <Route path="home" element={<Home/>}></Route>
        <Route path="/mobile/:id" element={<MobileDetails/>} />
        <Route path="/login/mobile/:id" element={<MobileDetails1/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/crud" element={<FackMobileCardList/>} />


      </Route>
    </Routes>
  </BrowserRouter>
   </>
  );
}

export default App;
