import { useEffect, useState } from "react";
import axios from "axios";
import "./WarehouseDropdown.scss";
import { BASE_URL } from "../../constant-variables";

function WarehouseDropdown({ selected, onSelect, hasError }) {
  const [warehouses, setWarehouse] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);

  useEffect(() => {
    const getWarehouses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/warehouses`);
        setWarehouse(response.data);
        if (response.data.length > 0) {
          const findItem = response.data.find((item) => {
            return item.warehouse_name === selected;
          });

          if (!!findItem) {
            setSelectedId(findItem.id);
          }
        }
      } catch (error) {
        console.error(error);
        // Something went wrong. cannot populate warehouses
        // Todo notify user?
      }
    };
    getWarehouses();
  }, [selected, selectedId]);

  function changeHandler(event) {
    console.log(event.target.name, event.target.value);
    onSelect(event.target.name, event.target.value);
  }

  return (
    <select
      className={
        hasError
          ? "warehouse-dropdown warehouse-dropdown--error"
          : "warehouse-dropdown"
      }
      name="warehouse"
      id="warehouse"
      selected={selectedId}
      onChange={changeHandler}
    >
      <option className="warehouse-dropdown__option" key={-1} value={-1}>
        {/* {selected ? selected : "Please select"} */}
        Please select
      </option>
      {warehouses.map((warehouse) => {
        return (
          <option
            className="warehouse-dropdown__option"
            key={warehouse.id}
            value={warehouse.id}
          >
            {warehouse.warehouse_name}
          </option>
        );
      })}
    </select>
  );
}
export default WarehouseDropdown;
