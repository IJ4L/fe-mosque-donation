import { Input } from "@/components/ui/input";
import HeroImg from "../../../assets/images/img_hero.png";

const Login = () => {
  return (
    <div className="flex justify-between">
      <div className="w-2/5 flex flex-col justify-center px-20">
        <h3 className="font-semibold text-4xl">Masuk</h3>
        <p>Halaman admin untuk mengelola masjid</p>
        <Input />
        <Input />
        <button className="h-12 bg-primary-600 hover:bg-primary-700 duration-75 rounded-lg cursor-pointer">
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