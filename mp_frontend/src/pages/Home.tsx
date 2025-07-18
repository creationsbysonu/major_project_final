import ChatbotSection from '@/components/ChatBotSection'
import Footer from '@/components/Footer'
import HomeContent from '@/components/HomeContent'
import Navbar from '@/components/Navbar'
import Slider from '@/components/Slider'
// import CategoriesList from '@/components/CategoriesList'
// import ProductsList from '@/components/ProductsList'
import { useState } from 'react';

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  return (
    <>
    <Navbar/>
    <Slider/>
    
    <HomeContent/>
    <ChatbotSection/>
    <Footer/>
    </>
    
  )
}

export default Home