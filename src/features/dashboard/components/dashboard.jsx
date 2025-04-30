import IcMoney from "../../../assets/images/ic_money.svg";
import IcPaid from "../../../assets/images/ic_paid.svg";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center px-4 md:px-12 gap-3 w-full md:w-1/2 py-4 md:py-2 bg-primary-600 border-2 border-black-600 rounded-lg">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="font-regular text-4xl text-center md:text-start">
              Rp 536.000
            </div>
            <div className="text-center md:text-start">
              Angka di atas adalah total saldo kamu. Setiap transaksi harus
              menunggu 3 hari untuk bisa dicairkan.
            </div>
          </div>
          <img
            className="hidden md:flex size-24 xl:size-36"
            src={IcMoney}
            alt=""
          />
        </div>
        <div className="flex items-center justify-center px-12 gap-3 w-full md:w-1/2 py-6 bg-secondary-700 border-2 border-black-600 rounded-lg">
          <div className="flex flex-col gap-4">
            <div className="font-regular text-4xl">Rp 536.000</div>
            <div className="text-center md:text-start">
              Setiap transaksi harus menunggu 3 hari untuk bisa dicairkan.
            </div>
            <button className="w-full md:w-30 bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer">
              Cairkan
            </button>
          </div>
          <img
            className="hidden md:flex size-24 xl:size-36"
            src={IcPaid}
            alt=""
          />
        </div>
      </div>
      <div className="mt-8 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-3xl">Daftar Donasi</h1>
          <button className="w-30 bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer">
            Export
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {Array.from({ length: 15 }, (_, index) => (
            <div
              key={index}
              className="flex justify-between bg-gray-100 border-2 border-black-600 rounded-lg p-4"
            >
              <div>
                <p>Donasi</p>
                <h5 className="text-2xl xl:text-3xl 2xl:text-5xl">50.000</h5>
                <p className="text-red-500 text-sm">- 3000</p>
                <p className="text-sm mt-3">24, Mei 2024</p>
                <p className="text-sm">23.00</p>
              </div>
              <div>
                <h5 className="font-medium">Malik</h5>
                <h5 className="text-sm">Malik@gmail.com</h5>
                <h5>"Semoga Berkah"</h5>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-2 mt-4">
          <button className="bg-primary-600 text-black px-6 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer mt-4">
            Sebelumnya
          </button>
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index}
              className="bg-secondary-700 text-black px-6 hover:bg-secondary-600 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer mt-4"
            >
              {index + 1}
            </button>
          ))}
          <button className="bg-primary-600 text-black px-6 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer mt-4">
            Selanjutnya
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
