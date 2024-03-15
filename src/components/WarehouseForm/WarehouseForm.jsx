import "./WarehouseForm.scss";
import { BASE_URL } from "../../constant-variables.js";
import errorFlag from "../../assets/icons/error-24px.svg";
import { validateWarehouseForm } from "../../utils/validation.js";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function WarehouseDetailsForm() {

    // Warehouse details error states
    const [isWarehouseNameError, setIsWarehouseNameError] = useState(false);
    const [isStreetError, setIsStreetError] = useState(false);
    const [isCityError, setIsCityError] = useState(false);
    const [isCountryError, setIsCountryError] = useState(false);

    // Contact details error states
    const [isContactNameError, setIsContactNameError] = useState(false);
    const [isPositionError, setIsPositionError] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");

    // Reference for field elements
    const formRef = useRef();

    // Create a navigate for when the user creates a warehouse or decides to cancel the process
    const navigate = useNavigate();


    /**
     * getInputtedWarehouse is a helper function that will get all of the input field references, get all the values in the inputs, and stores those values inside one warehouse object that (if verified) is ready to be sent to the server.
     * 
     * @returns {Object}
     */
    function getInputtedWarehouse(){
        // Get all of the form reference to get its input fields
        const formEl = formRef.current;

        // Get all of the input fields
        // Warehouse details fields
        const warehouseNameEl = formEl.warehouseName;
        const streetAddressEl = formEl.streetAddress;
        const cityEl = formEl.city;
        const countryEl = formEl.country;
        // Contact details fields
        const contactNameEl = formEl.contactName;
        const positionEl = formEl.position;
        const phoneNumberEl = formEl.phoneNumber;
        const emailEl = formEl.email;

        // Create warehouse object using the values in the form inputs
        const warehouseObject = {
            warehouse_name: warehouseNameEl.value, 
            address: streetAddressEl.value, 
            city: cityEl.value, 
            country: countryEl.value, 
            contact_name: contactNameEl.value, 
            contact_position: positionEl.value, 
            contact_phone: phoneNumberEl.value, 
            contact_email: emailEl.value
        }

        // Return the warehouse objecct
        return warehouseObject
    }

    /**
     * resetInputs is a helper function that will empty all of the input fields of any value.
     * 
     */
    function resetInputs(){
        // Get all of the form reference to get its input fields
        const formEl = formRef.current;

        // Get all of the input fields
        // Warehouse details fields
        const warehouseNameEl = formEl.warehouseName;
        const streetAddressEl = formEl.streetAddress;
        const cityEl = formEl.city;
        const countryEl = formEl.country;
        // Contact details fields
        const contactNameEl = formEl.contactName;
        const positionEl = formEl.position;
        const phoneNumberEl = formEl.phoneNumber;
        const emailEl = formEl.email;

        // Empty the form fields
        warehouseNameEl.value = ""; 
        streetAddressEl.value = ""; 
        cityEl.value = "";
        countryEl.value = ""; 
        contactNameEl.value = ""; 
        positionEl.value = ""; 
        phoneNumberEl.value = ""; 
        emailEl.value = "";

    }

    /**
     * setErrorStates is an helper function that takes a validation report about the inputted warehouse object and sets each error state to the validation objects results.
     * 
     * @param {Object}      validationReport 
     * 
     */
    function setErrorStates(validationReport){
        // Set the error states with the validation results
        setIsWarehouseNameError(validationReport.isWarehouseNameError);
        setIsStreetError(validationReport.isAddressError);
        setIsCityError(validationReport.isCityError);
        setIsCountryError(validationReport.isCountryError);
        setIsContactNameError(validationReport.isContactNameError);
        setIsPositionError(validationReport.isPositionError);
        setPhoneError(validationReport.isPhoneError);
        setEmailError(validationReport.isEmailError);
    }

    /**
     * resetErrorStates is a helper function that will set all of the error states to no errors.
     * 
     */
    function resetErrorStates(){
        // Reset the error states
        setIsWarehouseNameError(false);
        setIsStreetError(false);
        setIsCityError(false);
        setIsCountryError(false);
        setIsContactNameError(false);
        setIsPositionError(false);
        setPhoneError("");
        setEmailError("");
    }

    /**
     * addWarehouse is an asynchronous function that takes a validated warehouse object and POSTs it to the server to add to the warehouses database.
     * 
     * @param {Object}      warehouse 
     * 
     */
    const addWarehouse = async(warehouse) =>{
        try{
            const response = await axios.post(`${BASE_URL}/warehouses`, warehouse);
            // console.log(response.data);
            if(!!response.data){
                // TODO success message?
            }

        }catch(error){
            console.log(error);
            // TODO error notification for user?
        }
    };

    /**
     * editWarehouse is an asynchronous function that takes a validated warehouse object and PUTs it to the server to update the give warehouse in the database.
     * 
     * @param {Object}      warehouse 
     * 
     */
    // const editWarehouse = async(warehouse, id) =>{
    //     try{
    //         const response = await axios.put(`${BASE_URL}/warehouses/${id}`, warehouse);
    //         console.log(response.data);
    //         // TODO success message?

    //     }catch(error){
    //         console.log(error);
    //         // TODO error notification for user?
    //     }
    // };

    /**
     * submitHandler is a function that executes the actions that needs to happen when a warehouse creation form is submitted. 
     * It will determine the validity of the form input values and on a failure will update the fields with error states to inform the user why their submission was rejected. Otherwise it will make the axios request to create the new warehouse.
     * 
     * @param {Object}      event 
     * 
     */
    function submitHandler(event){
        // Stop page from reloading
        event.preventDefault();

        // Get the input values in a compact "warehouse" object
        const warehouse = getInputtedWarehouse();

        // Check to see that all of the inputs are valid by running it through validation
        const formErrors = validateWarehouseForm(warehouse);

        // If validation failed
        if(formErrors.errorsExist){
            // Set the error states with the validation results
            setErrorStates(formErrors);
        }else{
            // If validation succeeded
            // Make the request to the server to create the warehouse
            addWarehouse(warehouse);

            // Reset the error states
            resetErrorStates();

            // Empty the form fields
            resetInputs();

            // Leave this page and go to the warehouse list page
            navigate("/warehouses");
        } 
    }

    function cancelClickHandler(event){
        // Stop page from reloading
        event.preventDefault();

        // Return to the warehouses list page 
        navigate("/warehouses");
    }
    
    return (
        <section className="warehouse-form">
            <form className="warehouse-form__form" name="addWarehouseForm" id="addWarehouseForm" onSubmit={submitHandler} ref={formRef}>
                <fieldset className="warehouse-form__details-container" form="addWarehouseForm" name="warehouseDetailsFields" >
                    {/* Use h3 instead of legend in tablet as the styling of fieldset would required non-flex styling */}
                    <legend className="warehouse-form__sub-heading warehouse-form__sub-heading--in-border">Warehouse Details</legend>
                    <h3 className="warehouse-form__sub-heading warehouse-form__sub-heading--under-border">Warehouse Details</h3>

                    <label className="warehouse-form__label" htmlFor="warehouseName">Warehouse Name</label>
                    <input className={isWarehouseNameError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="warehouseName" id="warehouseName" placeholder="Warehouse Name"/>
                    {isWarehouseNameError &&
                    <label className="warehouse-form__error" htmlFor="warehouseName">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                    <label className="warehouse-form__label" htmlFor="streetAddress">Street Address</label>
                    <input className={isStreetError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="streetAddress" id="streetAddress" placeholder="Street Address"/>
                    {isStreetError &&
                    <label className="warehouse-form__error" htmlFor="streetAddress">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                    <label className="warehouse-form__label" htmlFor="city">City</label>
                    <input className={isCityError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="city" id="city" placeholder="City"/>
                    {isCityError &&
                    <label className="warehouse-form__error" htmlFor="city">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                    <label className="warehouse-form__label" htmlFor="country">Country</label>
                    <input className={isCountryError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="country" id="country" placeholder="Country"/>
                    {isCountryError &&
                    <label className="warehouse-form__error" htmlFor="country">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                </fieldset>
                <fieldset className="warehouse-form__contact-container" form="addWarehouseForm" name="contactDetailsFields">
                    {/* Use h3 instead of legend in tablet as the styling of fieldset would required non-flex styling */}
                    <legend className="warehouse-form__sub-heading warehouse-form__sub-heading--in-border">Contact Details</legend>
                    <h3 className="warehouse-form__sub-heading warehouse-form__sub-heading--under-border">Contact Details</h3>

                    <label className="warehouse-form__label" htmlFor="contactName">Contact Name</label>
                    <input className={isContactNameError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="contactName" id="contactName" placeholder="Contact Name"/>
                    {isContactNameError &&
                    <label className="warehouse-form__error" htmlFor="contactName">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                    <label className="warehouse-form__label" htmlFor="position">Position</label>
                    <input className={isPositionError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="position" id="position" placeholder="Position"/>
                    {isPositionError &&
                    <label className="warehouse-form__error" htmlFor="position">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                    <label className="warehouse-form__label" htmlFor="phoneNumber">Phone Number</label>
                    <input className={phoneError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number"/>
                    {phoneError &&
                    <label className="warehouse-form__error" htmlFor="phoneNumber">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        {phoneError}
                    </label>}

                    <label className="warehouse-form__label" htmlFor="email">Email</label>
                    <input className={emailError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="email" id="email" placeholder="Email"/>
                    {emailError &&
                    <label className="warehouse-form__error" htmlFor="email">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        {emailError}
                    </label>}

                </fieldset>
                <div className="warehouse-form__button-container">
                    <button className="warehouse-form__button warehouse-form__button--cancel" onClick={cancelClickHandler}>Cancel</button>
                    <button className="warehouse-form__button warehouse-form__button--add">+ Add Warehouse</button>
                </div>
            </form>
        </section>
    );
}

export default WarehouseDetailsForm;