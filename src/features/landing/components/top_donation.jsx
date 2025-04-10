import ImageIslamic from "../../../assets/images/img_islamic.svg";
import IconCrown from "../../../assets/icons/ic_crown.svg";

const TopDonation = () => {
  return (
    <div className="relative w-full flex items-center justify-center mt-0 md:mt-20 xl:mt-0 px-4">
      <img
        className="hidden md:flex absolute top-0 left-0 right-0 bottom-0 -z-10 object-cover w-full h-full"
        src={ImageIslamic}
        alt="islamic.svg"
        loading="lazy"
      />
      <div className="w-full h-full flex flex-col items-center justify-center py-10 md:py-14 xl:py-20">
        <h1 className="font-semibold text-lg md:text-2xl lg:text-3xl text-center">
          Papan Peringkat Donasi Tertinggi
        </h1>
        <p className="text-center px-4 max-w-3xl mt-2 text-sm md:text-base">
          Menampilkan daftar nama para donatur dengan kontribusi sebagai bentuk
          apresiasi bagi jamaah untuk lebih giat bersedekah dalam mendukung
          kegiatan masjid.
        </p>
        <ul className="w-full flex flex-col items-center justify-center md:mt-6 xl:mt-12 space-y-4 mt-6">
          <li className="flex justify-center items-center gap-2 py-2 md:py-3 xl:py-4 w-2/3 md:w-2/5 lg:w-1/3 bg-primary-700 border border-primary-700 rounded-lg shadow-sm">
            <img className="size-7" src={IconCrown} alt="ic_crown.svg" />
            <p className="font-medium text-white text-sm md:text-base">
              Lutfi Halimawan
            </p>
          </li>
          {[...Array(4)].map((_, index) => (
            <li
              key={index}   
              className="flex justify-center py-2 md:py-3 xl:py-4 w-2/3 md:w-2/5 lg:w-1/3 bg-white border border-primary-700 rounded-lg shadow-sm text-sm md:text-base"
            >
              Lutfi Halimawan
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopDonation;
