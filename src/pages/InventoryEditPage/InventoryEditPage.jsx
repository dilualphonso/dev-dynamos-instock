import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import HeadingWithBackArrow from "../../components/HeadingWithBackArrow/HeadingWithBackArrow";
import "./InventoryEditPage.scss";

function InventoryEditPage() {
  // Get the inventory item id from the browser path
  const { id } = useParams();

  return (
    <section className="edit-inventory">
      {/* <article className="edit-inventory__heading-container">
        <Link
          className="edit-inventory__back-link"
          to={`/inventory/${id}`}
        ></Link>
        <h1 className="edit-inventory__heading">Edit Inventory Item</h1>
      </article> */}
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
