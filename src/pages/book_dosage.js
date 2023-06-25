import React from "react";
import Link from "next/link";
import axios from "@/axios.config";
import { useRouter } from "next/router";
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

function BookDosage() {
  const [showConfirmBookingModal, setConfirmBookingModal] =
    React.useState(false);
  const [date, setDate] = React.useState("");
  const route = useRouter();
  const [centre, setCentre] = React.useState([]);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!(user && user.length > 0)) {
      route.push("/login");
    }
  }, []);

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

  const bookSlot = async () => {
    const response = await axios.post("/user/bookSlot", {
      bookingData: {
        centreId: parseInt(route.query.centreId),
        date: date,
      },
    });
    if (response.data.status == 1) {
      route.push("/success");
    } else {
      alert(response.data.message);
    }
  };

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
            CoviVaccine
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
            <button class="btn btn-success" type="submit" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="row">
        <div className="col-5" style={{ marginLeft: 80, marginBottom: 100 }}>
          <h5>Location of the centre:</h5>
          <iframe
            src={centre.link}
            width="500"
            height="350"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div
          className="col-5"
          style={{ marginLeft: 90, marginTop: 40, marginBottom: 100 }}
        >
          <div className="mb-5">
            <h5>Address:</h5>
            <p>{centre.address}</p>
          </div>
          <div className="mb-5">
            <h5>Working hours:</h5>
            <p>
              {centre.start} - {centre.end}
            </p>
          </div>
          <div className="mb-5">
            <h5>Choose date:</h5>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <Link href={`/book_dosage?centreId=${centre.centre_id}`}>
              <button
                className="btn btn-success"
                type="submit"
                onClick={() => {
                  setConfirmBookingModal(true);
                }}
              >
                Confirm booking
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showConfirmBookingModal}
        onClose={() => {
          setConfirmBookingModal(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vaccination Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <p style={{ marginLeft: 20 }}>
            Are you sure about your booking details?
          </p>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={bookSlot}>
              Yes, confirm now
            </Button>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => {
                setConfirmBookingModal(false);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default BookDosage;
