import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLogin } from "../api/auth.jsx";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import HeroImg from "../../../assets/images/img_hero.png";
import LoginImg from "../../../assets/images/img_login.png";
import IconLogo from "@/assets/icons/ic_logo.svg";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loginMutation = useLogin();
  const { login } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const toastId = "login-toast";

    try {
      toast.loading("Memproses login...", { id: toastId });

      const result = await loginMutation.mutateAsync({
        identifier,
        password,
      });

      toast.dismiss(toastId);

      if (result && result.success) {
        toast.success("Login berhasil!");
        login(result.user, result.token);
      } else {
        toast.error("Format respons tidak sesuai. Silakan coba lagi.");
        setError("Format respons tidak sesuai. Silakan coba lagi.");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "Login gagal. Silakan coba lagi.");
      setError(error.message || "Login gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex flex-col xl:flex-row h-screen min-h-screen">
      <div className="relative h-full xl:w-2/5">
        <img
          className="absolute -z-10 h-52 lg:h-96 xl:h-52 right-0 top-0 rotate-180"
          src={LoginImg}
          alt=""
        />
        <div className="h-full lg:mx-52 xl:mx-0 flex flex-col justify-center px-10  xl:mb-0 ">
          <h3 className="font-semibold text-4xl mb-2">Masuk</h3>
          <p className="mb-4">Halaman admin untuk mengelola masjid.</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-1">
            <Input
              className="border border-black/20 rounded-lg"
              placeholder="Nomer Telpon / Username"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <Input
              className="border border-black/20 rounded-lg"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`h-12 bg-primary-600 font-semibold hover:bg-primary-700 duration-75 rounded-lg border-2 cursor-pointer ${loginMutation.isLoading ? "opacity-70" : ""}`}
              disabled={loginMutation.isLoading}
            >
              {loginMutation.isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
        <div className="absolute left-0 bottom-0 -z-10">
          <img
            className="w-full h-52 lg:h-96 xl:h-52"
            src={LoginImg}
            alt="Login decoration"
          />
        </div>
      </div>
      <div className="hidden xl:flex flex-col justify-center items-center w-full h-screen bg-[#F5F5F5]">
        <img
          className="h-screen w-full object-cover"
          src={HeroImg}
          alt="Mosque Hero Image"
        />
      </div>
    </div>
  );
};

export default Login;
