import { useState, useEffect } from "react";
import IconLogo from "@/assets/icons/ic_logo.svg";
import IconHamburgerMenu from "../../assets/icons/ic_hamburger_menu.svg";
import { useAuth } from "@/features/auth/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DashboardNavigation = ({
  onSectionChange,
  activeSection,
  profileRefresh,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { logout } = useAuth();
  const [localUser, setLocalUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mosque_user_data"));
    } catch {
      return null;
    }
  });
  useEffect(() => {
    try {
      setLocalUser(JSON.parse(localStorage.getItem("mosque_user_data")));
    } catch {
      setLocalUser(null);
    }
  }, [profileRefresh]);

  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  const handleSectionClick = (section) => {
    onSectionChange(section);
    setMobileMenuOpen(false);
  };
  const openLogoutDialog = () => setShowLogoutDialog(true);
  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };
  const navItems = [
    { id: "Dashboard", label: "Dashboard" },
    { id: "Mutation", label: "Mutasi" },
    { id: "News", label: "Berita" },
    { id: "Profile", label: "Profil" },
  ];

  return (
    <>
      <nav className="fixed top-0 z-30 w-full flex justify-between items-center py-3 px-6 md:px-10 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="size-10 md:size-12 mr-4">
            <img src={IconLogo} alt="Mosque Logo" />
          </div>
          <h1 className="text-lg md:text-xl font-semibold hidden md:block">
            Markaz Ulul Ilmi Panel
          </h1>
        </div>
        <div className="md:flex hidden items-center">
          <ul className="flex space-x-6 font-medium">
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`cursor-pointer hover:text-primary-600 transition-colors ${
                  activeSection === item.id
                    ? "text-primary-600 font-semibold"
                    : ""
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div className="border-l border-gray-300 h-6 mx-4"></div>
          <div className="flex items-center">
            <button
              onClick={openLogoutDialog}
              className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors text-sm shadow-sm border border-red-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>
              Keluar
            </button>
          </div>
        </div>
        <button className="md:hidden" onClick={toggleMobileMenu}>
          <img src={IconHamburgerMenu} alt="Menu" className="w-6 h-6" />
        </button>
      </nav>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleMobileMenu}
        >
          <div
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl py-4 px-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold">Menu</h2>
              <button onClick={toggleMobileMenu} className="text-2xl">
                &times;
              </button>
            </div>
            <ul className="flex flex-col gap-2 mt-2 mb-6">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-150
                    ${
                      activeSection === item.id
                        ? "bg-primary-50 text-primary-700 font-semibold shadow-sm"
                        : "hover:bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <div className="flex-grow" />
            <button
              onClick={openLogoutDialog}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors text-sm shadow-sm border border-red-200 mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>
              Keluar
            </button>
          </div>
        </div>
      )}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader className="text-left">
            <DialogTitle className="text-lg font-semibold">
              Konfirmasi Logout
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin keluar dari aplikasi?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-3 justify-end mt-4">
            <button
              onClick={() => setShowLogoutDialog(false)}
              className="cursor-pointer px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg border border-gray-400 font-medium transition duration-300"
            >
              Batal
            </button>
            <button
              onClick={handleLogout}
              className="cursor-pointer px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition duration-300"
            >
              Ya, Logout
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardNavigation;
