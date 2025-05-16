import Dashboard from "@/features/dashboard/components/dashboard";
import IconLogo from "@/assets/icons/ic_logo.svg";
import Mutation from "@/features/dashboard/components/mutation";
import NewsAdmin from "@/features/dashboard/components/news";
import Profile from "@/features/dashboard/components/profile";
import { Sheet } from "../ui/sheet";
import { useRef, useState, useEffect } from "react";
import { Input } from "../ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { usePostNews } from "@/features/dashboard/api/post-news";

const DashboardLayout = () => {
  const [section, setSection] = useState("Dashboard");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  function handleSectionChange(newSection) {
    setSection(newSection);
  }
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formValid, setFormValid] = useState(false);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Check form validity whenever inputs change
  useEffect(() => {
    const hasImage = !!imagePreview;
    const hasTitle = !!title.trim();
    const hasDescription = !!description.trim();

    setFormValid(hasImage && hasTitle && hasDescription);
  }, [title, description, imagePreview]);

  const { mutate, isLoading, isError, isSuccess } = usePostNews();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fileInputRef.current.files[0]) {
      alert("Please select an image");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }

    const formData = new FormData();
    formData.append("newsImage", fileInputRef.current.files[0]);
    formData.append("newsName", title);
    formData.append("newsDescription", description);

    mutate(formData, {
      onSuccess: () => {
        setOpen(false);
        setImagePreview(null);
        setTitle("");
        setDescription("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      onError: (error) => {
        console.error("Error posting news:", error);
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow mx-12 lg:mx-24 xl:mx-48 2xl:mx-96">
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
          <div className="md:w-fit grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            <button
              className={
                "w-full md:w-30 text-black px-4 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer " +
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
                "w-full md:w-30 text-black px-4 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer " +
                (section === "Mutation"
                  ? "bg-primary-600"
                  : "bg-secondary-700 hover:bg-secondary-600")
              }
              onClick={() => handleSectionChange("Mutation")}
            >
              Mutation
            </button>{" "}
            <button
              className={
                "w-full md:w-30 text-black px-4 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer " +
                (section === "News"
                  ? "bg-primary-600"
                  : "bg-secondary-700 hover:bg-secondary-600")
              }
              onClick={() => handleSectionChange("News")}
            >
              News
            </button>
            {section === "News" && (
              <Sheet open={open} onOpenChange={setOpen}>
                <button
                  className="md:absolute right-0 md:w-30 lg:mr-24 xl:mr-48 2xl:mr-96 bg-primary-600 hover:bg-primary-700 text-black px-4 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  Tambah
                </button>

                <SheetContent className="bg-white" side={"right"}>
                  <SheetHeader>
                    <SheetTitle className="font-semibold text-2xl items-center">
                      Tambah Berita
                    </SheetTitle>
                    <SheetDescription>
                      Use this form to add a new news item
                    </SheetDescription>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <div
                          onClick={handleDivClick}
                          className="relative flex flex-col justify-center items-center gap-2 py-16 mt-2 bg-primary-600/10 hover:bg-primary-600/15 cursor-pointer border-2 border-black-600 rounded-lg p-2 mb-4 h-64 overflow-hidden"
                        >
                          {!imagePreview && (
                            <>
                              <PlusIcon className="size-8 z-10" />
                              <p className="text-md z-10">Pilih Gambar</p>
                            </>
                          )}

                          {imagePreview && (
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                            />
                          )}
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                      <Input
                        className="border-2 border-black-600 rounded-lg"
                        placeholder="Masukkan Judul"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <textarea
                        className="w-full border-2 border-black-600 rounded-lg text-md text-black-600 p-2 placeholder-black-600 mb-3"
                        rows={"6"}
                        placeholder="Deskripsi"
                        name="description"
                        id=""
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>{" "}
                      <button
                        type="submit"
                        disabled={!formValid || isLoading}
                        className={`w-full lg:mr-24 xl:mr-48 2xl:mr-96 text-black px-4 py-3 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 ${
                          formValid && !isLoading
                            ? "bg-primary-600 hover:bg-primary-700 cursor-pointer"
                            : "bg-gray-400 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {isLoading ? "Menyimpan..." : "Simpan"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="w-full lg:mr-24 xl:mr-48 2xl:mr-96 mt-2 bg-red-400 hover:bg-red-500 text-black px-4 py-3 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer"
                      >
                        Batal
                      </button>
                    </form>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>{" "}
        <div className="mt-4">
          {section === "Dashboard" && <Dashboard />}
          {section === "Mutation" && <Mutation />}
          {section === "News" && <NewsAdmin />}
          {section === "Profile" && <Profile />}
        </div>
      </div>{" "}
      <footer className="right-0 bottom-0 left-0 flex flex-col md:flex-row justify-between items-center py-4 px-8 md:px-20 xl:px-40 2xl:px-96 space-y-3 md:space-y-0 mt-auto bg-black text-white">
        <p className="text-center md:text-start">
          © 2023 Masjid Ibnu Sina. All rights reserved.
        </p>
        <p className="hover:underline cursor-pointer">Privacy Policy</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
