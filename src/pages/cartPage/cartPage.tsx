import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import { useEffect, useRef } from "react";
import LinkState from "../../components/linkState/linkState";
import CartItems from "../../components/cartItems/cartItems";

export default function CartPage() {
    const navigate = useNavigate();

    const items = useSelector((state: RootState) => state.cart.items);

    const nextStepButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (items.length === 0) {
            nextStepButtonRef.current!.disabled = true;
        } else {
            nextStepButtonRef.current!.disabled = false;
        }
    }, [items]);

    return (
        <div className="cartPage-container">
            <LinkState />
            <h1>Cart</h1>
            <div className="cartPage-container__cart-items">{CartItems()}</div>
            <div className="cartPage-container__total-price">
                <div className="cartPage-container__total-price__text">
                    <p>Together:</p>
                    <p>Sum:</p>
                </div>
                <div className="cartPage-container__total-price__numbers">
                    <p>
                        {items.reduce((acc, item) => {
                            return acc + item[1];
                        }, 0)}
                        &#32;products.
                    </p>
                    <p>
                        $
                        {items.reduce((acc, item) => {
                            return acc + item[4] * item[1];
                        }, 0)}
                    </p>
                </div>
            </div>
            <div className="cartPage-container__button">
                <button
                    ref={nextStepButtonRef}
                    className="default-button"
                    onClick={() => {
                        navigate("/contact-information");
                    }}
                >
                    Next step
                </button>
            </div>
        </div>
    );
}
