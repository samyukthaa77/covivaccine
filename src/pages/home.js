import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Home() {
  const route = useRouter();
  const logout = () => {
    localStorage.removeItem("user");
    route.push("/login");
    if (localStorage.getItem("user") === null) route.push("/login");
  };
  
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!(user && user.length > 0)) {
      route.push("/login");
    }
  }, []);

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary mb-5">
        <div class="container-fluid">
          <Link class="navbar-brand" href="/centres">
            Navbar
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" href="/home">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" href="/centres">
                  Centres
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" href="/profile">
                  Profile
                </Link>
              </li>
            </ul>
            <button class="btn btn-success" type="submit" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div class="row m-5">
        <div class="col-sm-4 mb-3 mb-sm-0">
          <div class="card" style={{ width: 400 }}>
            <img src="carousel1.jpg" class="card-img-top" alt="" />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-4 mb-3 mb-sm-0">
          <div class="card" style={{ width: 400 }}>
            <img src="carousel2.jpg" class="card-img-top" alt="" />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-4 mb-3 mb-sm-0">
          <div class="card" style={{ width: 400 }}>
            <img src="carousel3.jpg" class="card-img-top" alt="" />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-5">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
