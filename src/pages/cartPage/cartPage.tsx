import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import {
    addItemAmount,
    subtractItemAmount,
    deleteItem,
} from "../../state/cartSlice";
import { useEffect, useRef } from "react";
import LinkState from "../../components/linkState/linkState";

export default function CartPage() {
    const dispatch = useDispatch();
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

    function renderItems() {
        if (items.length > 0) {
            return items.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="cartPage-container__cart-items__item flex"
                    >
                        <img src={String(item[5])} alt="item image" />
                        <div className="cartPage-container__cart-items__item__info">
                            <p>
                                {item[2]} {item[3]}
                            </p>
                            <div className="cartPage-container__cart-items__item__info__delete-container">
                                <button
                                    className="default-button flex items-center justify-center"
                                    onClick={() => {
                                        dispatch(
                                            deleteItem({ itemId: item[0] })
                                        );
                                    }}
                                >
                                    <img
                                        src="/assets/bin.png"
                                        alt="delete image"
                                    />
                                    <p>Delete</p>
                                </button>
                            </div>

                            <div className="cartPage-container__cart-items__item__info__plus-minus-quantity-container">
                                <div className="cartPage-container__cart-items__item__info__plus-minus-quantity-container__minus-container">
                                    <button
                                        className="default-button flex items-center justify-center"
                                        onClick={() => {
                                            dispatch(
                                                subtractItemAmount({
                                                    itemId: item[0],
                                                })
                                            );
                                        }}
                                    >
                                        <p>-</p>
                                    </button>
                                </div>
                                <div className="cartPage-container__cart-items__item__info__plus-minus-quantity-container__quantity-container">
                                    <p>{item[1]}</p>
                                </div>
                                <div className="cartPage-container__cart-items__item__info__plus-minus-quantity-container__plus-container">
                                    <button
                                        className="default-button flex items-center justify-center"
                                        onClick={() => {
                                            dispatch(
                                                addItemAmount({
                                                    itemId: item[0],
                                                })
                                            );
                                        }}
                                    >
                                        <p>+</p>
                                    </button>
                                </div>
                            </div>

                            <div className="cartPage-container__cart-items__item__info__price-container">
                                <p>
                                    Price: <span>${item[4] * item[1]}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }

    return (
        <div className="cartPage-container">
            <LinkState />
            <h1>Cart</h1>
            <div className="cartPage-container__cart-items">
                {renderItems()}
            </div>
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
