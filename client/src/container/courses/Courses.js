import {useState ,useEffect} from 'react';
import Button from '../../component/button/Button';
import SIngleCourse from '../../component/singleCourse/SIngleCourse';
import Spinner from '../../component/spinner/Spinner'
import Modal from '../../component/Modal'
import AuthInput from '../../component/input/AuthInput'
import axios from '../../utils/axios/axios'

const Courses = () => {
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [buttonSpinner, setButtonSpinner] = useState(false)
    const [courseTitle, setCourseTitle] = useState('')
    const [showModal, setShowModal] = useState(false)

        useEffect(() => {
            axios.get('/course').then(res => {
                setCourses(res.data.data.course)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                console.log(err.response)
            })
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
        setButtonSpinner(true)
        axios.post('/course', {title: courseTitle}).then(res => {
            const coursesCopy = [...courses]
            coursesCopy.push({_id: Math.random(), title: courseTitle})
            setCourses(coursesCopy)
            setButtonSpinner(true)
            closeModelHandler()
        }).catch(err => {
            closeModelHandler()
            setButtonSpinner(true)
            console.log(err.response)
        })
        
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
                    <Button title='Add Course' addClass='model__button' handler={addCourseHandler} loading={buttonSpinner} />
                </div>
            </ Modal>


            <div style={{display: 'flex', justifyContent: 'space-between', padding: '3rem 0'}}>
                <h2 className='marginLeft-medium course__title'>Courses</h2>
                <Button title='Add New Course' addClass='marginRight-medium add__course' handler={openModelHandler} />
            </div>
            
            {loading? <div style={{marginTop: '25rem'}}><Spinner /></div> : 
            <div>
                {courses.map(el => <SIngleCourse key={el._id} name={el.title} />)}
        </div>}
        </>
    );
};

export default Courses;