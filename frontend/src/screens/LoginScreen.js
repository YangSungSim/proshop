import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function LoginScreen() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const { pathname } = useLocation();
    let navigate = useNavigate();

    const redirect = pathname ? pathname : '/'

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading ,userInfo } = userLogin

    useEffect(() => {
        if(userInfo) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(name, password))
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter username'
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

            <Button type='submit' variant='primary'>
                Sign In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
                    Register
                    </Link>
            </Col>
        </Row>
    </FormContainer>
  )

}

export default LoginScreen