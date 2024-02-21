import Logo from '@/assets/3.png';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/4 mb-6 md:mb-0 flex justify-center flex-col pl-20 ">
          <Image src={Logo} alt="Logo" width={200} height={80} />
          <p className="text-sm text-gray-500">
            Copyright © KitchenMate Inc.
          </p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="font-bold text-lg mb-2 mt-2 fw-bold">KitchenMate</h5>
            <div className="w-[1050px] h-[100px] mt-4 ">
            <p className="text-sm text-black-500 text-justify">
            Welcome to Kitchen Mate, your ultimate culinary companion that transforms your kitchen's everyday ingredients into delicious dishes with ease. In a world where every pantry holds the potential for an extraordinary meal, Kitchen Mate is designed to help you unlock the full potential of what you already have at hand. Whether you're looking to minimize food waste, explore new recipes, or simply answer the age-old question, "What can I cook with what I have?", our website is here to guide you. By inputting the ingredients you currently possess, Kitchen Mate instantly generates a variety of dishes you can prepare, ensuring that you're never more than a few clicks away from your next culinary adventure.
            </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
