import { AiOutlineHome, AiOutlineSearch, AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import Link from "next/link";

const MobileBottomNav = () => {
  return (
    <div className="mobile-bottom-nav fixed bottom-0 left-0 w-full bg-white shadow-md">
      <ul className="flex justify-around items-center h-20 bg-gray-100">
        {/* Home */}
        <li className="flex flex-col items-center">
          <Link href="/" className="text-gray-600 hover:text-blue-500">
            <AiOutlineHome size={36} />
            <span className="text-sm md:text-lg">Ana Sayfa</span>
          </Link>
        </li>

        {/* Arama */}
        <li className="flex flex-col items-center">
          <Link href="/search" className="text-gray-600 hover:text-blue-500">
            <AiOutlineSearch size={36} />
            <span className="text-sm md:text-lg">Arama</span>
          </Link>
        </li>

        {/* Profil */}
        <li className="flex flex-col items-center">
          <Link href="/profile" className="text-gray-600 hover:text-blue-500">
            <AiOutlineUser size={36} />
            <span className="text-sm md:text-lg">Profil</span>
          </Link>
        </li>

        {/* İletişim */}
        <li className="flex flex-col items-center">
          <Link href="/contact" className="text-gray-600 hover:text-blue-500">
            <AiOutlineMail size={36} />
            <span className="text-sm md:text-lg">İletişim</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileBottomNav;
