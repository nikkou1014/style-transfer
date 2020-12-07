import axios from 'axios';
import React, { Component, useState } from 'react';

export default function ImgPicker(props) {
    let [source, setSource] = useState(null);
    let [rst, setRst] = useState(null);

    let onFileSelected = event => {
        setSource(event.target.files[0]);
    };

    let onUpload = () => {
        const formData = new FormData();

        formData.append("s_img", source, source.name);

        axios.post("api/transfer", formData)
            .then(function (response) {
                console.log(response.data);
                setRst(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    let img_panel = (img) => {
        if (img) {
            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {img.name}</p>
                    <p>File Type: {img.type}</p>

                    <img src={URL.createObjectURL(img)} maxWidth="600" />
                </div>
            );
        }
        else {
            return (
                <div>
                    <br />
                    <h4>No image</h4>
                </div>
            );
        }
    };

    let rst_panel = (img) => {
        if (img) {
            return (
                <div>
                    <h2>transformed image:</h2>

                    <img src={img} maxWidth="600" />
                </div>
            );
        }
        else {
            return (
                <div>
                    <br />
                    <h4>No image</h4>
                </div>
            );
        }
    };

    return (
        <div>
            <h1>
                Transfer any photo into Chinese Ink paint style.
		    </h1>
            <h3>
                Select the file to upload
		    </h3>
            <div>
                <input type="file" onChange={onFileSelected} />
                <button onClick={onUpload}>
                    Upload!
			    </button>
            </div>
            {img_panel(source)}
            {rst_panel(rst)}
        </div>
    );
}