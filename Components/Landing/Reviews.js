import Link from "next/link";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const Stars = () => {
    return (
        <div className="stars-checker">
            <IoIosStar className="checked-star-icon icon" />
            <IoIosStar className="checked-star-icon icon" />
            <IoIosStar className="checked-star-icon icon" />
            <IoIosStar className="checked-star-icon icon" />
            <IoIosStarOutline className="outline-star-Icon icon" />
        </div>
    );
};

const Reviews = () => {
    return (
        <div className="reviews-landing-container">

            <div className="global-headline">
                <h1>آراء عملائنا</h1>
                <div className="global-headline-line"></div>
            </div>

            <div className="inner-reviews-container">

                <div className="review-section">
                    <div className="profile"><FaUser className="icon" /></div>
                    <Stars />
                    <h2>&quot; مكان رائع نظام ونظافة وتعقيم مستوى عالي جدا واتقان في العمل والدكتور ممتاز جدا فوق الوصف &quot;</h2>
                </div>

                <div className="review-section">
                    <div className="profile"><FaUser className="icon" /></div>
                    <Stars />
                    <h2>&quot; خدمة مميزة ورعاية فائقة، اهتمام بالتفاصيل ونظافة لا مثيل لها، والدكتور محترف للغاية وذو خبرة &quot;</h2>
                </div>

                <div className="review-section">
                    <div className="profile"><FaUser className="icon" /></div>
                    <Stars />
                    <h2>&quot; تجربة رائعة بكل المقاييس، نظافة ودقة في المواعيد، والدكتور يمتاز بالخبرة والبشاشة، ينصح به &quot;</h2>
                </div>

            </div>

            <div className="link">
                <Link href="#">قراءة المزيد من الآراء <FaArrowRight className="icon" /></Link>
            </div>

        </div>
    );
};

export default Reviews;
