
import { useEffect } from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import HeroSection from './Components/HeroSection/HeroSection';

import Category from './Components/Sections/Categories/Category';
import NewArrivals from './Components/Sections/NewArrivals';
import content from './data/Content.json'
import { fetchCategories } from './Api/fetchCategory';

function App() {

  useEffect(() => {

    fetchCategories().then(res => {

      console.log("Category", res);
      
    }).catch(err => {

    })
  }, []);

  return (
    <>
      <HeroSection/>
      <NewArrivals/>
      {content?.pages?.shop?.sections && content?.pages?.shop?.sections.map((item,index) => 
        <Category key={item?.title+index} {...item} />)}
      <Footer content={content?.footer}/>
    </>
  );
}

export default App;
