import React from "react";

const Restaurant = props => {
  return (
    <div className="restaurant">
      <div className="restaurant-infos">
        <div className="restaurant-name">{props.name}</div>
        <div className="restaurant-desc">{props.description}</div>
      </div>
      <img
        className="restaurant-img"
        src={props.picture}
        alt={"picture " + props.name}
      />
    </div>
  );
};

export default Restaurant;
