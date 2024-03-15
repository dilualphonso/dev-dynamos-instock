
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import WarehousesListPage from "./pages/WarehousesListPage/WarehousesListPage";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import WarehousesAddPage from "./pages/WarehousesAddPage/WarehousesAddPage";
import WarehousesEditPage from "./pages/WarehousesEditPage/WarehousesEditPage";
import InventoryListPage from "./pages/InventoryListPage/InventoryListPage";
import InventoryItemPage from "./pages/InventoryItemPage/InventoryItemPage";
import InventoryAddPage from "./pages/InventoryItemPage/InventoryItemPage";
import InventoryEditPage from "./pages/InventoryEditPage/InventoryEditPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import WarehouseDeletePage from "./pages/WarehouseDeletePage/WarehouseDeletePage"
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/warehouses" element={<WarehousesListPage />} />
        <Route path="/warehouses/:id" element={<WarehouseDetailsPage />} />
        <Route path="/warehouses/add" element={<WarehousesAddPage />} />
        <Route path="/warehouses/:id/edit" element={<WarehousesEditPage />} />
        <Route path='/inventory' element={<InventoryListPage />} />
        <Route path="/inventory/:id" element={<InventoryItemPage />} />
        <Route path="/inventory/add" element={<InventoryAddPage />} />
        <Route path="/inventory/:id/edit" element={<InventoryEditPage />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="/warehouses/delete" element={<WarehouseDeletePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
