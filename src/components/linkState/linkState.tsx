import { NavLink } from "react-router-dom";

export default function LinkState() {
    return (
        <div className="linkState-container flex gap-4">
            <NavLink to={"/cart"} className={({isActive}) => (isActive ? "default-link--active" : "") + " default-link"} onClick={
                (e) => {e.preventDefault()}
            }> 
                <p>Cart</p>
            </NavLink>
            <p>	&gt;</p>
            <NavLink to={"/contact-information"} className={({isActive}) => (isActive ? "default-link--active" : "") + " default-link"} onClick={
                (e) => {e.preventDefault()}
            }>
                <p>Contact information</p>
            </NavLink>
            <p>	&gt;</p>
            <NavLink to={"/shipment-information"} className={({isActive}) => (isActive ? "default-link--active" : "") + " default-link"} onClick={
                (e) => {e.preventDefault()}
            }>
                <p>Shipment information</p>
            </NavLink>
        </div>
    )
}