import React from 'react'
import ReactDOM from 'react-dom'
import SignIn from './signin';
import ImgPicker from './img-picker'

function App() {
    return (
        <ImgPicker />
    );
}

ReactDOM.render(<App />, document.querySelector('#app'))