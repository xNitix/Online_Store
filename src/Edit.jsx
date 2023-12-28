import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';

const Product = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    product.title = title;
    product.description = description;
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        <button onClick={handleSave}>Save</button>
      </article>
    );
  }

  return (
    <article>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <img src={product.thumbnail} alt={product.title} />
      <button onClick={handleEdit}>Edit</button>
    </article>
  );
};

const ProductList = ({ products }) => (
  <section id="product-list">
    {products.map(product => <Product key={product.id} product={product} />)}
  </section>
);

const App = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setData(data.products);
    };
    fetchData();
  }, []);

  const filteredData = category ? data.filter(product => product.category === category) : data;
  const sortedData = [...filteredData].sort((a, b) => sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  return (
    <div>
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
      <ProductList products={sortedData} />
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