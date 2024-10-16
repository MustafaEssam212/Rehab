
import Search from "./Search";
import { useState } from "react";
import { FaCirclePlus, FaCircleInfo } from "react-icons/fa6";
import { MdEditDocument, MdDelete } from "react-icons/md";
import PopPackage from "./Pop-Package";


const Package = () => {

    const [users, setUsers] = useState([]);




    const [reload, setReload] = useState(false);
    const [popPackageSecion, setPopPackageSection] = useState('');
    const [openPopPackage, setOpenPopPackage] = useState(false);
    const [user, setUser] = useState({});



    const sendDataToParent = (param) => {
        setUsers(param);
    }




    const getDataFromPopPackage = (type, param) => {
        if(type === 'close'){
            setOpenPopPackage(param)
        }else if(type === 'reload'){
            setReload(!reload)
        }
    }   

    return(
        <div className="package-component-erp">
                <Search sendDataToParent={sendDataToParent} reload={reload} section={`users`} />
                {openPopPackage && <PopPackage type="user" sendDataToParent={getDataFromPopPackage} section={popPackageSecion} user={user} />}
                <div className="inner-package-component-erp">

                        {
                            users.length <= 0 ? <p className="alert">لا يوجد نتائج</p> : <div className="package-users">
                            
        
                            
                            {
                                users.map((e, key) => {
                                    return(
                                        <div key={key} className="user">


                                        <div className="btns-package">

                                            <button onClick={()=> {setPopPackageSection('info'); setOpenPopPackage(true); setUser(e)}} title="معلومات سابقة"><FaCircleInfo className="icon" /></button>
                                            <button onClick={()=> {setPopPackageSection('delete'); setOpenPopPackage(true); setUser(e)}} title="مسح الباكيدچ"><MdDelete className="icon" /></button>
                                            <button onClick={()=> {setPopPackageSection('edit'); setOpenPopPackage(true); setUser(e)}} title="تعديل الباكيدچ"><MdEditDocument className="icon" /></button>
                                            <button onClick={()=> {setPopPackageSection('add'); setOpenPopPackage(true); setUser(e)}} title="اضافة باكيدچ"><FaCirclePlus className="icon" /></button>

                                        </div>


                                        <div>
                                            {
                                                e.package.name ? <p>{e.package.name}</p> : <p>لا يوجد باكيدچ</p>
                                            }


                                        </div>


                                        <div>
                                            <p>{e.phoneNumber}</p>
                                        </div>

                                        <div>
                                            <p>{e.username}</p>
                                        </div>

                                </div>
                                    )
                                })
                            }
                            
                            
                            </div>
                        }

                </div>
        </div>
    )
}


export default Package;