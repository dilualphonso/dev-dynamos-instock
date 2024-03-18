import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import "./WarehousesAddPage.scss";
import { Link } from "react-router-dom";
import HeadingWithBackArrow from "../../components/HeadingWithBackArrow/HeadingWithBackArrow";
function WarehousesAddPage() {
  return (
    <section className="add-warehouse">
      <div className="add-warehouse__heading-container">
        <HeadingWithBackArrow
          link={"/warehouses"}
          heading={"Add New Warehouse"}
        />
      </div>
      <WarehouseForm warehouseToEdit={null} />
    </section>
  );
}

export default WarehousesAddPage;
