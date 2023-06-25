import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Success() {
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
            <button class="btn btn-success" type="submit" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <img
        src="carousel3.jpg"
        class="img-fluid"
        style={{ width: 500, height: 300, marginLeft: 350 }}
        alt="..."
      />

      <h4 style={{ marginLeft: 350, marginTop: 20 }}>
        Success! You have booked your appointment.
      </h4>
    </div>
  );
}

export default Success;
