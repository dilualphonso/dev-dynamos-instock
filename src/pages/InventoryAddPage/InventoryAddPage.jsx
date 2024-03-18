import "./InventoryAddPage.scss";
import { Link } from "react-router-dom";
import InventoryItemForm from "../../components/InventoryItemForm/InventoryItemForm";
import HeadingWithBackArrow from "../../components/HeadingWithBackArrow/HeadingWithBackArrow";
function InventoryAddPage() {
  return (
    <section className="add-inventory">
      <div className="add-inventory__heading-container">
        <HeadingWithBackArrow
          link={"/inventory"}
          heading={"Add New Inventory Item"}
        />
      </div>
      <InventoryItemForm itemToEdit={null} />
    </section>
  );
}
export default InventoryAddPage;
