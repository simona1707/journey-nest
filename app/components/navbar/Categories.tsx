'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { MdOutlineArrowBackIosNew,MdOutlineArrowForwardIos } from "react-icons/md";


import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaArrowLeft, FaArrowRight, FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { FaUmbrellaBeach } from "react-icons/fa";

import CategoryBox from "../CategoryBox";
import Container from '../Container';
import { useState } from 'react';

export const categories = [
    {
        label: 'Beach',
        icon: FaUmbrellaBeach,
        description: 'This property is close to the beach!',
      },
      {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property is has windmills!',
      },
      {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern!'
      },
      {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside!'
      },
      {
        label: 'Pools',
        icon: TbPool,
        description: 'This is property has a beautiful pool!'
      },
      {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!'
      },
      {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is near a lake!'
      },
      {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activies!'
      },
      {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is an ancient castle!'
      },
      {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'This property is in a spooky cave!'
      },
      {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property offers camping activities!'
      },
      {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in arctic environment!'
      },
      {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!'
      },
      {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a barn!'
      },
      {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is brand new and luxurious!'
      }
]
const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname == '/';

  const [currentPage, setCurrentPage] = useState(0);
  const categoriesPerPage = 7;

  const startIndex = currentPage * categoriesPerPage;
  const endIndex = startIndex + categoriesPerPage;

  const totalPageCount = Math.ceil(categories.length / categoriesPerPage);

  const goToPreviousPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
  };

  if (!isMainPage) {
      return null;
  }

  return (
      <Container>
          <div className="pt-4 flex items-center justify-center overflow-x-auto relative">
              <MdOutlineArrowBackIosNew  size={25}
                  className="cursor-pointer absolute left-0"
                  onClick={goToPreviousPage}
                  style={{ visibility: currentPage === 0 ? 'hidden' : 'visible' }}
              />
              <div className="flex items-center justify-center gap-20">
                  {categories.slice(startIndex, endIndex).map((item) => (
                      <CategoryBox
                          key={item.label}
                          label={item.label}
                          selected={category == item.label}
                          icon={item.icon}
                      />
                  ))}
              </div>
              <MdOutlineArrowForwardIos size={25}
                  className="cursor-pointer absolute right-0"
                  onClick={goToNextPage}
                  style={{
                      visibility: currentPage === totalPageCount - 1 ? 'hidden' : 'visible',
                  }}
              />
          </div>
          <hr className="mt-1 border-gray-300" /> {/* Черта под категориите */}
      </Container>
  );
};

export default Categories;