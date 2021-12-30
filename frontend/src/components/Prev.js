import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReactToPdf from 'react-to-pdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { sendEmail } from '../config/Myservice';
import { color } from '@mui/system';
import { light } from '@mui/material/styles/createPalette';

const options = {
    orientation: 'potrait',
    unit: 'in',
    format: 'A4'
}


export default function Prev() {
    const { state } = useLocation();
    console.log(state)
    const ref = React.createRef();

    const sendMail = () => {
        let abc = state.user.remail
        console.log(abc);
        const input = document.getElementById("divToPrint");
        console.log(input);
        alert("Mail sent!!");
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://www.shutterstock.com/image-vector/gluten-free-food-allergy-product-dietary-371889934.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            const filedata = pdf.output("blob");
            // console.log(filedata);
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            sendEmail(formData).then((res) => {
                console.log(res);
            });
        });
    };
    return (
        <div className="container p-3" style={{ height: "100%", width: "100%" }}>
            <div >
                <nav class="navbar">
                    <div class="container-fluid">
                        <Link to="/home" style={{ textDecoration: "none" }}><Button variant='contained'>Go Back</Button></Link>
                        <Button className=" d-flex justify-content-sm-end">
                            <ReactToPdf targetRef={ref} filename={`_invoice.pdf`} options={options} x={0} y={0} scale={0.6}>
                                {({ toPdf }) => (
                                    <Button onClick={() => {
                                        // sendData();
                                        toPdf();
                                    }} variant="contained">
                                        Save
                                    </Button>
                                )}
                            </ReactToPdf>
                        </Button>
                        <Button variant='contained' onClick={sendMail}>Send mail</Button>

                    </div>
                </nav>
                <div ref={ref} id='divToPrint' className="container p-3" style={{ border: "2px solid grey", height: "900px", width: "800px" }}>

                    <nav class="navbar  navbar-light bg-light" >
                        <div class="container-fluid " style={{ height: "168px" }}>
                            <img src="visa.png" alt="" height="82px" width=" 185px" opacity=" 2" class="d-inline-block align-text-top" style={{ marginLeft: "15px", marginTop: "5px" }} />
                            <h4 className='text-end'>INVOICE</h4>
                        </div>
                    </nav>
                    <div className='row m-0 border'>
                        <div className='col text-left ml-4'>
                            <h6>From</h6>
                            <h5>sender email</h5>
                            <br />
                            <h6 >Due Date</h6>
                            <h5 >{state.user.rdate}</h5>

                        </div>
                        <div className='col text-right mr-4'>

                            <h6 style={{ textAlign: "right", marginRight: "15px" }}>To</h6>
                            <h5 style={{ textAlign: "right", marginRight: "15px" }}>{state.user.rname}</h5>
                            <h5 style={{ textAlign: "right", marginRight: "15px" }}>{state.user.remail}</h5>
                            <h5 style={{ textAlign: "right", marginRight: "15px" }}>{state.user.raddress}</h5>


                            <h5 style={{ textAlign: "right", marginRight: "15px" }}>Amount</h5>
                            <h3 style={{ textAlign: "right", marginRight: "15px" }}>INR {state.amount}</h3>
                        </div>

                    </div>
                    <br />
                    <div className=" mb-2">

                        <Table class="table  ">
                            <TableHead className=' '>

                                <TableCell scope="col"><b>Sr No</b></TableCell>
                                <TableCell scope="col"><b>Item</b></TableCell>
                                <TableCell scope="col"><b>Qty</b></TableCell>
                                <TableCell scope="col"><b>Price</b></TableCell>
                                <TableCell scope="col"><b>Amount</b></TableCell>

                            </TableHead>

                            <TableBody>
                                {state.user.product.map((ele, index) =>

                                    <TableRow>
                                        <TableCell scope="row">{index + 1}</TableCell>
                                        <TableCell>{ele.title}</TableCell>
                                        <TableCell>{ele.quantity}</TableCell>
                                        <TableCell>{ele.price}</TableCell>
                                        <TableCell>{ele.total}</TableCell>
                                    </TableRow>
                                )}

                            </TableBody>
                        </Table>
                    </div>

                </div>


            </div>
        </div>
    )
}
