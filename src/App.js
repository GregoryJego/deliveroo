import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Restaurant from "./components/Restaurant";
import Menu from "./components/Menu";
import Basket from "./components/Basket";

import "./reset.css";
import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState();
  const [menu, setMenu] = useState();
  const [products, setProducts] = useState([]);

  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total = total + products[i].quantity;
    }
    return total;
  };

  let counter = calculateTotal();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://deliveroo-api.now.sh/menu");
      setMenu(response.data.menu);
      setRestaurant(response.data.restaurant);
      setIsLoading(false);
    } catch (e) {
      alert("An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      {isLoading === true ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <Restaurant {...restaurant} />
          <div className="body">
            <div className="menu">
              <Menu {...menu} products={products} setProducts={setProducts} />
            </div>
            <Basket products={products} setProducts={setProducts} />
            <div
              className="top-basket"
              onClick={() => {
                document.body.scrollTop = 600;
                document.documentElement.scrollTop = 600;
              }}
            >
              <div className="basket-picto">
                <div className="basket-counter">
                  <div className="counter">{counter}</div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="10" cy="20.5" r="1" />
                  <circle cx="18" cy="20.5" r="1" />
                  <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
