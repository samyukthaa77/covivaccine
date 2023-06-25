import React from "react";
import Link from "next/link";
import md5 from "md5";
import axios from "@/axios.config";
import { useRouter } from "next/router";

function Login() {
  const [password, setPassword] = React.useState("");
  const [emailid, setEmailId] = React.useState("");
  const route = useRouter();

  const login = async () => {
    const response = await axios.post("/user/login", {
      userData: {
        emailid: emailid,
        password: md5(password),
      },
    });
    const userResult = response.data.data;
    if (response.data.status == 1) {
      localStorage.setItem("user", JSON.stringify(userResult));
      route.push("/centres");
    } else {
      alert("Wrong credentials!");
    }
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
          marginTop: 150,
          marginLeft: 400,
        }}
      >
        <div class="card-body">
          <h5 class="card-title mb-4">Login</h5>

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
              placeholder="Password"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <button class="btn btn-primary" type="submit" onClick={login}>
              Submit
            </button>
          </div>

          <div>
            <p>
              Don't have an account?{" "}
              <Link style={{ color: "blue" }} href="/signup">
                <ins>Sign Up here</ins>
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

export default Login;
