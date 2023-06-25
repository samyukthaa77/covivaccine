import React from "react";
import Link from "next/link";
import axios from "../axios.config";
import md5 from "md5";
import { useRouter } from "next/router";

function Signup() {
  const route = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [age, setAge] = React.useState("");
  const [emailid, setEmailId] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");

  const signup = async () => {
    const response = await axios.post("/user/signup", {
      userData: {
        type: "user",
        first_name: firstName,
        last_name: lastName,
        age: parseInt(age),
        emailid: emailid,
        phone: phone,
        password: md5(password),
        city: city,
        state: state,
      },
    });
    alert("Signed up successfully!");
    route.push("/login");
  };

  return (
    <div>
      <div
        class="card"
        style={{
          display: "flex",
          boxShadow: "0 0 3px 2px #cec7c759",
          justifyContent: "center",
          alignItems: "center",
          width: 500,
          marginTop: 50,
          marginLeft: 400,
        }}
      >
        <div class="card-body">
          <h5 class="card-title mb-4">Sign Up</h5>
          <div class="input-group mb-3">
            <span class="input-group-text">First and last name</span>
            <input
              type="text"
              aria-label="First name"
              class="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              aria-label="Last name"
              class="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control"
              placeholder="Age"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <span class="input-group-text" id="basic-addon2">
              years
            </span>
          </div>

          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Email-id"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={emailid}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div class="input-group mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Create password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">+91</span>
            <input
              type="text"
              class="form-control"
              aria-label="Phone"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">City and state</span>
            <input
              type="text"
              aria-label="First name"
              class="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              aria-label="Last name"
              class="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <button class="btn btn-primary" onClick={signup} type="submit">
              Submit
            </button>
          </div>

          <div>
            <p>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "blue" }}>
                <ins>Login here</ins>
              </Link>
            </p>
          </div>
          <div>
            <p>
              Are you an admin?{" "}
              <Link href="/adminlogin" style={{ color: "blue" }}>
                <ins>Login here</ins>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
