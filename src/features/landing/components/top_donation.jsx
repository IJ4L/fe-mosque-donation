import ImageIslamic from "../../../assets/images/img_islamic.svg";

const TopDonation = () => {
  return (
    <div className="relative w-full flex items-center justify-center md:mt-20 xl:mt-0">
      <img
        className="hidden md:flex absolute top-0 left-0 right-0 bottom-0 -z-10"
        src={ImageIslamic}
        alt="islamic.svg"
        loading="lazy"
      />
      <div className="w-full h-full flex flex-col items-center justify-center md:py-10 xl:py-15 2xl:py-36">
        <h1 className="font-semibold text-3xl">
          Papan Peringkat Donasi Tertinggi
        </h1>
        <p className="text-center mt-2">
          Menampilkan daftar nama para donatur dengan kontribusi sebagai bentuk
          apresiasi <br /> bagi jamaah untuk lebih giat bersedekah dalam
          mendukung kegiatan masjid.
        </p>
        <ul className="w-full flex flex-col items-center justify-center md:mt-6 xl:mt-12 space-y-4">
          <li className="flex justify-center md:py-1.5 xl:py-3 2xl:py-5 w-1/4 bg-white border border-primary-700 rounded-lg">
            Lutfi Halimawan
          </li>
          <li className="flex justify-center md:py-1.5 xl:py-3 2xl:py-5 w-1/4 bg-white border border-primary-700 rounded-lg">
            Lutfi Halimawan
          </li>
          <li className="flex justify-center md:py-1.5 xl:py-3 2xl:py-5 w-1/4 bg-white border border-primary-700 rounded-lg">
            Lutfi Halimawan
          </li>
          <li className="flex justify-center md:py-1.5 xl:py-3 2xl:py-5 w-1/4 bg-white border border-primary-700 rounded-lg">
            Lutfi Halimawan
          </li>
          <li className="flex justify-center md:py-1.5 xl:py-3 2xl:py-5 w-1/4 bg-white border border-primary-700 rounded-lg">
            Lutfi Halimawan
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopDonation;
