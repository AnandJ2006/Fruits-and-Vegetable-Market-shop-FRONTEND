import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./../Style/Cart.css";
import LoginPrompt from "../Common/LoginPrompt";

const Cart = () => {
  const { cart, setCart, isLoggedIn } = useOutletContext();
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  if (!isLoggedIn) {
    return <LoginPrompt pageName="Cart" />;
  }

  // Group cart items by id and count quantities
  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const updateQuantity = (itemId, change) => {
    const currentCount = cart.filter(item => item.id === itemId).length;
    const newCount = currentCount + change;
    
    if (newCount <= 0) {
      setCart(prev => prev.filter(item => item.id !== itemId));
    } else if (change > 0) {
      const item = cart.find(item => item.id === itemId);
      setCart(prev => [...prev, item]);
    } else {
      const index = cart.findIndex(item => item.id === itemId);
      setCart(prev => prev.filter((_, i) => i !== index));
    }
  };

  const getTotalPrice = () => {
    return groupedCart.reduce((total, item) => {
      return total + (item.price_per_kg || item.price_per_bunch || 0) * item.quantity;
    }, 0).toFixed(2);
  };

  const generateInvoice = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const invoice = {
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      customerEmail: userData.email,
      items: groupedCart,
      totalAmount: getTotalPrice()
    };
    
    setInvoiceData(invoice);
    setShowInvoice(true);
    setCart([]);
  };

  const downloadInvoice = () => {
    const invoiceContent = `
INVOICE
=======
Invoice Number: ${invoiceData.invoiceNumber}
Date: ${invoiceData.date}
Customer: ${invoiceData.customerEmail}

ITEMS:
------
${invoiceData.items.map(item => 
  `${item.name} x${item.quantity} - ₹${((item.price_per_kg || item.price_per_bunch) * item.quantity).toFixed(2)}`
).join('\n')}

TOTAL: ₹${invoiceData.totalAmount}

Thank you for your purchase!
    `;
    
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceData.invoiceNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showInvoice && invoiceData) {
    return (
      <div className="invoice-container">
        <div className="invoice">
          <h1>Invoice</h1>
          <div className="invoice-header">
            <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
            <p><strong>Date:</strong> {invoiceData.date}</p>
            <p><strong>Customer:</strong> {invoiceData.customerEmail}</p>
          </div>
          
          <div className="invoice-items">
            <h3>Items Ordered:</h3>
            {invoiceData.items.map((item, index) => (
              <div key={index} className="invoice-item">
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
                <span>₹{((item.price_per_kg || item.price_per_bunch) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="invoice-total">
            <h2>Total: ₹{invoiceData.totalAmount}</h2>
          </div>
          
          <div className="invoice-actions">
            <button onClick={downloadInvoice} className="download-btn">
              Download Invoice
            </button>
            <button onClick={() => setShowInvoice(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {groupedCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {groupedCart.map((item, index) => (
              <div key={index} className="cart-card">
                <h3>{item.name}</h3>
                <p><strong>Color:</strong> {item.color}</p>
                <p><strong>Price:</strong> ₹{item.price_per_kg || item.price_per_bunch}/kg</p>
                <img src={item.images[0]} alt={item.name} />
                
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span className="quantity">Qty: {item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                
                <p><strong>Subtotal:</strong> ₹{((item.price_per_kg || item.price_per_bunch) * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p><strong>Total Items:</strong> {cart.length}</p>
            <p><strong>Total Price:</strong> ₹{getTotalPrice()}</p>
            <button className="order-btn" onClick={generateInvoice}>
              Place Order & Generate Invoice
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;