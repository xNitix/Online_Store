import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';

const Product = ({ product }) => (
  <div className="product-card">
    <h1>{product.name}</h1>
    <p>Descritpion: {product.description}</p>
    <h2>Type: {product.type}</h2>
    <h2>Lvl: {product.level}</h2>
    <h2>Sex: {product.sex}</h2>
    <h2>Price: {product.price}</h2>
    <img src={product.image} alt={product.name} />
  </div>
);

const ProductList = ({ products }) => (
  <section id="product-list">
    {products.map(product => <Product key={product.id} product={product} />)}
  </section>
);

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

const App = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/dinosaurs");
        const data = await response.json();
        console.log(data); // Sprawdzenie, co zawiera data po pobraniu
        setData(data.dinosaurs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  //const filteredData = category ? data.filter(product => product.category === category) : data;
  //const sortedData = [...filteredData].sort((a, b) => sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  
  return (
    /*
    <div className="app-container">
      <div className="controls">
        <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="groceries">Groceries</option>
          <option value="home-decoration">Home Decoration</option>
        </select>
        <button id="sortAscButton" onClick={() => setSortOrder("asc")}>Sort Ascending</button>
        <button id="sortDescButton" onClick={() => setSortOrder("desc")}>Sort Descending</button>
      </div>
      <div id="product-list">
        <ProductList products={sortedData} />
      </div>
      <button className="logout-button" onClick={handleLogout}>Wyloguj</button>
    </div>
    */
    <div className="app-container">
      <div id="product-list">
        <ProductList products={data} /> {/* Przekazuje dane do komponentu ProductList */}
      </div>
      <button className="logout-button" onClick={handleLogout}>Wyloguj</button>
    </div>
  );


};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;