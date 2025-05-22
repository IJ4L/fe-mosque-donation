import { Input } from "@/components/ui/input";
import { useProfile } from "../api/get-profile";
import { useUpdateProfile } from "../api/update-profile";
import { useUpdatePassword } from "../api/update-password";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");
  const [password, setPassword] = useState("");
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
        onSuccess: () => {
          toast.dismiss();
          toast.success("Profil berhasil diperbarui!");
          setIsEditing(false);

          setOriginalUsername(username);
          setOriginalPhone(phone);
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
          toast.success("Password berhasil diperbarui!");
          setIsUpdatingPassword(false);

          setOldPassword("");
          setNewPassword("");
          setShowOldPassword(false);
          setShowNewPassword(false);
        },
        onError: (error) => {
          toast.dismiss();
          toast.error("Gagal memperbarui password: " + error.message);
          setIsUpdatingPassword(false);
        },
      }
    );
  };
  const handleCancelPassword = () => {
    setOldPassword("");
    setNewPassword("");
    setShowOldPassword(false);
    setShowNewPassword(false);
  };

  return (
    <div className="h- flex items-center justify-center">
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
              <h5 className="font-medium text-lg">Nama pengurus mesjid</h5>
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
                className={`w-30 bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 ${
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
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
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
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={handleUpdatePassword}
                  disabled={isUpdatingPassword || !isPasswordDataValid}
                  className={`w-30 bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 ${isUpdatingPassword || !isPasswordDataValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
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
        )}
      </div>
    </div>
  );
};

export default Profile;
