import {useState ,useEffect} from 'react';
import Button from '../../component/button/Button';
import SIngleCourse from '../../component/singleCourse/SIngleCourse';
import Spinner from '../../component/spinner/Spinner'
import Modal from '../../component/Modal'
import AuthInput from '../../component/input/AuthInput'

const Courses = () => {
    const [loading, setLoading] = useState(true)
    // const [openCoursePopUp, setOPenCoursePopUp] = useState(false)
    const [courseTitle, setCourseTitle] = useState('')
    const [showModal, setShowModal] = useState(false)

        useEffect(() => {
            setTimeout(() => {
                setLoading(false)
            },700 )
        }, [])

    const inputHandler = (e) => {
        setCourseTitle(e.target.value)
    }
    
    ////////OPEN COURSE POPUP
    const openModelHandler = () => {
        setShowModal(true);
    }

    const closeModelHandler = () => {
        setShowModal(false)
    }

    const addCourseHandler = () => {
        closeModelHandler()
    }

    return (
        <>

            <Modal show={showModal} modalClose={closeModelHandler} >
                <div className='model__content'>
                    <p className='reenterPassword'>Please Enter Course Name</p>
                    <AuthInput placeholder='Course Title/Name'
                        type='text'
                        valueof={courseTitle}
                        handler={inputHandler}
                        name='title' />
                    <Button title='Add Course' addClass='model__button' handler={addCourseHandler} loading={loading} />
                </div>
            </ Modal>


            <div style={{display: 'flex', justifyContent: 'space-between', padding: '3rem 0'}}>
                <h2 className='marginLeft-medium course__title'>Courses</h2>
                <Button title='Add Course' addClass='marginRight-medium add__course' handler={openModelHandler} />
            </div>
            
            {loading? <div style={{marginTop: '25rem'}}><Spinner /></div> : 
            <div>
            <SIngleCourse name='Physics 1st Part' />
            <SIngleCourse name='Physics 2nd Part' />
            <SIngleCourse name='Chemistry 1st Part' />
            <SIngleCourse name='Chemistry 2nd Part' />
            <SIngleCourse name='Biology 1st Part' />
            <SIngleCourse name='Biology 2nd Part' />
            <SIngleCourse name='Math 1st Part' />
            <SIngleCourse name='Math 2nd Part' />
        </div>}
        </>
    );
};

export default Courses;