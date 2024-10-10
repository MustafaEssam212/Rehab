
import Search from "./Search";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";


const Package = () => {

    const [users, setUsers] = useState([]);
    const [packages, setPackages] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const [addPackage, setAddPackage] = useState('');
    const [openMenuIndex, setOpenMenuIndex] = useState(0);
    const [reload, setReload] = useState(false);

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


    // State to store session count for each user
    const [sessions, setSessions] = useState({});



    // Update sessions state when users array changes
    useEffect(() => {
        if (users.length > 0) {
            const initialSessions = {};
            users.forEach((user) => {
                initialSessions[user.phoneNumber] = user.package?.sessions || 0;
            });
            setSessions(initialSessions);
        }
    }, [users]);

    // Function to increment sessions for a user
    const incrementSessions = (phoneNumber) => {
        setSessions((prev) => ({
            ...prev,
            [phoneNumber]: (prev[phoneNumber] || 0) + 1, // Ensure the value is a number
        }));
    };

    // Function to decrement sessions for a user (don't go below 0)
    const decrementSessions = (phoneNumber) => {
        setSessions((prev) => ({
            ...prev,
            [phoneNumber]: prev[phoneNumber] > 0 ? prev[phoneNumber] - 1 : 0,
        }));
    };

    const sendDataToParent = (param) => {
        setUsers(param);
    }

    console.log(sessions)

 

    useEffect(()=> {

        setAddPackage('');

    }, [openMenuIndex, users])



    useEffect(()=> {
        if(addPackage){

            
            const addPackageToUser = async () => {
                const user = await users[openMenuIndex];
                const getPackage = await packages.find((e) => e.name === addPackage);
                if(user.package.sessions > 0){
                    toast.warning('هذا المستخدم لدية الباكيدچ بالفعل اذا كنت ترغب في اضافة جلسات له قم بتعديل جلسات او مسح الباكيدچ الموجودة بالفعل واضافة غيرها')
                }else{
                    const res = await fetch(`/api/ERP?method=add-package-to-user`, {
                        method: 'POST',
                        body: JSON.stringify({user, package: getPackage}),
                        headers: {
                            'Contnet-Type': 'application/json'
                        }
                    });
    
                    const dataOfResponse = await res.json();
    
                    if(res.status === 200){
                        toast.success(dataOfResponse.message);
                        setAddPackage('');
                        setReload(!reload)
                    }else{
                        toast.error(dataOfResponse.message);
                    }
                }
            }

            addPackageToUser();

        }
    }, [addPackage])


    const handleDeletePackage = async (obj) => {
        if(!obj.package.name){
            toast.warning('هذا المستخدم ليس لدية باكيدچ ليتم حذفها');
        }else{
            const res = await fetch(`/api/ERP?method=delete-package-of-user&phoneNumber=${obj.phoneNumber}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success(dataOfResponse.message);
                setReload(!reload);
            }else{
                toast.error(dataOfResponse.message);
            }
        }
    }

    const handleChangeSessions = async (obj) => {
        if(!obj.package.name){
            toast.warning('هذا المستخدم ليس لدية باكيدچ ليتم حذفها');
        }

        else{
            const res = await fetch(`/api/ERP?method=change-sessions-count-of-user&sessions=${sessions[obj.phoneNumber]}&phoneNumber=${obj.phoneNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success(dataOfResponse.message);
                setReload(!reload);
            }else{
                toast.error(dataOfResponse.message);
            }
        }
    }

    return(
        <div className="package-component-erp">
                <Search sendDataToParent={sendDataToParent} reload={reload} />

                <div className="inner-package-component-erp">

                        {
                            users.length <= 0 ? <p className="alert">لا يوجد نتائج</p> : <div className="package-users">
                            
        
                            
                            {
                                users.map((e, key) => {
                                    return(
                                        <div key={key} className="user">
              
                                        <div>
                                            <div className="edit-package-counter">
                                                <button onClick={() => decrementSessions(e.phoneNumber)}>-</button>
                                                <span>{sessions[e.phoneNumber] ?? 0}</span>
                                                <button onClick={() => incrementSessions(e.phoneNumber)}>+</button>
                                            </div>
                                            <p>{sessions[e.phoneNumber] !== e.package.sessions && e.package.sessions ? <FaCircleCheck onClick={()=> handleChangeSessions(e)} className="check-icon" /> : `تعديل جلسات`}</p>
                                        </div>

                                        <div className="delete-package-erp">
                                            <button onClick={()=> handleDeletePackage(e)}><FaRegTrashAlt className="icon" /></button>
                                            <p>مسح الباكيدچ</p>
                                        </div>

                                        <div>
                                            <div onClick={() => {setOpenMenu(!openMenu); setOpenMenuIndex(key)}} className="dropmenu">
                                                <IoMdArrowDropdown className="icon" />
                                                <p>{addPackage && openMenuIndex === key ? addPackage : 'قم بإختيار الباكيدچ'}</p>
                                                {openMenu && openMenuIndex === key && (
                                                <div className="dropmenu-list heighted">
                                                {
                                                    packages.map((e, key) => {
                                                        return(
                                                            <button onClick={()=> setAddPackage(e.name)} key={key}>{e.name}</button>
                                                        )
                                                    })
                                                }
                                                </div>
                                                )}
                                            </div>
                                            <p>اضافة</p>
                                        </div>

                                        <div>
                                            {
                                                e.package.name ? <>
                                                
                                                
                                                <p>السعر <span>{e.package.price}</span></p>
                                                <p>متبقي <span>{e.package.sessions}</span></p>
                                                <p>{e.package.name}</p>
                                                
                                                </> : <p>لا يوجد باكيدچ</p>
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