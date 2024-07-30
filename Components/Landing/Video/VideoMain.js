
import Image from "next/image";
import PosterImage from '../../../public/poster.png'
import { FaPlay } from "react-icons/fa";
import LoadingCircle from "@/Components/Loading-Circle";
import { AppContext } from "@/utils/contextAPI";
import { useContext } from "react";
import dynamic from "next/dynamic";

const VideoModal = dynamic(() => import('./VideoModal'), {
    loading: () => <div className="loading-video"><LoadingCircle size={50} /></div>
})

const VideoMain = () => {


    const AppContxt = useContext(AppContext);

    return(
        <div className="video-main-landing-container">
            
                <div className="video-main-landing-container-inner">
                            <div className="img-container">
                                <Image priority={false} src={PosterImage.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Center"></Image>
                            </div>

                        <div onClick={()=> AppContxt.setVideoModal(true)} className="layer-on-video-main">
                            
                            <div className="button-area">
                                <button aria-label="تشغيل"><FaPlay className="icon" /></button>
                            </div>

                            <div className="bottom-data">
                                <h1>مركز ريهاب للعلاج الطبيعي</h1>
                                <h3>مركز ريهاب للعلاج الطبيعي وامراض المخ والاعصاب والعمود الفقري وخشونة المفاصل ولإعادة تأهيل إصابات النخاع الشوكي والجلطات وإعادة التأهيل الرياضي وغيرها من حالات العلاج الطبيعي</h3>
                            </div>
                        </div>
                </div>

                {AppContxt.videoModal && <VideoModal />}
  

        </div>
    )
}


export default VideoMain;