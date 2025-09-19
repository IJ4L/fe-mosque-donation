import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useNewsAdmin } from "../hooks/useNewsAdmin";
import NewsItemSkeleton from "@/components/ui/skeletons/NewsItemSkeleton";
import PaginationSkeleton from "@/components/ui/skeletons/PaginationSkeleton";
import { formatImageUrl, handleImageError } from "@/lib/imageUtils";

const NewsAdmin = () => {
  const {
    data,
    isLoading,
    error,
    open,
    openDeleteDialog,
    openDetailSheet,
    title,
    description,
    imagePreview,
    isSubmitting,
    isDeleting,
    formValid,
    fileInputRef,
    currentPage,
    viewingNews,
    setOpen,
    setOpenDeleteDialog,
    setOpenDetailSheet,
    setTitle,
    setDescription,
    handleEditClick,
    handleViewClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleDivClick,
    handleImageChange,
    handleSubmit,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
  } = useNewsAdmin();

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col space-y-4">
          <NewsItemSkeleton />
          <NewsItemSkeleton />
          <PaginationSkeleton />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-40">
          <p>Error: {error.message}</p>
        </div>
      ) : !data || !data.data || data.data.length === 0 ? (
        <div className="text-center p-4 bg-gray-100 rounded-lg mt-4">
          <p>Tidak ada berita untuk ditampilkan</p>
        </div>
      ) : (
        <>
          {data.data.map((newsItem, index) => (
            <div
              key={newsItem.newsID}
              className="flex flex-col md:flex-row space mb-4 space-y-2 md:space-y-0 md:space-x-4"
            >
              <div className="md:w-1/2 w-full object-cover mb-4 lg:mb-0 rounded-lg aspect-video">
                <img
                  className="object-center w-full h-full rounded-lg aspect-video"
                  src={formatImageUrl(newsItem.newsImage)}
                  alt={newsItem.newsName}
                  onError={(e) =>
                    handleImageError(e, `News+${newsItem.newsID}`)
                  }
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="w-full flex items-center justify-between gap-6 bg-gray-100 rounded-lg py-4 px-6">
                <div className="text-justify line-clamp-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {newsItem.newsName}
                  </h3>
                  {newsItem.newsDescription}
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleViewClick(newsItem.newsID)}
                    className="flex items-center justify-center size-12 bg-red-40 border-2 border-black-600 bg-primary-600 rounded-lg hover:bg-primary-700 cursor-pointer"
                  >
                    <EyeOpenIcon className="size-5" />
                  </button>
                  <button
                    onClick={() => handleEditClick(newsItem.newsID)}
                    className="flex items-center justify-center size-12 bg-red-40 border-2 border-black-600 bg-secondary-600 rounded-lg hover:bg-secondary-700 cursor-pointer"
                  >
                    <Pencil2Icon className="size-5" />
                  </button>
                  <Dialog
                    open={openDeleteDialog}
                    onOpenChange={setOpenDeleteDialog}
                  >
                    <DialogTrigger asChild>
                      <button
                        onClick={() => handleDeleteClick(newsItem.newsID)}
                        className="flex items-center justify-center size-12 bg-red-40 border-2 border-black-600 bg-red-400 rounded-lg hover:bg-red-500 cursor-pointer"
                      >
                        <TrashIcon className="size-5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                      <DialogHeader>
                        <DialogTitle>
                          Apakah kamu yakin menghapus berita?
                        </DialogTitle>
                        <DialogDescription>
                          Menghapus berita akan menghilangkan data secara
                          permanen dan tidak dapat dipulihkan kembali.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4">
                        <button
                          onClick={handleConfirmDelete}
                          disabled={isDeleting}
                          className="bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer"
                        >
                          {isDeleting ? "Menghapus..." : "Hapus"}
                        </button>
                        <button
                          onClick={() => setOpenDeleteDialog(false)}
                          disabled={isDeleting}
                          className="w-30 bg-red-400 text-black px-8 hover:bg-red-500 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer"
                        >
                          Batal
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-2 mb-6">
            <button
              onClick={handlePrevPage}
              disabled={isLoading || !data?.pagination || currentPage <= 1}
              className={`bg-primary-600 text-black px-6 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 mt-4 ${
                isLoading || !data?.pagination || currentPage <= 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Sebelumnya
            </button>

            {data?.pagination &&
              Array.from({ length: data.pagination.totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={isLoading}
                  className={`text-black px-6 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 mt-4 ${
                    currentPage === index + 1
                      ? "bg-secondary-700 hover:bg-secondary-600"
                      : "bg-primary-600 hover:bg-primary-700"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {index + 1}
                </button>
              ))}

            <button
              onClick={handleNextPage}
              disabled={
                isLoading ||
                !data?.pagination ||
                currentPage >= data.pagination.totalPages
              }
              className={`bg-primary-600 text-black px-6 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 mt-4 ${
                isLoading ||
                !data?.pagination ||
                currentPage >= data.pagination.totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Selanjutnya
            </button>
          </div>
        </>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="bg-white" side={"right"}>
          <SheetHeader>
            <SheetTitle className="font-semibold text-2xl items-center">
              Edit Berita
            </SheetTitle>
            <SheetDescription>Ubah informasi berita</SheetDescription>
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
                className="border-2 border-black-600 rounded-lg mb-3"
                placeholder="Masukkan Judul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="w-full border-2 border-black-600 rounded-lg text-md text-black-600 p-2 placeholder-black-600 mb-3"
                rows={"6"}
                placeholder="Deskripsi"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button
                type="submit"
                disabled={!formValid || isSubmitting}
                className={`w-full lg:mr-24 xl:mr-48 2xl:mr-96 text-black px-4 py-3 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 ${
                  formValid && !isSubmitting
                    ? "bg-primary-600 hover:bg-primary-700 cursor-pointer"
                    : "bg-gray-400 opacity-50 cursor-not-allowed"
                }`}
              >
                Simpan
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

      <Sheet open={openDetailSheet} onOpenChange={setOpenDetailSheet}>
        <SheetContent
          className="bg-white h-screen overflow-y-auto"
          side={"bottom"}
        >
          <button
            onClick={() => setOpenDetailSheet(false)}
            className="rounded-lg absolute top-4 right-4 size-10 flex items-center justify-center bg-primary-600 hover:bg-primary-700 cursor-pointer z-10 border-2 border-black-600 transition-all duration-300 shadow-md"
            style={{ cursor: "pointer" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <SheetHeader className="flex justify-center items-center">
            <SheetTitle className="font-semibold text-xl md:text-2xl">
              Berita Terkini
            </SheetTitle>
            <SheetDescription className="text-sm md:text-base">
              Berita terkini terkait mesjid ibnu sina
            </SheetDescription>
          </SheetHeader>
          {viewingNews && viewingNews.data && (
            <div className="flex flex-col h-full xl:flex-row items-center gap-6 md:gap-10 lg:gap-16 w-full bg-black p-5 md:p-8 lg:p-10 shadow-xl overflow-hidden">
              <div className="w-full sm:w-4/5 md:w-2/5 lg:w-full xl:w-1/4 max-w-md md:max-w-none bg-white overflow-hidden md:mb-0 shadow-lg flex-shrink-0">
                <div className="relative h-full w-full pt-[75%] md:pt-[70%] lg:pt-[65%] rounded-lg overflow-hidden">
                  <img
                    src={formatImageUrl(viewingNews.data.newsImage)}
                    alt={viewingNews.data.newsName}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    onError={handleImageError}
                    loading="eager"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full md:w-3/5 lg:w-full xl:w-3/4 mt-2 md:mt-0 px-2 md:px-6 lg:px-8 overflow-hidden h-full">
                <h4 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  {viewingNews.data.newsName}
                </h4>
                <div className="h-1 w-24 md:w-32 bg-primary-600 my-4"></div>

                <div className="overflow-y-auto pr-2 md:pr-4 flex-grow scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-transparent hover:scrollbar-thumb-primary-700">
                  <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed md:leading-loose text-start">
                    {viewingNews.data.newsDescription}
                  </p>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NewsAdmin;
