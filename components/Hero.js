"use client";
import Link from 'next/link';
import React from 'react';
import { ReactTyped } from "react-typed";

const Hero = () => {
  return (
    <div className= 'text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-1'>
        FIND AND RETURN LOST ITEMS
        </p>
        <h1 className='md:text-6xl sm:text-5xl text-5xl font-bold md:py-6'>
        Helping You Find What's Lost
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-4xl sm:text-3xl text-xl font-bold py-4'>
          Discover and recover
          </p>
          <ReactTyped
            className='md:text-4xl sm:text-3xl text-xl font-bold md:pl-4 pl-2'
            strings={['Keys', 'Phones', 'Wallets']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Report lost or found items to help reunite people with their belongings</p>
        <Link href="/sign-up"><button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black hover:bg-[#00c987] transition-all duration-300 cursor-pointer'>Get Started</button></Link> 
      </div>
    </div>
  );
};

export default Hero;