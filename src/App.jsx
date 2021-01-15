import React from 'react';
import ReactDOM from 'react-dom';
import { palette } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Form from './Form.jsx';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" justify="flex-end">
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
    bar: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
    }
}));

function App() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" className={classes.bar}>
                <Grid item xs="12">
                    <Box>
                        <Typography margin="auto" display="inline" color="info" variant="h4">
                            Transfer any photo into Chinese Ink paint style.
                        </Typography>
                    </Box>
                </Grid>
            </AppBar>
            <Form>
            </Form>

            <Box mt={2}>
                <Copyright />
            </Box>
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'));