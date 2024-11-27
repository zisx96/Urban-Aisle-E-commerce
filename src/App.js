
import './App.css';
import Footer from './Components/Footer/Footer';
import HeroSection from './Components/HeroSection/HeroSection';
import Navigation from './Components/Navigation/Navigation';
import Category from './Components/Sections/Categories/Category';
import NewArrivals from './Components/Sections/NewArrivals';
import content from './data/Content.json'

function App() {
  return (
    <>
      <Navigation/>
      <HeroSection/>
      <NewArrivals/>
      {content?.categories && content?.categories.map((item,index) => 
        <Category key={item?.title+index} {...item} />)}
      <Footer content={content?.footer}/>
    </>
  );
}

export default App;
