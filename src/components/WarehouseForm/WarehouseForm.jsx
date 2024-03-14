import "./WarehouseForm.scss";

function WarehouseDetailsForm() {
    

    return (
        <section className="w">
            <form>
                <fieldset>
                    <legend>Warehouse Details</legend>
                </fieldset>
                <fieldset>
                    <legend>Contact Details</legend>
                    <label></label>
                    <input type="text"/>
                    <label></label>
                </fieldset>
                <div>
                    <button>Cancel</button>
                    <button>Add Warehouse</button>
                </div>
            </form>
        </section>
    );
}

export default WarehouseDetailsForm;