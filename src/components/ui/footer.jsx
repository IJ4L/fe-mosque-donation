import IconLogo from "@/assets/icons/ic_logo.svg";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <footer id="kontak" className="mt-28">
      <div className="flex flex-col space-y-4 md:flex-row md:gap-20 2xl:gap-0 justify-between bg-black-600 py-14 px-8 md:px-20 xl:px-40 2xl:px-64">
        <div className="">
          <div className="flex items-center space-x-2">
            <img className="size-14" src={IconLogo} alt="logo.svg" />
            <div className="text-xl font-semibold text-white">
              Markaz Ulul Ilmi
            </div>
          </div>
          <p className="w-80 text-white mt-4">
            "اللهم اجعلنا من عُمّار المساجد" (Ya Allah, jadikanlah kami termasuk
            orang-orang yang memakmurkan masjid)
          </p>
          <div>
            <ul className="flex space-x-2 mt-4">
              <li className="bg-orange-400 p-2 rounded-md cursor-pointer hover:scale-110 transform transition duration-300">
                <InstagramLogoIcon />
              </li>
            </ul>
          </div>
        </div>
        <div className="md:w-2/3">
          <iframe
            className="w-full h-64 md:h-40 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.4934459830165!2d119.45073579999999!3d-5.184826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee3c51d3d9d4d%3A0x6784b5e7170ee42!2sMarkaz%20Ulul%20Ilmi!5e0!3m2!1sid!2sid!4v1748094701100!5m2!1sid!2sid"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center py-4 px-8 md:px-20 xl:px-40 2xl:px-64 space-y-3 md:space-y-0 bg-black text-white">
        <p className="text-center md:text-start">
          © 2023 Markaz Ulul Ilmi. All rights reserved.
        </p>
        <p className="hover:underline cursor-pointer">Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
