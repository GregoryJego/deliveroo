import React from "react";

const Basket = props => {
  let products = props.products;
  let setProducts = props.setProducts;
  let total;
  let soustotal;
  let shippingCost = 2.50;

  const addProduct = product => {
    const newProducts = [...products];
    let isFound = false;

    for (let i = 0; i < newProducts.length; i++) {
      if (newProducts[i].id === product.id) {
        newProducts[i].quantity = newProducts[i].quantity + 1;
        isFound = true;
        // Pour ne pas chercher dans tout le tableau une fois qu'on a trouvé
        break;
      }
    }

    if (isFound === false) {
      product.quantity = 1;
      newProducts.push(product);
    }
    setProducts(newProducts);
  };

  // console.log(products);

  const removeProduct = product => {
    const newProducts = [...products];

    for (let i = 0; i < newProducts.length; i++) {
      if (newProducts[i].id === product.id) {
        newProducts[i].quantity = newProducts[i].quantity - 1;
        if (newProducts[i].quantity === 0) {
          // Pour retirer un élément du tableau
          newProducts.splice(i, 1);
        }
        // Pour ne pas chercher dans tout le tableau une fois qu'on a trouvé
        break;
      }
    }

    setProducts(newProducts);
  };

  const calculateSousTotal = () => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total = total + products[i].price * products[i].quantity;
    }
    return total;
  };

  soustotal = calculateSousTotal();
  total = soustotal + shippingCost;
  soustotal = soustotal.toFixed(2);
  // soustotal = soustotal.toFixed(2).replace(".", ",");
  total = total.toFixed(2);
  // total = total.toFixed(2).replace(".", ",");
  shippingCost = shippingCost.toFixed(2);

  const itemsBasket = products.map(element => {
    return (
      <div className="basketLine" key={element.id}>
        <div className="basket-quantity">
          <div
            className="basket-button"
            onClick={() => {
              removeProduct(element);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <span>{element.quantity}</span>
          <div
            className="basket-button"
            onClick={() => {
              addProduct(element);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
        </div>
        <div className="basket-title">{element.title}</div>
        <div className="basket-price">{element.price}€</div>
      </div>
    );
  });

  return (
    <div className="basket">
      {!products.length ? (
        <div>
          <div className="button-validate-inactive">Valider mon panier</div>
          <div className="basket-text">
            <p>Votre panier est vide</p>
          </div>
        </div>
      ) : (
          <div>
            <div className="button-validate-active">Valider mon panier</div>
            {itemsBasket}
            <hr />
            <div className="sous-total">
              <span>Sous-total</span>
              <span>{soustotal}€</span>
            </div>
            <div className="sous-total">
              <span>Frais de livraison</span>
              <span>{shippingCost}€</span>
            </div>
            <hr />
            <div className="total">
              <span>Total</span>
              <span>{total}€</span>
            </div>
          </div>
        )}
    </div>
  );
};

export default Basket;
