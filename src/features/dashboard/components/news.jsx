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
import { useNews } from "../api/get-news";

const NewsAdmin = () => {
  const { data, isLoading, error } = useNews();

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
              {data.data[index].newsDescription}
            </div>
            <div className="flex flex-col space-y-2">
              <button className="flex items-center justify-center size-12 bg-red-40 border-2 border-black-600 bg-primary-600 rounded-lg hover:bg-primary-700 cursor-pointer">
                <EyeOpenIcon className="size-5" />
              </button>
              <button className="flex items-center justify-center size-12 bg-red-40 border-2 border-black-600 bg-secondary-600 rounded-lg hover:bg-secondary-700 cursor-pointer">
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
