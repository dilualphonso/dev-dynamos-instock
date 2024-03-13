import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inventories } from './Pages/Inventories/Inventories';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/inventories' element={<Inventories />} />
          <Route path='/warehouses/:id/inventories' element={<Inventories />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
