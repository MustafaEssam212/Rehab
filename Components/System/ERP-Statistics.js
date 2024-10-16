
import IncomeOutgoingChart from "./IncomeOutgoingChart";
import CircleStats from "./Circle-Stats";
import LoadingCircle from "../Loading-Circle";
import { useState, useEffect } from "react";

const ERPStatistics = () => {

    const getCurrentMonthInArabic = () => {
        const options = { month: 'long' }; // Only format the month
        const formatter = new Intl.DateTimeFormat('ar-EG', options); // Arabic locale
        return formatter.format(new Date()); // Format current date
    };

    const [loading, setLoading] = useState(true);
    const [all, setAll] = useState({
        income: 0,
        outgoing: 0
    });

    const [packagesIncomeAndReturns, setPackagesIncomeAndReturns] = useState([
        { label: 'اجمالي عائدات الباكيدچ', value: 0, color: '#309C53' },
        { label: 'اجمالي مرتجعات الباكيدچ', value: 0, color: 'rgba(255, 99, 132, 0.6)' },
    ]);

    const [totalIndividual, setTotalIndividual] = useState([
        { label: 'مجموع عائدات الكشوفات والجلسات الفردية', value: 68080, color: '#309C53' },
        { label: 'Outgoing', value: 0, color: 'rgba(255, 99, 132, 0.6)' },
    ])


    const updatePackageValue = (label, newValue) => {
        setPackagesIncomeAndReturns(prevState =>
            prevState.map(item => 
                item.label === label ? { ...item, value: newValue } : item
            )
        );
    };


    const updateTotalIndividualValue = (label, newValue) => {
        setTotalIndividual(prevState =>
            prevState.map(item => 
                item.label === label ? { ...item, value: newValue } : item
            )
        );
    };





    useEffect(()=> {
        const getData = async () => {
            const res = await fetch(`/api/ERP?method=get-statistics&month=${getCurrentMonthInArabic()}`);
            const dataOfResponse = await res.json();
            if(res.status === 200){
                setAll({income: dataOfResponse.income, outgoing: dataOfResponse.outgoing});
                updatePackageValue('اجمالي عائدات الباكيدچ', dataOfResponse.totalPackages.income);
                updatePackageValue('اجمالي مرتجعات الباكيدچ', dataOfResponse.totalPackages.outgoing);
                updateTotalIndividualValue('مجموع عائدات الكشوفات والجلسات الفردية', dataOfResponse.individuals);
                setLoading(false);
            }
        }

        getData()
    }, [])

    return(
        <div className="ERP-Statistics">

            <div className="current-month-stats">
                <h1>معلومات الشهر الحالي</h1>

   

                {
                    loading ? <div className="loading-div"><LoadingCircle providedcolor="#309C53" size={`45px`} /></div> 

                    :

                    <div className="inner-current-month-stats">


                    <div className="month-statistics-erp">
                        <div className="titles">
                            <p className="income">العائد <span></span></p>
                            <p className="outgoing">الصادر <span></span></p>
                        </div>
                        <IncomeOutgoingChart income={all.income} outgoing={all.outgoing} month={getCurrentMonthInArabic()} />
                    </div>


                    <div className="month-statistics-erp">
                    <div className="titles">
                            <p className="income">اجمالي عائدات الباكيدچ <span></span></p>
                            <p className="outgoing">اجمالي مرتجعات الباكيدچ <span></span></p>
                        </div>
                        <CircleStats dataPoints={packagesIncomeAndReturns} />
                    </div>

                    <div className="month-statistics-erp">
                    <div className="titles">
                            <p className="income">مجموع عائدات الكشوفات والجلسات الفردية <span></span></p>
                        </div>
                        <CircleStats dataPoints={totalIndividual} />
                    </div>
                </div>
                }

            </div>
            


        </div>
    )
}


export default ERPStatistics;