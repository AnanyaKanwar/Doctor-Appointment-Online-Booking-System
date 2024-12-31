import React from 'react'
import {services} from '../../assets/data/services'
import ServiceCard from './ServiceCard'

const ServiceList = () => {
  return (
    // <div className='grid bg-red-500 grid-cols-1 md:grid-cols-2 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
    <div className=' justify-center flex flex-wrap gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {services.map((item,index)=><ServiceCard item={item} index={index} key={index}/>)}
    </div>
  )
}

export default ServiceList
