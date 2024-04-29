import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import {
    addItemAmount,
    subtractItemAmount,
    deleteItem,
} from "../../state/cartSlice";

export default function CartItems() {
    const dispatch = useDispatch();

    const items = useSelector((state: RootState) => state.cart.items);

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
                                    dispatch(deleteItem({ itemId: item[0] }));
                                }}
                            >
                                <img src="/assets/bin.png" alt="delete image" />
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
