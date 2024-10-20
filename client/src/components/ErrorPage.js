import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
          </div>
          <h2>Oops! Page not found</h2> 
          <NavLink to ="/" >Back to Homepage</NavLink>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
