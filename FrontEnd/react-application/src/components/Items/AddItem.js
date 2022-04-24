import React, { Component, useRef } from 'react'
import jwtDecode from 'jwt-decode';
import AdminHeader from '../Layout/AdminHeader';
import AWS from 'aws-sdk';

export default function AddItem() {

    

    const[itemName, setItemName] = React.useState('');
    const[desc, setDesc] = React.useState('');
    const[category, setCategory] = React.useState('');
    const[pricePD, setPricePD] = React.useState('');
    const[colour, setColour] = React.useState('');
    const[size, setSize] = React.useState('');
    const[sex, setSex] = React.useState('');
    const[available] = React.useState('Yes');
    const [progress , setProgress] = React.useState(0);
    var selectedFile = React.useState(null);
    var imageLink = React.useState('https://cloudcomputing-a1-images.s3.amazonaws.com/House-of-Vintage-best-Toronto-vintage-clothing-stores-1440x1029.jpg');

    const S3_BUCKET ='cloudcomputing-a1-images';
    const REGION ='us-east-1';
    const ACCESS_KEY ='ASIAYB2TE3WWYWG5M4JI';
    const SECRET_ACCESS_KEY ='8GyM9SGsMnCyGkhoNj6jUPF3G2QE4vdez3oFJsuI';
    const SESSION_TOKEN = 'FwoGZXIvYXdzEMf//////////wEaDN2oYJJ9LEQcWYE+ayLNAQJfoscLv7Pp4VC807sToelFwNOHBvGO+BPa4d//AksBdApHsPGRRpD3V/X28AerfLm4WfGLHFxDhI0wk0U63IBzCCk6fcepYXsxOIFN/y8Jps7UNQ1zZ5yS1N/Ayht0EdnsVYKRYukXI2Pyfmr5LER8zc6HzstnSDIa9/cmkRyJIRG709lBXUR/iAiWVobeJQEd/zKktyLTleuqwfhzC38PSMXCsjqM6J6r5phm2SNxNGquyqcy8mO1Pjq+TOiMKAiVVTaS+Yv+5z0fwboomcyTkwYyLVldVaPW7FjYnEWzW+VPfh5Ls/Plr+P57zkqpzuNhM+/0avCii+vzi2vCDt0MQ==';

    AWS.config.update({
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
        sessionToken: SESSION_TOKEN
    })

    // const config = {
    //     bucketName: S3_BUCKET,
    //     region: REGION,
    //     accessKeyId: ACCESS_KEY,
    //     secretAccessKey: SECRET_ACCESS_KEY,
    //     SessionToken: SESSION_TOKEN
    // }

    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET},
        region: REGION,
    })


    function refreshPage() {
        window.location.reload(false);
    }
    
    const handleFileInput = (e) => {

        selectedFile = e.target.files[0];
    }

    const handleUpload = async () => {
        const params = {
            ACL: 'public-read',
            Body: selectedFile,
            Bucket: S3_BUCKET,
            Key: selectedFile.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        handleUpload()
        imageLink = "https://cloudcomputing-a1-images.s3.amazonaws.com/" + selectedFile.name
        const item={itemName, desc, category, pricePD, colour, size, sex, available, imageLink}
        console.log(item)
        fetch(`http://cloudcomputinga1itemmicroservice-env.eba-btrpvvm3.us-east-1.elasticbeanstalk.com/api/items/addItem`, {
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
                                <select className="form-control form-control-lg" value={size} onChange = {(e)=>setSize(e.target.value)} 
                                required placeholder='Select Size'>
                                    <option value={""}>Select Size</option>
                                    <option value="Extra Small">Extra Small</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                    <option value="Extra Large">Extra Large</option>
                                </select>
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
                            <select className="form-control form-control-lg" value={sex} onChange = {(e)=>setSex(e.target.value)} 
                                required placeholder='Select Sex'>
                                    <option value={""}>Select Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Uni-Sex">Uni-Sex</option>
                                </select>
                            </div><br></br>
                            <div className="form-group">
                                <p className="display-5">Upload an Image</p><br></br>
                                <input type="file" onChange = {handleFileInput} 
                                required/>
                            </div>
                    <input type="submit" className="btn btn-primary btn-block mt-4"/>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </>
  );
}