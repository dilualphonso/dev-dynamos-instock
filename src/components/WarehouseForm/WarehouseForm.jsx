import "./WarehouseForm.scss";

function WarehouseDetailsForm() {
    

    // Leave error fields hidden until validation is introduced
    return (
        <section className="warehouse-form">
            <form className="warehouse-form__form">
                <fieldset className="warehouse-form__details-container">
                    {/* Use h3 instead of fieldset as the styling of fieldset would have required non-felx styling */}
                    <h3 className="warehouse-form__sub-heading">Warehouse Details</h3>

                    <label className="warehouse-form__label" htmlFor="warehouseName">Warehouse Name</label>
                    <input className="warehouse-form__input" type="text" name="warehouseName" id="warehouseName" placeholder="Warehouse Name"/>
                    {false &&
                    <label className="warehouse-form__error" htmlFor="contactName"></label>}

                    <label className="warehouse-form__label" htmlFor="streetAddress">Street Address</label>
                    <input className="warehouse-form__input" type="text" name="streetAddress" id="streetAddress" placeholder="Street Address"/>
                    {false &&
                    <label className="warehouse-form__error" htmlFor="streetAddress"></label>}

                    <label className="warehouse-form__label" htmlFor="city">City</label>
                    <input className="warehouse-form__input" type="text" name="city" id="city" placeholder="City"/>
                    {false &&
                    <label className="warehouse-form__error" htmlFor="city"></label>}

                    <label className="warehouse-form__label" htmlFor="country">Country</label>
                    <input className="warehouse-form__input" type="text" name="country" id="country" placeholder="Country"/>
                    {false &&
                    <label className="warehouse-form__error" htmlFor="country"></label>}

                </fieldset>
                <fieldset className="warehouse-form__contact-container">
                    {/* Use h3 instead of fieldset as the styling of fieldset would have required non-felx styling */}
                    <h3 className="warehouse-form__sub-heading">Contact Details</h3>

                    <label className="warehouse-form__label" htmlFor="contactName">Contact Name</label>
                    <input className="warehouse-form__input" type="text" name="contactName" id="contactName" placeholder="Contact Name"/>
                    {false &&
                    <label className="warehouse-form__error" htmlFor="contactName"></label>}

                    <label className="warehouse-form__label" htmlFor="position">Position</label>
                    <input className="warehouse-form__input" type="text" name="position" id="position" placeholder="Position"/>
                    {false &&
                    <label className="warehouse-form__error" htmlFor="position"></label>}

                    <label className="warehouse-form__label" htmlFor="phoneNumber">Phone Number</label>
                    <input className="warehouse-form__input" type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number"/>
                    {false &&
                    <label className="warehouse-form__error" htmlFor="phoneNumber"></label>}

                    <label className="warehouse-form__label" htmlFor="email">Email</label>
                    <input className="warehouse-form__input" type="text" name="email" id="email" placeholder="Email"/>
                    {false &&
                    <label className="warehouse-form__error" htmlFor="email"></label>}

                </fieldset>
                <div className="warehouse-form__button-container">
                    <button className="warehouse-form__button warehouse-form__button--cancel">Cancel</button>
                    <button className="warehouse-form__button warehouse-form__button--add">Add Warehouse</button>
                </div>
            </form>
        </section>
    );
}

export default WarehouseDetailsForm;