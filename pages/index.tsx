import { HeroContentLeft } from "../component/HeroContent/HeroContentLeft";
import { FeaturesCards } from "../component/FeaturesCards/FeaturesCards";
import { FeaturesTitle } from "../component/FeaturesTitle/FeaturesTitle";
import { FaqWithImage } from "../component/FAQ/FaqWithImage";

export default function IndexPage() {
  return (
    <div>
      <HeroContentLeft />
      <FeaturesTitle />
      <FeaturesCards />
      <FaqWithImage />
    </div>
  );
}
