import "./mainPage.scss";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem, addNewItem } from "../../state/cartSlice";

export default function MainPage() {
    const dispatch = useDispatch();
    const [items, setItems] = useState([] as any[]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("https://dummyjson.com/products");
            const data = await response.json();
            setItems(data.products);
        } catch (error) {}
    };

    function buttonClickHandler(item: any, e: any) {
        addItemclickHandler(item);
        (e.target as HTMLButtonElement).classList.add(
            "mainPage-container__data__item__button-container__button__delay-animation"
        );
        (e.target as HTMLButtonElement).disabled = true;
        (e.target as HTMLButtonElement).innerHTML =
            "<img src='/assets/done.png' alt='check image' class=' pointer-events-none mainPage-container__data__item__button-container__button__check'/>" +
            "<p class=' pointer-events-none'>Added</p>";

        setTimeout(() => {
            (e.target as HTMLButtonElement).classList.remove(
                "mainPage-container__data__item__button-container__button__delay-animation"
            );
            (e.target as HTMLButtonElement).disabled = false;
            (e.target as HTMLButtonElement).innerHTML =
                "<img src='/assets/add.png' alt='add image' class=' pointer-events-none mainPage-container__data__item__button-container__button__plus'/>" +
                "<p class='pointer-events-none'>Add to cart</p>";
        }, 1000);
    }

    function addItemclickHandler(item: any) {
        dispatch(
            addItem([
                item.id,
                item.title,
                item.description,
                item.price,
                item.images[0],
            ])
        );
        dispatch(addNewItem());
    }

    return (
        <div className="mainPage-container">
            <div className="mainPage-container__data">
                {items.length > 0 ? (
                    items.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="mainPage-container__data__item"
                            >
                                <img
                                    className="mainPage-container__data__item__image"
                                    src={item.images[0]}
                                    alt="product image"
                                />
                                <p className="mainPage-container__data__item__title">
                                    {item.title}
                                </p>
                                <p className="mainPage-container__data__item__price">
                                    ${item.price}
                                </p>

                                <div className="mainPage-container__data__item__button-container">
                                    <button
                                        className="mainPage-container__data__item__button-container__button default-button flex"
                                        onClick={(e) => {
                                            buttonClickHandler(item, e);
                                        }}
                                    >
                                        <img
                                            src="/assets/add.png"
                                            alt="add image"
                                            className=" pointer-events-none mainPage-container__data__item__button-container__button__plus"
                                        />
                                        <p className=" pointer-events-none">
                                            Add to cart
                                        </p>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="mainPage-container__data__loading">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
}
