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
    const userParsed = JSON.parse(user);
    if (!(user && user.length > 0) || userParsed.type != "admin") {
      route.push("/adminlogin");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    route.push("/adminlogin");
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-secondary mb-5">
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

      {centre.centreDetails ? (
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
            <h5 class="card-title">{centre.centreDetails.name}</h5>
            <h6 class="card-subtitle mt-2 mb-4 text-body-secondary">
              {centre.centreDetails.city}
            </h6>
            <hr />
            <p class="card-text">
              Working hours: {centre.centreDetails.start} -{" "}
              {centre.centreDetails.end}
            </p>
          </div>
        </div>
      ) : null}

      {centre.dosageDetails && centre.dosageDetails.length > 0 ? (
        <div style={{ marginTop: 40 }}>
          <table
            className="table table-secondary table-hover"
            style={{ marginTop: 35, marginLeft: 70 }}
          >
            <thead>
              <tr>
                <th scope="col">S.no.</th>
                <th scope="col">Date</th>
                <th scope="col">Number of bookings</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {centre.dosageDetails.map((centre, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {centre.date &&
                      new Date(centre.date).toLocaleDateString("en-IN")}
                  </td>
                  <td>{centre._count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default Dosage;
