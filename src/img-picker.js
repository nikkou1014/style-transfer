import axios from 'axios';

import React, { Component, useState } from 'react';

export default function ImgPicker(props) {
    let [file, setFile] = useState(null);

    let onFileSelected = event => {
        setFile(event.target.files[0]);

        // Details of the uploaded file
        console.log(event.target.files[0]);
    };

    let onUpload = () => {
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            file,
            file.name
        );

        axios.post("api/transfer", formData);
    };

    let fileInfo = () => {
        if (file) {
            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {file.name}</p>
                    <p>File Type: {file.type}</p>

                    <img src={URL.createObjectURL(file)} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <br />
                    <h4>Choose the source image first</h4>
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
            {fileInfo()}
        </div>
    );
}