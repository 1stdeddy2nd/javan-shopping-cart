import React from 'react';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {REMOVE_ITEM, UPDATE_ITEM_QUANTITY} from "../action";
import {connect} from "react-redux";
import {Button, Card, Form} from "react-bootstrap";

function ListItem(props) {
    // initial Swal
    const swal = withReactContent(SweetAlert);

    // handling button function
    const incrementCount = (id, currentCount) => props.updateItemQuantity(id, currentCount + 1);
    const decreaseCount = (id, currentCount) => props.updateItemQuantity(id, currentCount - 1);

    const temporaryAmount = React.useMemo(() => {
        if(props.items && props.items.length){
            let count = 0;
            for(let i = 0; i < props.items.length - 1; i += 1){
                count += props.items[i].count * props.items[i].price
            }
            return count;
        }
        return 0
    },[props.items])

    const renderSuccessCheckout = () => (
        <div className="text-start">
            <h5 className="text-center fw-bold mb-2">Checkout Success!</h5>
            <div>List of items :</div>
            <ul>
                {props.items.filter((x) => x.count > 0).map((item) => (
                    <li key={item.id}>Name: {item.title}, Total Price: ${item.count * item.price}</li>
                ))}
            </ul>
            <div><b>Total :</b> ${temporaryAmount}</div>
        </div>
    )

    // handling checkout click
    const handleCheckout = () => {
        return swal.fire({
            icon: 'warning',
            text: 'Are you sure want to checkout your items?',
            showCancelButton: true,
            reverseButtons: true
        })
            .then(() => (
                swal.fire({
                    'icon': 'success',
                    html: renderSuccessCheckout()
                })
            ))
    }

    return (
        <div className="row m-0 py-2 text-secondary">
            <h4 className="text-center mb-4">Shopping Cart</h4>
            <div className="col-lg-8">
                <Card className="p-2 shadow-sm mb-2">
                    <Card.Body>
                        <h5 className="mb-4">Cart ({props.items.length} items)</h5>
                        {props.items && props.items.length ? props.items.map((item) => (
                            <div key={item.id}>
                                <div className="d-flex gap-2">
                                    <img src={item.src} alt="img-guitar" width={190} height={190}
                                         className="rounded-2 shadow-sm"/>
                                    <div className="flex-grow-1 d-flex flex-column justify-content-between">
                                        <div className="ms-2">
                                            <div className="fs-5 fw-bold">{item.title}</div>
                                            <div className="mb-2">{item.subTitle}</div>
                                            <div className="fs-6 fw-bold">Description:</div>
                                            <div className="fw-light"
                                                 style={{height: 80, maxWidth: 500}}>{item.desc}</div>
                                        </div>
                                        <div className="d-flex gap-2 align-items-center">
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                className="border-0 d-flex gap-2 align-items-center"
                                                onClick={() => props.removeItem(item.id)}
                                            >
                                                <i className="fa fa-trash"/>
                                                <div>REMOVE ITEM</div>
                                            </Button>
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                className="border-0 d-flex gap-2 align-items-center"
                                            >
                                                <i className="fa fa-heart"/>
                                                <div>MOVE TO WISH LIST</div>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-between">
                                        <div className="d-flex justify-content-end">
                                            <Button
                                                className="rounded-0" variant="outline-secondary"
                                                size="sm"
                                                style={{width: 30}}
                                                onClick={() => decreaseCount(item.id, item.count)}
                                                disabled={item.count === 0}
                                            >
                                                -
                                            </Button>
                                            <Form.Control
                                                className="rounded-0 border-secondary text-center"
                                                value={item.count}
                                                type="number"
                                                size="sm"
                                                style={{width: 40}}
                                                onChange={(e) => props.updateItemQuantity(item.id, e.target.value)}
                                                onBlur={() => {
                                                    if (typeof item.count !== 'number' || item.count < 0) props.updateItemQuantity(item.id, 0);
                                                }}
                                            />
                                            <Button
                                                className="rounded-0" variant="outline-secondary"
                                                size="sm"
                                                style={{width: 30}}
                                                onClick={() => incrementCount(item.id, item.count)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                        <div className="text-end fw-bold fs-5">${item.price}</div>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        )) : <div>No item in cart</div>}
                    </Card.Body>
                </Card>
            </div>
            <div className="col-lg-4">
                <Card className="shadow-sm mb-2">
                    <Card.Body>
                        <h5 className="mb-4">The total amount of</h5>
                        <div className="d-flex justify-content-between">
                            <div>Temporary amount</div>
                            <div>${temporaryAmount}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Shipping</div>
                            <div>Free</div>
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between align-items-center fw-bold mb-4">
                            <div>
                                <div>The total amount of</div>
                                <div>(Including VAT)</div>
                            </div>
                            <div>${temporaryAmount}</div>
                        </div>
                        <Button className="text-center w-100" onClick={handleCheckout} disabled={temporaryAmount === 0 || props.items.length === 0}>GO TO CHECKOUT</Button>
                    </Card.Body>
                </Card>
                <Card className="shadow-sm">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>Add a discount code (optional)</div>
                            <i className="fa fa-chevron-down"/>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        items: state.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // addItem: (item) => dispatch({type: ADD_ITEM, item}),
        removeItem: (itemId) => dispatch({type: REMOVE_ITEM, itemId}),
        updateItemQuantity: (itemId, quantity) => dispatch({type: UPDATE_ITEM_QUANTITY, itemId, quantity})
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListItem);
