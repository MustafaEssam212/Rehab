import { useState, useRef, useEffect } from "react";
import LoadingCircle from "../Loading-Circle";
import { toast } from "react-toastify";
import { IoMdArrowDropdown } from "react-icons/io";

const DeletePackage = ({sendDataToParent}) => {

    const [loading, setLoading] = useState(false);
    const divRef = useRef();
    const [packages, setPackages] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const [chosenPackage, setChosenPackage] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {

                sendDataToParent('delete', false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const getData = async () => {
        const res = await fetch(`/api/ERP?method=get-packages-names`);
        const dataOfResponse = await res.json();

        if(res.status === 200){
            setPackages(dataOfResponse.packages)
        }else{
            toast.error(dataOfResponse.message);
        }
    }

    useEffect(()=> {
        getData();
    }, [])

    const handleSubmit = async () => {
        setLoading(true);

        if(!chosenPackage){
            toast.warning('برجاء اختيار الباكيدچ المراد حذفها');
            setLoading(false);
        }else{
            
            const res = await fetch(`/api/ERP?method=delete-package&package=${chosenPackage}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success(dataOfResponse.message);
                getData();
                setChosenPackage('')
                setLoading(false);
            }else{
                toast.error(dataOfResponse.message);
                setLoading(false);
            }

        }
    }

    return(
        <div ref={divRef} className="delete-package-bar-erp">
              <div className="left-delete-package-bar-erp">
                    <button onClick={()=> sendDataToParent('delete', false)}>الغاء</button>
                    <button onClick={handleSubmit}>{loading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `مسح`}</button>
                </div>

                <div className="right-delete-package-bar-erp">
                    <div className="dropmenu-container">

                    <div onClick={() => setOpenMenu(!openMenu)} className="dropmenu">
                        <IoMdArrowDropdown className="icon" />
                        <p>{chosenPackage ? chosenPackage : 'قم بإختيار الباكيدچ'}</p>
                        {openMenu && (
                        <div className="dropmenu-list heighted">
                           {
                            packages.map((e, key) => {
                                return(
                                    <button onClick={()=> setChosenPackage(e.name)} key={key}>{e.name}</button>
                                )
                            })
                           }
                        </div>
                        )}
                    </div>
                        <p>اختر الباكيدچ</p>
                    </div>
                </div>
        </div>
    )
}


export default DeletePackage;