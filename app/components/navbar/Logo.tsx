import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center md:flex-row md:items-center">
      <Image
        onClick={() => router.push('/')}
        src="/images/icon.png"
        height={65}
        width={65}
        alt="Logo of JourneyNest"
        className="cursor-pointer mb-2 md:mb-0 md:mr-2"
      />
      <Image
        onClick={() => router.push('/')}
        src="/images/logo.png"
        height={135}
        width={135}
        alt="Logo"
        className="cursor-pointer"
      />
    </div>
  );
}

export default Logo;