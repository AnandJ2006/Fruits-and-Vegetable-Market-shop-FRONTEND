import { useOutletContext } from "react-router-dom";
import "./../Style/Home.css";
import HomeCart from "./../Component/HomeCart";
const Home = ()=>{
    const{data, setCart} = useOutletContext();
    console.log(data);
    return(
        <div className="home">
            <HomeCart cart={data} setCart={setCart}/>
        </div>  
    );
};
export default Home;