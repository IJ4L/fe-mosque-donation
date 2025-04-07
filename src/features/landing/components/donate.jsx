import ImageZakat from "../../../assets/images/img_zakat.svg";
import ImageFlower from "../../../assets/images/img_flower.svg";

const Donate = () => {
  return (
    <div className="md:h-[550px] xl:h-[700px] 2xl:h-[800px] w-full mt-56 md:mt-0 px-8 md:px-20 xl:px-40 2xl:px-64">
      <div className="relative w-full bg-primary-700/10 rounded-2xl">
        <div className="flex flex-col md:flex-row z-10 px-8 md:px-16 py-10 md:space-x-10">
          <div className="flex flex-col md:w-1/2">
            <img className="" src={ImageZakat} alt="zakat.png" loading="lazy" />
            <p className="text-sm xl:text-md 2xl:text-lg text-justify mt-5">
              Donasi di masjid adalah sumbangan yang diberikan oleh jamaah atau
              masyarakat untuk mendukung operasional, pembangunan, dan kegiatan
              keagamaan di masjid. Donasi berperan dalam pengembangan dakwah
              Islam, baik melalui media digital maupun cetak. Dengan berdonasi
              ke masjid, seseorang akan mendapatkan pahala yang terus mengalir
              sebagai amal jariyah, sebagaimana disebutkan dalam hadits bahwa
              barang siapa yang membangun masjid, maka Allah akan
              membangunkannya rumah di surga.
            </p>
          </div>
          <div className="flex flex-col md:w-1/2 mt-6 md:mt-0">
            <h3 className="font-semibold text-2xl">Berikan Donasimu</h3>
            <div className="w-full flex space-x-2 2xl:space-x-4 mt-4">
              <button className="h-12 w-full bg-secondary-700/80 rounded-lg cursor-pointer hover:bg-secondary-700">
                10.000
              </button>
              <button className="h-12 w-full bg-secondary-700/80 rounded-lg cursor-pointer hover:bg-secondary-700">
                20.000
              </button>
              <button className="h-12 w-full bg-secondary-700/80 rounded-lg cursor-pointer hover:bg-secondary-700">
                50.000
              </button>
              <button className="h-12 w-full bg-secondary-700/80 rounded-lg cursor-pointer hover:bg-secondary-700">
                100.000
              </button>
            </div>
          </div>
        </div>
        <img
          className="absolute -z-10 top-0 left-0"
          src={ImageFlower}
          alt="flower.png"
          loading="lazy"
        />
        <img
          className="absolute -z-10 bottom-0 right-0 rotate-180"
          src={ImageFlower}
          alt="flower.png"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Donate;
