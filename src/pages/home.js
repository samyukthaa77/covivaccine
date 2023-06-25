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
            CoviVaccine
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
            <Link href="/signup" style={{marginRight: 20}}>
              <button class="btn btn-success" type="submit">
                Sign Up
              </button>
            </Link>
            <Link href="/login" style={{marginRight: 10}}>
              <button class="btn btn-success" type="submit">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div class="row" style={{marginLeft: 10}}>
        <div class="col-sm-4 mb-3 mb-sm-0">
          <div class="card" style={{ width: 400 }}>
            <img src="carousel1.jpg" class="card-img-top" alt="" />
            <div class="card-body">
              <p class="card-text">
                "A short period of discomfort is a whole lot better than being
                in the ICU" - William Schaffner
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-4 mb-3 mb-sm-0">
          <div class="card" style={{ width: 400 }}>
            <img src="carousel2.jpg" class="card-img-top" alt="" />
            <div class="card-body">
              <p class="card-text">
                I'd much rather have the vaccine than have the virus" - Paul A.
                Volberding
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-4 mb-3 mb-sm-0">
          <div class="card" style={{ width: 400 }}>
            <img src="carousel3.jpg" class="card-img-top" alt="" />
            <div class="card-body">
              <p class="card-text">
                "Better have a 100 million people get one dose rather than half
                the people get two" - Buddy Creech
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-5">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Explore our vaccination centres</h5>
              <p class="card-text">
                Book your appointment with no hastle and get your vaccination dose as soon as possible!
              </p>
              <Link href="/centres" class="btn btn-primary">
                View centres
              </Link>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">More information</h5>
              <p class="card-text">
                Learn more about COVID-19 and get updated with latest news to equip yourself with knowledge about protection against the virus!
              </p>
              <Link href="https://covid19response.who.foundation/" class="btn btn-primary">
                WHO organization
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
