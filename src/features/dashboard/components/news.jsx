import { EyeOpenIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

const NewsAdmin = () => {
  return (
    <div className="">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row space mb-4 space-y-2 md:space-y-0 md:space-x-4"
        >
          <div className="md:w-1/2 h-40 md:h-60 bg-yellow-200 rounded-lg"></div>
          <div className="w-full flex items-center gap-6 bg-gray-100 rounded-lg py-4 px-6">
            <div className="text-justify line-clamp-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              vitae nulla soluta fugit beatae illo doloremque! Distinctio in
              possimus libero voluptate voluptatum nulla molestiae, eius labore,
              quae maiores, odio recusandae. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Omnis beatae aliquam quo fugit
              minus, pariatur odit ratione rem nam non corporis ab commodi
              mollitia, neque labore totam unde aut. Eos? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Mollitia, aliquid doloribus
              officiis eius dolore dolores doloremque explicabo consectetur ut
              a, est reprehenderit. Quisquam voluptate quae dignissimos
              assumenda, repellat iste tempore. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit.
            </div>
            <div className="flex flex-col space-y-2">
              <button className="flex items-center justify-center size-12 bg-red-40 border-2 border-black-600 bg-primary-600 rounded-lg hover:bg-primary-700 cursor-pointer">
                <EyeOpenIcon className="size-5" />
              </button>
              <button className="flex items-center justify-center size-12 bg-red-40 border-2 border-black-600 bg-secondary-600 rounded-lg hover:bg-secondary-700 cursor-pointer">
                <Pencil2Icon className="size-5" />
              </button>
              <button className="flex items-center justify-center size-12 bg-red-40 border-2 border-black-600 bg-red-400 rounded-lg hover:bg-red-500 cursor-pointer">
                <TrashIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
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
  );
};

export default NewsAdmin;
