import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import LoginPrompt from "../Common/LoginPrompt";
import "../Style/Search.css";

const Search = ()=>{
    const { isLoggedIn, data, setCart } = useOutletContext();
    const [searchTerm, setSearchTerm] = useState("");

    if (!isLoggedIn) {
        return <LoginPrompt pageName="Search" />;
    }

    const allItems = [...(data.fruits || []), ...(data.vegetables || [])];
    const filteredItems = allItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (item) => {
        setCart(prev => [...prev, item]);
        alert(`${item.name} added to cart!`);
    };

    return(
        <div className="search-container">
            <h1>Search Products</h1>
            <input 
                type="text" 
                placeholder="Search fruits and vegetables..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            {searchTerm && (
                <p>Found {filteredItems.length} results for "{searchTerm}"</p>
            )}
            <div className="search-results">
                {filteredItems.map(item => (
                    <div key={item.id} className="search-card">
                        <h3>{item.name}</h3>
                        <p><strong>Color:</strong> {item.color}</p>
                        <p><strong>Price:</strong> ₹{item.price_per_kg || item.price_per_bunch}/kg</p>
                        <p><strong>Stock:</strong> {item.in_stock ? 'Available' : 'Out of Stock'}</p>
                        <img src={item.images[0]} alt={item.name} />
                        <button 
                            onClick={() => addToCart(item)} 
                            disabled={!item.in_stock}
                        >
                            {item.in_stock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Search;