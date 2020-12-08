import axios from 'axios';
import React, { Component, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/nikkou1014">
                Tianyu Jiang
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    box: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    img: {
        maxheight: 550,
        width: '100%',
        objectFit: 'cover'
    }
}));

export default function Form(props) {
    const classes = useStyles();

    let [source, setSource] = useState("/images/raw.jpg");
    let [rst, setRst] = useState("/images/raw.jpg");

    let onFileSelected = event => {
        setSource(URL.createObjectURL(event.target.files[0]));
    };

    let onUpload = async function () {
        const formData = new FormData();

        if (typeof source === "string") {
            let response = await fetch(source);

            let blob = await response.blob();

            formData.append("s_img", blob);
        }
        else {
            formData.append("s_img", source, source.name);
        }

        // console.log(formData);

        axios.post("api/transfer", formData)
            .then(function (response) {
                // console.log(response.data);
                setRst(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    let img_panel = (img) => {
        return (
            <Box>
                <img src={img} className={classes.img} />
            </Box>
        );
    };

    let rst_panel = (img) => {
        return (
            <Box>
                <img src={img} className={classes.img} />
            </Box>
        );
    };

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />

            <Grid container spacing={1}>
                <Grid item xs="12" className={classes.box}>
                    <Avatar margin="auto" className={classes.orange}>
                        TJ
                    </Avatar>
                    <Typography margin="auto" component="h1" variant="h5">
                        Transfer any photo into Chinese Ink paint style.
                    </Typography>
                </Grid>

                <Grid item xs="6">
                    <Button variant="contained" component="label" color="primary">
                        Select the file to upload
                        <input type="file" onChange={onFileSelected} hidden accept="image/*" />
                    </Button>

                    {img_panel(source)}
                </Grid>

                <Grid item xs="6">
                    <Button variant="contained" onClick={onUpload}>
                        Upload and Transfer!
                    </Button>

                    {rst_panel(rst)}
                </Grid>

            </Grid>

            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
