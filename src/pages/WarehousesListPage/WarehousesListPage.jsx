import './WarehousesListPage.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import { Link } from 'react-router-dom';
import { BASE_URL } from "../../constant-variables.js";


function WarehousesListPage() {

  const [warehouses, setWarehouse] = useState([]);
  const [completedUrl, setCompletedUrl] = useState(`${BASE_URL}/warehouses`);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(completedUrl);
        setWarehouse(response.data)
      }
      catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchWarehouses();
  }, [completedUrl]);

  const handleAscClick = (sortingType) => {
    setCompletedUrl(`${BASE_URL}/warehouses?sort_by=${sortingType}&order_by=asc`);
  };

  const handleDescClick = (sortingType) => {
    setCompletedUrl(`${BASE_URL}/warehouses?sort_by=${sortingType}&order_by=desc`);
  };


  return (
    <section className="warehouses">
      <div className="warehouses__top-container">
        <h1 className="warehouses__title">Warehouses</h1>
        <div className="warehouses__left-wrapper">
          <div className="warehouses__search-wrapper">
            <input className='warehouses__search' type="text" placeholder="Search..." />
          </div>
          <div className="warehouses__button-wrapper">
            <Link to="/warehouses/add"> <button className="warehouses__button">+ Add New Warehouse</button></Link>
          </div>
        </div>
      </div>
      <section>
        <WarehouseList warehouses={warehouses} setWarehouses={setWarehouse} handleAscClick={handleAscClick} handleDescClick={handleDescClick} />
      </section>


    </section>
  );
}

export default WarehousesListPage;
