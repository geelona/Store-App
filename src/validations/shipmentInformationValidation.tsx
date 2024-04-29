import * as yup from "yup";

export const shipmentInformationSchema = yup.object().shape({
    addres: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    zip: yup.string().required("ZIP code is required"),
    apartment: yup.string(),
});
