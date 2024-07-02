import Advertising from "@/components/home/banner";
import Bidding from "@/components/home/bidding";
import SliderHome from "@/components/home/slider";
import Subscription from "@/components/home/subscription";
import Us from "@/components/home/us";
import Navbar from "@/components/navbar/navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Advertising />
      <SliderHome />
      <Bidding />
      <Us />
      <Subscription />
    </>
  );
};
export default Home;
