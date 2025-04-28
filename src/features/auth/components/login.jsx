import { Input } from "@/components/ui/input";
import HeroImg from "../../../assets/images/img_hero.png";

const Login = () => {
  return (
    <div className="flex flex-col xl:flex-row justify-between">
      <div className="xl:w-2/5 flex flex-col justify-center px-10 mt-10 mb-10 xl:mb-0 bg-white/20">
        <h3 className="font-semibold text-4xl mb-2">Masuk</h3>
        <p className="mb-4">Halaman admin untuk mengelola masjid.</p>
        <Input
          className="border border-black/20 rounded-lg"
          placeholder="Email"
        />
        <Input
          className="border border-black/20 rounded-lg"
          placeholder="Password"
        />
        <button className="h-12 bg-primary-600 font-semibold hover:bg-primary-700 duration-75 rounded-lg border-2 cursor-pointer">
          Masuk
        </button>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-screen bg-[#F5F5F5]">
        <img className="h-screen w-full object-cover" src={HeroImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
