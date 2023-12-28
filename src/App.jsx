import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';

const Product = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} />

    <div className="product-info">
      <h1>{product.name}</h1>
      <p>Descritpion: {product.description}</p>
      <div>
        <h2>Type: {product.type}</h2>
        <h2>Lvl: {product.level}</h2>
        <h2>Sex: {product.sex}</h2>
        <h2>Price: {product.price}</h2>
      </div>
    </div>
  </div>
);

const ProductList = ({ products }) => (
  <section id="product-list">
    {products.map((product) => (
      <Product key={product.id} product={product} />
    ))}
  </section>
);

const App = () => {
  const [data, setData] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [sexFilter, setSexFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/dinosaurs");
        const data = await response.json();
        console.log(data);
        setData(data.dinosaurs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSortAsc = () => {
    setSortOrder("asc");
  };

  const handleSortDesc = () => {
    setSortOrder("desc");
  };

  const handleFilterType = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleFilterSex = (e) => {
    setSexFilter(e.target.value);
  };

  const handleFilterName = (e) => {
    setNameFilter(e.target.value);
  };

  const filteredData = data
    .filter((product) => (!typeFilter || product.type === typeFilter))
    .filter((product) => (!sexFilter || product.sex === sexFilter))
    .filter((product) => (!nameFilter || product.name.toLowerCase().includes(nameFilter.toLowerCase())));

  const sortedData = [...filteredData].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="app-container">
      <div id="product-list">
        <div className="filters">
          <select value={typeFilter} onChange={handleFilterType}>
            <option value="">All Types</option>
            <option value="land">Land</option>
            <option value="water">Water</option>
            <option value="flying">Flying</option>
          </select>
          <select value={sexFilter} onChange={handleFilterSex}>
            <option value="">All Sexes</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="text"
            placeholder="Filter by Name"
            value={nameFilter}
            onChange={handleFilterName}
          />
        </div>
        <div className="sort-buttons">
          <button onClick={handleSortAsc}>Sort Ascending</button>
          <button onClick={handleSortDesc}>Sort Descending</button>
        </div>
        <ProductList products={sortedData} />
      </div>
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
