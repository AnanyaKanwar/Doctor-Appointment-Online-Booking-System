import React from 'react'
import { services } from '../assets/data/services'
import ServiceCard from '../components/Services/ServiceCard'

const Services = () => {
  return (
    <section>
      <div className="container">
      <div className=' justify-center flex flex-wrap gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {services.map((item,index)=><ServiceCard item={item} index={index} key={index}/>)}
    </div>

      </div>
    </section>
  )
}

export default Services
