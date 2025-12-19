import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Common/Header';
import { useEffect , useState } from 'react';

function App() {
   let [data,setData] = useState({fruits: [], vegetables: []});
   let [cart, setCart] = useState([]);
   let [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
      const fetchResponse = async()=>{
      try{
        const response = await fetch("/detail.json");
        const da =await response.json();
        setData(da);
      }catch(err){}
    };
    fetchResponse();
  },[]);
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
  fetch("https://fruits-and-vegetable-market-shop-backend.onrender.com/api/test")
    .then(res => res.json())
    .then(data => console.log('Backend connected:', data.message))
    .catch(err => console.log('Backend connection failed:', err));
}, []);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet
        context = {{
          data,
          cart,
          setCart,
          isLoggedIn,
          setIsLoggedIn
        }}
      ></Outlet>
    </div>
  );
}

export default App;
