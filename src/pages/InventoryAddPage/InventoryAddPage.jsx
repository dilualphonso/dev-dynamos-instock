import "./InventoryAddPage.scss";
import { Link } from "react-router-dom";


function WarehousesAddPage() {
    return (
        <section className="add-inventory">
            <article className="add-inventory__heading-container">
                <Link className="add-inventory__back-link" to="/inventories"></Link>
                <h1 className="add-inventory__heading">Add New Inventory Item</h1>
            </article>
            
        </section>
    );
}
export default WarehousesAddPage;
