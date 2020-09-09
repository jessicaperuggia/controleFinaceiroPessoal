import React from 'react'

export default function InputReadOnly(props) {
    const { label, value, color = 'black' } = props;
    const id = 'input' + label;

    return (
        <div className='input-field col s12 m6 l3'>
            <input type='text' id={id} readOnly value={value} style={{ color, fontWeight: 'bold' }} />
            <label className='active' htmlFor={id}>
                {label}
            </label>
        </div>
    );
}
