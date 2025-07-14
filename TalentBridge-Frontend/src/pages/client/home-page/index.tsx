import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import SearchBar from "./SearchBar";
import TopCompaniesSection from "./TopCompaniesSection";

const HomePage = () => {
  return (
    <div>
      <SearchBar />
      <HeroSection />
      <HowItWorksSection />
      <TopCompaniesSection />
    </div>
  );
};

export default HomePage;
