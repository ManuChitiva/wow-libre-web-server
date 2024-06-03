import Advertising from "@/components/home/banner";
import Bidding from "@/components/home/bidding";
import SliderHome from "@/components/home/slider";
import Subscription from "@/components/home/subscription";
import Us from "@/components/home/us";

const Home = () => {
  return (
    <div>
      <Advertising />
      <SliderHome />
      <Bidding />
      <Us />
      <Subscription />
    </div>
  );
};
export default Home;
