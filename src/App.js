import React from 'react'
import ReactDOM from 'react-dom'
import Form from './form';
import ImgPicker from './img-picker'

function App() {
    return (
        <Form>
            <ImgPicker />
        </Form>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'))