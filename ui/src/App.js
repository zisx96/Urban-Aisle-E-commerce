
import { useEffect } from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import HeroSection from './Components/HeroSection/HeroSection';

import Category from './Components/Sections/Categories/Category';
import NewArrivals from './Components/Sections/NewArrivals';
import content from './data/Content.json'
import { fetchCategories } from './Api/fetchCategory';
import { useDispatch } from 'react-redux';
import { loadCategories } from './store/features/category';
import { setLoading } from './store/features/common';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(setLoading(true));

    fetchCategories().then(res => {

      dispatch(loadCategories(res));
      
    }).catch(err => {

    }).finally(() => {
      dispatch(setLoading(false));
    })
  }, [dispatch]);

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
