import { AiFillHome, AiOutlineMenu } from "react-icons/ai"; 
import { BiCalendarHeart } from "react-icons/bi";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from 'next-auth/react';
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
import { FaBuilding, FaClipboardList, FaHeart, FaSignInAlt, FaSignOutAlt, FaSuitcase, FaUserPlus } from "react-icons/fa";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative user-menu">
      <div className="flex flex-row items-center gap-3">
        
            <div onClick={() => router.push("/favorites")} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
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
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => router.push("/trips")} label="My Trips" icon={<FaSuitcase size={15} className="mr-2" />} />
                <MenuItem onClick={() => router.push("/favorites")} label="My Favorites" icon={<FaHeart size={15} className="mr-2" />} />
                <MenuItem onClick={() => router.push("/reservations")} label="My Reservations" icon={<FaClipboardList size={15} className="mr-2" />} />
                <MenuItem onClick={() => router.push("/properties")} label="My Properties" icon={<FaBuilding size={15} className="mr-2" />} />
                <MenuItem onClick={rentModal.onOpen} label="Rent My Home" icon={<MdOutlineAddHomeWork size={15} className="mr-2" />} />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" icon={<FaSignOutAlt size={15} className="mr-2" />} />
              </>
            ) : (
              <>
           <MenuItem onClick={loginModal.onOpen} label="Login" icon={<FaSignInAlt size={15} />} />
            <MenuItem onClick={registerModal.onOpen} label="Sign up" icon={<FaUserPlus size={15} />} />

              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
