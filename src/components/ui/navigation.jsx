import IconLogo from "../../assets/icons/ic_logo.svg";
import IconHamburgerMenu from "../../assets/icons/ic_hamburger_menu.svg";
import { useEffect, useState } from "react";

const LandingNavigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Offset to account for fixed navbar
        behavior: "smooth",
      });
      setMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <>
      <nav
        className={`fixed z-30 w-full flex justify-between items-center pt-3 pb-2 px-8 md:px-20 xl:px-40 2xl:px-64 transition-all duration-300 ${
          scrolled ? "bg-black/20" : "bg-transparent"
        }`}
      >
        <div className="size-10 md:size-14">
          <img src={IconLogo} alt="logo.svg" />
        </div>
        <div className="md:flex hidden">
          <ul className="flex md:space-x-6 xl:space-x-10 font-semibold cursor-pointer ">
            <NavigationButton
              title="Beranda"
              onClick={() => scrollToSection("beranda")}
            />
            <NavigationButton
              title="Kas Masjid"
              onClick={() => scrollToSection("kas-masjid")}
            />
            <NavigationButton
              title="Peringkat Donasi"
              onClick={() => scrollToSection("peringkat-donasi")}
            />
            <NavigationButton
              title="Berita"
              onClick={() => scrollToSection("berita")}
            />
            <NavigationButton
              title="Kontak"
              onClick={() => scrollToSection("kontak")}
            />
          </ul>
        </div>
        <div className="md:flex hidden">
          <button
            className="bg-secondary-700 px-8 py-2 rounded-full text-white font-semibold cursor-pointer hover:scale-110 transform transition duration-300"
            onClick={() => scrollToSection("donasi")}
          >
            Donasi
          </button>
        </div>
        <div className="md:hidden">
          {mobileMenuOpen ? (
            <div
              className="size-6 cursor-pointer text-white flex items-center justify-center"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          ) : (
            <img
              className="size-6 cursor-pointer"
              src={IconHamburgerMenu}
              alt="ic_hamburger_menu.svg"
              onClick={toggleMobileMenu}
            />
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black/90 transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <ul className="flex flex-col space-y-6 text-white text-xl font-semibold text-center">
            <MobileNavigationButton
              title="Beranda"
              onClick={() => scrollToSection("beranda")}
            />
            <MobileNavigationButton
              title="Kas Masjid"
              onClick={() => scrollToSection("kas-masjid")}
            />
            <MobileNavigationButton
              title="Peringkat Donasi"
              onClick={() => scrollToSection("peringkat-donasi")}
            />
            <MobileNavigationButton
              title="Berita"
              onClick={() => scrollToSection("berita")}
            />
            <MobileNavigationButton
              title="Kontak"
              onClick={() => scrollToSection("kontak")}
            />
          </ul>
          <button
            className="mt-10 bg-secondary-700 px-8 py-2 rounded-full text-white font-semibold cursor-pointer hover:scale-110 transform transition duration-300"
            onClick={() => scrollToSection("donasi")}
          >
            Donasi
          </button>
        </div>
      </div>
    </>
  );
};

const NavigationButton = ({ title, onClick }) => {
  return (
    <li
      className="hover:text-primary-700 transform transition duration-300"
      onClick={onClick}
    >
      {title}
    </li>
  );
};

const MobileNavigationButton = ({ title, onClick }) => {
  return (
    <li
      className="hover:text-primary-700 transform transition duration-300 cursor-pointer"
      onClick={onClick}
    >
      {title}
    </li>
  );
};

export default LandingNavigation;
