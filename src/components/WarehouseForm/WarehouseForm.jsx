import "./WarehouseForm.scss";
import { BASE_URL } from "../../constant-variables.js";
import errorFlag from "../../assets/icons/error-24px.svg";
import { validateWarehouseForm } from "../../utils/validation.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function WarehouseDetailsForm({warehouseToEdit}) {

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

    // Button text state
    const [submitBtnText, setSubmitButtonText] = useState("");

    // Create a navigate for when the user creates a warehouse or decides to cancel the process
    const navigate = useNavigate();

    // Make inputs state for form fields
    const initialState = {
        warehouseName: "",
        streetAddress: "",
        city: "",
        country: "",
        contactName: "",
        position: "",
        phoneNumber: "",
        email: ""
    }
    const [formInputs, setFormInputs] = useState(initialState);



    /**
     * updateForm is a wrapper function that helps to set the updated formInputs state variable based on the change of only 1 of its key-value pairs. The field parameter is the key to be updated and the input parameter is the new value.
     * 
     * @param {string}      field
     * @param {string}      input
     * 
     */
    function updateForm(field, input){
        const updatedInput = {...formInputs, [field]: input}
        setFormInputs(updatedInput);
    }

    // Check to see if this is an add or edit form
    useEffect(()=>{
        if(!warehouseToEdit){
            // The form is in ADD mode
            setSubmitButtonText("+ Add Warehouse");
        }else{
            // The form is in EDIT mode
            const filledFields = {
                warehouseName: warehouseToEdit.warehouse_name,
                streetAddress: warehouseToEdit.address,
                city: warehouseToEdit.city,
                country: warehouseToEdit.country,
                contactName: warehouseToEdit.contact_name,
                position: warehouseToEdit.contact_position,
                phoneNumber: warehouseToEdit.contact_phone,
                email: warehouseToEdit.contact_email
            }
            setSubmitButtonText("Save");
            setFormInputs(filledFields);
        }
    }, [warehouseToEdit]);

    /**
     * inputChangeHandler is a function that executes the actions that needs to happen when any input field in the form is edited. It stores the updated input field value in its corresponding field key in the formInputs state varialbe.
     * 
     * @param {Object}      event 
     * 
     */
    function inputChangeHandler(event){
        const {target} = event;
        updateForm(target.name, target.value);
    }
    
    /**
     * getInputtedWarehouse is a helper function that will get all of the input field values and stores those values inside one warehouse object that (if verified) is ready to be sent to the server.
     * 
     * @returns {Object}
     */
    function getInputtedWarehouse(){
        // Create warehouse object using the values in the form inputs
        const warehouseObject = {
            warehouse_name: formInputs.warehouseName, 
            address: formInputs.streetAddress, 
            city: formInputs.city, 
            country: formInputs.country, 
            contact_name: formInputs.contactName, 
            contact_position: formInputs.position, 
            contact_phone: formInputs.phoneNumber, 
            contact_email: formInputs.email
        }

        // Return the warehouse objecct
        return warehouseObject
    }

    /**
     * resetInputs is a helper function that will empty all of the input fields of any value.
     * 
     */
    function resetInputs(){
        setFormInputs(initialState);

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
     * @param {number}      id 
     * 
     */
    const editWarehouse = async(warehouse, id) =>{
        try{
            const response = await axios.put(`${BASE_URL}/warehouses/${id}`, warehouse);
            if(!!response.data){
                // TODO success message?
            }

        }catch(error){
            console.log(error);
            // TODO error notification for user?
        }
    };

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
            if(!warehouseToEdit){
                // If no warehouse to edit, the call is POST to ADD a new warehouse
                addWarehouse(warehouse);
            }else{
                // Otherwise the call is PUT to EDIT an existing warehouse
                editWarehouse(warehouse, warehouseToEdit.id);
            }

            // Reset the error states
            resetErrorStates();

            // Empty the form fields
            resetInputs();

            // Leave this page and go to the warehouse list page if ADD or warehouse details page if EDIT
            if(!warehouseToEdit){
                navigate("/warehouses");
            }else{
                navigate(`/warehouses/${warehouseToEdit.id}`);
            }

        } 
    }

    /**
     * submitHandler is a function that will direct the user to their previous page if they are choosing to cancel the add/edit process. The path is different depending on the task.
     * 
     * @param {Object}      event 
     * 
     */
    function cancelClickHandler(event){
        // Stop page from reloading
        event.preventDefault();

        // Return to the warehouses list page if this is ADD or return to the warehouse details page if EDIT
        if(!warehouseToEdit){
            navigate("/warehouses");
        }else{
            navigate(`/warehouses/${warehouseToEdit.id}`);
        }
    }

    return (
        <section className="warehouse-form">
            <form className="warehouse-form__form" name="addWarehouseForm" id="addWarehouseForm" onSubmit={submitHandler} >
                <fieldset className="warehouse-form__details-container" form="addWarehouseForm" name="warehouseDetailsFields" >
                    {/* Use h3 instead of legend in tablet as the styling of fieldset would required non-flex styling */}
                    <h3 className="warehouse-form__sub-heading">Warehouse Details</h3>

                    <label className="warehouse-form__label" htmlFor="warehouseName">Warehouse Name</label>
                    <input className={isWarehouseNameError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="warehouseName" id="warehouseName" placeholder="Warehouse Name" onChange={inputChangeHandler} value={formInputs.warehouseName}/>
                    {isWarehouseNameError &&
                    <label className="warehouse-form__error" htmlFor="warehouseName">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                    <label className="warehouse-form__label" htmlFor="streetAddress">Street Address</label>
                    <input className={isStreetError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="streetAddress" id="streetAddress" placeholder="Street Address" onChange={inputChangeHandler} value={formInputs.streetAddress} />
                    {isStreetError &&
                    <label className="warehouse-form__error" htmlFor="streetAddress">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                    <label className="warehouse-form__label" htmlFor="city">City</label>
                    <input className={isCityError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="city" id="city" placeholder="City" onChange={inputChangeHandler} value={formInputs.city} />
                    {isCityError &&
                    <label className="warehouse-form__error" htmlFor="city">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form." />
                        This field is required
                    </label>}

                    <label className="warehouse-form__label" htmlFor="country">Country</label>
                    <input className={isCountryError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="country" id="country" placeholder="Country" onChange={inputChangeHandler} value={formInputs.country} />
                    {isCountryError &&
                    <label className="warehouse-form__error" htmlFor="country">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                </fieldset>
                <fieldset className="warehouse-form__contact-container" form="addWarehouseForm" name="contactDetailsFields">
                    {/* Use h3 instead of legend in tablet as the styling of fieldset would required non-flex styling */}
                    <h3 className="warehouse-form__sub-heading">Contact Details</h3>

                    <label className="warehouse-form__label" htmlFor="contactName">Contact Name</label>
                    <input className={isContactNameError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="contactName" id="contactName" placeholder="Contact Name" onChange={inputChangeHandler} value={formInputs.contactName} />
                    {isContactNameError &&
                    <label className="warehouse-form__error" htmlFor="contactName">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                    <label className="warehouse-form__label" htmlFor="position">Position</label>
                    <input className={isPositionError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="position" id="position" placeholder="Position" onChange={inputChangeHandler} value={formInputs.position} />
                    {isPositionError &&
                    <label className="warehouse-form__error" htmlFor="position">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                    <label className="warehouse-form__label" htmlFor="phoneNumber">Phone Number</label>
                    <input className={phoneError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" onChange={inputChangeHandler} value={formInputs.phoneNumber} />
                    {phoneError &&
                    <label className="warehouse-form__error" htmlFor="phoneNumber">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        {phoneError}
                    </label>}

                    <label className="warehouse-form__label" htmlFor="email">Email</label>
                    <input className={emailError ? "warehouse-form__input warehouse-form__input--error" : "warehouse-form__input"} type="text" name="email" id="email" placeholder="Email" onChange={inputChangeHandler} value={formInputs.email} />
                    {emailError &&
                    <label className="warehouse-form__error" htmlFor="email">
                        <img src={errorFlag} className="warehouse-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        {emailError}
                    </label>}

                </fieldset>
                <div className="warehouse-form__button-container">
                    <button className="warehouse-form__button warehouse-form__button--cancel" onClick={cancelClickHandler}>Cancel</button>
                    <button className="warehouse-form__button warehouse-form__button--submit">{submitBtnText}</button>
                </div>
            </form>
        </section>
    );
}

export default WarehouseDetailsForm;