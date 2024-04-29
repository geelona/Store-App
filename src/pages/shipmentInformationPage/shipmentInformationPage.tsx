import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shipmentInformationSchema } from "../../validations/shipmentInformationValidation";

import LinkState from "../../components/linkState/linkState";
import { useEffect } from "react";

export default function ShipmentInformationPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const form = useForm({
        resolver: yupResolver(shipmentInformationSchema),
    });

    const { register, handleSubmit } = form;
    const { errors } = form.formState;

    useEffect(() => {
        const errorElements = document.querySelectorAll(".input-error");
        errorElements.forEach((element) => {
            element.classList.remove("input-error");
        });
        if (Object.keys(errors).length > 0) {
            Object.values(errors).map((error) => {
                const element = error.ref as HTMLInputElement;
                element.classList.add("input-error");
            });
        }
    }, [form.watch()]);

    function onSubmit(data: any) {
        navigate("/finish-order-page", {
            state: {
                firstName: location.state.firstName,
                lastName: location.state.lastName,
                email: location.state.email,
                phone: location.state.phone,
                addres: data.addres,
                city: data.city,
                country: data.country,
                state: data.state,
                zip: data.zip,
                apartment: data.apartment,
            },
        });
    }

    return (
        <div className="shipmentInformationPage-container">
            <LinkState />
            <h1>Shipment information</h1>
            <form className="default-form">
                <div className="default-input-container">
                    <label htmlFor="addres">Addres (No P. O. Boxes)*</label>
                    <input
                        type="text"
                        id="addres"
                        {...register("addres")}
                        placeholder="Enter your address"
                    />
                    <p>{errors.addres?.message}</p>
                </div>
                <div className="default-input-container">
                    <label htmlFor="apartment">
                        Apartment, suite etc. (optional)*
                    </label>
                    <input
                        type="text"
                        id="apartment"
                        {...register("apartment")}
                        placeholder="Enter your apartment information"
                    />
                </div>
                <div className="default-input-container">
                    <label htmlFor="city">City*</label>
                    <input
                        type="text"
                        id="city"
                        {...register("city")}
                        placeholder="Enter your city"
                    />
                    <p>{errors.city?.message}</p>
                </div>
                <div className="form__localization">
                    <div className="default-input-container">
                        <label htmlFor="country">Country/Region*</label>
                        <select
                            id="country"
                            {...register("country")}
                            defaultValue={""}
                        >
                            <option value="" disabled hidden>
                                Select your country/region
                            </option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="Germany">Germany</option>
                            <option value="Denmark">Denmark</option>
                        </select>
                        <p>{errors.country?.message}</p>
                    </div>
                    <div className="default-input-container">
                        <label htmlFor="state">State*</label>
                        <select
                            id="state"
                            {...register("state")}
                            defaultValue={""}
                        >
                            <option value="" disabled hidden>
                                Select your state
                            </option>
                            <option value="state1">state1</option>
                            <option value="state2">state2</option>
                            <option value="state3">state3</option>
                        </select>
                        <p>{errors.state?.message}</p>
                    </div>
                    <div className="default-input-container">
                        <label htmlFor="zip">ZIP code*</label>
                        <input
                            type="number"
                            id="zip"
                            {...register("zip")}
                            placeholder="Enter your ZIP code"
                        />
                        <p>{errors.zip?.message}</p>
                    </div>
                </div>
            </form>
            <div className="shipmentInformationPage-container__submitOrderButton-container">
                <button
                    className="default-button"
                    onClick={handleSubmit(onSubmit)}
                >
                    <p>Submit order</p>
                </button>
            </div>
        </div>
    );
}
