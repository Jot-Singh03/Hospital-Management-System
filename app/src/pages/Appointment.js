import React from 'react'
import Hero from '../components/Hero';
import Aptform from '../components/Aptform';

const Appointment = () => {
  return (
    <>
    <Hero
      title={"Schedule Your Appointment | ZeeCare Medical Institute"}
      img={"/signin.png"}
    />
    <Aptform/>
  </>
  )
}

export default Appointment