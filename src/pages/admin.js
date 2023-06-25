import React from "react";
import Link from "next/link";
import axios from "../axios.config";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

function Admin() {
  const [showAddCentreModal, setShowAddCentreModal] = React.useState(false);
  const [name, setName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [slots, setSlots] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [link, setLink] = React.useState("");

  const [centres, setCentres] = React.useState([]);
  React.useEffect(() => {
    const getAllCentres = async () => {
      const response = await axios.get("/admin/getCentres");
      const centres = response.data.data;
      setCentres(centres);
    };
    getAllCentres();
  }, []);

  React.useEffect(() => {
    const user = localStorage.getItem("admin");
    if (!(user && user.length > 0)) {
      route.push("/adminlogin");
    }
  }, []);

  const addCentre = async () => {
    const response = await axios.post("/admin/addCentre", {
      centreData: {
        name: name,
        city: city,
        state: state,
        start: startTime,
        end: endTime,
        slots: parseInt(slots),
        address: address,
        link: link,
      },
    });

    alert("Successfully submitted!");
  };

  const deleteCentre = async (centreId) => {
    const response = await axios.post("admin/deleteCentre", {
      centreData: centreId,
    });
    alert("Successfully deleted!");
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
            <form class="d-flex" role="search">
              <button class="btn btn-success" type="submit">
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="row">
        <h4 className="h4 display-6 col-7" style={{ marginLeft: 80 }}>
          All centres
        </h4>
        <button
          className="btn btn-success m-2 col-2"
          type="submit"
          onClick={() => {
            setShowAddCentreModal(true);
          }}
        >
          Add a centre
        </button>
      </div>

      <Modal
        isOpen={showAddCentreModal}
        onClose={() => {
          setShowAddCentreModal(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Centre</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div class="input-group mb-3">
              <input
                type="text"
                aria-label="Name"
                class="form-control"
                placeholder="Name of centre"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Maximum slots"
                aria-label="Slots"
                aria-describedby="basic-addon2"
                value={slots}
                onChange={(e) => setSlots(e.target.value)}
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="text"
                aria-label="Start time"
                class="form-control"
                placeholder="Start time (hh:mm)"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <input
                type="text"
                aria-label="End time"
                class="form-control"
                placeholder="End time (hh:mm)"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Address"
                aria-label="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Maps link"
                aria-label="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addCentre}>
              Submit
            </Button>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => {
                setShowAddCentreModal(false);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <table
        className="table table-secondary table-hover"
        style={{ marginTop: 35, marginLeft: 70 }}
      >
        <thead>
          <tr>
            <th scope="col">S.no.</th>
            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col">Details</th>
            <th scope="col">Remove centre</th>
          </tr>
        </thead>
        {centres && centres.length > 0 ? (
          <tbody className="table-group-divider">
            {centres.map((centre, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{centre.name}</td>
                <td>{centre.city}</td>
                <td>
                  <Link href={`/dosage_details?centreId=${centre.centre_id}`}>
                    <button className="btn btn-success btn-sm" type="submit">
                      View details
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    type="submit"
                    onClick={() => {
                      deleteCentre(centre.centre_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}

export default Admin;
