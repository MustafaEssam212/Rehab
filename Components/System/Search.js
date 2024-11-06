

import { useState, useEffect, useRef } from "react";
import LoadingCircle from "../Loading-Circle";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa";
import * as XLSX from 'xlsx';

const Search = ({sendDataToParent, reload, section}) => {

    const [number, setNumber] = useState(null);
    const getUsers = async () => {
        const res = await fetch(`/api/ERP?method=${section === 'users' ? `get-users-search` : `get-non-users-search`}&phoneNumber=${number}`);
        const dataOfResponse = await res.json();

        if(res.status === 200){
            sendDataToParent(dataOfResponse.users)
        }else{
            sendDataToParent([]);
        }
    }   

    useEffect(()=> {
        if(number){


            getUsers()
        }else{
            sendDataToParent([])
        }
    }, [number])


    useEffect(() => {
        getUsers();
    }, [reload]);

    const [addNonUserMenu, setAddNonUserMenu] = useState(false);
    const [removeNonUserMenu, setRemoveNonUserMenu] = useState(false);
    const [deleteNonUserNumber, setDeleteNonUserNumber] = useState('');

    const divRef = useRef();
    const [nonUser, setNonUser] = useState({
        username: '',
        phoneNumber: '',
        package: {
            name: null,
            sessions: null,
            price: null
        }
    });

    const [addNonUserLoading, setAddNonUserLoading] = useState(false);
    const deleteDivRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {

                setAddNonUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (deleteDivRef.current && !deleteDivRef.current.contains(event.target)) {

                setRemoveNonUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleAddNonUser = async () => {
        setAddNonUserLoading(true);

        if(!nonUser.phoneNumber || !nonUser.username){
            toast.warning('برجاء اضافة المعلومات المطلوبة');
            setAddNonUserLoading(false);
        }else{
            const res = await fetch(`/api/ERP?method=add-non-user`, {
                method: 'POST',
                body: JSON.stringify(nonUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success(dataOfResponse.message);
                getUsers()
                setAddNonUserLoading(false);
                setAddNonUserMenu(false);
            }else{
                toast.error(dataOfResponse.message);
                setAddNonUserLoading(false);
            }
        }
    }

    const [deleteNonUserLoading, setDeleteNonUserLoading] = useState(false);

    const handleDeleteNonUser = async () => {
        setDeleteNonUserLoading(true);

        if(!deleteNonUserNumber){
            toast.warning('برجاء ملئ المعلومات المطلوبة');
            setDeleteNonUserLoading(false);
        }else{

            const res = await fetch(`/api/ERP?method=delete-non-user&phoneNumber=${deleteNonUserNumber}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success(dataOfResponse.message);
                getUsers()
                setDeleteNonUserLoading(false);
                setRemoveNonUserMenu(false);
            }else{
                toast.error(dataOfResponse.message);
                setDeleteNonUserLoading(false);
            }

        }
        
    }


    const handleDownloadNonUsers = async () => {
        try {
            const response = await fetch('/api/getData?method=download-non-users-data');
            const users = await response.json();
  
        
            if (!Array.isArray(users)) {
              toast.error('حدث خطأ اثناء تنفيذ العملية');
              return;
            }
        
            // Format user data with Arabic headers
            const formattedUsers = users.map(user => ({
              'رقم الهاتف': user.phoneNumber,
              'الاسم': user.username,
              }));
        
            // Create a new workbook and worksheet
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(formattedUsers);
        
            // Set the worksheet direction to RTL
            worksheet['!rtl'] = true;
        
            // Auto-fit the column widths based on content
            const maxLengths = Object.keys(formattedUsers[0]).map(key => {
              return Math.max(...formattedUsers.map(user => (user[key] || '').toString().length), key.length);
            });
        
            worksheet['!cols'] = maxLengths.map(length => ({ wch: length + 5 })); // Adding extra padding to width
        
            // Append the worksheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, 'العملاء غير المسجلين');
        
            // Trigger download of the Excel file
            XLSX.writeFile(workbook, 'العملاء غير المسجلين.xlsx');
          } catch (error) {
            toast.error('حدث خطأ اثناء تنفيذ العملية');
          }
    }

    return(
        <div className="search-component-erp">
            <div className="inner-search-erp">
                <input value={number} onChange={(s)=> setNumber(s.target.value)} type="number" placeholder="رقم الهاتف"></input>
                <p>البحث</p>
            </div>


            {section === 'non-users' && <button style={{backgroundColor: 'rgb(218, 29, 29)'}} onClick={()=> setRemoveNonUserMenu(!removeNonUserMenu)}>مسح عميل غير مسجل</button>}
            {section === 'non-users' && <button onClick={()=> setAddNonUserMenu(!addNonUserMenu)}>اضافة عميل غير مسجل</button>}
            {section === 'non-users' && <button onClick={handleDownloadNonUsers}><FaDownload className="icon" /></button>}

            {addNonUserMenu && <div ref={divRef} className="add-non-user-menu">
                <div className="left-price-bar-erp">
                    <button onClick={()=> setAddNonUserMenu(false)}>الغاء</button>
                    <button onClick={handleAddNonUser}>{addNonUserLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : 'موافق'}</button>
                </div>

                <div className="right-price-bar-erp">
                    <div>
                        <input onChange={(s)=> setNonUser({...nonUser, phoneNumber: s.target.value})} placeholder="رقم العميل" type="number"></input>
                        <p>رقم العميل</p>
                    </div>
                    <div>
                        <input onChange={(s)=> setNonUser({...nonUser, username: s.target.value})} placeholder="اسم العميل" type="text"></input>
                        <p>اسم العميل</p>
                    </div>
                </div>
            </div>}

            {
                removeNonUserMenu && <div ref={deleteDivRef} className="remove-non-user-menu">
                    <div className="left-price-bar-erp">
                        <button onClick={()=> setRemoveNonUserMenu(false)}>الغاء</button>
                        <button onClick={handleDeleteNonUser}>{deleteNonUserLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : 'موافق'}</button>
                    </div>

                    <div className="right-price-bar-erp">
                    <div>
                        <input onChange={(s)=> setDeleteNonUserNumber(s.target.value)} placeholder="رقم العميل" type="number"></input>
                        <p>رقم العميل</p>
                    </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default Search;