
import { FaEdit } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import PriceBar from "./Price-Bar";
import PackageBar from "./Package-Bar";
import { useState, useEffect } from "react";

const TopBar = () => {

    const [showPriceBar, setShowPriceBar] = useState(false);
    const [showPackageBar, setShowPackageBar] = useState(false);

    const getDataFromChild = (name, type) => {
        if(name === 'price'){
            setShowPriceBar(type)
        }

        else if(name === 'package'){
            setShowPackageBar(type)
        }
    }


    useEffect(()=> {

        if(showPriceBar & showPackageBar){
            setShowPackageBar(false);
        }

    }, [showPriceBar])

    useEffect(()=> {

        if(showPackageBar & showPriceBar){
            setShowPriceBar(false);
        }

    }, [showPackageBar])

    return(
        <div className="top-bar">
            <button onClick={()=> setShowPriceBar(!showPriceBar)}>تعديل سعر الجلسة والكشف <FaEdit className="icon" /></button>
            <button onClick={()=> setShowPackageBar(!showPackageBar)}>اضافة باكيدچ جديدة <MdAddBox className="icon" /></button>
            {showPriceBar && <PriceBar sendDataToParent={getDataFromChild} />}
            {showPackageBar && <PackageBar sendDataToParent={getDataFromChild} />}
        </div>
    )
}


export default TopBar;