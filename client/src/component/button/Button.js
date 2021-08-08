import React from 'react';
import Spinner from '../spinner/Spinner';

const Button = ({title, addClass='', handler, loading}) => {
    return (
            <button className={`btn ${addClass}`} onClick={handler}>{loading ? <Spinner /> : `${title}` }</button>
    );
};

export default Button;