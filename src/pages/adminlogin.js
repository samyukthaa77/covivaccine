import React from "react";
import md5 from "md5";
import axios from "@/axios.config";
import Link from "next/link";
import { useRouter } from "next/router";

function Adminlogin() {
  const [password, setPassword] = React.useState("");
  const [adminId, setAdminId] = React.useState("");
  const route = useRouter();

  const adminLogin = async () => {
    const response = await axios.post("/admin/login", {
      adminData: {
        adminId: parseInt(adminId),
        password: md5(password),
      },
    });
    const userResult = response.data.data;
    if (response.data.status == 1) {
      localStorage.setItem("user", JSON.stringify(userResult));
      route.push("/admin");
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
          <h5 class="card-title mb-4">Admin Portal Login</h5>

          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Admin ID"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
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
            <button class="btn btn-primary" type="submit" onClick={adminLogin}>
              Submit
            </button>
          </div>

          <div>
            <p>
              Are you a customer?{" "}
              <Link href="/login" style={{ color: "blue" }}>
                <ins>Login here</ins>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
