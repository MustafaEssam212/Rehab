
import {useRef, useEffect, useState} from 'react';
import LoadingCircle from '../Loading-Circle';
import { toast } from 'react-toastify';
import { IoMdArrowDropdown } from "react-icons/io";


const PopPackage = ({sendDataToParent, section, user, type}) => {

    const divRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {

                sendDataToParent('close', false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [packages, setPackages] = useState([]);
    const [addPackage, setAddPackage] = useState('');
    const [addBtnLoading, setAddBtnLoading] = useState(false);
    const [chosenPackageObj, setChosenPackageObj] = useState({});
    const [newPackageForUser, setNewPackageForUser] = useState({
        name: '',
        price: 0,
        sessions: 0,
        returns: 0,
        paid: null,
        off: 0,
        remaining: null,
        status: 'جارية',
        date: Date.now()
    });



    const getPackagesNames = async () => {
        const res = await fetch(`/api/ERP?method=get-packages-names`);
        const dataOfResponse = await res.json();

        if(res.status === 200){
            setPackages(dataOfResponse.packages)
        }else{
            toast.error(dataOfResponse.message);
        }
    }


    //////////////// ADD PACKAGE SECTION FUNCTIONS ////////////////

    useEffect(()=> {
        if(chosenPackageObj){
            setNewPackageForUser({...newPackageForUser, name: chosenPackageObj.name, price: chosenPackageObj.price, sessions: chosenPackageObj.sessions})
        }
    }, [chosenPackageObj])

    useEffect(() => {
        if(section === 'add'){
            getPackagesNames()
        }
    }, [])


    useEffect(()=> {
        if(addPackage){
            setChosenPackageObj(packages.find((e) => e.name === addPackage));
        }
    }, [addPackage])



    const handleChangeOff = (s) => {


        setNewPackageForUser({...newPackageForUser, off: s.target.value});

    }

    useEffect(()=> {
        if(newPackageForUser.off){
            setNewPackageForUser({...newPackageForUser, price: parseInt(chosenPackageObj.price) - (parseInt(chosenPackageObj.price) * parseInt(newPackageForUser.off)) / 100});
        }else{
            setNewPackageForUser({...newPackageForUser, price: parseInt(chosenPackageObj.price)});
        }
    }, [newPackageForUser.off])



    useEffect(()=> {
        if(parseInt(newPackageForUser.paid) > parseInt(newPackageForUser.price)){
            toast.warning('لا يمكن ان يكون قيمة المدفوع اعلى من قيمة السعر الاساسي');
            setNewPackageForUser({...newPackageForUser, paid: 0, remaining: 0});
        }else{
            setNewPackageForUser({...newPackageForUser, remaining: (parseInt(newPackageForUser.price) - parseInt(newPackageForUser.paid))});
        }
    }, [newPackageForUser.paid])

    useEffect(()=> {
        setNewPackageForUser({...newPackageForUser, remaining: (parseInt(newPackageForUser.price) - parseInt(newPackageForUser.paid))});
    }, [newPackageForUser.price])


    const handleAddPackage = async () => {

        setAddBtnLoading(true);

        if(!newPackageForUser.name || !newPackageForUser.price || !newPackageForUser.sessions || !newPackageForUser.paid){
            toast.warning('برجاء اضافة المعلومات المطلوبة');
            setAddBtnLoading(false);
        }else{

            if(user.package.sessions > 0){
                toast.warning('هذا المستخدم لدية الباكيدچ بالفعل اذا كنت ترغب في اضافة جلسات له قم بتعديل جلسات او مسح الباكيدچ الموجودة بالفعل واضافة غيرها');
                setAddBtnLoading(false);
            }else{
                const res = await fetch(`/api/ERP?method=${type === 'user' ? `add-package-to-user` : `add-package-to-non-user`}`, {
                    method: 'POST',
                    body: JSON.stringify({phoneNumber: user.phoneNumber, package: newPackageForUser}),
                    headers: {
                        'Contnet-Type': 'application/json'
                    }
                });

                const dataOfResponse = await res.json();

                if(res.status === 200){
                    toast.success(dataOfResponse.message);
                    sendDataToParent('reload', true);
                    sendDataToParent('close', false);
                    setAddBtnLoading(false);
                }else{
                    toast.error(dataOfResponse.message);
                    setAddBtnLoading(false);
                }
            }

        }
    }



        //////////////// DELETE PACKAGE SECTION FUNCTIONS ////////////////

    const handleDeletePackage = async () => {
        setDeleteBtnLoading(true);
        if(!user.package.name){
            toast.warning('هذا المستخدم ليس لدية باكيدچ ليتم حذفها');
            setDeleteBtnLoading(false);
        }else{
            const res = await fetch(`/api/ERP?method=${type === 'user' ? `delete-package-of-user` : `delete-package-of-non-user`}&phoneNumber=${user.phoneNumber}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success(dataOfResponse.message);
                sendDataToParent('reload', true);
                setDeleteBtnLoading(false);
                sendDataToParent('close', false);
            }else{
                toast.error(dataOfResponse.message);
                setDeleteBtnLoading(false);
            }
        }
    }


        //////////////// EDIT PACKAGE SECTION FUNCTIONS ////////////////



        const [referencePackage, setReferencePackage] = useState({});
        const [editBtnLoading, setEditBtnLoading] = useState(false);


        useEffect(()=> {
            if(user.package.sessions){
                setReferencePackage(user.package);
            }
        }, [user]);


        const decrementSessions = () => {
            setReferencePackage((prevPackage) => ({
                ...prevPackage,
                sessions: Math.max(prevPackage.sessions - 1, 0), // Ensure sessions do not go below 0
            }));
        };

        const incrementSessions = () => {
            if(referencePackage.returns){
                return
            }else{
                setReferencePackage((prevPackage) => ({
                    ...prevPackage,
                    sessions: prevPackage.sessions + 1, // Increment sessions by 1
                }));
            }
        };


        useEffect(()=> {
            if(referencePackage.name){
   
               if(parseInt(referencePackage.paid) <= parseInt(referencePackage.price)){
                setReferencePackage({...referencePackage, remaining: parseInt(referencePackage.price) - parseInt(referencePackage.paid), returns: 0 });
               }else{
                    toast.warning('يجب ان يكون المبلغ المدفوع مساوٍ لقيمة الباكيدچ الاساسية او اصغر منها')
                   setReferencePackage({...referencePackage, paid: user.package.paid, remaining: user.package.remaining, returns: user.package.returns });
               }
   
            }
           }, [referencePackage.paid]);
 
           useEffect(()=> {
            if(referencePackage.name){


                if(parseInt(referencePackage.returns) + parseInt(referencePackage.paid) > parseInt(referencePackage.price)){
                        toast.warning('يجب ان يكون مجموع مبلغ المرتجع ومجموع المدفوع مساوً لقيمة الباكيدچ الاجمالية');
                        setReferencePackage({...referencePackage, returns: user.package.returns, remaining: user.package.remaining, sessions: user.package.sessions});
                }else{
                    setReferencePackage({...referencePackage, remaining: parseInt(referencePackage.price) - ( (isNaN(parseInt(referencePackage.returns)) ? 0 : parseInt(referencePackage.returns)) + parseInt(referencePackage.paid)), sessions: 0});
                }




            }
        }, [referencePackage.returns])


        useEffect(()=> {
            if(referencePackage.name){
    
    
                if(parseInt(referencePackage.sessions) <= 0){
    
    
                    if(parseInt(referencePackage.paid) === parseInt(referencePackage.price) && !parseInt(referencePackage.remaining) && !parseInt(referencePackage.returns)){
                        setReferencePackage({...referencePackage, status: 'مُكتملة'})
                    }
                    
                    else if(parseInt(referencePackage.paid) < parseInt(referencePackage.price) && parseInt(referencePackage.returns) + parseInt(referencePackage.paid) === parseInt(referencePackage.price) && !parseInt(referencePackage.remaining)){
                        setReferencePackage({...referencePackage, status: 'ملغية'})
                    }
    
    
                    else if(parseInt(referencePackage.paid) < parseInt(referencePackage.price) && !parseInt(referencePackage.returns) && parseInt(referencePackage.remaining) + parseInt(referencePackage.paid) === parseInt(referencePackage.price)){
                        setReferencePackage({...referencePackage, status: 'مُكتملة غير مدفوعة'})
                    }
    
    
                }else if(parseInt(referencePackage.sessions) > 0){
    
    
    
                    if(parseInt(referencePackage.paid) === parseInt(referencePackage.price) && !parseInt(referencePackage.remaining) && !parseInt(referencePackage.returns)){
                        setReferencePackage({...referencePackage, status: ' مدفوعة بالكامل غير مُكتملة'})
                    }
    
                    else if(parseInt(referencePackage.paid) < parseInt(referencePackage.price) && !parseInt(referencePackage.returns) && parseInt(referencePackage.remaining) + parseInt(referencePackage.paid) === parseInt(referencePackage.price)){
                           setReferencePackage({...referencePackage, status: 'جارية'})
                    }
    
    
                }
    
    
    
    
            }
        }, [referencePackage])


        const handleEdit = async () => {
            setEditBtnLoading(true);

            const sendData = async () =>{
                const res = await fetch(`/api/ERP?method=${type === 'user' ? `edit-package-of-user` : `edit-package-of-non-user`}&phoneNumber=${user.phoneNumber}`, {
                    method: 'PUT',
                    body: JSON.stringify({package: referencePackage}),  
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });


                const dataOfResponse = await res.json();

                if(res.status === 200){
                    toast.success(dataOfResponse.message);
                    sendDataToParent('reload', true);
                    sendDataToParent('close', false);
                    setEditBtnLoading(false);
                }else{
                    toast.error(dataOfResponse.message);
                    setEditBtnLoading(false);
                }
            }

            if(parseInt(referencePackage.returns) && !parseInt(referencePackage.sessions)){
                if(parseInt(referencePackage.returns) + parseInt(referencePackage.paid) !== parseInt(referencePackage.price)){
                    toast.warning('في حالة تحويل الباكيدچ الى مرتجع يتم تحديد عدد الجلسات بصفر وتحويل حالتها الى ملغية لذلك يجب ان يكون مبلغ المرتجع زائد المبلغ المدفوع يساوي قيمة الباكيدچ الاجمالية');
                    setEditBtnLoading(false);
                }else{
                    sendData()
                }
            }else{
            
                sendData()
            }
        }

    return(
        <div className="pop-package-container">

            <div ref={divRef} className="inner-pop-package">
                
                {
                    section === 'delete' && <div className="delete-package-pop main-div">
                        <h1>هل ترغب في مسح الباكيدچ الخاصة بـ <span>{user.username}</span> نهائياً؟</h1>
                        <div className="delete-btns">
                            <button onClick={()=> sendDataToParent('close', false)}>لا</button>
                            <button onClick={handleDeletePackage}>{deleteBtnLoading ? <LoadingCircle providedcolor='white' size={`25px`} /> : `مسح`}</button>
                        </div>

                    </div>
                }


                {
                    section === 'add' && <div className="add-package-pop main-div">
                        
                        <h1>قم بإختيار الباكيدچ</h1>
            
                        <div onClick={() => setOpenMenu(!openMenu)} className="dropmenu">
                            <IoMdArrowDropdown className="icon" />
                            <p>{addPackage ? addPackage : 'قم بإختيار الباكيدچ'}</p>
                            {openMenu && (
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

                        {
                            addPackage && <>
                            
                            <div className="extra-info">

                                    <h1>معلومات اضافية</h1>

                                    <div className="info-div">
                                        <input placeholder="الجلسات" value={newPackageForUser.sessions} disabled></input>
                                        <p>عدد الجلسات</p>
                                    </div>

                                    <div className="info-div">
                                        <input placeholder="السعر" value={newPackageForUser.price} disabled></input>
                                        <p>سعر الباكيدچ الاساسي</p>
                                    </div>

                                    <div className="info-div">
                                        <input type="number" onInput={(e) => {
                                            if (e.target.value.length > 2) {
                                            e.target.value = e.target.value.slice(0, 2);
                                            }
                                        }} onChange={(s)=> handleChangeOff(s)} placeholder="نسبة خصم مئوية" value={chosenPackageObj.off}></input>
                                        <p>نسبة خصم</p>
                                    </div>

                                    <div className="info-div">
                                        <input type="number" onChange={(s)=> setNewPackageForUser({...newPackageForUser, paid: s.target.value})} placeholder="المبلغ المدفوع" value={newPackageForUser.paid}></input>
                                        <p>المبلغ الذي تم دفعه</p>
                                    </div>


                                    <div className="info-div">
                                        <input placeholder="المبلغ المتبقي" value={newPackageForUser.remaining} disabled></input>
                                        <p>المبلغ المتبقي من اجمالي السعر</p>
                                    </div>

                            </div>

                            <button onClick={handleAddPackage} className="main-btn">{addBtnLoading ? <LoadingCircle providedcolor='white' size={`25px`} /> : `اضافة`}</button>
                            
                            
                            </>
                        }

                    </div>
                }


                {
                    section === 'edit' && <div className="edit-package-pop main-div">

                        {
                            user.package.name ? <>
                            
                                    <h1>تعديل الباكيدچ</h1>

                                    <div className="edit-inputs">

                                        <div className="edit-individual-input">
                                            <input disabled value={referencePackage.name}></input>
                                            <p>اسم الباكيدچ</p>
                                        </div>

                                        <div className="edit-individual-input">
                                            <input disabled value={referencePackage.price}></input>
                                            <p>سعر الباكيدچ الاساسي</p>
                                        </div>

                                        <div className="edit-individual-input">
                                            <div className="edit-package-counter">
                                                <button onClick={() => decrementSessions()}>-</button>
                                                <span>{referencePackage.sessions}</span>
                                                <button onClick={() => incrementSessions()}>+</button>
                                            </div>
                                            <p>عدد الجلسات المتبقية</p>
                                        </div>

                                        <div className="edit-individual-input">
                                            <input disabled value={referencePackage.off}></input>
                                            <p>نسبة الخصم</p>
                                        </div>

                                        <div className="edit-individual-input">
                                            <input disabled value={new Date(referencePackage.date).toLocaleDateString('en-GB')}></input>
                                            <p>تاريخ الشراء</p>
                                        </div>

                                        <div className="edit-individual-input">
                                            <input type="number" onChange={(s)=> setReferencePackage({...referencePackage, paid: s.target.value})} value={referencePackage.paid}></input>
                                            <p>المبلغ الذي تم دفعه</p>
                                        </div>

                                        <div className="edit-individual-input">
                                            <input disabled value={referencePackage.remaining}></input>
                                            <p>المبلغ المتبقي</p>
                                        </div>


                                        <div className="edit-individual-input">
                                            <input type="number" onChange={(s)=> setReferencePackage({...referencePackage, returns: s.target.value})} value={referencePackage.returns}></input>
                                            <p>مبلغ مرتجع</p>
                                        </div>

                                        <div className="edit-individual-input">
                                            <input disabled value={referencePackage.status}></input>
                                            <p>الحالة</p>
                                        </div>

                                    </div>

                                    <button onClick={handleEdit} className="main-btn">{editBtnLoading ? <LoadingCircle providedcolor='white' size={`25px`} /> : `تعديل`}</button>
                            
                            
                            </> : <div className="alert"><h1>لا يوجد باكيدچ حالية</h1></div>
                        }

                    </div>
                }


                {
                    section === 'info' && <div className="info-package-pop main-div">

                        <h1>معلومات سابقة</h1>



                        <div className='previous-packages'>

                            {
                                user.history.map((e, key) => {
                                    return(
                                        <div key={key} className='pre-package'>
                                            <p>{new Date(e.date).toLocaleDateString('en-GB')}</p>
                                            <p>{e.status}</p>
                                            <p>:خصم <span>{e.off}%</span></p>
                                            <p>:المدفوع <span>{e.paid}</span></p>
                                            <p>:مرتجع <span>{e.returns}</span></p>
                                            <p>:السعر <span>{e.price}</span></p>
                                            <p>{e.name}</p>
                                        </div>    
                                    )
                                })
                            }

                        </div>
                    </div>
                }

            </div>

        </div>
    )
}


export default PopPackage;