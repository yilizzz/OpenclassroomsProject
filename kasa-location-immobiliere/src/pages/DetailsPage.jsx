import React from 'react';
import logements from "../data/logements.json"
import Header from '../components/Header'
import Footer from "../components/Footer"
import Carousel from '../components/Carousel';
import { useParams, useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dataLoge = [...logements];
  const dataThispage = dataLoge.find(obj => {
    return obj.id === id;
  });
  useEffect(() => {
    if (!dataThispage) {
      navigate('/non-existent-path');
    }
  }, [dataThispage, navigate]);
  if (!dataThispage) {
    return null;
  }
  return(
    <div>
      <Header></Header>
      <Carousel id={id}></Carousel>
      <Footer></Footer>
    </div>
  )
}

export default DetailsPage;