import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "../../../components/ui/sheet";
import { useState } from "react";

const News = () => {
  const [open, setOpen] = useState(false);
  const newsItems = [
    {
      id: 1,
      date: "July, 07 2025",
      title: "A Miracle Of The Qur'an: Mother's Milk",
      summary:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, similique quas voluptatum, possimus a reiciendis porro, consequuntur corporis aperiam iste molestias! Nesciunt porro ratione non repellendus, assumenda illum ipsum ullam.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, similique quas voluptatum, possimus a reiciendis porro, consequuntur corporis aperiam iste molestias! Nesciunt porro ratione non repellendus, assumenda illum ipsum ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid. Dolore odio distinctio incidunt soluta esse!",
    },
    {
      id: 2,
      date: "April, 14 2025",
      title: "The Importance of Ramadan",
      summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid. Dolore odio distinctio incidunt soluta esse. Magnam quibusdam explicabo doloribus sapiente quis nemo, maxime perspiciatis ipsum!",
    },
    {
      id: 3,
      date: "March, 20 2025",
      title: "Community Service Event",
      summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid. Dolore odio distinctio incidunt soluta esse. Magnam quibusdam explicabo doloribus sapiente quis nemo, maxime perspiciatis ipsum!",
    },
    {
      id: 4,
      date: "February, 15 2025",
      title: "New Mosque Expansion Project",
      summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid. Dolore odio distinctio incidunt soluta esse. Magnam quibusdam explicabo doloribus sapiente quis nemo, maxime perspiciatis ipsum!",
    },
  ];

  const openModal = (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <div
      id="berita"
      className="relative w-full flex flex-col items-center justify-center mt-0 xl:mt-0 px-4"
    >
      <div className="w-full flex flex-col items-center justify-center py-10 md:py-14 xl:pt-20 xl:pb-10">
        <h1 className="font-semibold text-lg md:text-2xl lg:text-3xl text-center">
          Seputar Mesjid
        </h1>
        <p className="text-center px-4 max-w-3xl mt-2 text-sm md:text-base">
          Berita terkini terkait mesjid ibnu sina.
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="hidden md:flex flex-col">
          <div className="bg-red-300 h-40 w-72 xl:h-56 xl:w-96 rounded-lg"></div>
          <p className="text-primary-700 font-medium pt-2">
            {newsItems[0].date}
          </p>
          <p className="font-medium pb-1">{newsItems[0].title}</p>
          <p className="w-72 xl:w-96 text-justify pb-1">
            {newsItems[0].summary}
          </p>
          <p
            className="font-medium underline cursor-pointer hover:text-primary-700"
            onClick={() => openModal(newsItems[0])}
          >
            Read more
          </p>
        </div>
        <div className="flex flex-col space-y-8 mt-5 md:mt-0">
          {newsItems.slice(1, 4).map((news, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4"
            >
              <div className="bg-red-300 h-40 w-full md:h-32 md:w-48 xl:h-32 xl:w-56 rounded-lg"></div>
              <div>
                <p className="text-primary-700 font-medium">{news.date}</p>
                <p className="font-medium pb-1">{news.title}</p>
                <p className="w-60 text-justify pb-1">{news.summary}</p>
                <Sheet open={open} onOpenChange={setOpen}>
                  <button
                    className="font-medium underline cursor-pointer hover:text-primary-700"
                    onClick={() => setOpen(true)}
                  >
                    Read more
                  </button>
                  <SheetContent className="bg-white h-screen" side={"bottom"}>
                    <SheetHeader className="h-1/5 flex justify-center items-center">
                      <SheetTitle className="font-semibold text-2xl">
                        Berita Terkini
                      </SheetTitle>
                      <SheetDescription>
                        Berita terkini terkait mesjid ibnu sina
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex items-center justify-around h-full w-full bg-black-600 rounded-t-4xl">
                      <div className="size-96 bg-white rounded-lg"></div>
                      <div className="flex flex-col w-3/5">
                        <h4 className="text-white text-3xl font-semibold">Title of Content</h4>
                        <p className="text-white">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Obcaecati voluptates sapiente, accusamus illum
                          quas assumenda? Aperiam consectetur iusto perspiciatis
                          laborum ipsa nesciunt? Obcaecati temporibus quisquam
                          vero, quos expedita ipsam labore. Lorem ipsum dolor
                          sit amet consectetur adipisicing elit. Doloribus
                          debitis ad in, repellat vero accusantium fugit, illum
                          iure delectus, magnam quam id unde inventore? Nisi
                          commodi architecto consequatur temporibus
                          reprehenderit!
                        </p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
