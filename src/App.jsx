import LandingNavigation from "./components/ui/navigation/navigation";
import Donate from "./features/landing/components/donate";
import Hero from "./features/landing/components/hero";
import Kas from "./features/landing/components/kas";

function App() {
  return (
    <div>
      <LandingNavigation />
      <Hero />
      <Kas />
      <Donate />
    </div>
  );
}

export default App;

