import './WarehousesListPage.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import { Link } from 'react-router-dom';
import SearchMessage from '../../components/SearchMessege/SearchMessege';


function WarehousesListPage() {

    const [warehouses, setWarehouse] = useState([]);
    const [search, setSearch] = useState('');

    const [error, setError] = useState(null);
    const [noResultMessage, setnoResultMessage] = useState("")

    console.log(search);
    //display data
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/warehouses`
                );

                setWarehouse(response.data)

            }
            catch (error) {
                console.error("Error fetching warehouse:", error);
            }
        };
        fetchWarehouses();
    }, []);

         const searchWarehouses = async (searchWord) => {
            try {
                if (search !== "") {
                    const searchResponse = await axios.get(
                        `http://localhost:8080/api/warehouses/search/${searchWord}`

                    );
                    console.log(searchResponse);
                    setWarehouse(searchResponse.data);

                    if (searchResponse.data.message=== "No result") {
                        setnoResultMessage(`No search result`);
                      } else {
                        setnoResultMessage(""); // Clear the message if there are results
                      }


                }


                else {
                    // Clear warehouses if search term is empty
                    setWarehouse(warehouses);
                    setnoResultMessage("");
                }


            }
            catch (err) {
                if (err.response && err.response.status === 404) {
                    setError('Data not found');
                }
            }
        };



    const handleChange = e => {



        const inputValue = e.target.value;
        setSearch(inputValue); // Update 'searchValue' with input value

        searchWarehouses(e.target.value);



    }
    return (
        <section className="warehouses">
            <div className="warehouses__top-container">
                <h1 className="warehouses__title">Warehouses</h1>
                <div className="warehouses__left-wrapper">
                    <div>
                        <input onChange={handleChange} name='searching' value={search} className='warehouses__search' type="text" placeholder="Search..." />
                    </div>


                    <div>
                        <Link to="/warehouses/add"> <button className="warehouses__button">+ Add New Warehouse</button></Link>
                    </div>
                </div>

            </div>
            <section>




                <WarehouseList warehouses={warehouses} setWarehouses={setWarehouse} setSearch={setSearch} search={search} noResultMessage={noResultMessage} />

                { noResultMessage && <SearchMessage setnoResultMessage={setnoResultMessage} noResultMessage={noResultMessage}/>}
            </section>


        </section>
    );
}

export default WarehousesListPage;
