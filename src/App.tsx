import { useEffect, useState } from "react";
import "./App.css";
import ProductCard, { Product } from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [isFirst, setIsFirst] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/products.json");
      const data = await res.json();
      setProducts(data.products);
    }

    fetchProducts();
  }, []);

  function handleSubmitClick(e: React.FormEvent) {
    e.preventDefault();
    setIsFirst(false);
    if (products) {
      if (searchKey.length === 0) {
        setFilterProducts([]);
        return;
      }
      setFilterProducts(
        [...products].filter((prod) =>
          prod.name.toLowerCase().includes(searchKey.toLowerCase())
        )
      );
    }
  }

  console.log(filterProducts);

  return (
    <div>
      <h1>Product Information</h1>
      <div className="product-card">
        <div className="search-section">
          <label htmlFor="search">Enter Product Name:</label>
          <input
            type="text"
            name="search"
            id="search"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          />
          <button onClick={handleSubmitClick}>Search</button>
        </div>
        <div className="results-section">
          {filterProducts.length > 0 || isFirst ? (
            filterProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p className="error">No product found with the given name.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
