import { useState } from "react";
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

const DashboardNavigation = ({ onSectionChange, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSectionClick = (section) => {
    onSectionChange(section);
    setMobileMenuOpen(false);
  };

  const openLogoutDialog = () => {
    setShowLogoutDialog(true);
  };

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
            Admin Panel Masjid
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
          <div className="border-l border-gray-300 h-6 mx-4"></div>{" "}
          <div className="flex items-center">
            <span className="text-sm font-medium mr-3">
              {user?.username || "Admin"}
            </span>
            <button
              onClick={openLogoutDialog}
              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Logout
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
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl py-4 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold">Menu</h2>
              <button onClick={toggleMobileMenu} className="text-2xl">
                &times;
              </button>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-500">Logged in as:</div>
              <div className="font-medium">{user?.username || "Admin"}</div>
            </div>

            <ul className="space-y-4">
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
          </div>
        </div>
      )}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
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
