import React from "react";
import Link from "next/link";
import axios from "@/axios.config";
import { useRouter } from "next/router";

function Profile() {
  const route = useRouter();
  const [profile, setProfile] = React.useState([]);
  React.useEffect(() => {
    const getUserProfile = async () => {
      const response = await axios.post("/user/getProfile");
      const profile = response.data.data;
      setProfile(profile);
    };
    getUserProfile();
  }, []);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!(user && user.length > 0)) {
      route.push("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    route.push("/login");
    if (localStorage.getItem("user") === null) route.push("/login");
  };

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
            <form class="d-flex" role="search">
              <button class="btn btn-success" type="submit" onClick={logout}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div
        class="card"
        style={{
          display: "flex",
          boxShadow: "0 0 8px 5px #cec7c759",
          justifyContent: "center",
          alignItems: "center",
          width: 500,
          marginTop: 50,
          marginLeft: 400,
        }}
      >
        <div class="card-body">
          <h5 class="card-title mb-5">
            {profile.first_name} {profile.last_name}
          </h5>
          <p class="card-text">Age: {profile.age}</p>
          <p class="card-text">Email id: {profile.emailid}</p>
          <p class="card-text">City: {profile.city}</p>
          <p class="card-text">State: {profile.state}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
