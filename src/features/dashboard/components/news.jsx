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
import { useNews, useNewsById } from "../api/get-news";
import { useState, useRef, useEffect } from "react";
import { useUpdateNews } from "../api/update-news";
import { PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const NewsAdmin = () => {
  const { data, isLoading, error } = useNews();
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const { data: editingNews } = useNewsById(editingNewsId);
  const { mutate: updateNews } = useUpdateNews();

  useEffect(() => {
    if (editingNews && editingNews.data) {
      setTitle(editingNews.data.newsName || "");
      setDescription(editingNews.data.newsDescription || "");
      if (editingNews.data.newsImage) {
        setImagePreview("http://localhost:9999" + editingNews.data.newsImage);
      }
    }
  }, [editingNews]);

  const handleEditClick = (id) => {
    setEditingNewsId(String(id));
    setOpen(true);
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Judul berita tidak boleh kosong");
      return;
    }

    if (!description.trim()) {
      alert("Deskripsi berita tidak boleh kosong");
      return;
    }

    if (!editingNewsId) {
      alert("ID berita tidak valid");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();

    if (fileInputRef.current.files[0]) {
      formData.append("newsImage", fileInputRef.current.files[0]);
    } else if (editingNews && editingNews.data && editingNews.data.newsImage) {
      formData.append("newsImage", editingNews.data.newsImage);
    }

    formData.append("newsName", title);
    formData.append("newsDescription", description);

    const newsId = String(editingNewsId).trim();

    updateNews(
      { id: newsId, formData },
      {
        onSuccess: () => {
          setOpen(false);
          setImagePreview(null);
          setTitle("");
          setDescription("");
          setEditingNewsId(null);
          setIsSubmitting(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          alert("Berita berhasil diperbarui!");
        },
        onError: (error) => {
          console.error("Update error:", error);
          setIsSubmitting(false);
          alert(
            `Gagal memperbarui berita: ${error.response?.data?.message || error.message || "Terjadi kesalahan"}`
          );
        },
      }
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      {Array.from({ length: data.data.length }, (_, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row space mb-4 space-y-2 md:space-y-0 md:space-x-4"
        >
          <img
            className="md:w-1/2 h-40 md:h-60 rounded-lg"
            src={"http://localhost:9999" + data.data[index].newsImage}
          ></img>
          <div className="w-full flex items-center justify-between gap-6 bg-gray-100 rounded-lg py-4 px-6">
            <div className="text-justify line-clamp-6">
              <h3 className="font-semibold text-lg mb-2">
                {data.data[index].newsName}
              </h3>
              {data.data[index].newsDescription}
            </div>
            <div className="flex flex-col space-y-2">
              <button className="flex items-center justify-center size-12 bg-red-40 border-2 border-black-600 bg-primary-600 rounded-lg hover:bg-primary-700 cursor-pointer">
                <EyeOpenIcon className="size-5" />
              </button>
              <button
                onClick={() => handleEditClick(data.data[index].newsID)}
                className="flex items-center justify-center size-12 bg-red-40 border-2 border-black-600 bg-secondary-600 rounded-lg hover:bg-secondary-700 cursor-pointer"
              >
                <Pencil2Icon className="size-5" />
              </button>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center justify-center size-12 bg-red-40 border-2 border-black-600 bg-red-400 rounded-lg hover:bg-red-500 cursor-pointer">
                    <TrashIcon className="size-5" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                  <DialogHeader>
                    <DialogTitle>
                      Apakah kamu yakin menghapus berita?
                    </DialogTitle>
                    <DialogDescription>
                      Menghapus berita akan menghilangkan data secara permanen
                      dan tidak dapat dipulihkan kembali.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="mt-4">
                    <button className="w-30 bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer">
                      Simpan
                    </button>
                    <button className="w-30 bg-red-400 text-black px-8 hover:bg-red-500 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer">
                      Batal
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      ))}

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
                className="w-full lg:mr-24 xl:mr-48 2xl:mr-96 bg-primary-600 hover:bg-primary-700 text-black px-4 py-3 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer"
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

      <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-2 mt-4">
        <button className="bg-primary-600 text-black px-6 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer mt-4">
          Sebelumnya
        </button>
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index}
            className="bg-secondary-700 text-black px-6 hover:bg-secondary-600 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer mt-4"
          >
            {index + 1}
          </button>
        ))}
        <button className="bg-primary-600 text-black px-6 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer mt-4">
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default NewsAdmin;
