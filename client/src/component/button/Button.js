import React from 'react';

const Button = ({title, addClass='', handler}) => {
    return (
            <button className={`btn ${addClass}`} onClick={handler}>{title}</button>
    );
};

export default Button;