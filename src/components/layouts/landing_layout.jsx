import { lazy } from "react";
import LandingNavigation from "../ui/navigation";
import Footer from "../ui/footer";

const Hero = lazy(() => import("@/features/landing/components/hero"));
const Kas = lazy(() => import("@/features/landing/components/cash"));
const Donate = lazy(() => import("@/features/landing/components/donate"));
const TopDonation = lazy(
  () => import("@/features/landing/components/top_donation")
);
const News = lazy(() => import("@/features/landing/components/news"));

const LandingLayout = () => {
  return (
    <div>
      <LandingNavigation />
      <main>
        <div id="beranda">
          <Hero />
        </div>
        <div id="kas-masjid">
          <Kas />
        </div>
        <div id="donasi">
          <Donate />
        </div>
        <div id="peringkat-donasi">
          <TopDonation />
        </div>
        <div id="berita">
          <News />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
