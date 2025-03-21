import { SewingPinIcon } from "@radix-ui/react-icons";
import IconIllustration from "../../../assets/icons/ic_illustration.svg";
import ImageMosque from "../../../assets/images/img_mosque.svg";

const Hero = () => {
  return (
    <main className="relative -z-10 w-full xl:h-screen bg-linear-to-tl from-primary-700 to-white">
      <div className="absolute">
        <img
          className="size-2/3"
          src={IconIllustration}
          alt="illustration.svg"
          loading="lazy"
        />
      </div>
      <div>
        <div className="absolute top-24 md:top-56 xl:top-32 left-0 right-0 flex justify-center items-center">
          <h1 className="text-4xl md:text-8xl xl:text-[120px] font-medium">
            Masjid Ibnu sina
          </h1>
        </div>
        <div className="flex justify-center items-end xl:items-center pt-20 md:pt-40 md:pb-20 xl:pb-0 xl:pt-0 xl:h-screen">
          <img
            className="size-3/5 xl:size-4/5"
            src={ImageMosque}
            alt="mosque.png"
            loading="lazy"
          />
        </div>
      </div>
      <WorshipTimeMedium />
      <WorshipTimeSmall />
    </main>
  );
};

const WorshipTimeMedium = () => {
  return (
    <div className="hidden md:flex md:items-center absolute -bottom-20 xl:-bottom-24 right-0 left-0 h-40 xl:h-52 md:mx-20 xl:mx-40 2xl:mx-64 px-10 space-x-10 bg-white rounded-2xl shadow-xs">
      <div className="flex flex-col justify-center items-center space-y-2">
        <div className="flex items-center space-x-1.5">
          <SewingPinIcon />
          <p className="md:text-sm xl:text-md text-nowrap">
            Pondok Gede, Bekasi, Jawa Barat
          </p>
        </div>
        <p className="md:text-sm xl:text-md">24 Februari 2025</p>
        <div className="bg-primary-600/20 h-14 w-32 flex items-center justify-center rounded-lg">
          <p className="text-black md:text-sm xl:text-md">09:00 WITA</p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center space-y-3">
        <div className="w-full">
          <ul className="w-full flex items-center justify-between">
            <li className="w-full flex justify-center font-medium">DZHUR</li>
            <li className="w-full flex justify-center font-medium">DZHUR</li>
            <li className="w-full flex justify-center font-medium">DZHUR</li>
            <li className="w-full flex justify-center font-medium">DZHUR</li>
            <li className="w-full flex justify-center font-medium">DZHUR</li>
          </ul>
        </div>
        <div className="w-full h-16 flex items-center bg-secondary-700/10 rounded-lg">
          <ul className="w-full flex items-center justify-between">
            <div className="w-full flex justify-center">09:00</div>
            <div className="w-full flex justify-center">09:00</div>
            <div className="w-full flex justify-center">09:00</div>
            <div className="w-full flex justify-center">09:00</div>
            <div className="w-full flex justify-center">09:00</div>
          </ul>
        </div>
      </div>
    </div>
  );
};

const WorshipTimeSmall = () => {
  return (
    <div>
      <ul className="md:hidden space-y-4 mx-8 pb-5">
        <li className="w-full h-32 space-y-1.5 flex flex-col justify-center items-center bg-white rounded-2xl shadow-xs">
          <div className="flex items-center justify-center space-x-1.5">
            <SewingPinIcon />
            <p className="text-sm">Pondok Gede, Bekasi, Jawa Barat</p>
          </div>
          <p className="text-sm">24 Februari 2025</p>
          <div className="bg-primary-600/20 h-10 w-32 flex items-center justify-center rounded-lg">
            <p className="text-black md:text-sm xl:text-md">09:00 WITA</p>
          </div>
        </li>
        <li className="w-full h-20 space-x-8 flex justify-center items-center bg-white rounded-2xl shadow-xs">
          <div className="font-medium">Dzhur</div>
          <div className="px-4 py-2 flex items-center bg-secondary-700/10 rounded-lg">
            09:00
          </div>
        </li>
        <li className="w-full h-20 space-x-8 flex justify-center items-center bg-white rounded-2xl shadow-xs">
          <div className="font-medium">Dzhur</div>
          <div className="px-4 py-2 flex items-center bg-secondary-700/10 rounded-lg">
            09:00
          </div>
        </li>
        <li className="w-full h-20 space-x-8 flex justify-center items-center bg-white rounded-2xl shadow-xs">
          <div className="font-medium">Dzhur</div>
          <div className="px-4 py-2 flex items-center bg-secondary-700/10 rounded-lg">
            09:00
          </div>
        </li>
        <li className="w-full h-20 space-x-8 flex justify-center items-center bg-white rounded-2xl shadow-xs">
          <div className="font-medium">Dzhur</div>
          <div className="px-4 py-2 flex items-center bg-secondary-700/10 rounded-lg">
            09:00
          </div>
        </li>
        <li className="w-full h-20 space-x-8 flex justify-center items-center bg-white rounded-2xl shadow-xs">
          <div className="font-medium">Dzhur</div>
          <div className="px-4 py-2 flex items-center bg-secondary-700/10 rounded-lg">
            09:00
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Hero;
