import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";

const NewsFormSheet = ({
  open,
  setOpen,
  title,
  setTitle,
  description,
  setDescription,
  fileInputRef,
  imagePreview,
  formValid,
  isLoading,
  isError,
  isSuccess,
  handleDivClick,
  handleSubmit,
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="sm:max-w-lg w-[90vw] max-h-screen overflow-y-auto bg-white border-l border-gray-200 p-0"
      >
        <SheetHeader className="bg-primary-50 p-6 border-b border-gray-100">
          <div className="flex items-center mb-2">
            <div className="bg-primary-500 rounded-full p-2 mr-3">
              <PlusIcon className="h-5 w-5 text-white" />
            </div>
            <SheetTitle className="text-xl font-bold text-primary-700">
              Tambah Berita Baru
            </SheetTitle>
          </div>
          <SheetDescription className="text-gray-600">
            Masukkan informasi berita yang ingin ditambahkan ke halaman website.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Berita
            </label>
            <div
              className={`border-2 border-dashed ${imagePreview ? "border-primary-300 bg-primary-50" : "border-gray-300"} 
                rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:bg-gray-50 hover:border-primary-400`}
              onClick={handleDivClick}
            >
              {" "}
              {imagePreview ? (
                <div className="mb-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded shadow-sm object-cover"
                    onError={(e) => {
                      console.error(
                        "Image preview failed to load:",
                        imagePreview
                      );
                      e.target.onerror = null;

                      let errorMessage = "Error+Loading+Preview";
                      if (typeof imagePreview === "string") {
                        const urlParts = imagePreview.split("/");
                        const filename =
                          urlParts[urlParts.length - 1] || "unknown";
                        errorMessage += `+(${encodeURIComponent(filename)})`;
                      }

                      e.target.src = `https://placehold.co/600x400/CCCCCC/969696?text=${errorMessage}`;
                      e.target.classList.add("preview-error");
                    }}
                  />
                  <p className="mt-3 text-sm text-primary-600">
                    Klik untuk mengubah gambar
                  </p>
                  <p className="text-xs text-gray-500">
                    {typeof imagePreview === "string"
                      ? imagePreview.startsWith("blob:")
                        ? "Preview dari file lokal"
                        : imagePreview.startsWith("data:")
                          ? "Gambar inline"
                          : imagePreview.substring(0, 50) + "..."
                      : "Preview tersedia"}
                  </p>
                </div>
              ) : (
                <div className="py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    Klik untuk menambahkan gambar berita
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Mendukung format JPG, PNG, atau GIF
                  </p>
                </div>
              )}{" "}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  console.log("File input change event triggered");
                  const file = e.target.files[0];
                  if (file) {
                    console.log(
                      "File selected in news-form-sheet:",
                      file.name,
                      file.size
                    );
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const preview = reader.result;
                      console.log("FileReader completed, preview ready");
                      // Check if setImagePreview is a function before calling it
                      if (typeof setImagePreview === "function") {
                        console.log("Using setImagePreview function");
                        setImagePreview(preview);
                      } else if (typeof handleImageChange === "function") {
                        // Fallback to handleImageChange if available
                        console.log("Using handleImageChange function");
                        handleImageChange(e);
                      } else {
                        console.log("No handler found for image preview");
                      }
                    };
                    reader.onerror = () => {
                      console.error("FileReader error:", reader.error);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    console.log("No file selected");
                  }
                }}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Berita
              </label>
              <Input
                type="text"
                placeholder="Masukkan judul berita"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg text-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Berita
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg text-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[150px] transition-all duration-300"
                placeholder="Masukkan deskripsi lengkap berita"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                disabled={!formValid || isLoading}
                type="submit"
                className={`w-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-black px-4 py-3 rounded-lg border border-black-600 font-semibold transition-all duration-300 ${
                  !formValid || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-md transform hover:-translate-y-0.5"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Menambahkan...
                  </>
                ) : (
                  "Tambahkan Berita"
                )}
              </button>

              <div className="flex justify-center mt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  Batalkan
                </button>
              </div>

              {isSuccess && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Berita berhasil ditambahkan!
                </div>
              )}

              {isError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Gagal menambahkan berita. Silakan coba lagi.
                </div>
              )}
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default NewsFormSheet;
