import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLogin } from "../api/auth.jsx";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import HeroImg from "../../../assets/images/img_hero.png";

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
    <div className="flex flex-col xl:flex-row justify-between min-h-screen">
      <div className="xl:w-2/5 flex flex-col justify-center px-10 py-8 mt-10 mb-10 xl:mb-0 bg-white/20">
        <h3 className="font-semibold text-4xl mb-2">Masuk</h3>
        <p className="mb-4">Halaman admin untuk mengelola masjid.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

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
      <div className="flex flex-col justify-center items-center w-full h-screen bg-[#F5F5F5]">
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
