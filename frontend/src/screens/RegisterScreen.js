import React , {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function RegisterScreen() {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmpassword] = useState('')
  const [message, setMessage] = useState('')

  const { pathname } = useLocation();
  let navigate = useNavigate();

  const redirect = pathname ? pathname : '/'

  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const {error, loading ,userInfo } = userRegister

  useEffect(() => {
      if(userInfo) {
          navigate('/')
      } else {
          navigate('/register')
      }
  }, [navigate, userInfo, redirect])


  const submitHandler = (e) => {
      e.preventDefault()

      if (password != confirmPassword) {
        setMessage('Password do not match')
      } else {
        dispatch(register(name, username, password))
      }
      
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
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
                    required
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
                    required
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>


            <Button type='submit' variant='primary'>
                Register
            </Button>
        </Form>
        
        <Row className='py-3'>
            <Col>
                Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
                    Sign In
                    </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen