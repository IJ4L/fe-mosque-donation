// Reset password fields
const handleCancelPassword = () => {
  setOldPassword("");
  setNewPassword("");
  setShowOldPassword(false);
  setShowNewPassword(false);
};
import { Input } from "@/components/ui/input";
import { useProfile } from "../api/get-profile";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useUpdateProfile } from "../api/update-profile";
import { useUpdatePassword } from "../api/update-password";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EyeIcon } from "lucide-react";
import { EyeClosedIcon } from "@radix-ui/react-icons";

const Profile = ({ onProfileUpdated }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const isProfileDataValid = username.trim() !== "" && phone.trim() !== "";
  const hasProfileDataChanged =
    username !== originalUsername || phone !== originalPhone;

  const { data, isLoading, error } = useProfile();
  const { setUser } = useAuth();
  const updateProfileMutation = useUpdateProfile();
  const updatePasswordMutation = useUpdatePassword();

  useEffect(() => {
    if (data) {
      setUsername(data.data.username || "");
      setPhone(data.data.phoneNumber || "");
      setUserId(data.data.userID || 1);
      setOriginalUsername(data.data.username || "");
      setOriginalPhone(data.data.phoneNumber || "");
    }
  }, [data]);
  const handleUpdateProfile = () => {
    setIsEditing(true);
    toast.loading("Memperbarui profil...");
    updateProfileMutation.mutate(
      {
        username: username,
        phoneNumber: phone,
        userId: userId,
      },
      {
        onSuccess: async () => {
          toast.dismiss();
          toast.success("Profil berhasil diperbarui!");
          setIsEditing(false);
          setOriginalUsername(username);
          setOriginalPhone(phone);
          // Fetch the latest user data from backend and update context/localStorage
          try {
            const res = await fetch(
              "/api/auth/user?forceRefresh=" + Date.now()
            );
            const fresh = await res.json();
            if (fresh && fresh.data) {
              setUser({ ...fresh.data });
              localStorage.setItem(
                "mosque_user_data",
                JSON.stringify(fresh.data)
              );
              // Update local state with latest user data
              setUsername(fresh.data.username || "");
              setPhone(fresh.data.phoneNumber || "");
              setUserId(fresh.data.userID || 1);
              setOriginalUsername(fresh.data.username || "");
              setOriginalPhone(fresh.data.phoneNumber || "");
            }
          } catch {}
          if (onProfileUpdated) onProfileUpdated();
        },
        onError: (error) => {
          toast.dismiss();
          toast.error("Gagal memperbarui profil: " + error.message);
          setIsEditing(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setUsername(originalUsername);
    setPhone(originalPhone);
  };
  const isPasswordDataValid =
    oldPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    newPassword.length >= 6;
  const handleUpdatePassword = () => {
    if (!oldPassword || !newPassword) {
      toast.error("Password lama dan password baru harus diisi!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password baru minimal 6 karakter!");
      return;
    }

    if (oldPassword.includes(" ") || newPassword.includes(" ")) {
      toast.error("Password tidak boleh mengandung spasi!");
      return;
    }

    setIsUpdatingPassword(true);
    toast.loading("Memperbarui password...");
    updatePasswordMutation.mutate(
      {
        userId,
        currentPassword: oldPassword,
        newPassword,
      },
      {
        onSuccess: (data) => {
          toast.dismiss();
          toast.success("Profil berhasil diperbarui!");
          setIsEditing(false);
          setOriginalUsername(username);
          setOriginalPhone(phone);
          // Use the updated values directly to avoid backend delay
          setUser((prev) => {
            const newUser = {
              ...prev,
              username: username,
              phoneNumber: phone,
            };
            localStorage.setItem("mosque_user_data", JSON.stringify(newUser));
            return newUser;
          });
        },
        onError: (error) => {
          toast.dismiss();
          toast.error("Gagal memperbarui password: " + error.message);
          setIsUpdatingPassword(false);
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-1/3 flex flex-col gap-2 mt-4">
        {isLoading ? (
          <>
            <div className="flex flex-col gap-2">
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </>
        ) : error ? (
          <div className="text-center p-4 bg-red-100 text-red-800 rounded-lg">
            Error: Gagal memuat data profil. Silakan coba lagi nanti.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <h5 className="font-medium text-lg">Username</h5>
              <Input
                value={username}
                className="border-2 border-black-600 rounded-lg"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-medium text-lg">Nomer Telpon</h5>
              <Input
                value={phone}
                className="border-2 border-black-600 rounded-lg"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 mb-2">
              <button
                onClick={handleUpdateProfile}
                disabled={
                  isEditing || !isProfileDataValid || !hasProfileDataChanged
                }
                className={`bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 ${
                  isEditing || !isProfileDataValid || !hasProfileDataChanged
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isEditing ? "Menyimpan..." : "Simpan"}
              </button>
              <button
                onClick={handleCancel}
                disabled={isEditing || !hasProfileDataChanged}
                className={`w-30 bg-red-400 text-black px-8 hover:bg-red-500 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 ${
                  isEditing || !hasProfileDataChanged
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Batal
              </button>
            </div>
            <div className="h-0.5 bg-black-600"></div>
            <div className="mt-4">
              <div className="flex flex-col gap-2">
                <h5 className="font-medium text-lg">Password Lama</h5>
                <div className="relative">
                  <Input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    className="border-2 border-black-600 rounded-lg text-medium pr-10"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 w-10 h-13 flex items-center justify-center"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? <EyeIcon /> : <EyeClosedIcon />}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <h5 className="font-medium text-lg">Password Baru</h5>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    className="border-2 border-black-600 rounded-lg pr-10"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 w-10 h-13 flex items-center justify-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeIcon /> : <EyeClosedIcon />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={handleUpdatePassword}
                  disabled={isUpdatingPassword || !isPasswordDataValid}
                  className={`bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 ${isUpdatingPassword || !isPasswordDataValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {isUpdatingPassword ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  onClick={handleCancelPassword}
                  disabled={
                    isUpdatingPassword || (!oldPassword && !newPassword)
                  }
                  className={`w-30 bg-red-400 text-black px-8 hover:bg-red-500 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 ${isUpdatingPassword || (!oldPassword && !newPassword) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  Batal
                </button>
              </div>
            </div>
          </>
        )}{" "}
      </div>
    </div>
  );
};

export default Profile;
