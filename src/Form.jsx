import axios from 'axios';
import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { sizing, spacing, display, flexbox } from '@material-ui/system';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import LinearProgress from '@material-ui/core/LinearProgress';
import LoadingOverlay from 'react-loading-overlay';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AutoProgress(props) {
    if (props.value > 0)
        return (
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs="3">
                    <Button variant="text">Progress</Button>
                </Grid>
                <Grid item xs="9">
                    <LinearProgress variant="determinate" value={props.value} />
                </Grid>
            </Grid>);

    return null;
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
        alignSelf: 'flex-end'
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
    box: {
        marginTop: theme.spacing(2),
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
    },
    xfull: {
        width: '100%',
    }
}));

export default function Form(props) {
    const classes = useStyles();

    const images = [
        ["https://raw.githubusercontent.com/nikkou1014/nikkou1014.github.io/main/raw.jpg", "fuji"]
    ];

    let [selected, setSelected] = useState(images[0][0]);
    let [source, setSource] = useState(images[0][0]);
    let [rst, setRst] = useState("https://raw.githubusercontent.com/nikkou1014/nikkou1014.github.io/main/style.jpg");
    let [loading, setLoading] = useState(false);

    let [open, setOpen] = React.useState(false);
    let [failed, setFailed] = React.useState(false);
    let [progress, setProgress] = React.useState(1);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress > 1 && oldProgress < 90) {
                    setProgress(oldProgress + 1);
                }
                else if (oldProgress > 90 && oldProgress < 99) {
                    setProgress(oldProgress + 0.1);
                }
            });
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    let onSourceSelected = event => {
        setSource(event.target.value);
        setSelected(event.target.value);
        setOpen(false);
    };

    let onFileSelected = event => {
        setSource(URL.createObjectURL(event.target.files[0]));
        setSelected('user');
        setOpen(false);
    };

    let onUpload = async function () {
        setOpen(false);
        setLoading(true);

        setProgress(5);

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

        axios.post("api/transfer", formData, { timeout: 25000 })
            .then(function (response) {
                // console.log(response.data);
                setProgress(100);

                setRst(response.data);

                setLoading(false);
                setOpen(true);
            })
            .catch(function (error) {
                console.log(error);

                setProgress(0);

                setLoading(false);
                setFailed(true);
            });
    };

    return (
        <Container component="main" className={classes.box}>
            <CssBaseline />

            <Grid container spacing={3} className={classes.main}>
                <Grid item xs="3" alignContent="flex-end" display="flex">
                    <StyledButtonBlue variant="contained" component="label" color="primary" alignSelf="flex-end">
                        Select file to upload
                        <input type="file" onChange={onFileSelected} hidden accept="image/*" />
                    </StyledButtonBlue>
                </Grid>

                <Grid item xs="3">
                    <FormControl className={classes.xfull}>
                        <InputLabel htmlFor="outlined-age-native-simple">Or using a pre-defined image</InputLabel>
                        <Select native value={source} onChange={onSourceSelected} label="Input Image"
                            inputProps={{
                                name: 'Input Image',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            {
                                images.map(function (item) {
                                    return <option value={item[0]}>{item[1]}</option>
                                })
                            }
                            <option value="user" disabled></option>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs="6">
                    <StyledButton variant="contained" onClick={onUpload} alignSelf="flex-end">
                        Upload and Transfer!
                    </StyledButton>
                </Grid>

                <Grid item xs="6">
                    <img src={source} className={classes.img} />
                </Grid>

                <Grid item xs="6">
                    <LoadingOverlay active={loading} spinner
                        text='Transfering... May take upto 10 seconds'>

                        <img src={rst} className={classes.img} />
                    </LoadingOverlay>
                </Grid>

                <AutoProgress value={progress} />
            </Grid>

            <Snackbar open={open} autoHideDuration={4000} onClose={() => { setOpen(false) }} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}>
                <Alert onClose={() => { setOpen(false) }} severity="success">
                    Transfer finished!
                </Alert>
            </Snackbar>

            <Snackbar open={failed} autoHideDuration={10000} onClose={() => { setFailed(false) }} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}>
                <Alert onClose={() => { setFailed(false) }} severity="error">
                    Error: Transfer failed! Please try again.
                </Alert>
            </Snackbar>
        </Container>
    );
}
