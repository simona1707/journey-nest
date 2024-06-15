'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { FaBuilding, FaClipboardList, FaHeart, FaSignInAlt, FaSignOutAlt, FaSuitcase, FaUserPlus } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiCalendarHeart } from 'react-icons/bi';
import { MdOutlineAddHomeWork } from 'react-icons/md';


interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const onRent = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  };

  return (
    <div className="relative user-menu z-50">
      <div className="flex flex-row items-center gap-3">
        <div onClick={() => router.push('/favorites')} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          <BiCalendarHeart size={25} />
        </div>
        <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          <MdOutlineAddHomeWork size={25} />
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:flex items-center gap-2">
            <Avatar src={currentUser?.image} />
            {currentUser && <span className="text-sm font-medium pl-2 pr-2">{currentUser.name}</span>}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer z-50">
            {currentUser ? (
              <>
                <MenuItem onClick={() => { router.push('/trips'); closeMenu(); }} label="My Trips" icon={<FaSuitcase size={15} className="mr-2" />} />
                <MenuItem onClick={() => { router.push('/favorites'); closeMenu(); }} label="My Favorites" icon={<FaHeart size={15} className="mr-2" />} />
                <MenuItem onClick={() => { router.push('/reservations'); closeMenu(); }} label="My Reservations" icon={<FaClipboardList size={15} className="mr-2" />} />
                <MenuItem onClick={() => { router.push('/properties'); closeMenu(); }} label="My Properties" icon={<FaBuilding size={15} className="mr-2" />} />
                <MenuItem onClick={() => { rentModal.onOpen(); closeMenu(); }} label="Rent Out" icon={<MdOutlineAddHomeWork size={15} className="mr-2" />} />
                <hr />
                <MenuItem onClick={() => { signOut(); closeMenu(); }} label="Logout" icon={<FaSignOutAlt size={15} className="mr-2" />} />
              </>
            ) : (
              <>
                <MenuItem onClick={() => { loginModal.onOpen(); closeMenu(); }} label="Login" icon={<FaSignInAlt size={15} className="mr-2" />} />
                <MenuItem onClick={() => { registerModal.onOpen(); closeMenu(); }} label="Sign up" icon={<FaUserPlus size={15} className="mr-2" />} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
