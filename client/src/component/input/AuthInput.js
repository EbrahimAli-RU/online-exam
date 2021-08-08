import React from 'react';

const AuthInput = ({type, valueof, handler, placeholder, name, width }) => {

    return (
        <div  className={width ? 'auth__input width100' : 'auth__input width80' }>
            <label className='auth__input__custom-field'>
            <input className='auth__input__input-field' name={name} autoComplete="off"  type={type} value={valueof} onChange={handler} required />
            <span className='auth__input__placeholder'>{placeholder}</span>          
        </label>
       
        </div>
    );
};

export default AuthInput;