

import Statistics from "@/Components/Landing/Statistics";
import Carousel from "@/Components/Landing/Carousel";
import Services from "@/Components/Landing/Services";
import DoctorProfile from "@/Components/Landing/Doctor-Profile";
import VideoMain from "@/Components/Landing/Video/VideoMain";
import OurDoctors from "@/Components/Landing/Our-Doctors";
import Reviews from "@/Components/Landing/Reviews";
import RecentBlogs from "@/Components/Landing/Recent-Blogs";


export default function Home() {
  return (
    <div className="landing-page-container">
        <Carousel />
        <Statistics />
        <Services />
        <DoctorProfile />
        <VideoMain />
        <OurDoctors />
        <Reviews />
        <RecentBlogs />
    </div>
  );
}
