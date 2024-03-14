import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import "./WarehousesAddPage.scss";
import { Link } from "react-router-dom";

function WarehousesAddPage() {
    

    return (
        <section className="add-warehouse">
            <article className="add-warehouse__heading-container">
                <Link className="add-warehouse__back-link" to="/warehouses"></Link>
                <h1 className="add-warehouse__heading">Add New Warehouse</h1>
            </article>
            <WarehouseForm />
        </section>
    );
}

export default WarehousesAddPage;
