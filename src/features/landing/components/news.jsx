const News = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center mt-0 md:mt-20 xl:mt-0 px-4">
      <div className="w-full flex flex-col items-center justify-center py-10 md:py-14 xl:pt-20 xl:pb-10">
        <h1 className="font-semibold text-lg md:text-2xl lg:text-3xl text-center">
          Seputar Mesjid
        </h1>
        <p className="text-center px-4 max-w-3xl mt-2 text-sm md:text-base">
          Berita terkini terkait mesjid ibnu sina.
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div>
          <div className="bg-red-300 h-40 w-72 md:h-56 md:w-96 rounded-lg"></div>
          <p className="text-primary-700 font-medium pt-2">July, 07 2025</p>
          <p className="font-medium pb-1">
            A Miracle Of The Qur'an: Mother's Milk
          </p>
          <p className="w-72 md:w-96 text-justify pb-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
            similique quas voluptatum, possimus a reiciendis porro, consequuntur
            corporis aperiam iste molestias! Nesciunt porro ratione non
            repellendus, assumenda illum ipsum ullam.
          </p>
          <p className="font-medium underline cursor-pointer hover:text-primary-700">
            Read more
          </p>
        </div>
        <div className="flex flex-col space-y-5 mt-5 md:mt-0">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4"
            >
              <div className="bg-red-300 h-40 w-72 md:h-32 md:w-56 rounded-lg"></div>
              <div>
                <p className="text-primary-700 font-medium">July, 07 2025</p>
                <p className="font-medium pb-1">
                  A Miracle Of The Qur'an: Mother's Milk
                </p>
                <p className="w-60 text-justify pb-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p className="font-medium underline cursor-pointer hover:text-primary-700">
                  Read more
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
