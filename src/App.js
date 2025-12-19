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
        const response = await fetch("https://fruits-and-vegetable-market-shop-backend.onrender.com");
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
  fetch("/api/test")
    .then(res => res.json())
    // .then(data => setMessage(data.message));
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
