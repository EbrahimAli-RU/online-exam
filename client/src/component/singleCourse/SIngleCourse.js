import React from 'react';

const SIngleCourse = (props) => {
    return (
        <div className='single__course__container' >
            <h1 className='single__course__title'>{props.name}</h1> 
        </div>
    );
};

export default SIngleCourse;