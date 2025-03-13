import IconLogo from "../../../assets/icon/ic_logo.svg";
import IconHamburgerMenu from "../../../assets/icon/ic_hamburger_menu.svg";

const LandingNavigation = () => {
  return (
    <>
      <nav className="fixed z-10 w-full flex justify-between items-center py-6 px-8 md:px-20 xl:px-28">
        <div className="size-10 md:size-14">
          <img src={IconLogo} alt="logo.svg" />
        </div>
        <div className="md:flex hidden">
          <ul className="flex md:space-x-6 xl:space-x-10 font-semibold cursor-pointer ">
            <NavigationButton title="Beranda" />
            <NavigationButton title="Kas Masjid" />
            <NavigationButton title="Peringkat Donasi" />
            <NavigationButton title="Berita" />
            <NavigationButton title="Kontak" />
          </ul>
        </div>
        <div className="md:flex hidden">
          <button className="bg-secondary-700 px-8 py-2 rounded-full text-white font-semibold cursor-pointer hover:scale-110 transform transition duration-300">
            Donasi
          </button>
        </div>
        <div className="md:hidden">
          <img
            className="size-6 cursor-pointer"
            src={IconHamburgerMenu}
            alt="ic_hamburger_menu.svg"
          />
        </div>
      </nav>
    </>
  );
};

const NavigationButton = ({ title }) => {
  return (
    <>
      <li className="hover:text-primary-700 transform transition duration-300">
        {title}
      </li>
    </>
  );
};

export { LandingNavigation };
