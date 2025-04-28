import Dashboard from "@/features/dashboard/components/dashboard";
import IconLogo from "../../assets/icons/ic_logo.svg";
import { useState } from "react";
import Mutation from "@/features/dashboard/components/mutation";
import NewsAdmin from "@/features/dashboard/components/news";
import Profile from "@/features/dashboard/components/profile";

const DashboardLayout = () => {
  const [section, setSection] = useState("Dashboard");
  function handleSectionChange(newSection) {
    setSection(newSection);
  }

  return (
    <div>
      <div className="mx-12 lg:mx-24 xl:mx-48 2xl:mx-96">
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 mb-4">
            <img className="size-14" src={IconLogo} alt="icon.svg" />
            <h2 className="hidden md:flex font-medium text-lg text-black-600">
              Masjid Ibnu Sina
            </h2>
          </div>
          <button
            className={
              "w-30 text-black px-4 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer " +
              (section === "Profile"
                ? "bg-primary-600"
                : "bg-secondary-700 hover:bg-secondary-600")
            }
            onClick={() => handleSectionChange("Profile")}
          >
            Profile
          </button>
        </div>
        <div>
          <div className="flex gap-2 items-center mt-2">
            <button
              className={
                "w-30 text-black px-4 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer " +
                (section === "Dashboard"
                  ? "bg-primary-600"
                  : "bg-secondary-700 hover:bg-secondary-600")
              }
              onClick={() => handleSectionChange("Dashboard")}
            >
              Dashboard
            </button>
            <button
              className={
                "w-30 text-black px-4 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer " +
                (section === "Mutation"
                  ? "bg-primary-600"
                  : "bg-secondary-700 hover:bg-secondary-600")
              }
              onClick={() => handleSectionChange("Mutation")}
            >
              {" "}
              Mutation
            </button>
            <button
              className={
                "w-30 text-black px-4 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer " +
                (section === "News"
                  ? "bg-primary-600"
                  : "bg-secondary-700 hover:bg-secondary-600")
              }
              onClick={() => handleSectionChange("News")}
            >
              {" "}
              News
            </button>
          </div>
        </div>
        {
          <div className="mt-4">
            {section === "Dashboard" && <Dashboard />}
            {section === "Mutation" && <Mutation />}
            {section === "News" && <NewsAdmin />}
            {section === "Profile" && <Profile />}
          </div>
        }
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center py-4 px-8 md:px-20 xl:px-40 2xl:px-96 space-y-3 md:space-y-0 mt-12 bg-black text-white">
        <p className="text-center md:text-start">
          © 2023 Masjid Ibnu Sina. All rights reserved.
        </p>
        <p className="hover:underline cursor-pointer">Privacy Policy</p>
      </div>
    </div>
  );
};

export default DashboardLayout;
