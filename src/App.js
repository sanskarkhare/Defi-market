import './App.css';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from './Home';

function App() {
  return (
    // <BrowserRouter>
    // <p style={{fontSize: 25}}>DeFi Market</p>
    //   <div style={{margin: "0 0 0 2rem"}}>
    //     <Link to="/">
    //         Home
    //     </Link>
                
    //     {/* <Link to="/my-assets">
    //         My Digital Assets
    //     </Link>

    //     <Link to="/create-item">
    //         Create Assets
    //     </Link>
    //     <Link to="/sell-nft">
        
    //         Sell-Nft
        
    //     </Link> */}
    //   </div>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     {/* <Route path="/create-item" element={<CreateItem />} />
    //     <Route path="/my-assets" element={<MyAssets />} />
    //     <Route path="/sell-nft" element={<SellNft />} /> */}
    //   </Routes>

    // </BrowserRouter>
    <>
      
      <Home />
    </>
  );
}

export default App;
