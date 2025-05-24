import { SewingPinIcon } from "@radix-ui/react-icons";
import IconIllustration from "../../../assets/icons/ic_illustration.svg";
import ImageMosque from "../../../assets/images/img_mosque.svg";
import { usePrayerTimes } from "../hooks/usePrayerTimes.js";

const Hero = () => {
  const {
    prayerTimes,
    isLoading,
    error,
    currentDate,
    currentTime,
    currentPrayer,
    nextPrayer,
  } = usePrayerTimes();

  const location = "Markaz Ulul Ilmi, Makassar";

  return (
    <main
      id="beranda"
      className="relative -z-10 w-full xl:h-screen bg-linear-to-tl from-primary-700 to-white"
    >
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
            Markaz Ulul Ilmi
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
      <WorshipTimeMedium
        prayerTimes={prayerTimes}
        isLoading={isLoading}
        currentDate={currentDate}
        currentTime={currentTime}
        location={location}
        error={error}
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
      />
      <WorshipTimeSmall
        prayerTimes={prayerTimes}
        isLoading={isLoading}
        currentDate={currentDate}
        currentTime={currentTime}
        location={location}
        error={error}
        currentPrayer={currentPrayer}
        nextPrayer={nextPrayer}
      />
    </main>
  );
};

const WorshipTimeMedium = ({
  prayerTimes,
  isLoading,
  currentDate,
  currentTime,
  location,
  error,
  currentPrayer,
  nextPrayer,
}) => {
  const prayers = prayerTimes
    ? [
        { name: "FAJR", time: prayerTimes.Fajr },
        { name: "DHUHR", time: prayerTimes.Dhuhr },
        { name: "ASR", time: prayerTimes.Asr },
        { name: "MAGHRIB", time: prayerTimes.Maghrib },
        { name: "ISHA", time: prayerTimes.Isha },
      ]
    : [];

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center w-full py-4">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
    </div>
  );

  return (
    <div className="hidden md:flex md:items-center absolute -bottom-20 xl:-bottom-24 right-0 left-0 h-40 xl:h-52 md:mx-20 xl:mx-40 2xl:mx-64 px-10 space-x-10 bg-white rounded-2xl shadow-xs">
      <div className="flex flex-col justify-center items-center space-y-2">
        <div className="flex items-center space-x-1.5">
          <SewingPinIcon />
          <p className="md:text-sm xl:text-md text-nowrap">{location}</p>
        </div>
        <p className="md:text-sm xl:text-md">
          {currentDate || "Loading date..."}
        </p>
        <div className="bg-primary-600/20 h-14 w-32 flex items-center justify-center rounded-lg">
          <p className="text-black md:text-sm xl:text-md">
            {currentTime || "00:00 WITA"}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center space-y-3">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center w-full py-4 text-red-500">
            Error loading times: Using fallback data.
          </div>
        ) : (
          <>
            <div className="w-full">
              <ul className="w-full flex items-center justify-between">
                {prayers.map((prayer, index) => (
                  <li
                    key={index}
                    className={`w-full flex justify-center font-medium ${
                      currentPrayer &&
                      currentPrayer.name.toUpperCase() === prayer.name
                        ? "text-primary-600"
                        : ""
                    }`}
                  >
                    {prayer.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full h-16 flex items-center bg-secondary-700/10 rounded-lg">
              <ul className="w-full flex items-center justify-between">
                {prayers.map((prayer, index) => (
                  <div
                    key={index}
                    className={`w-full flex justify-center ${
                      currentPrayer &&
                      currentPrayer.name.toUpperCase() === prayer.name
                        ? "bg-primary-100 font-bold text-primary-600 py-1 rounded"
                        : ""
                    }`}
                  >
                    {prayer.time}
                  </div>
                ))}
              </ul>
            </div>
            {nextPrayer && (
              <div className="w-full flex justify-center items-center text-sm">
                <span className="font-semibold text-primary-600">
                  Ibadah Selanjutnya:{" "}
                </span>
                <span className="ml-1 font-medium">
                  {nextPrayer.name} pada {nextPrayer.timeRemaining}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const WorshipTimeSmall = ({
  prayerTimes,
  isLoading,
  currentDate,
  currentTime,
  location,
  error,
  currentPrayer,
  nextPrayer,
}) => {
  const prayers = prayerTimes
    ? [
        { name: "Fajr", time: prayerTimes.Fajr },
        { name: "Dhuhr", time: prayerTimes.Dhuhr },
        { name: "Asr", time: prayerTimes.Asr },
        { name: "Maghrib", time: prayerTimes.Maghrib },
        { name: "Isha", time: prayerTimes.Isha },
      ]
    : [];

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center w-full py-4">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
    </div>
  );

  return (
    <div>
      <ul className="md:hidden space-y-4 mx-8 pb-5">
        <li className="w-full h-32 space-y-1.5 flex flex-col justify-center items-center bg-white rounded-2xl shadow-xs">
          <div className="flex items-center justify-center space-x-1.5">
            <SewingPinIcon />
            <p className="text-sm">{location}</p>
          </div>
          <p className="text-sm">{currentDate || "Loading date..."}</p>
          <div className="bg-primary-600/20 h-10 w-32 flex items-center justify-center rounded-lg">
            <p className="text-black md:text-sm xl:text-md">
              {currentTime || "00:00 WITA"}
            </p>
          </div>
        </li>

        {nextPrayer && (
          <li className="w-full flex flex-col justify-center items-center bg-white rounded-2xl shadow-xs p-3">
            <div className="text-sm text-primary-600 font-medium">
              Next Prayer:
            </div>
            <div className="font-bold">
              {nextPrayer.name} in {nextPrayer.timeRemaining}
            </div>
          </li>
        )}

        {isLoading ? (
          <li className="w-full h-20 flex justify-center items-center bg-white rounded-2xl shadow-xs">
            <LoadingSpinner />
          </li>
        ) : error ? (
          <li className="w-full h-20 flex justify-center items-center bg-white rounded-2xl shadow-xs">
            <div className="text-center text-red-500 px-4">
              Using fallback prayer times.
            </div>
          </li>
        ) : (
          prayers.map((prayer, index) => (
            <li
              key={index}
              className={`w-full h-20 space-x-8 flex justify-center items-center bg-white rounded-2xl shadow-xs ${
                currentPrayer && currentPrayer.name === prayer.name
                  ? "border-2 border-primary-600"
                  : ""
              }`}
            >
              <div
                className={`font-medium ${
                  currentPrayer && currentPrayer.name === prayer.name
                    ? "text-primary-600"
                    : ""
                }`}
              >
                {prayer.name}
              </div>
              <div
                className={`px-4 py-2 flex items-center rounded-lg ${
                  currentPrayer && currentPrayer.name === prayer.name
                    ? "bg-primary-100 text-primary-600 font-bold"
                    : "bg-secondary-700/10"
                }`}
              >
                {prayer.time}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Hero;
