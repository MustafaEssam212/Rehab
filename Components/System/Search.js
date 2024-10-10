

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Search = ({sendDataToParent, reload}) => {

    const [number, setNumber] = useState(null);
    const getUsers = async () => {
        const res = await fetch(`/api/ERP?method=get-users-search&phoneNumber=${number}`);
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
    }, [reload])

    return(
        <div className="search-component-erp">
            <div className="inner-search-erp">
                <input value={number} onChange={(s)=> setNumber(s.target.value)} type="number" placeholder="رقم الهاتف"></input>
                <p>البحث</p>
            </div>
        </div>
    )
}


export default Search;