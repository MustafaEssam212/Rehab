
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import PriceBar from "./Price-Bar";
import PackageBar from "./Package-Bar";
import { useState, useEffect } from "react";
import DeletePackage from "./Delete-Package";

const TopBar = () => {

    const [showPriceBar, setShowPriceBar] = useState(false);
    const [showPackageBar, setShowPackageBar] = useState(false);
    const [showDeletePackageBar, setShowDeletePackageBar] = useState(false);

    const getDataFromChild = (name, type) => {
        if(name === 'price'){
            setShowPriceBar(type)
        }

        else if(name === 'package'){
            setShowPackageBar(type)
        }

        else if(name === 'delete'){
            setShowDeletePackageBar(type)   
        }
    }


    useEffect(()=> {

        if(showPriceBar){
            setShowPackageBar(false);
            setShowDeletePackageBar(false);
        }

    }, [showPriceBar])

    useEffect(()=> {

        if(showPackageBar){
            setShowPriceBar(false);
            setShowDeletePackageBar(false);
        }

    }, [showPackageBar])

    useEffect(()=> {
        if(showDeletePackageBar){
            setShowPackageBar(false);
            setShowPriceBar(false);
        }
    }, [showDeletePackageBar])

    return(
        <div className="top-bar">
            <button className="regular-top-bar-btn" onClick={()=> setShowPriceBar(!showPriceBar)}>تعديل سعر الجلسة والكشف <FaEdit className="icon" /></button>
            <button className="regular-top-bar-btn" onClick={()=> setShowPackageBar(!showPackageBar)}>اضافة باكيدچ جديدة <MdAddBox className="icon" /></button>
            <button className="regular-top-bar-btn red-btn" onClick={()=> setShowDeletePackageBar(!showDeletePackageBar)}>مسح باكيدچ <FaTrash className="icon" /></button>
            {showPriceBar && <PriceBar sendDataToParent={getDataFromChild} />}
            {showPackageBar && <PackageBar sendDataToParent={getDataFromChild} />}
            {showDeletePackageBar && <DeletePackage sendDataToParent={getDataFromChild} />}
        </div>
    )
}


export default TopBar;