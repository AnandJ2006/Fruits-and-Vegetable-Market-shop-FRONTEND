import { useOutletContext } from "react-router-dom";
import "./../Style/Cart.css";
import LoginPrompt from "../Common/LoginPrompt";

const Cart = () => {
  const { cart, setCart, isLoggedIn } = useOutletContext();

  if (!isLoggedIn) {
    return <LoginPrompt pageName="Cart" />;
  }

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.price_per_kg || item.price_per_bunch || 0);
    }, 0).toFixed(2);
  };

  const orderNow = () => {
    alert(`Order placed! Total: ₹${getTotalPrice()}`);
    setCart([]);
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-card">
                <h3>{item.name}</h3>
                <p><strong>Color:</strong> {item.color}</p>
                <p><strong>Price:</strong> ₹{item.price_per_kg || item.price_per_bunch}/kg</p>
                <img src={item.images[0]} alt={item.name} />
                <button onClick={() => removeFromCart(index)}>
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p><strong>Total Items:</strong> {cart.length}</p>
            <p><strong>Total Price:</strong> ₹{getTotalPrice()}</p>
            <button className="order-btn" onClick={orderNow}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;