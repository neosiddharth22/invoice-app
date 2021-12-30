import { Button, Container, Icon, Box, TextField, FormControlLabel, Checkbox, Table, TableHead, TableBody, TableCell, TableRow, IconButton } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import Home from './Home';
import { useNavigate } from 'react-router';
import { addCustom, addInvoice, addProduct, getProduct } from '../config/Myservice';


const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[A-Za-z]{2,50}$/);
const regForAdd = RegExp(/^[A-Za-z0-9]{2,150}$/);

export default function Invoicecreate() {
    const rname = useRef(null)
    const raddress = useRef(null)
    const remail = useRef(null)
    const rdate = useRef(null)
    const [flag, setflag] = useState(false)
    const [productdata, setproductdata] = useState([])
    const itemRef = useRef(null)
    const quantityRef = useRef(null)
    const priceRef = useRef(null)
    const discountRef = useRef(null)
    const [errors, setErrors] = useState({ email: '', mobile: '', name: '', address: '', item: '', qty: '', price: '' });
    const [select, setSelect] = useState();
    const navigate = useNavigate();



    const handler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                errors.email = regForEmail.test(value) ? '' : 'Email is not valid';
                break;
            case 'mobile':
                errors.mobile = value.length === 10 ? '' : 'Mobile no must consist of 10 digits';
                break;
            case 'name':
                errors.name = regForName.test(value) ? '' : 'Enter proper name';
                break;
            case 'address':
                errors.address = regForAdd.test(value) ? '' : 'Enter Proper Address';
                break;
            case 'item':
                errors.item = regForName.test(value) ? '' : 'Enter Proper Item name';
                break;
            case 'qty':
                errors.qty = value > 0 ? '' : 'Quantity should be greater than one';
                break;
            case 'price':
                errors.price = value > 0 ? '' : 'Enter Proper Price';
                break;
            default:
                break;
        }
        setSelect({ errors, [name]: value }, () => {
            console.log(errors)
        })
        console.log(select)
    }


    const submitproduct = () => {
        const newproduct = {
            title: itemRef.current.value,
            quantity: parseInt(quantityRef.current.value),
            price: parseInt(priceRef.current.value),
            discount: parseInt(discountRef.current.value),
            total: ((priceRef.current.value - (priceRef.current.value * discountRef.current.value / 100)) * quantityRef.current.value)
        }
        if (newproduct.total > 0) {
            setproductdata([...productdata, newproduct])
            setflag(false)
        }
        else {
            alert('Total is less than 0')
            setflag(false)
        }
    }

    const submitdata = () => {

        const newdata = {
            rname: rname.current.value,
            remail: remail.current.value,
            raddress: raddress.current.value,
            rdate: rdate.current.value,
            product: productdata,
            status: 'UNPAID'
        }
        addInvoice(newdata).then(res => {
            console.log(res.data)
        })
        navigate('/invoices')

    }

    return (
        <>

            <div className="container" sx={{ maxWidth: "100%" }} style={{ border: "2PX solid black", width: "1000px" }} className=''>
                <h4 className=''>INVOICE</h4> <hr />
                <div className='row'>
                    <div className='col-9'>
                        <div> <p>STATUS</p></div>
                        <h5>UNPAID</h5>



                        <div><TextField margin="dense" type="text" name="name" id="name" label="Name" variant="standard" required onChange={handler} onMouseOver={handler} inputRef={rname} />
                            {errors.name.length > 0 && <span style={{ color: 'red' }}>{errors.name}</span>}</div>

                        <div><TextField margin="dense" type="text" name="email" id="email" label="Email" variant="standard" required onChange={handler} onMouseOver={handler} inputRef={remail} />
                            {errors.email.length > 0 && <span style={{ color: 'red' }}>{errors.email}</span>}</div>

                        <div><TextField margin="dense" type="text" name="address" id="address" label="Contact Address" variant="standard" required onChange={handler} onMouseOver={handler} inputRef={raddress} />
                            {errors.address.length > 0 && <span style={{ color: 'red' }}>{errors.address}</span>}</div>






                    </div>
                    <div className='col-3 text-end text-center mx-6'>
                        <p>AMOUNT</p>

                        <h5 className='text-danger'>INR 0</h5>
                        

                        <div><TextField type="date" variant="standard" required onChange={handler} onMouseOver={handler} /></div>
                        <p>DATE</p>
                       
                        <TextField type="date" name="date" id="date" variant="standard" required onChange={handler} onMouseOver={handler} inputRef={rdate} />
                        <p>DUE DATE</p>
                    </div>
                    <div>


                    </div>
                </div>
                <div>

                    <Table className='table table-responsive'>
                        <TableHead>
                            <TableCell>Sr No</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Disc(%)</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Actoin</TableCell>
                        </TableHead>
                        <TableBody>


                            {productdata.map((ele, index) =>

                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{ele.title}</TableCell>
                                    <TableCell>{ele.quantity}</TableCell>
                                    <TableCell>{ele.price}</TableCell>
                                    <TableCell>{ele.discount}</TableCell>
                                    <TableCell>{ele.total}</TableCell>
                                    <TableCell><Button>Delete</Button></TableCell>
                                </TableRow>

                            )}

                        </TableBody>
                    </Table>
                    {flag ? <>
                        <div className="container">
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control" name="item" placeholder="Item" aria-label="Item" ref={itemRef} />
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" name="quantity" placeholder="quantity" aria-label="Last name" ref={quantityRef} />
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" name="price" placeholder="price" aria-label="price" ref={priceRef} />
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" name="discount" placeholder="discount" aria-label="discount" ref={discountRef} />
                                </div>

                            </div>
                            <br />
                            <button onClick={() => submitproduct()} className='btn btn-info' >Submit Product</button>
                            <br />

                        </div>
                    </> : <div className='text-center mt-3'>
                       </div>}
                    <Button onClick={() => submitdata()} className='m-4 text-primary'>Submit Product</Button>
                    <button onClick={() => setflag(true)} className='btn btn-primary' >Add Product</button>
                    
                   </div>
            </div>


        </>
    )
}
