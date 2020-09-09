import React from 'react'

export default function InputReadOnly(props) {
    const { lable, value, color = 'black' } = props;
    const id = 'input' + lable;

    return (
        <div className='input-field col s12 m6 l3'>
            <lable className='active' htmlFor={id}>
                {lable}
            </lable>
            <input type='text' id={id} readOnly value={value} style={{ color, fontWeight: 'bold' }} />
        </div>
    );
}
