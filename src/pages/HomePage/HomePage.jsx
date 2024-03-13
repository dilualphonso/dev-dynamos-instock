import { useEffect, useState } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList";

function HomePage(){

    const [warehouses, setWarehouse] = useState([]);

useEffect (()=>{
        const fetchWarehouses = async ()=>{
            try {
            const response = await axios.get(
                `http://localhost:8080/api/warehouses`
              );

              setWarehouse(response.data)
            }
         catch (error) {
            console.error("Error fetching videos:", error);
          }
        };
        fetchWarehouses();
    },[]);
    return (
        <section>
<WarehouseList warehouses={warehouses}/>
        </section>
    )
}
export default HomePage;