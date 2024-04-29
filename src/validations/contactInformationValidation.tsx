import * as yup from "yup";

export const contactInformationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
        .string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("Phone is required"),
});
