import React , {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register, updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmpassword] = useState('')
  const [message, setMessage] = useState('')

  const { pathname } = useLocation();
  let navigate = useNavigate();

  const redirect = pathname ? pathname : '/'

  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.userDetails)
  const {error, loading ,user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
      if(!userInfo) {
          navigate('/login')
      } else {
        if(!user || !user.name || success) {
          dispatch({type:USER_UPDATE_PROFILE_RESET})
          dispatch(getUserDetails('profile'))
        } else {
          setName(user.name)
          setUsername(user.username)
          
        }
        
      }
  }, [dispatch, navigate, userInfo, user, success])


  const submitHandler = (e) => {
      e.preventDefault()

      if (password != confirmPassword) {
        setMessage('Password do not match')
      } else {
        dispatch(updateUserProfile({
          'id': user._id,
          'username':username,
          'name':name,
          'password':password
        }))
        setMessage('')
      }
      
  }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>

            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type='username'
                        placeholder='Enter username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='name'>
                    <Form.Label>name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter email'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen