import React from 'react'
import Hero from '../components/Hero';
import Biography from '../components/Biography'

const AboutUs = () => {
  return (
    <>
    <Hero
      title={"Learn More About Us | DMC Medical Institute"}
      img={"/Abt.png"}
    />
    <Biography img={"/whoweare.png"} />
  </>
  )
}

export default AboutUs