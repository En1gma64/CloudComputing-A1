import React, { Component, useRef } from 'react'
import jwtDecode from 'jwt-decode';
import AdminHeader from '../Layout/AdminHeader';

export default function AddItem() {

    const[itemName, setItemName] = React.useState('');
    const[desc, setDesc] = React.useState('');
    const[category, setCategory] = React.useState('');
    const[pricePD, setPricePD] = React.useState('');
    const[colour, setColour] = React.useState('');
    const[size, setSize] = React.useState('');
    const[sex, setSex] = React.useState('');
    const[available, setAvailable] = React.useState('Yes');

    function refreshPage() {
        window.location.reload(false);
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        const item={itemName, desc, category, pricePD, colour, size, sex, available}
        console.log(item)
        fetch("http://localhost:8081/api/items/addItem", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(item)

        }).then(()=>{
            refreshPage()
            alert("New Item Added")
            console.log("New Item Added")
        })
    };


    //To verify the existing username
    const jwt = localStorage.getItem("jwtToken");
    const user = jwtDecode(jwt);
    const username = user.fullName;
    return (
        <>
        <AdminHeader username={username}/>
        <div className="Item">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Add Item</h5>
                    <hr />
                    <form onSubmit={onSubmit}>
                    <div className="form-group">
                                <input type="text" className="form-control form-control-lg " 
                                placeholder="Item Name" 
                                name="itemName"
                                value= {itemName}
                                onChange = {(e)=>setItemName(e.target.value)}
                                required
                                />
                    </div>
                    <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Item Description"
                                name="desc"
                                value= {desc}
                                onChange = {(e)=>setDesc(e.target.value)}
                                required
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Category"
                                name="category"
                                value= {category}
                                onChange = {(e)=>setCategory(e.target.value)}
                                required
                                    /><br></br>
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Price Per Day ($)"
                                name="pricePD"
                                value= {pricePD}
                                onChange = {(e)=>setPricePD(e.target.value)}
                                required
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Size"
                                name="size"
                                value= {size}
                                onChange = {(e)=>setSize(e.target.value)}
                                required
                            />
                            </div><br></br>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Colour"
                                name="colour"
                                value= {colour}
                                onChange = {(e)=>setColour(e.target.value)}
                                required
                                    />
                            </div><br></br>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Sex"
                                name="sex"
                                value= {sex}
                                onChange = {(e)=>setSex(e.target.value)}
                                required
                                    />
                            </div><br></br>
                    <input type="submit" className="btn btn-primary btn-block mt-4"/>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </>
  );
}