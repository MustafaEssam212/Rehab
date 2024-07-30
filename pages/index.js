

import Statistics from "@/Components/Landing/Statistics";
import Carousel from "@/Components/Landing/Carousel";
import Services from "@/Components/Landing/Services";
import DoctorProfile from "@/Components/Landing/Doctor-Profile";
import VideoMain from "@/Components/Landing/Video/VideoMain";
import Reviews from "@/Components/Landing/Reviews";
import RecentBlogs from "@/Components/Landing/Recent-Blogs";
import OurSpecializations from "@/Components/Landing/Our-Specializations";

export default function Home() {
  return (
    <div className="landing-page-container">
        <Carousel />
        <Statistics />
        <Services />
        <OurSpecializations />
        <DoctorProfile />
        <VideoMain />
        <Reviews />
        <RecentBlogs />
    </div>
  );
}
