import { useEffect, useState } from "react";
import axios from "axios";
import "./WarehouseDropdown.scss";
import { BASE_URL } from "../../constant-variables";


function WarehouseDropdown({selected, onSelect, hasError}) {

    const [warehouses, setWarehouse] = useState([]);

    useEffect(()=>{
        const getWarehouses = async () =>{
            try{
                const response = await axios.get(`${BASE_URL}/warehouses`);
                setWarehouse(response.data);

            }catch(error){
                console.error(error);
                // Something went wrong. cannot populate warehouses
                // Todo notify user?
            }
        }
        getWarehouses();

    }, []);

    function changeHandler(event){
        onSelect(event.target.name, event.target.value);
    }


    return (
        <select className={hasError ?"warehouse-dropdown warehouse-dropdown--error" : "warehouse-dropdown"} name="warehouse" id="warehouse" selected={selected} onChange={changeHandler}>
            <option className="warehouse-dropdown__option" key={-1} value="">Please select</option>
            {warehouses.map((warehouse)=>{
                return(
                    <option className="warehouse-dropdown__option" key={warehouse.id} value={warehouse.id} >{warehouse.warehouse_name}</option>
                );
            })}
        </select>
    );
}
export default WarehouseDropdown;