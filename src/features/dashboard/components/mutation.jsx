const Mutation = () => {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary-600 border-2 border-black-600 rounded-lg px-6 py-4 shadow-md">
          <p>Pemasukan</p>
          <p className="text-3xl w-full flex justify-end items-end">
            Rp. 530.000
          </p>
        </div>
        <div className="bg-red-400 border-2 border-black-600 rounded-lg px-6 py-4 shadow-md">
          <p>Pengeluaran</p>
          <p className="text-3xl w-full flex justify-end items-end">
            Rp. 530.000
          </p>
        </div>
        <div className="bg-secondary-600 border-2 border-black-600 rounded-lg px-6 py-4 shadow-md">
          <p>Selisih</p>
          <p className="text-3xl w-full flex justify-end items-end">
            Rp. 530.000
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-7">
        <h1 className="text-xl md:text-3xl">Daftar Mutasi</h1>
        <button className="w-30 bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer">
          Export
        </button>
      </div>
      <div>
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="flex justify-between bg-gray-100 border-2 border-black-600 rounded-lg px-6 py-4 shadow-md mt-4"
          >
            <p>+ 60.000</p>
            <p>24 Mei 2024</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mutation;
