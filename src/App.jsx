import LandingNavigation from "./components/ui/navigation/navigation";
import Donate from "./features/landing/components/donate";
import Hero from "./features/landing/components/hero";
import Kas from "./features/landing/components/kas";
import TopDonation from "./features/landing/components/top_donation";

function App() {
  return (
    <div>
      <LandingNavigation />
      <Hero />
      <Kas />
      <Donate />
      <TopDonation />
    </div>
  );
}

export default App;
