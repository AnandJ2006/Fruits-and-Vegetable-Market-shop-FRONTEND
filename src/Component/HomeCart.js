const HomeCart = ({ cart, setCart }) => {

  if (!cart || !cart.fruits) {
    return <div>Loading...</div>;
  }

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
    alert(`${item.name} added to cart!`);
  };

  const allItems = [...cart.fruits, ...cart.vegetables];

  return (
    <div className="qCon">
      {allItems.map((data) => {
        return (
          <div className="q" key={data.id}>
            <h4>{data.name}</h4>
            <p><strong>Color:</strong> {data.color}</p>
            <p><strong>Price:</strong> ₹{data.price_per_kg || data.price_per_bunch}/kg</p>
            <p><strong>Stock:</strong> {data.in_stock ? 'Available' : 'Out of Stock'}</p>
            <img src={data.images[0]} alt={data.name} />
            <button 
              onClick={() => addToCart(data)} 
              disabled={!data.in_stock}
            >
              {data.in_stock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default HomeCart;