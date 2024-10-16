
import { useState, useRef, useEffect } from "react";
import LoadingCircle from "../Loading-Circle";
import { toast } from "react-toastify";


const OutgoingComponent = () => {

    const [openAddNewPayMenu, setOpenAddNewPayMenu] = useState(false);
    const [openDeletePayMenu, setOpenDeletePayMenu] = useState(false);
    const addNewPayDivRef = useRef();
    const deletePayDivRef = useRef();
    const [newPayBtnLoading, setNewPayBtnLoading] = useState(false);
    const [deletePayBtnLoading, setDeletePayBtnLoading] = useState(false);




    const [newPay, setNewPay] = useState({
        name: '',
        relatedTo: '',
        amount: null,
        date: Date.now()
    })

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (addNewPayDivRef.current && !addNewPayDivRef.current.contains(event.target)) {

                setOpenAddNewPayMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (deletePayDivRef.current && !deletePayDivRef.current.contains(event.target)) {

                setOpenDeletePayMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const dateRef = useRef();
    const [deletePayNumber, setDeletePayNumber] = useState(null);





    const searchDateRef = useRef();



    //////////////////////////// GET DATA ////////////////////////////

    const [pays, setPays] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);
    const [totalData, setTotalData] = useState(0);
    const [page, setPage] = useState(1);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [date, setDate] = useState('');
    const [related, setRelated] = useState('');

    const getData = async (pageNum, search = false) => {
        setLoadMoreLoading(true);
        const res = await fetch(`/api/ERP?method=get-outgoings&page=${pageNum}&search=${search}&date=${date}&related=${related}`);
        const dataOfResponse = await res.json();

        if(res.status === 200){
            setPays(pageNum === 1 
                ? dataOfResponse.pays 
                : [...pays, ...dataOfResponse.pays]);
                setTotalData(dataOfResponse.length);
                setLoadingPage(false);
                setLoadMoreLoading(false);
        }else{
            setLoadingPage(false);
            setLoadMoreLoading(false);
        }
    }


    useEffect(()=> {
        getData(1);
    }, [])

    useEffect(() => {
        if (page > 1) {
            getData(page);
        }
    }, [page]);

    

    //////////////////////////// SEARCH DATA ////////////////////////////


    useEffect(() => {
        if(date || related){
            getData(1,true);
        }else{
            getData(1, false);
        }
    }, [date, related])




    /////////////////////// ADD - DELETE /////////////////////////

    const handleAddNewPay = async () => {
        setNewPayBtnLoading(true);
        if(!newPay.amount ||!newPay.date || !newPay.name){
            toast.warning('برجاء ملئ المعلومات المطلوبة');
            setNewPayBtnLoading(false);
        }else{

            const res = await fetch(`/api/ERP?method=add-new-outgoing`, {
                method: 'POST',
                body: JSON.stringify(newPay),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success(dataOfResponse.message);
                setNewPay({
                    name: '',
                    amount: null,
                    date: Date.now(),
                    relatedTo: ''
                });
                setDate('');
                setRelated('');
                getData(1, false);
                setNewPayBtnLoading(false);
                setOpenAddNewPayMenu(false);
            }else{
                toast.error(dataOfResponse.message);
                setNewPayBtnLoading(false);
            }

        }
    }


    const handleDeletePay = async () => {
        setDeletePayBtnLoading(true);
        if(!deletePayNumber){
            toast.warning('برجاء اضافة المعلومات المطلوبة');
            setDeletePayBtnLoading(false);
        }else{
            const res = await fetch(`/api/ERP?method=delete-outgoing&number=${deletePayNumber}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success(dataOfResponse.message);
                setDeletePayNumber('');
                setDate('');
                setRelated('');
                getData(1, false);
                setDeletePayBtnLoading(false);
                setOpenDeletePayMenu(false);
            }else{
                toast.error(dataOfResponse.message);
                setDeletePayBtnLoading(false);
            }
        }
    }


    return(
        <div className="pay-component-erp">
            
            <div className="pay-bar">
                <button onClick={()=> setOpenDeletePayMenu(!openDeletePayMenu)}>مسح صادر</button>
                <button onClick={()=> setOpenAddNewPayMenu(!openAddNewPayMenu)}>اضافة صادر جديد</button>


                {
                openAddNewPayMenu && <div ref={addNewPayDivRef} className="add-new-pay-bar">

                    <div className="left-price-bar-erp">
                        <button onClick={()=> setOpenAddNewPayMenu(false)}>الغاء</button>
                        <button onClick={handleAddNewPay}>{newPayBtnLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `موافق`}</button>
                    </div>


                    <div className="right-price-bar-erp">
                            
                            <div>
                                <input ref={dateRef} onClick={()=> dateRef.current.showPicker()} value={newPay.date} placeholder="التاريخ" onChange={(s)=> setNewPay({...newPay, date: s.target.value})} type="date"></input>
                                <p>التاريخ</p>
                            </div>

                            <div>
                                <input value={newPay.amount} placeholder="المبلغ" onChange={(s)=> setNewPay({...newPay, amount: s.target.value})} type="number"></input>
                                <p>المبلغ</p>
                            </div>



                            <div>
                                <input value={newPay.relatedTo} placeholder="متعلق بـ (اختياري)" onChange={(s)=> setNewPay({...newPay, relatedTo: s.target.value})} type="text"></input>
                                <p>متعلق بـ (اختياري)</p>
                            </div>
                            


                            <div>
                                <input value={newPay.name} placeholder="اسم الصادر" onChange={(s)=> setNewPay({...newPay, name: s.target.value})} type="text"></input>
                                <p>اسم الصادر</p>
                            </div>

                    </div>
                    
                </div>
                }


                {
                openDeletePayMenu && <div ref={deletePayDivRef} className="delete-pay-bar">

                    <div className="left-price-bar-erp">
                        <button onClick={()=> setOpenDeletePayMenu(false)}>الغاء</button>
                        <button onClick={handleDeletePay}>{deletePayBtnLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `موافق`}</button>
                    </div>

                    <div className="right-price-bar-erp">
                            <div>
                                <input placeholder="رقم الصادر" onChange={(s)=> setDeletePayNumber(s.target.value)} type="number"></input>
                                <p>رقم الصادر</p>
                            </div>
                    </div>
                </div>
                }
            </div>

            <div className="search-bar">
                <div>
                    <input value={date} onChange={(s)=> setDate(s.target.value)} ref={searchDateRef} onClick={()=> searchDateRef.current.showPicker()} type="date"></input>
                    <p>تاريخ</p>
                </div>
                <div>
                    <input value={related} onChange={(s)=> setRelated(s.target.value)} type="number" placeholder="رقم الهاتف"></input>
                    <p>متعلق بـ</p>
                </div>
                <h2>تصفية</h2>
            </div>
            

            <div className="inner-pays-component">

                    {
                        loadingPage ? <div className="loading-page-pays"><LoadingCircle providedcolor="#309C53" size={`45px`} /></div>

                        :

                        <div className="pays-container">


                            {
                                pays.length <= 0 ? <div className="no-length-pays"><p>لا يوجد نتائج</p></div> 

                                : 

                                <>
                                

                             

                                    {
                                        pays.map((e, key) => {
                                            return(
                                                <div key={key} className="pay-div">
                                                    <p>{e.serial} <span>:رقم الصادر</span></p>
                                                    <p>{new Date(e.date).toLocaleDateString('en-GB')}</p>
                                                    <p>{e.relatedTo ? e.relatedTo : 'لا يوجد'} <span>متعلق بـ</span></p>
                                                    <p>{e.amount} <span>:المبلغ</span></p>
                                                    <p>{e.name}</p>
                                                </div>
                                            )
                                        })
                                    }
                                
                                </>
                            }


                        </div>
                    }


                    {
                        totalData > 20 && pays.length !== totalData &&  <button onClick={loadMoreLoading ? ()=> {return} : ()=> setPage(prevPage => prevPage + 1)} className="load-more-btn">{loadMoreLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `عرض المذيد`}</button>
                    }

            </div>

        </div>
    )
}




export default OutgoingComponent;