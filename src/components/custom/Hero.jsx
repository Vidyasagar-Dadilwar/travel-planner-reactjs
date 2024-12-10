import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import Img from '../../assets/logo.png'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-40 gap-9'>
        <h1 className='font-extrabold text-[48px] text-center mt-8'>
            <span className='text-[#f56551]'>Discover Your Next Adventure with AI: </span>Personalized Itineraries at Your Fingertips
        </h1>
        <p className='text-center text-[18px] text-gray-500 '>
            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Link to={'/create-trip'}>
            <Button>Get Started</Button>
        </Link>
        <img src={Img} alt="Logo Image" className='h-[600px] w-[600px] mt-[-35px]' />
    </div>
  )
}

export default Hero