import Dashboard from "@/features/dashboard/components/dashboard";
import Mutation from "@/features/dashboard/components/mutation";
import NewsAdmin from "@/features/dashboard/components/news";
import Profile from "@/features/dashboard/components/profile";
import { useState } from "react";
import NewsFormSheet from "@/features/dashboard/components/news-form-sheet";
import DashboardNavigation from "../ui/dashboard-navigation";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useNewsForm } from "@/features/dashboard/hooks/useNewsForm";

const DashboardLayout = () => {
  const [section, setSection] = useState("Dashboard");
  const { user } = useAuth();
  const {
    title,
    setTitle,
    description,
    setDescription,
    open,
    setOpen,
    fileInputRef,
    imagePreview,
    formValid,
    isLoading,
    isError,
    isSuccess,
    handleDivClick,
    handleImageChange,
    handleSubmit,
  } = useNewsForm();

  function handleSectionChange(newSection) {
    setSection(newSection);
    window.scrollTo(0, 0);
  }
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavigation
        onSectionChange={handleSectionChange}
        activeSection={section}
      />
      <div className="flex-grow mx-4 md:mx-12 lg:mx-24 xl:mx-48 2xl:mx-96 pt-20">
        {section === "News" && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-black rounded-lg border-2 border-black-600 font-semibold shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer mt-4"
            >
              Tambah Berita
            </button>
          </div>
        )}
        <div className="mt-4">
          {section === "Dashboard" && <Dashboard />}
          {section === "Mutation" && <Mutation />}
          {section === "News" && <NewsAdmin />}
          {section === "Profile" && <Profile />}
        </div>
      </div>

      <footer className="right-0 bottom-0 left-0 flex flex-col md:flex-row justify-between items-center py-4 px-8 md:px-20 xl:px-40 2xl:px-96 space-y-3 md:space-y-0 mt-auto bg-black text-white">
        <p className="text-center md:text-start">
          © 2023 Masjid Ibnu Sina. All rights reserved.
        </p>
        <p className="hover:underline cursor-pointer">Privacy Policy</p>
      </footer>

      {section === "News" && (
        <NewsFormSheet
          open={open}
          setOpen={setOpen}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          fileInputRef={fileInputRef}
          imagePreview={imagePreview}
          formValid={formValid}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          handleDivClick={handleDivClick}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
