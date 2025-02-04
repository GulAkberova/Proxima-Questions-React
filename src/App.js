import './App.css';
import React,{ useState,useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { tableContext } from './components/TableContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header/Header';
import Home from './components/home/Home'
import Wishlist from './components/Wishlist';
import Pagination from './components/Pagination';
import Detail from './components/Detail';
import LanguageSwitcher from "./components/LanguageSwitcher";
import Agrovita from './components/agrovita/Agrovita';
import QuestionsForm from './components/questionsform/QuestionsForm';
import Answerform from './components/answerform/Answerform';

function App() {
  let {all, setAll,value, setValue,loading,setLoading} =useContext(tableContext)

  useEffect(()=>{
    setLoading(true)
    fetch('https://northwind.vercel.app/api/products')
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setAll(data)
      setLoading(false)
    })
  },[value])

  return (
    <>
    <Header/>
    {/* <LanguageSwitcher /> */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/agrovita' element={<Agrovita/>}/>
      <Route path='/questionsform' element={<QuestionsForm/>}/>
      <Route path='/answer/form/:id' element={<Answerform/>}/>

      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/pagination' element={<Pagination/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
    </Routes>
     
    </>
  );
}

export default App;
