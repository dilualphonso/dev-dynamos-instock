import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./InventoryEditPage.scss";

function InventoryEditPage() {
  // Get the inventory item id from the browser path
  const { id } = useParams();

  return (
    <section className="edit-inventory">
      <article className="edit-inventory__heading-container">
        <Link
          className="edit-inventory__back-link"
          to={`/inventory/${id}`}
        ></Link>
        <h1 className="edit-inventory__heading">Edit Inventory</h1>
      </article>
    </section>
  );
}
export default InventoryEditPage;
