import React from 'react'
import SectionHeading from './SectionsHeading/SectionHeading'
import Card from '../Card/Card'
import jeans from '../../assets/img/jeans.jpg'
import shirts from '../../assets/img/shirts.jpg'
import dresses from '../../assets/img/dresses.jpg'
import tshirts from '../../assets/img/tshirts.jpg'
import hoodies from '../../assets/img/hoodies.jpg'
import Carousel from 'react-multi-carousel'
import { responsive } from '../../Utils/Section.constants';
import './NewArrivals.css'

const items = [{
    'title': 'Jeans',
    'imagePath': jeans
},{
    'title': 'Shirts',
    'imagePath': shirts
},{
    'title': 'T-Shirts',
    'imagePath': tshirts
},{
    'title': 'Dresses',
    'imagePath': dresses
},{
    'title': 'Hoodies ',
    'imagePath': hoodies
}]

function NewArrivals() {
  return (
    <>
    <SectionHeading title={'New Arrivals'}/>
    <Carousel 
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={false}
        showDots={false}
        infinite={false}
        partialVisible={false}
        itemClass={'react-slider-custom-item'}
        
        >
        {items && items?.map((item, index) => <Card key={item?.title +index} title={item.title} imagePath={item.imagePath} />)}
    </Carousel>
    </>
  )
}

export default NewArrivals