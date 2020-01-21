import React from "react";

const Menu = props => {
  const newProps = { ...props };
  delete newProps.products;
  delete newProps.setProducts;

  const addProduct = product => {
    const newProducts = [...props.products];
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
    props.setProducts(newProducts);
  };

  // console.log(products);

  const items = categorie => {
    const result = newProps[categorie].map(element => {
      return (
        <div
          className="menu-item"
          key={element.id}
          onClick={() => {
            addProduct(element);
          }}
        >
          <div className="item-infos">
            <div className="item-name">{element.title}</div>
            <div className="item-desc">{element.description}</div>
            <div className="item-bottom-infos">
              <div className="item-price">{element.price} €</div>
              {element.popular && (
                <div className="item-popular">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <div>Populaire</div>
                </div>
              )}
            </div>
          </div>
          {element.picture && (
            <img
              className="item-image"
              src={element.picture}
              alt={"picture " + element.id}
              onError={e => {
                e.target.onerror = null;
                e.target.src = "";
                e.target.alt = "";
              }}
            ></img>
          )}
        </div>
      );
    });
    return result;
  };

  const listCat = Object.keys(newProps).map((categorie, index) => {
    return (
      <div className="menu-items" key={index}>
        {props[categorie].length ? (
          <div className="categorie">{categorie}</div>
        ) : null}
        <div className="wrap">{items(categorie)}</div>
      </div>
    );
  });

  return <div>{listCat}</div>;
};

export default Menu;
