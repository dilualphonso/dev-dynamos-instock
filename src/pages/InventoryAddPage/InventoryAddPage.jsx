import "./InventoryAddPage.scss";
import { Link } from "react-router-dom";
import InventoryItemForm from "../../components/InventoryItemForm/InventoryItemForm";

function WarehousesAddPage() {
  
    return (
        <section className="add-inventory">
            <article className="add-inventory__heading-container">
                <Link className="add-inventory__back-link" to="/inventories"></Link>
                <h1 className="add-inventory__heading">Add New Inventory Item</h1>
            </article>
            <InventoryItemForm itemToEdit={null} />
        </section>
    );
}
export default WarehousesAddPage;
