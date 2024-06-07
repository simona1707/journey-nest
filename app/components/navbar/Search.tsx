import { BiSearch } from 'react-icons/bi';
import { IoLocationOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoPersonOutline } from 'react-icons/io5';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return 'Destination';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);
      if (diff === 0) {
        diff = 1;
      }
      return `${diff} Days`;
    }
    return 'Add dates';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return 'Guests';
  }, [guestCount]);

  return (
    <div 
      onClick={searchModal.onOpen}
      className="
        border 
        border-gray-300 
        w-full 
        md:w-auto 
        py-2 
        rounded-xl 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer 
        bg-white
      "
    >
      <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-between 
          px-4
        "
      >
        <div
          className="
            flex 
            items-center 
            gap-2
            text-sm 
            font-semibold 
            text-gray-900
            px-2
          "
        >
          <IoLocationOutline size={20} />
          <span>{locationLabel}</span>
        </div>
        <div 
          className="
            hidden 
            sm:flex 
            items-center 
            gap-2
            text-sm 
            font-semibold 
            text-gray-900 
            border-l 
            border-r 
            px-4
            mx-2
          "
        >
          <IoCalendarOutline size={20} />
          <span>{durationLabel}</span>
        </div>
        <div 
          className="
            flex 
            items-center 
            gap-2
            text-sm 
            font-semibold 
            text-gray-900 
            px-2
          "
        >
          <IoPersonOutline size={20} />
          <span>{guestLabel}</span>
        </div>
        <div 
          className="
            p-2 
            bg-[#327d81] 
            rounded-full 
            text-white 
            hover:bg-gray-800 
            transition
          "
        >
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
