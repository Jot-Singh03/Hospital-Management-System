import React from 'react'
import Hero from '../components/Hero'
import Dept from '../components/Dept'
import Biography from '../components/Biography'
import Msgform from '../components/Msgform'


const Home = () => {
  return (
    <>
    <Hero title={"Welcome to DMC Medical Institute | Your Trusted Healthcare Provider"} img={"/hero.png"}/>
    <Biography img={"/Abt.png"}/>
    <Dept/>
    <Msgform/>
    </>
  )
}

export default Home