import React from "react";
import Link from "next/link";
import axios from "@/axios.config";
import { useRouter } from "next/router";

function Centres() {
  const route = useRouter();
  const [centres, setCentres] = React.useState([]);
  const [centresFiltered, setCentresFiltered] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  React.useEffect(() => {
    const getAllCentres = async () => {
      const response = await axios.get("/admin/getCentres");
      const centres = response.data.data;
      setCentres(centres);
      setCentresFiltered(centres);
    };
    getAllCentres();
  }, []);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!(user && user.length > 0)) {
      route.push("/login");
    }
  }, []);

  React.useEffect(() => {
    if (searchText.length > 0) {
      const centresFiltered = centres.filter((centre) =>
        centre.name.toLowerCase().startsWith(searchText)
      );
      setCentresFiltered(centresFiltered);
    } else {
      setCentresFiltered(centres);
    }
  }, [searchText]);

  const logout = () => {
    localStorage.removeItem("user");
    route.push("/login");
    if (localStorage.getItem("user") === null) route.push("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/centres">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" href="/centres">
                  Centres
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" href="/profile">
                  Profile
                </Link>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            <button class="btn btn-success" type="submit" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="m-5 row">
        <h4 style={{ marginLeft: 10 }}>Search a centre name:</h4>
        <div className="col-6 d-flex">
          <input
            type="search"
            placeholder="Search"
            className="form-control m-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <table className="table m-5 table-secondary table-hover">
        <thead>
          <tr>
            <th scope="col">S.no.</th>
            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col">Booking</th>
          </tr>
        </thead>
        {centresFiltered && centresFiltered.length > 0 ? (
          <tbody className="table-group-divider">
            {centresFiltered.map((centre, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{centre.name}</td>
                <td>{centre.city}</td>
                <td>
                  <Link href={`/book_dosage?centreId=${centre.centre_id}`}>
                    <button className="btn btn-success btn-sm" type="submit">
                      Book dosage
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}

export default Centres;
