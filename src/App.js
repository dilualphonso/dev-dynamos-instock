import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InventoryListPage from './Pages/InventoryListPage/InventoryListPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/inventories' element={<InventoryListPage />} />
          <Route path='/warehouses/:id/inventories' element={<InventoryListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
