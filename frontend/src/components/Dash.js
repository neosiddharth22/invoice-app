import React,{useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router';
import { deleteInvoice, Updatepost, fetchproduct } from '../config/Myservice';
import { Button,  Grid } from '@mui/material';

export default function Dash() {
    const navigate = useNavigate()
    const [refresh, setrefresh] = useState(true)
    const[flag,setFlag]=useState();
    const [state, setstate] = useState({
        paymentReceived: 0,
        pendingAmount: 0,
        totalAmount: 0,
        paidInvoice: 0,
        unpaidInvoice: 0,
        totalInvoice: 0,
        invoices: []

    })
    const deleteEle = (item) => {
        deleteInvoice(item)
        setrefresh(!refresh)
    }
    const updateInvoice = (item) => {
        Updatepost(item)
        setrefresh(!refresh)
    }
    const logout=(e)=>{
        e.preventDefault();
        setFlag(true)
        localStorage.clear();
        navigate("/login")
 
    }


    useEffect(async () => {
        if (localStorage.getItem('userlogin') != undefined) {
            let user = localStorage.getItem('userlogin');
            
            let data = []
            await fetchproduct({ email:user.email }).then(res => {
                data = [...res.data]
                console.log(res.data)
            })
            // setstate({...state,invoices:data})
            let sumOfTotal = 0;
            let upaid = 0;
            let pamount = 0;
            let totalinvoice = 0;

            data.forEach(ele => {
                console.log(ele)

                totalinvoice += 1
                if (ele.status === 'UNPAID') {
                    upaid += 1
                    console.log('inside status');
                    ele.product.map(item => {
                        sumOfTotal += item.total
                        pamount += item.total


                    })
                }
                else {
                    ele.product.map(item => {
                        sumOfTotal += item.total
                    })
                }
                console.log(sumOfTotal, "Sum of total")
            })

            setstate({
                invoices: data,
                paymentReceived: sumOfTotal - pamount,
                pendingAmount: pamount,
                totalAmount: sumOfTotal,
                paidInvoice: totalinvoice - upaid,
                unpaidInvoice: upaid,
                totalInvoice: totalinvoice,
            })
        }
    }, [refresh])
    return (
        <div >
            <div className='row'>
            <h1 className='col'></h1>
            <div className='col text-end'>
            <Button onClick={logout}>Logout</Button>
            </div>
            </div>
            <div  style={{backgroundColor:"lightblue"}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}>
                <div class="card  text-dark" >
                            <div class="card-body">
                                <h5 class="card-title"> Received amount</h5>
                                <h6 class="card-subtitle mb-2 text- mt-3">{state.paymentReceived}</h6>
                            </div>
                        </div>
                </Grid>
                <Grid item xs={4}>
                <div class="card  text-dark" >
                            <div class="card-body">
                                <h5 class="card-title">Pending amount</h5>
                                <h6 class="card-subtitle mb-2 text- mt-3">{state.pendingAmount}</h6>
                            </div>
                        </div>
                </Grid>
                <Grid item xs={4}>
                <div class="card" >
                            <div class="card-body">
                                <h5 class="card-title">Total Amount</h5>
                                <h6 class="card-subtitle mb-2 text- mt-3">{state.totalAmount}</h6>
                            </div>
                        </div>
                </Grid>
                <Grid item xs={4}>
                    <div class="card" >
                            <div class="card-body">
                                <h5 class="card-title">Total Invoice</h5>
                                <h6 class="card-subtitle mb-2 text- mt-3">{state.totalInvoice}</h6>
                            </div>
                        </div>
                </Grid>
               </div>

            
        </div>
    )
}
