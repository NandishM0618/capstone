
import Carousel from "./components/Slider";
import Blogs from "./components/Blogs";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Carousel />
      <Blogs />
    </div>
  );
}
