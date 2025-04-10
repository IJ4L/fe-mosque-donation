import LandingNavigation from "./components/ui/navigation";
import Donate from "./features/landing/components/donate";
import Hero from "./features/landing/components/hero";
import Kas from "./features/landing/components/cash";
import TopDonation from "./features/landing/components/top_donation";
import News from "./features/landing/components/news";

function App() {
  return (
    <div>
      <LandingNavigation />
      <Hero />
      <Kas />
      <Donate />
      <TopDonation />
      <News />
    </div>
  );
}

export default App;