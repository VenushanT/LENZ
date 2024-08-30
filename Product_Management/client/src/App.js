import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        // Fetch products from the server
        axios
            .get("http://localhost:5000/api/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleAddProduct = () => {
        // Submit a new product
        axios
            .post("http://localhost:5000/api/products", newProduct)
            .then((response) => {
                setProducts([...products, response.data]);
                setNewProduct({ name: "", description: "", image: "" });
            })
            .catch((error) => console.error(error));
    };

    const handleProductDelete = (productId) => {
        axios
            .delete(`http://localhost:5000/api/products/${productId}`)
            .then(() => {
                setProducts(products.filter((product) => product._id !== productId));
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="app-container">
            <h1>LENZ</h1>
            <h2>Product Management</h2>

            <div className="add-container">
                <h3>Add a New Product:</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddProduct();
                    }}
                >
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Image URL:
                        <input
                            type="text"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            required
                        />
                    </label>

                    <button className="add-btn" type="submit">
                        Add Product
                    </button>
                </form>
            </div>

            <div className="cards">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <h2>{product.name}</h2>
                        <button className="delete-btn" onClick={() => handleProductDelete(product._id)}>
                            Delete Product
                        </button>
                        <img src={product.image} alt={product.name} />
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
