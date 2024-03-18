import "./InventoryItemForm.scss";
import { BASE_URL } from "../../constant-variables.js";
import errorFlag from "../../assets/icons/error-24px.svg";
import { validateItemForm } from "../../utils/validation.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function InventoryItemForm({itemToEdit}) {

    // Item details error states
    const [isItemNameError, setIsItemNameError] = useState(false);
    const [isDescriptionError, setIsDescriptionError] = useState(false);
    const [isCategoryError, setIsCategoryError] = useState(false);

    // Item Availability error states
    const [quantityError, setQuantityError] = useState("");
    const [isWarehouseError, setIsWarehouseError] = useState(false);

    // Button text state
    const [submitBtnText, setSubmitButtonText] = useState("");

    const [categoryChoice, setCategoryChoice] = useState("");
    const [warehouseChoice, setWarehouseChoice] = useState("");
    const [warehouses, setWarehouses] = useState([]);

    // Create a navigate for when the user creates an inventory item or decides to cancel the process
    const navigate = useNavigate();

    // Make inputs state for form fields
    const initialState = {
        itemName: "",
        description: "",
        category: "",
        status: "Out of Stock",
        quantity: "",
        warehouse: ""
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



    // Check to see if this is an add or edit form and format accordingly
    useEffect(()=>{
        const getWarehouses = async () =>{
            try{
                const response = await axios.get(`${BASE_URL}/warehouses`);
                setWarehouses(response.data);
            }catch(error){
                console.error(error);
                // Something went wrong. cannot populate warehouses
                // Todo notify user?
            }
        }
        getWarehouses();
        if(!itemToEdit){
            // The form is in ADD mode
            setSubmitButtonText("+ Add Item");
        }else{
            // The form is in EDIT mode
            const filledFields = {
                itemName: itemToEdit.item_name,
                description: itemToEdit.description,
                category: itemToEdit.category,
                status: itemToEdit.status,
                quantity: itemToEdit.quantity,
                warehouse: itemToEdit.warehouse_name,
            }
            setWarehouseChoice(itemToEdit.warehouse_name);
            setCategoryChoice(itemToEdit.category);
            setSubmitButtonText("Save");
            setFormInputs(filledFields);
        }

    }, [itemToEdit]);

    /**
     * getWarehouseId is a helper function that will find the first match of a warehouse name and return its id number.
     * 
     * @param {string}      warehouseName
     * 
     * @return {number}
     * 
     */
    function getWarehouseId(warehouseName){
        if(!warehouseName){
            return ""
        }else{
            const findSelected = warehouses.find((warehouse) => {
                return warehouse.warehouse_name === warehouseName;
            });
            if(!findSelected){
                return "";
            }else{
                return findSelected.id;
            }
        }
    }

    /**
     * getInputtedItem is a helper function that will get all of the input field values and stores those values inside one inventory item object that (if verified) is ready can be sent to the server after number fields cast from strings to int.
     * 
     * @returns {Object}
     */
    function getInputtedItem(){
        // Create inventory item object using the values in the form inputs
        const inventoryItemObject = {
            warehouse_id: getWarehouseId(formInputs.warehouse), 
            item_name: formInputs.itemName, 
            description: formInputs.description, 
            category: formInputs.category, 
            status: formInputs.status, 
            quantity: formInputs.quantity
        }

        // Return the inventory item objecct
        return inventoryItemObject
    }

    /**
     * resetInputs is a helper function that will empty all of the input fields of any value.
     * 
     */
    function resetInputs(){
        setFormInputs(initialState);

    }

    /**
     * setErrorStates is an helper function that takes a validation report about the inputted inventory item object and sets each error state to the validation objects results.
     * 
     * @param {Object}      validationReport 
     * 
     */
    function setErrorStates(validationReport){
        // Set the error states with the validation results
        setIsItemNameError(validationReport.isItemNameError);
        setIsDescriptionError(validationReport.isDescriptionError);
        setIsCategoryError(validationReport.isCategoryError);
        setQuantityError(validationReport.quantityError);
        setIsWarehouseError(validationReport.isWarehouseError);
    }

    /**
     * resetErrorStates is a helper function that will set all of the error states to no errors.
     * 
     */
    function resetErrorStates(){
        // Reset the error states
        setIsItemNameError(false);
        setIsDescriptionError(false);
        setIsCategoryError(false);
        setQuantityError("");
        setIsWarehouseError(false);

    }

    /**
     * addInventoryItem is an asynchronous function that takes a validated inventory item object and POSTs it to the server to add to the inventories database.
     * 
     * @param {Object}      inventoryItem 
     * 
     */
    const addInventoryItem = async(inventoryItem) =>{
        try{
            const response = await axios.post(`${BASE_URL}/inventories`, inventoryItem);
            if(!!response.data){
                // TODO success message?
            }

        }catch(error){
            console.log(error);
            // TODO error notification for user?
        }
    };

    /**
    * editInventoryItem is an asynchronous function that takes a validated inventory item object and PUTs it to the server to edit the inventories database.
    *
    * @param {Object}      inventoryItem
    *
    */
    const editInventoryItem = async (inventoryItem) => {
        try {
            const response = await axios.put(
            `${BASE_URL}/inventories/${itemToEdit.id}`,
            inventoryItem
            );
            if (!!response.data) {
            // TODO success message?
            }
        } catch (error) {
            console.log(error);
            // TODO error notification for user?
        }
    }

    /**
     * submitHandler is a function that executes the actions that needs to happen when a inventory item creation form is submitted. 
     * It will determine the validity of the form input values and on a failure will update the fields with error states to inform the user why their submission was rejected. Otherwise it will make the axios request to create the new inventory item.
     * 
     * @param {Object}      event 
     * 
     */
    function submitHandler(event){
        // Stop page from reloading
        event.preventDefault();

        // Get the input values in a compact "inventory item" object
        const inventoryItem = getInputtedItem();

        // Check to see that all of the inputs are valid by running it through validation
        const formErrors = validateItemForm(inventoryItem);

        // If validation failed
        if(formErrors.errorsExist){
            // Set the error states with the validation results
            setErrorStates(formErrors);

        // If validation succeeded
        }else{            
            // Change the quantity field and warehouse_id to integer type
            inventoryItem.warehouse_id = parseInt(inventoryItem.warehouse_id, 10);
            if(inventoryItem.status === "In Stock"){
                inventoryItem.quantity = parseInt(inventoryItem.quantity, 10);
            }else{
                inventoryItem.quantity = 0;
            }

            // Make the request to the server to create the inventory item
            if(!itemToEdit){
                // If no inventory item to edit, the call is POST to ADD a new inventory item
                addInventoryItem(inventoryItem);
            }else{
                // Otherwise the call is PUT to EDIT an existing inventory item
                editInventoryItem(inventoryItem);
            }

            // Reset the error states
            resetErrorStates();

            // Empty the form fields
            resetInputs();

            // Leave this page and go to the inventory item list page if ADD or inventory item details page if EDIT
            if(!itemToEdit){
                navigate("/inventory");

            }else{
                navigate(`/inventory/${itemToEdit.id}`);
            }

        } 
    }

    /**
     * inputChangeHandler is a function that executes the actions that needs to happen when any input field in the form is edited. It stores the updated input field value in its corresponding field key in the formInputs state varialbe.
     * 
     * @param {Object}      event 
     * 
     */
    function inputChangeHandler(event){
        const {target} = event;
        updateForm(target.name, target.value);
        if(target.name === "category"){
            setCategoryChoice(target.value);
        }else if(target.name === "warehouse"){
            setWarehouseChoice(target.value);
        }
        
    }
    
    /**
     * cancelClickHandler is a function that will direct the user to their previous page if they are choosing to cancel the add/edit process. The path is different depending on the task.
     * 
     * @param {Object}      event 
     * 
     */
    function cancelClickHandler(event){
        // Stop page from reloading
        event.preventDefault();

        // Return to the inventory list page if this is ADD or return to the item details page if EDIT
        if(!itemToEdit){
            navigate("/inventory");
        }else{
            navigate(`/inventory/${itemToEdit.id}`);
        }
    }

    return (
        <section className="item-form">
            <form className="item-form__form" name="submitItemForm" id="submitItemForm" onSubmit={submitHandler}> 
                <fieldset className="item-form__details-container" form="submitItemForm" name="itemDetailsFields" >
                    {/* Use h3 instead of legend in tablet as the styling of fieldset would required non-flex styling */}
                    <h3 className="item-form__sub-heading">Item Details</h3>

                    <label className="item-form__label" htmlFor="itemName">Item Name</label>
                    <input className={isItemNameError ? "item-form__input item-form__input--error" : "item-form__input"} type="text" name="itemName" id="itemName" placeholder="Item Name" onChange={inputChangeHandler} value={formInputs.itemName}/>
                    {isItemNameError &&
                    <label className="item-form__error" htmlFor="itemName">
                        <img src={errorFlag} className="item-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                    <label className="item-form__label" htmlFor="description">Description</label>
                    <textarea className={isDescriptionError ? "item-form__textarea item-form__textarea--error" : "item-form__textarea"} name="description" id="description" placeholder="Please enter a brief item description..." onChange={inputChangeHandler} value={formInputs.description} rows={4} />
                    {isDescriptionError &&
                    <label className="item-form__error" htmlFor="description">
                        <img src={errorFlag} className="item-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                    <label className="item-form__label" htmlFor="category">Category</label>
                    <select className={isCategoryError ? "item-form__dropdown item-form__dropdown--error" : "item-form__dropdown"} name="category" id="category" onChange={inputChangeHandler} selected={categoryChoice} value={categoryChoice}>
                        <option className="item-form__dropdown-option" value="" >Please select</option>
                        <option className="item-form__dropdown-option" value="Accessories" >Accessories</option>
                        <option className="item-form__dropdown-option" value="Apparel" >Apparel</option>
                        <option className="item-form__dropdown-option" value="Electronics" >Electronics</option>
                        <option className="item-form__dropdown-option" value="Gear" >Gear</option>
                        <option className="item-form__dropdown-option" value="Health" >Health</option>
                    </select>
                    {isCategoryError &&
                    <label className="item-form__error" htmlFor="category">
                        <img src={errorFlag} className="item-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form." />
                        This field is required
                    </label>}

                </fieldset>
                <fieldset className="item-form__availability-container" form="submitItemForm" name="itemAvailabilityFields">
                    {/* Use h3 instead of legend in tablet as the styling of fieldset would required non-flex styling */}
                    <h3 className="item-form__sub-heading">Item Availability</h3>
     
                    <p className="item-form__label item-form__radio-label--heading">Status</p>
                    <div className="item-form__radio-field-container">
                        <div className="item-form__radio-option-container">
                            <input className="item-form__radioBtn" type="radio" name="status" id="in_stock" onChange={inputChangeHandler} value="In Stock" checked={formInputs.status === "In Stock"}/>
                            <label className="item-form__radio-label" htmlFor="in_stock">In stock</label>
                        </div>
                        <div className="item-form__radio-option-container">
                            <input className="item-form__radioBtn" type="radio" name="status" id="out_of_stock" onChange={inputChangeHandler} value="Out of Stock" checked={formInputs.status === "Out of Stock"}/>
                            <label className="item-form__radio-label" htmlFor="out_of_stock">Out of stock</label>
                        </div>
                    </div>

                    <div className={formInputs.status === "In Stock" ? "item-form__conditional-field item-form__conditional-field--show" : "item-form__conditional-field"}>
                        <label className="item-form__label" htmlFor="quantity">Quantity</label>
                        <input className={quantityError ? "item-form__input item-form__input--error" : "item-form__input"} type="text" name="quantity" id="quantity" placeholder="0" onChange={inputChangeHandler} value={formInputs.quantity} />
                        {quantityError &&
                        <label className="item-form__error" htmlFor="quantity">
                            <img src={errorFlag} className="item-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                            {quantityError}
                        </label>}
                    </div>
                    
                    <label className="item-form__label" htmlFor="warehouse">Warehouse</label>
                    <select className={isWarehouseError ? "item-form__dropdown item-form__dropdown--error" : "item-form__dropdown"}  name="warehouse" id="warehouse" onChange={inputChangeHandler} selected={warehouseChoice} value={warehouseChoice}>
                        <option className="item-form__dropdown-option" value="" >Please select</option>
                        {warehouses.map((warehouse)=>{
                            return <option className="item-form__dropdown-option" key={warehouse.id} value={warehouse.warehouse_name}>{warehouse.warehouse_name}</option>
                        })}
                    </select>
                    {isWarehouseError &&
                    <label className="item-form__error" htmlFor="warehouse">
                        <img src={errorFlag} className="item-form__errorIcon" alt="A small red-orange circle with a white exclamation mark inside it. Indicates an error in the form."/>
                        This field is required
                    </label>}

                </fieldset>
                <div className="item-form__button-container">
                    <button className="item-form__button item-form__button--cancel" onClick={cancelClickHandler}>Cancel</button>
                    <button className="item-form__button item-form__button--submit">{submitBtnText}</button>
                </div>
            </form>
        </section>
    );
}
export default InventoryItemForm;