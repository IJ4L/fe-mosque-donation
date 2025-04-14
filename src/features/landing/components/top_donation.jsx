import { useQuery } from "@tanstack/react-query";
import ImageIslamic from "../../../assets/images/img_islamic.svg";
import IconCrown from "../../../assets/icons/ic_crown.svg";
import { fetchTopDonations } from "../api/donations";

function TopDonation() {
  // Use the useQuery hook to fetch data
  const {
    isPending,
    error,
    data: donations,
  } = useQuery({
    queryKey: ["topDonations"],
    queryFn: fetchTopDonations,
  });

  return (
    <div
      id="peringkat-donasi"
      className="relative w-full flex items-center justify-center mt-0 md:mt-20 xl:mt-0 px-4"
    >
      <img
        className="hidden md:flex absolute top-0 left-0 right-0 bottom-0 -z-10 object-cover w-full h-full"
        src={ImageIslamic}
        alt="islamic.svg"
        loading="lazy"
      />
      <div className="w-full h-full flex flex-col items-center justify-center py-10 md:py-14 xl:py-20">
        <h1 className="font-semibold text-lg md:text-2xl lg:text-3xl text-center">
          Papan Peringkat Donasi Tertinggi
        </h1>
        <p className="text-center px-4 max-w-3xl mt-2 text-sm md:text-base">
          Menampilkan daftar nama para donatur dengan kontribusi sebagai bentuk
          apresiasi bagi jamaah untuk lebih giat bersedekah dalam mendukung
          kegiatan masjid.
        </p>

        {isPending ? (
          <div className="mt-6">Memuat data donasi...</div>
        ) : error ? (
          <div className="mt-6 text-red-500">Error: {error.message}</div>
        ) : (
          <ul className="w-full flex flex-col items-center justify-center md:mt-6 xl:mt-12 space-y-4 mt-6">
            {donations.map((donation, index) => (
              <li
                key={donation.id}
                className={`flex justify-between items-center gap-2 py-2 md:py-3 xl:py-4 w-2/3 md:w-2/5 lg:w-1/3 ${
                  index === 0
                    ? "bg-primary-700 border border-primary-700 text-white"
                    : "bg-white border border-primary-700"
                } rounded-lg shadow-sm px-4`}
              >
                {index === 0 && (
                  <img className="size-7" src={IconCrown} alt="ic_crown.svg" />
                )}
                <p className="font-medium text-sm md:text-base">
                  {donation.name}
                </p>
                <p className="text-sm md:text-base font-semibold">
                  Rp {donation.amount.toLocaleString("id-ID")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TopDonation;
