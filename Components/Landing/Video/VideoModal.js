
import { FaPlay } from "react-icons/fa";
import { useRef, useState, useEffect, useContext} from "react";
import { AppContext } from "@/utils/contextAPI";


const VideoModal = () => {


    const videoRef = useRef();
    const [paused, setPaused] = useState(true);
    const innerVideoModalRef = useRef(null);
    const AppContxt = useContext(AppContext);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (innerVideoModalRef.current && !innerVideoModalRef.current.contains(event.target)) {

                AppContxt.setVideoModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handlePlay = () => {
        if(videoRef.current.paused){
            videoRef.current.play();
            setPaused(false);
        }else{
            videoRef.current.pause();
            setPaused(true)
        }
    }

    return(
        <div className="video-modal">

            <div onClick={handlePlay} ref={innerVideoModalRef} className="inner-video-modal">


                <video ref={videoRef}>
                    <source src="/video.mp4" type="video/mp4"></source>
                </video>

                <div className="pause-play">
                    {paused && <button aria-label="تشغيل"><FaPlay className="icon" /></button>}
                </div>

            </div>


        </div>
    )
}


export default VideoModal;