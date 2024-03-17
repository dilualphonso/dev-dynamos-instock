import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import HeadingWithBackArrow from "../../components/HeadingWithBackArrow/HeadingWithBackArrow";
import "./InventoryEditPage.scss";

function InventoryEditPage() {
  // Get the inventory item id from the browser path
  const { id } = useParams();

  return (
    <section className="edit-inventory">
      <div className="edit-inventory__heading-container">
        <HeadingWithBackArrow
          link={`/inventory/${id}`}
          heading={"Edit Inventory Item"}
        />
      </div>
    </section>
  );
}
export default InventoryEditPage;
