import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';

const Product = ({ product, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProduct({ ...product });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/dinosaurs/${editedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
        // Aktualizacja danych dinozaura zakończona sukcesem
        setIsEditing(false);
        onEdit(editedProduct);
        alert('Dinosaur data updated successfully!');
      } else {
        // Błąd podczas aktualizacji danych dinozaura
        alert('Error updating dinosaur data');
      }
    } catch (error) {
      console.error('Error updating dinosaur data:', error);
      alert('An unexpected error occurred');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  return (
    <div className="product-card">
      <img src={editedProduct.image} alt={editedProduct.name} />
      <div className="product-info">
        {isEditing ? (
          <>
            <div className="edit-field">
              <label>Name:</label>
              <input type="text" name="name" value={editedProduct.name} onChange={handleInputChange} />
            </div>
            <div className="edit-field">
              <label>Description:</label>
              <textarea name="description" value={editedProduct.description} onChange={handleInputChange} />
            </div>
            <div className="edit-field">
              <label>Type:</label>
              <input type="text" name="type" value={editedProduct.type} onChange={handleInputChange} />
            </div>
            <div className="edit-field">
              <label>Level:</label>
              <input type="text" name="level" value={editedProduct.level} onChange={handleInputChange} />
            </div>
            <div className="edit-field">
              <label>Sex:</label>
              <input type="text" name="sex" value={editedProduct.sex} onChange={handleInputChange} />
            </div>
            <div className="edit-field">
              <label>Price:</label>
              <input type="text" name="price" value={editedProduct.price} onChange={handleInputChange} />
            </div>
            <div className="edit-field">
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={editedProduct.image}
                onChange={handleInputChange}
              />
            </div>
          </>
        ) : (
          <>
            <h1>{editedProduct.name}</h1>
            <p>Description: {editedProduct.description}</p>
            <div>
              <h2>Type: {editedProduct.type}</h2>
              <h2>Level: {editedProduct.level}</h2>
              <h2>Sex: {editedProduct.sex}</h2>
              <h2>Price: {editedProduct.price}</h2>
            </div>
          </>
        )}
      </div>
      {isEditing ? (
        <div>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const ProductList = ({ products, onProductEdit }) => (
  <section id="product-list">
    {products.map((product) => (
      <Product key={product.id} product={product} onEdit={onProductEdit} />
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleProductEdit = (editedProduct) => {
    // Obsługa zapisu zaktualizowanego produktu do serwera
    // Poniżej znajdziesz przykładową funkcję, którą możesz dostosować do swoich potrzeb
    const updatedData = data.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );

    setData(updatedData);
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
            <button onClick={handleSortAsc}>Sort Ascending</button>
            <button onClick={handleSortDesc}>Sort Descending</button>
          </div>
        </div>

        <ProductList products={sortedData} onProductEdit={handleProductEdit} />
      </div>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onProductEdit: PropTypes.func.isRequired,
};

export default App;
