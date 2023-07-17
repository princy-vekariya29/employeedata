import React, { useState } from 'react'
import { Button, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
import nodata from '../../../public/nodata.avif'
import { IoEllipsisVertical } from "react-icons/io5";

function getData() {
    let data = localStorage.getItem("emp_data");
    if (data != null) {
        return JSON.parse(data);
    }
    else {
        return [];
    }
}

const filterdata = () => {
    const newfildata = getData();

    const newfilterdata = newfildata.map((filter) => {
        // console.log("filter",filter);
        return filter.desgination


    })
    const filter_data = newfilterdata.filter((filter, index) => {
        return newfilterdata.indexOf(filter) == index;
    })
    return filter_data;
    // console.log("filter_data",filter_data);


}


const ViewData = () => {

    const navigate = useNavigate();

    const [userviewdata, setUserviewdata] = useState(getData());
    const [inputList, setInputList] = useState({
        search: ''
    })

    const [sDrop,setsDrop] = useState({
        id:'',
        isToggle : false
    });


    const handleEdit = (id, index) => {
        // console.log("id index",id,index);
        let gdata = getData();

        let single_re = gdata.filter((s) => {
            return s.id == id;
        })

        console.log(single_re[0]);
        navigate('/edit', { state: { single: single_re[0], index: index } });

    }

    const handleDelete = (id) => {
        let gdata = getData();

        let record = gdata.filter((s) => {
            return s.id != id;
        })

        localStorage.setItem("emp_data", JSON.stringify(record));
        setUserviewdata(record);
    }


    const handlefilter = (e) => {
        // console.log(e.target.value);
        let value = e.target.value;

        if (value != -1) {
            let f_data = getData();

            let fi_data = f_data.filter((f) => {
                return f.desgination == value;
            })
            // console.log('VAL',fi_data);
            setUserviewdata(fi_data);
        }
        else {
            setUserviewdata(getData());
        }
    }

    const handleSearch = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setInputList({ [name]: value })

        let s_data = getData();

        let se_data = s_data.filter((s) => {
            return s.fname.toLowerCase().indexOf(value.toLowerCase()) > -1;
        })
        // console.log(se_data,"se");
        setUserviewdata(se_data);
    }

    const handleSort = (type) => {
        let so_data = getData();
        let sort_data;

        if (type == "aec") {
            sort_data = so_data.sort((empA, empB) => {
                return empA["fname"].localeCompare(empB["fname"]);
            })
            // console.log(sort_data);
        }
        else {
            sort_data = so_data.sort((empA, empB) => {
                return empB["fname"].localeCompare(empA["fname"]);
            })
        }
        setUserviewdata(sort_data);
    }

    const handleView = (d) =>{
        // console.log("d",d);
        navigate('/view', {state:d})
    }

    const handleDropmenu = (id) =>{
        console.log("handleDropmenu",id);

        if(sDrop.id == id){
            setsDrop({
                id :id,
                isToggle : false
            })
        }
        else{
            setsDrop({
                id:id,
                isToggle:true
            })
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <div className='d-flex mt-3'>
                        <div className='mb-3 col-4'>
                            <select onChange={(e) => { handlefilter(e) }}>
                                <option value={"-1"}>All</option>
                                {
                                    filterdata().map((filter) => {
                                        return (
                                            <option value={filter}>{filter}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-4'>
                            <Button className='btn-info me-2' onClick={() => handleSort("aec")} >A-Z</Button>
                            <Button className='btn-info' onClick={() => handleSort("dec")} >Z-A</Button>
                        </div>
                        <div className='col-4'>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control placeholder="Search" name='search' value={inputList.search} onChange={handleSearch} />
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <Table responsive="sm">
                        {
                            userviewdata.length != 0 ?
                                <>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>First name</th>
                                            <th>Last name</th>
                                            <th>Email</th>
                                            <th>Offically Email</th>
                                            <th>Contact</th>
                                            <th>City</th>
                                            <th>Address</th>
                                            <th>desgination</th>
                                            <th>Gender</th> 
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userviewdata.map((d, index) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {d.id}
                                                        </td>
                                                        <td>{d.fname}</td>
                                                        <td>{d.lname}</td>
                                                        <td>{d.email}</td>
                                                        <td>{d.omail}</td>
                                                        <td>{d.contact}</td>
                                                        <td>{d.city}</td>
                                                        <td>{d.address}</td>
                                                        <td>{d.desgination}</td>
                                                        <td>{d.gender}</td>
                                                        <td className='position-relative'>
                                                            <button className='btn' id='dropdown' onClick={()=> handleDropmenu(d.id)}><IoEllipsisVertical /></button>
                                                            {
                                                                sDrop.id === d.id && sDrop.isToggle ?
                                                                <div id='drop' className='view'>
                                                                    <button className='btn' onClick={() => { handleEdit(d.id, index) }}>Edit</button>
                                                                    <button className='btn' onClick={() => { handleDelete(d.id) }}>Delete</button>
                                                                    <button className='btn' onClick={()=> {handleView(d)}}>View</button>
                                                                </div>
                                                                : ''
                                                            }
                                                        </td>
                                                     
                                                        {/* <DropdownButton>
                                                            
                                                            <Dropdown.Item onClick={() => { handleEdit(d.id, index) }}>Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { handleDelete(d.id) }}>Delete</Dropdown.Item>
                                                            <Dropdown.Item onClick={()=> {handleView(d)}} >ViewData</Dropdown.Item>
                                                        </DropdownButton> */}
                                                        {/* <td>
                                                            <Button className='me-2' onClick={() => { handleEdit(d.id, index) }}>Edit</Button>
                                                            <Button className='btn-danger' onClick={() => { handleDelete(d.id) }}>Delete</Button>
                                                        </td> */}
                                                    </tr>

                                                )
                                            })
                                        }
                                    </tbody>
                                </>
                                :
                                <div style={{ width: "60%", margin: "0 auto" }}>
                                    <img src={nodata} alt="nodata" style={{ width: "100%", height: "100%" }} />
                                </div>
                        }
                    </Table>

                </Row>
            </Container>
        </div>
    );
}
export default ViewData
