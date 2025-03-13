import { LandingNavigation } from "./components/ui/navigation/landing_navigation";
import IconIllustration from "./assets/icon/ic_illustration.svg";
import ImageMosque from "./assets/images/img_mosque.svg";

function App() {
  return (
    <>
      <LandingNavigation />
      <main className="relative -z-10 w-full xl:h-screen bg-linear-to-tl from-primary-700 to-white">
        <div className="absolute">
          <img
            className="size-2/3"
            src={IconIllustration}
            alt="illustration.svg"
          />
        </div>
        <div>
          <div className="absolute md:top-56 xl:top-32 left-0 right-0 flex justify-center items-center">
            <h1 className="md:text-8xl xl:text-[120px] font-medium">
              Masjid Ibnu sina
            </h1>
          </div>
          <div className="flex justify-center items-end xl:items-center md:pt-40 md:pb-20 xl:pb-0 xl:pt-0 xl:h-screen">
            <img
              className="size-3/4 xl:size-4/5"
              src={ImageMosque}
              alt="mosque.png"
            />
          </div>
        </div>
        <div className="absolute md:-bottom-24 right-0 left-0 h-52 mx-28 bg-red-400 rounded-2xl shadow-xs"></div>
      </main>
      <section className="w-full h-screen"></section>
    </>
  );
}

export default App;