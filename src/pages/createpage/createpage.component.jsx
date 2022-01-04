import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./createpage.styles.css";
import { useParams } from "react-router-dom";

const CreatePage = (props) => {
  const navigate = useNavigate();
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [IMEI, setIMEI] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [brands, setBrands] = useState([]);
  const [_id, setId] = useState();
  let params = useParams();

  useEffect(() => {
    async function getBrands() {
      const request = await axios.get("http://localhost:4000/brands");
      const response = request.data;
      setBrands(response);
    }
    async function fetchMobile() {
      const { id } = params;
      if (id) {
        const getMobileRequest = await axios.get(
          `http://localhost:4000/mobiles/${id}`
        );
        const { data } = getMobileRequest;
        setBrand(data.brand._id);
        setModel(data.model);
        setPurchaseDate(
          new Date(data.purchaseDate).toISOString().substr(0, 10)
        );
        setIMEI(data.IMEI);
        setId(data._id);
      }
    }
    getBrands();
    fetchMobile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await axios.post("http://localhost:4000/mobiles", {
      IMEI,
      brand,
      purchaseDate,
      model,
      _id,
    });
    if (request.data && request.data.message) {
      alert(request.data.message);
      navigate("/");
    } else {
      alert(request.data.error);
    }
  };
  debugger;
  console.log(purchaseDate);
  return (
    <div className="createpage">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Model</label>
          <input
            type="text"
            onChange={(e) => setModel(e.target.value)}
            value={model}
          />
        </div>
        <div className="form-group">
          <label>Brand</label>
          <select onChange={(e) => setBrand(e.target.value)} value={brand}>
            <option>--Select Brand--</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>IMEI</label>
          <input
            type="text"
            onChange={(e) => setIMEI(e.target.value)}
            value={IMEI}
          />
        </div>
        <div className="form-group">
          <label>Purchase Date</label>
          <input
            type="date"
            onChange={(e) => setPurchaseDate(e.target.value)}
            value={purchaseDate}
          />
        </div>
        <button className="button">Save</button>
      </form>
    </div>
  );
};

export default CreatePage;
