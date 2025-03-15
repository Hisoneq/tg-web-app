import { useEffect } from 'react';
import './App.css';
import useTelegram from "./components/hooks/useTelegram.js";
import Header from "./components/header/Header.jsx";
import { Route, Routes } from 'react-router-dom';
import ProductList from './ProductList/ProductList.jsx';
import Form from './components/Form/Form.jsx';

function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect(()=>{
    tg.ready();
  },[])

  return (
  <div className='App'>
    <Header />
    <Routes>
      <Route index element={<ProductList/>}/>
      <Route path={'/form'} element={<Form/>}/>
    </Routes>
  </div>)
}

export default App;
