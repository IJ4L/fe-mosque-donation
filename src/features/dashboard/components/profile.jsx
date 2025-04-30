import { Input } from "@/components/ui/input";

const Profile = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/2 flex flex-col gap-2 mt-4">
        <div className="flex flex-col gap-2">
          <h5 className="font-medium text-lg">Nama pengurus mesjid</h5>
          <Input className="border-2 border-black-600 rounded-lg" />
        </div>
        <div className="h-0.5 bg-black-600"></div>
        <div>
          <div className="flex flex-col gap-2">
            <h5 className="font-medium text-lg">Nomer Telpon</h5>
            <Input className="border-2 border-black-600 rounded-lg" />
          </div>
          <div className="flex justify-end gap-2 mb-2">
            <button className="w-30 bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer">
              Simpan
            </button>
            <button className="w-30 bg-red-400 text-black px-8 hover:bg-red-500 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer">
              Batal
            </button>
          </div>
        </div>
        <div className="h-0.5 bg-black-600"></div>
        <div>
          <div className="flex flex-col gap-2">
            <h5 className="font-medium text-lg">Password</h5>
            <Input className="border-2 border-black-600 rounded-lg" />
          </div>
          <div className="flex justify-end gap-2">
            <button className="w-30 bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer">
              Simpan
            </button>
            <button className="w-30 bg-red-400 text-black px-8 hover:bg-red-500 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer">
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
