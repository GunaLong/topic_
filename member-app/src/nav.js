import React, { useState, useEffect } from "react";
function Nav() {
  return (
    <>
      <nav class="navbar navbar-dark bg-dark ">
        <div class="container-fluid">
          <a class="navbar-brand">Navbar</a>
          <form class="d-flex">
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}
export default Nav;
