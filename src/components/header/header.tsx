import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetNewItems } from "../../state/cartSlice";
import { RootState } from "../../state/store";

export default function Header() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const amountOfNewItems = useSelector(
        (state: RootState) => state.cart.amountOfNewItems
    );
    const items = useSelector((state: RootState) => state.cart.items);

    const newItemsCounterRef = useRef<HTMLDivElement>(null);
    const cartButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (amountOfNewItems === 0) {
            newItemsCounterRef.current?.classList.remove(
                "header-container__cart__new-items-counter--active"
            );
        } else {
            newItemsCounterRef.current?.classList.add(
                "header-container__cart__new-items-counter--active"
            );
        }
    }, [amountOfNewItems]);

    useEffect(() => {
        if (location.pathname !== "/") {
            dispatch(resetNewItems());
        }
        if (location.pathname === "/finish-order-page") {
            cartButtonRef.current!.disabled = true;
        }
    }, [location]);

    useEffect(() => {
        if (items.length === 0) {
            cartButtonRef.current!.disabled = true;
        } else {
            cartButtonRef.current!.disabled = false;
        }
    }, [items]);

    return (
        <div className="header-container flex">
            <Link to={"/"}>
                <div className="header-container__company-name-logo flex items-center">
                    <div className="header-container__company-name-logo__logo"></div>
                    <h1>OfficeChairs</h1>
                </div>
            </Link>
            <div className="header-container__cart">
                <button
                    ref={cartButtonRef}
                    className="default-button flex items-center"
                    onClick={() => {
                        navigate("/cart");
                    }}
                >
                    <img src="./assets/cart.png" alt="cart" />
                    <p>Cart</p>
                </button>
                <div
                    ref={newItemsCounterRef}
                    className="header-container__cart__new-items-counter"
                >
                    {amountOfNewItems > 99 ? "99+" : amountOfNewItems}
                </div>
            </div>
        </div>
    );
}
