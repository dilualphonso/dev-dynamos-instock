import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Warehouses />} />
        <Route path="/warehouses" element={<WarehousePage />} />
        {/* <Route path ="/warehouses/:id"element={< />} /> */}
        <Route path="/warehouses/add" element={<WarehouseAddPage />} />
        <Route path="/warehouses/:id/edit" element={<WarehouseEditPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        {/* // <Route path ="/inventory/:id"element={< />} /> */}
        <Route path="/inventory/add" element={<InventoryAddPage />} />
        <Route path="/inventory/:id/edit" element={<InventoryEditPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
{
  /* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> */
}
