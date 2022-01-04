import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./homepage.styles.css";

const HomePage = () => {
  const [mobiles, setMobiles] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetchMobiles();
    async function fetchMobiles() {
      const request = await axios.get("http://localhost:4000/mobiles");
      setMobiles(request.data);
    }
  }, [update]);

  const handleDelete = async (e, _id) => {
    e.preventDefault();
    console.log(_id);
    const isOk = window.confirm("are you sure, you want to delete ?");
    if (isOk) {
      const request = await axios.delete(
        `http://localhost:4000/mobiles/${_id}`
      );
      console.log(request);
      if (request.data.message) {
        alert(request.data.message);
        setUpdate(true);
      } else {
        alert(request.data.errorMessage);
        setUpdate(false);
      }
    } else {
      return;
    }
  };
  console.log(mobiles);
  return (
    <div className="homepage">
      <div className="link">
        <Link to="/create">Create New Item</Link>
      </div>
      <div className="grid">
        <div className="heading">Model</div>
        <div className="heading">Brand</div>
        <div className="heading">Purchase Date</div>
        <div className="heading">IMEI</div>
        <div className="heading">Actions</div>
        {mobiles && !mobiles.length ? (
          <div className="no-record">No mobiles found!</div>
        ) : (
          mobiles.map((mobile) => (
            <Fragment key={mobile._id}>
              <div className="content">{mobile.model}</div>
              <div className="content">{mobile.brand.name}</div>
              <div className="content">
                {moment(mobile.purchaseDate).format("DD-MM-YYYY")}
              </div>
              <div className="content">{mobile.IMEI}</div>
              <div className="content actions">
                <Link to={`/edit/${mobile._id}`}>Edit </Link>
                <Link
                  to={`/delete/${mobile._id}`}
                  onClick={(e) => handleDelete(e, mobile._id)}
                >
                  {" "}
                  | Delete
                </Link>
              </div>
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
