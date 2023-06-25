import React from "react";
import Link from "next/link";
import axios from "@/axios.config";
import { useRouter } from "next/router";

function Dosage() {
  const route = useRouter();
  const [centre, setCentre] = React.useState([]);
  React.useEffect(() => {
    const getCentreDetails = async () => {
      const centreId = route.query.centreId;
      if (centreId && centreId > 0) {
        const response = await axios.post("/admin/getCentreDetails", {
          centreData: parseInt(centreId),
        });
        const centre = response.data.data;
        setCentre(centre);
        console.log(typeof centreId);
      }
    };
    getCentreDetails();
  }, [route.query]);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!(user && user.length > 0)) {
      route.push("/login");
    }
  }, []);

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-secondary mb-5">
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
          </div>
        </div>
      </nav>

      <div
        class="card"
        style={{
          display: "flex",
          boxShadow: "0 0 8px 5px #cec7c759",
          width: 800,
          marginTop: 50,
          marginLeft: 250,
        }}
      >
        <div class="card-body">
          <h5 class="card-title">{centre.name}</h5>
          <h6 class="card-subtitle mt-2 mb-4 text-body-secondary">
            {centre.city}
          </h6>
          <hr />
          <p class="card-text">Total bookings:</p>
          <p class="card-text">
            Working hours: {centre.start} - {centre.end}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dosage;
