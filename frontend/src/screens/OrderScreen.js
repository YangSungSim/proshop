import React , {useState, useEffect} from 'react'
import {  Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderScreen() {
    const  { id }  = useParams();
    const dispatch = useDispatch();

    let navigate = useNavigate();
    
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails


    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }
    // AUSLq0OOCp2VKi10gTZOCjzNA4b02eaCIz8bFYn7n6J6qUaByU_VwbJXoodU7rl68O1k6x1AbksN6GEx

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AUSLq0OOCp2VKi10gTZOCjzNA4b02eaCIz8bFYn7n6J6qUaByU_VwbJXoodU7rl68O1k6x1AbksN6GExn'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }


    useEffect(() => {
        if(!order || successPay || order._id !== Number(id)) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, order, id, successPay])

    
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

  return loading ? (
    <Loader />
) : error ? (
    <Message variant='danger'>{error}</Message>
) : (
    <div>
        <Row>
            <h1> Order : {id}</h1>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Shipping: </strong>
                            {order.ShippingAddress.address}, {order.ShippingAddress.city}
                            {'     '}
                            {order.ShippingAddress.postalCode},
                            {'     '}
                            {order.ShippingAddress.country}
                        </p>

                        {order.isDelivered ? (
                            <Message variant='success'>Deilvered on {order.deliveredAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>


                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Paid</Message>
                        )}
                    </ListGroup.Item>


                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message variant='info'>
                            Order is empty
                        </Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}

                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <h2>Order Summary</h2>  
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Row>
                            <Col>Item:</Col>
                            <Col>${order.itemsPrice}</Col>
                          </Row>  
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Row>
                            <Col>Shipping:</Col>
                            <Col>${order.shippingPrice}</Col>
                          </Row>  
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Row>
                            <Col>Tax:</Col>
                            <Col>${order.taxPrice}</Col>
                          </Row>  
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Row>
                            <Col>Total:</Col>
                            <Col>${order.totalPrice}</Col>
                          </Row>  
                        </ListGroup.Item>

                        
                        {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}

                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                    />
                                                )}
                                        </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen