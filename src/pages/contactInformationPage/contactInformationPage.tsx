import LinkState from "../../components/linkState/linkState";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { contactInformationSchema } from "../../validations/contactInformationValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

export default function ContactInformationPage() {
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(contactInformationSchema),
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

    async function onSubmit(data: any) {
        navigate("/shipment-information", { state: data });
    }

    return (
        <div className="contactInformationPage-container">
            <LinkState />
            <h1>Contact information</h1>
            <form className="default-form">
                <div className="default-input-container">
                    <label htmlFor="first-name">First name*</label>
                    <input
                        type="text"
                        id="first-name"
                        {...register("firstName")}
                        placeholder="Enter your first name"
                    />
                    <p>{errors.firstName?.message}</p>
                </div>
                <div className="default-input-container">
                    <label htmlFor="last-name">Last name*</label>
                    <input
                        type="text"
                        id="last-name"
                        {...register("lastName")}
                        placeholder="Enter your last name"
                    />
                    <p>{errors.lastName?.message}</p>
                </div>
                <div className="default-input-container">
                    <label htmlFor="email">Email*</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        placeholder="Enter your email"
                    />
                    <p>{errors.email?.message}</p>
                </div>
                <div className="default-input-container">
                    <label htmlFor="phone">Phone*</label>
                    <input
                        type="tel"
                        id="phone"
                        {...register("phone")}
                        placeholder="Enter your phone"
                    />
                    <p>{errors.phone?.message}</p>
                </div>
            </form>
            <div className="contactInfromationPage-container__nextStepButton-container">
                <button
                    className="default-button"
                    onClick={handleSubmit(onSubmit)}
                >
                    <p>Next step</p>
                </button>
            </div>
        </div>
    );
}
