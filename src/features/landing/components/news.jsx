// filepath: f:\web\fe-mosque-donation\src\features\landing\components\news.jsx
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "../../../components/ui/sheet";
import { useState } from "react";
import { useNewsLanding } from "../api/news.jsx";
import { format, parseISO } from "date-fns";
import { formatImageUrl } from "@/lib/imageUtils";

const News = () => {
  const [open, setOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: apiNewsItems, isLoading, error } = useNewsLanding(4);

  const fallbackNewsItems = [
    {
      id: 1,
      date: "July, 07 2025",
      title: "A Miracle Of The Qur'an: Mother's Milk",
      summary:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, similique quas voluptatum, possimus a reiciendis porro, consequuntur corporis aperiam iste molestias!",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, similique quas voluptatum, possimus a reiciendis porro, consequuntur corporis aperiam iste molestias! Nesciunt porro ratione non repellendus, assumenda illum ipsum ullam.",
      image: "/images/default-news-1.jpg",
    },
    {
      id: 2,
      date: "April, 14 2025",
      title: "The Importance of Ramadan",
      summary:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid.",
      image: "/images/default-news-2.jpg",
    },
    {
      id: 3,
      date: "March, 20 2025",
      title: "Community Service Event",
      summary:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid.",
      image: "/images/default-news-3.jpg",
    },
    {
      id: 4,
      date: "February, 15 2025",
      title: "New Mosque Expansion Project",
      summary:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nisi tenetur voluptate rem veniam quaerat fuga ea, dicta dolorem vero ab hic, nam aliquid.",
      image: "/images/default-news-4.jpg",
    },
  ];

  const formatNewsDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, "MMMM, dd yyyy");
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };

  // Transform API data to component format or use fallback
  const newsItems = apiNewsItems
    ? apiNewsItems.map((news) => ({
        id: news.newsID,
        date: formatNewsDate(news.createdAt),
        title: news.newsName,
        summary: news.newsDescription,
        content: news.newsDescription,
        image: news.newsImage || "/images/default-news-1.jpg",
      }))
    : fallbackNewsItems;

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
        {isLoading ? (
          <div className="flex justify-center items-center w-full py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-center w-full py-10 text-red-500">
            Terjadi kesalahan saat memuat berita. Menampilkan data contoh.
          </div>
        ) : newsItems && newsItems.length > 0 ? (
          <>
            <div className="hidden md:flex flex-col">
              <div className="bg-red-300 h-40 w-72 xl:h-56 xl:w-96 rounded-lg">
                <img
                  src={formatImageUrl(newsItems[0]?.image)}
                  alt="news"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-primary-700 font-medium pt-2">
                {newsItems[0]?.date}
              </p>
              <p className="font-medium pb-1">{newsItems[0]?.title}</p>
              <p className="w-72 xl:w-96 text-justify pb-1 line-clamp-6">
                {newsItems[0]?.summary}
              </p>
              <p
                className="font-medium underline cursor-pointer hover:text-primary-700"
                onClick={() => {
                  setSelectedNews(newsItems[0]);
                  setOpen(true);
                }}
              >
                Read more
              </p>
            </div>

            <div className="flex flex-col space-y-8 mt-5 md:mt-0">
              {(newsItems.length > 1 ? newsItems.slice(1, 4) : []).map(
                (news, index) => (
                  <div
                    key={news.id || index}
                    className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4"
                  >
                    <div className="bg-red-300 h-40 w-full md:h-32 md:w-48 xl:h-32 xl:w-56 rounded-lg">
                      <img
                        src={formatImageUrl(news.image)}
                        alt="news"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-primary-700 font-medium">
                        {news.date}
                      </p>
                      <p className="font-medium pb-1">{news.title}</p>
                      <p className="w-60 text-justify pb-1 line-clamp-2">{news.summary}</p>
                      <Sheet>
                        <button
                          className="font-medium underline cursor-pointer hover:text-primary-700"
                          onClick={() => {
                            setSelectedNews(news);
                            setOpen(true);
                          }}
                        >
                          Read more
                        </button>
                      </Sheet>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <div className="text-center w-full py-10">
            Tidak ada berita yang tersedia saat ini.
          </div>
        )}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="bg-white h-screen" side={"bottom"}>
          <SheetHeader className="h-1/5 flex justify-center items-center">
            <SheetTitle className="font-semibold text-2xl">
              {selectedNews?.title || "Berita Terkini"}
            </SheetTitle>
            <SheetDescription>
              {selectedNews?.date || "Berita terkait mesjid ibnu sina"}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col md:flex-row items-center justify-around h-full w-full bg-gray-800 rounded-t-3xl p-4">
            <div className="w-full md:w-1/3 h-48 md:h-96 bg-white rounded-lg mb-4 md:mb-0">
              <img
                src={formatImageUrl(newsItems[0]?.image)}
                alt={selectedNews?.title || "News image"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col w-full md:w-3/5">
              <h4 className="text-white text-xl md:text-3xl font-semibold mb-2">
                {selectedNews?.title || "Title of Content"}
              </h4>
              <p className="text-white text-sm md:text-base">
                {selectedNews?.content || "No content available"}
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default News;
