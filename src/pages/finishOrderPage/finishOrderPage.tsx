import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { clearCart } from "../../state/cartSlice";
import React from "react";

export default function FinishOrderPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const items = useSelector((state: RootState) => state.cart.items);

    function renderItems() {
        if (items.length > 0) {
            return items.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="finishOrderPage-container__products__product__item flex"
                    >
                        <img src={String(item[5])} alt="item image" />
                        <div className="finishOrderPage-container__products__product__item__info">
                            <p className="title">
                                {item[2]} {item[3]}
                            </p>
                            <p className="price">
                                ${item[4]}, {item[1]}{" "}
                                {item[1] > 1 ? "products" : "product"}
                            </p>
                        </div>
                    </div>
                );
            });
        }
    }

    return (
        <div className="finishOrderPage-container">
            <div className="finishOrderPage-container__thankful-container">
                <img src="/assets/thanks.png" />
                <h1>Thank you for your order!</h1>
                <p>
                    The order confirmation email with details of your order and
                    a link to track its progress has been sent to your email
                    address.
                </p>
                <h2>Your order # is 000000003 - PENDING</h2>
                <p>Order Date: 6 Nov 2023</p>
            </div>
            <div className="finishOrderPage-container__info flex">
                <div className="finishOrderPage-container__info__contact">
                    <div className="title flex flex-row items-center">
                        <img src="/assets/contact-info-icon.png" />
                        <h1>Contact information</h1>
                    </div>
                    <p>
                        {location.state.firstName}&#160;
                        {location.state.lastName}
                    </p>
                    <p>{location.state.email}</p>
                    <p>{location.state.phone}</p>
                </div>
                <div className="finishOrderPage-container__info__shipment">
                    <div className="title flex flex-row items-center">
                        <img src="/assets/shipment-info-icon.png" />
                        <h1>Shipment information</h1>
                    </div>
                    <p>
                        {location.state.addres},&#160;{location.state.apartment}
                    </p>
                    <p>
                        {location.state.state},&#160;
                        {location.state.city},&#160;
                        {location.state.zip}
                    </p>
                    <p>{location.state.country}</p>
                </div>
            </div>
            <div className="finishOrderPage-container__products">
                <div className="title flex flex-row items-center">
                    <img src="/assets/summory.png" />
                    <h1>Order summary</h1>
                </div>
                <div className="finishOrderPage-container__products__product">
                    {renderItems()}
                    <div className="bill flex">
                        <div className="bill__titles">
                            <p>Subtotal:</p>
                            <p>Shipping & Handling:</p>
                            <p>Tax:</p>
                            <p className="accent">Grand Total: </p>
                        </div>
                        <div className="bill__prices">
                            <p>
                                $
                                {items.reduce((acc, item) => {
                                    return acc + item[4] * item[1];
                                }, 0)}
                            </p>
                            <p>$0</p>
                            <p>$0</p>
                            <p className="accent">
                                $
                                {items.reduce((acc, item) => {
                                    return acc + item[4] * item[1];
                                }, 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="finishOrderPage-container__continue-shopping-button-container">
                <button
                    className="default-button"
                    onClick={() => {
                        navigate("/");
                        dispatch(clearCart());
                    }}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}
