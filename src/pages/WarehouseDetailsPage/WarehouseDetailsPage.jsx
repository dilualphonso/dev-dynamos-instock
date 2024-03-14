import { useParams } from "react-router-dom";
import { InventoriesList } from "../../components/InventoriesList/InventoriesList";

function WarehouseDetailsPage() {
  const { id } = useParams();
  return <div>
    <InventoriesList id={id}/>
  </div>;
}
export default WarehouseDetailsPage;
