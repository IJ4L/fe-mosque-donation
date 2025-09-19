import ImageZakat from "../../../assets/images/img_zakat.svg";
import ImageFlower from "../../../assets/images/img_flower.svg";
import { Input } from "@/components/ui/input";
import { useDonationForm } from "../hooks/useDonationForm.jsx";
import { formatCurrency } from "@/lib/utils";

const Donate = () => {
  // Helper function to format and display rupiah amount
  const formatRupiah = (amount) => {
    if (!amount) return "";
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const {
    donationAmount,
    setDonationAmount,
    donorName,
    setDonorName,
    donorNumber,
    setDonorNumber,
    donationMessage,
    setDonationMessage,
    error,
    successInfo,
    formRef,
    isSubmitting,
    donationMutation,
    handleSubmit,
    resetForm,
  } = useDonationForm();

  return (
    <div
      id="donasi"
      className="md:h-[550px] xl:h-[700px] 2xl:h-[800px] w-full mt-28 md:mt-0 px-8 md:px-20 xl:px-40 2xl:px-64"
    >
      <div className="relative w-full bg-primary-700/10 rounded-2xl">
        <div className="flex flex-col md:flex-row z-10 px-8 md:px-16 py-10 md:space-x-10">
          <div className="flex flex-col md:w-1/2">
            <img className="" src={ImageZakat} alt="zakat.png" loading="lazy" />
            <p className="text-sm xl:text-md 2xl:text-lg text-justify mt-5">
              Donasi di masjid adalah sumbangan yang diberikan oleh jamaah atau
              masyarakat untuk mendukung operasional, pembangunan, dan kegiatan
              keagamaan di masjid. Donasi berperan dalam pengembangan dakwah
              Islam, baik melalui media digital maupun cetak. Dengan berdonasi
              ke masjid, seseorang akan mendapatkan pahala yang terus mengalir
              sebagai amal jariyah, sebagaimana disebutkan dalam hadits bahwa
              barang siapa yang membangun masjid, maka Allah akan
              membangunkannya rumah di surga.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="flex flex-col w-full mt-6 md:mt-0">
              <h3 className="font-semibold text-2xl">Berikan Donasimu</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 2xl:space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setDonationAmount(10000)}
                  className="h-12 bg-secondary-700/80 rounded-lg cursor-pointer hover:bg-secondary-700"
                >
                  10.000
                </button>
                <button
                  type="button"
                  onClick={() => setDonationAmount(20000)}
                  className="h-12 bg-secondary-700/80 rounded-lg cursor-pointer hover:bg-secondary-700"
                >
                  20.000
                </button>
                <button
                  type="button"
                  onClick={() => setDonationAmount(50000)}
                  className="h-12 bg-secondary-700/80 rounded-lg cursor-pointer hover:bg-secondary-700"
                >
                  50.000
                </button>
                <button
                  type="button"
                  onClick={() => setDonationAmount(100000)}
                  className="h-12 bg-secondary-700/80 rounded-lg cursor-pointer hover:bg-secondary-700"
                >
                  100.000
                </button>
              </div>
            </div>
            <form ref={formRef} className="mt-4" onSubmit={handleSubmit}>
              <Input
                type="text"
                label="Rp"
                placeholder="Masukkan Nominal Donasi"
                isRequired="true"
                value={formatRupiah(donationAmount)}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  if (value && !isNaN(value)) {
                    setDonationAmount(Math.min(parseInt(value), 100000000));
                  } else {
                    setDonationAmount("");
                  }
                }}
                className="flex-row items-center space-x-4"
              />
              <Input
                type="text"
                label="Nama Lengkap"
                placeholder="Masukkan Nama Lengkap (opsional)"
                isRequired={false}
                maxLength="50"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="flex-col space-y-2"
              />
              <Input
                type="tel"
                label="Nomor Telepon"
                placeholder="Masukkan Nomor Telepon (opsional)"
                isRequired={false}
                pattern="[0-9]{10,15}"
                maxLength="15"
                value={donorNumber}
                onChange={(e) =>
                  setDonorNumber(
                    e.target.value.replace(/[^0-9]/g, "").slice(0, 15)
                  )
                }
                className="flex-col space-y-2"
              />
              <Input
                type="text"
                label="Pesan"
                placeholder="Masukkan Pesan"
                isRequired="false"
                maxLength="200"
                value={donationMessage}
                onChange={(e) => setDonationMessage(e.target.value)}
                className="flex-col space-y-2"
              />

              {error && (
                <div className="text-red-500 text-sm mt-4 mb-2">{error}</div>
              )}

              {donationMutation.isError && !error && (
                <div className="text-red-500 text-sm mt-4 mb-2">
                  {donationMutation.error?.message ||
                    "Terjadi kesalahan pada server. Silahkan coba lagi."}
                </div>
              )}

              {successInfo && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 mb-2">
                  <strong className="font-bold">Sukses!</strong>
                  <span className="block sm:inline">
                    {" "}
                    {successInfo.message}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !donationAmount}
                className={`w-full md:w-32 h-12 rounded-lg font-semibold transition mt-4
                ${
                  isSubmitting || !donationAmount || donationAmount < 1
                    ? "bg-gray-200 cursor-not-allowed opacity-50"
                    : "bg-secondary-600 hover:bg-secondary-700 cursor-pointer"
                }`}
              >
                {isSubmitting ? "Memproses..." : "Donasi"}
              </button>
            </form>
          </div>
        </div>
        <img
          className="absolute -z-10 top-0 left-0"
          src={ImageFlower}
          alt="flower.png"
          loading="lazy"
        />
        <img
          className="absolute -z-10 bottom-0 right-0 rotate-180"
          src={ImageFlower}
          alt="flower.png"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Donate;

