import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';

const Product = ({ product, addToCart, isLoggedIn, updateLoginStatus  }) => {
  const handleAddToCart = () => {
    if (isLoggedIn) {
      alert('Produkt dodany do koszyka!');
      addToCart(product);
    } else {
      alert('Koszyk dostępny jest tylko dla zalogowanych użytkowników');
      updateLoginStatus();
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>Description: {product.description}</p>
        <div>
          <h2>Type: {product.type}</h2>
          <h2>Level: {product.level}</h2>
          <h2>Sex: {product.sex}</h2>
          <h2>Price: {product.price}</h2>
        </div>
      </div>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

const ProductList = ({ products, addToCart, isLoggedIn, updateLoginStatus }) => (
  <section id="product-list">
    {products.map(product => (
      <Product key={product.id} product={product} addToCart={addToCart} isLoggedIn={isLoggedIn} updateLoginStatus={updateLoginStatus} />
    ))}
  </section>
);

const App = () => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sexFilter, setSexFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(token); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));

        if (storedCartItems) {
          setCartItems(storedCartItems);
        }

        const response = await fetch("http://127.0.0.1:5000/dinosaurs");
        const data = await response.json();
        setData(data.dinosaurs);
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Update isLoggedIn state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

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

  const updateLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Aktualizacja stanu zalogowania
  };

  return (
    <div className="app-container">
      <div id="product-list">
        <div id="menu-buttons">
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
            <button onClick={handleSortAsc}>Sort Ascending</button >
            <button onClick={handleSortDesc}>Sort Descending</button>
          </div>
        </div>

        <ProductList products={sortedData} addToCart={addToCart} isLoggedIn={isLoggedIn} updateLoginStatus={updateLoginStatus} />
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
