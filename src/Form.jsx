import axios from 'axios';
import React, { Component, useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { sizing, spacing, display } from '@material-ui/system';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import LoadingOverlay from 'react-loading-overlay';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);


const StyledButtonBlue = withStyles({
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const useStyles = makeStyles((theme) => ({
    main: {
        maxWidth: '85%',
        marginTop: theme.spacing(1)
    },
    space: {
        marginTop: theme.spacing(3)
    },
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
        width: '100%',
        maxwidth: '100%',
        objectFit: 'cover'
    }
}));

export default function Form(props) {
    const classes = useStyles();

    let [source, setSource] = useState("https://raw.githubusercontent.com/nikkou1014/nikkou1014.github.io/main/raw.jpg");
    let [rst, setRst] = useState("https://raw.githubusercontent.com/nikkou1014/nikkou1014.github.io/main/style.jpg");
    let [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);

    let onFileSelected = event => {
        setSource(URL.createObjectURL(event.target.files[0]));
        setOpen(false);
    };

    let onUpload = async function () {
        setOpen(false);
        setLoading(true);

        setTimeout(() => {
            setRst(source);
        }, 400);

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

                setLoading(false);
                setOpen(true);
                setTimeout(() => { setOpen(false); }, 2500);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Container component="main" className={classes.box}>
            <CssBaseline />

            <Grid container spacing={3} className={classes.main}>
                <Grid item xs="6">
                    <StyledButtonBlue variant="contained" component="label" color="primary" p={1}>
                        Select the file to upload
                        <input type="file" onChange={onFileSelected} hidden accept="image/*" />
                    </StyledButtonBlue>

                    <Box className={classes.space}>
                        <img src={source} className={classes.img} />
                    </Box>
                </Grid>

                <Grid item xs="6">
                    <StyledButton variant="contained" onClick={onUpload}>
                        Upload and Transfer!
                    </StyledButton>

                    <Box className={classes.space}>
                        <LoadingOverlay active={loading} spinner
                            text='Transfering... May take upto 30 seconds'>

                            <img src={rst} className={classes.img} />
                        </LoadingOverlay>
                    </Box>
                </Grid>

            </Grid>

            <Snackbar open={open} autoHideDuration={2500} color="secondary"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                message="Transfer finished!"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => { setOpen(false) }}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }>
            </Snackbar>
        </Container>
    );
}
