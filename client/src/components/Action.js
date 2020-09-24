import React from 'react';

export default function Action({ type, onActionClick }) {
    const { actionStyle } = styles;

    const handleIconClick = () => {
        onActionClick(type);
    }
    return (
        <span style={actionStyle} className='material-icons' onClick={handleIconClick}>
            {type}
        </span>
    );
}

const styles = {
    actionStyle: {
        fontSize: '1.2rem',
        cursor: 'pointer',
        marginRight: '10px',
    },
};