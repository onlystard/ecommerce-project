import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import QRCode from "qrcode.react";

import { message } from "antd";

function VirtualPaking() {
  const [loading, setLoading] = useState(true);
  const [parkingLotInfo, setParkingLotInfo] = useState([]);
  const [parkingSpots, setParkingSpots] = useState([]);

  let { id } = useParams();
  const getParkingLotInfo = () => {
    axios
      .get("http://localhost:4000/vp-parking/id/" + id)
      .then(function (response) {
        // console.log(response.data[0]);
        setParkingLotInfo(response.data[0]);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  const getParkingSpots = () => {
    axios
      .get("http://localhost:4000/vp-parkings-pots/" + id)
      .then(function (response) {
        console.log(response.data);
        setParkingSpots(response.data);
      })
      .catch(function (error) {
        console.log(error);
        message.error("Something went wrong. Please try again");
      });
  };

  useEffect(() => {
    getParkingLotInfo();
    getParkingSpots();

    var getSpot = setInterval(getParkingSpots, 1500);
    return () => {
      clearInterval(getSpot);
    };
  }, []);

  let parkingLotDataEntry = {
    id: id,
    type: "find-my-spot-qr-code",
    access: "entry",
  };
  let parkingLotDataExit = {
    id: id,
    type: "find-my-spot-qr-code",
    access: "exit",
  };
  return (
    <div className="outer-container">
      <div className="parking-lot-info container-border">
        <h2>Parking Lot Details</h2>
        <div>Name : {parkingLotInfo.pd_loc_name}</div>
        <div>Address : {parkingLotInfo.pd_loc_address}</div>
        <div>Total Spot : {parkingLotInfo.total_spot}</div>
        <div>
          Occupied Spot :{" "}
          {parkingSpots.filter((i) => i.sd_status).length ||
            parkingLotInfo.occupied_spot}
        </div>
        <div>Hourly Rate : {parkingLotInfo.pd_hrly_rate}</div>
      </div>
      <div className="qrcode-container">
        <div className="entry-qrcode container-border">
          <h2>Entry QR Code</h2>
          <QRCode value={JSON.stringify(parkingLotDataEntry)} size={190} />,
        </div>
        <div className="exit-qrcode container-border">
          <h2>Exit QR Code</h2>
          <QRCode value={JSON.stringify(parkingLotDataExit)} size={190} />,
        </div>
      </div>
      <div className="parking-spot-container container-border">
        <h2>Parking Spots</h2>

        <div className="spot-color-info">
          <div className="spot-color-info-occupied"></div>
          &nbsp;&nbsp; Occupied&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="spot-color-info-empty"></div>
          &nbsp;&nbsp; Empty
        </div>
        <div className="spot-list ">
          {parkingSpots.map((spot, index) => (
            <div
              className={
                !spot.sd_status
                  ? "parking-spot"
                  : "parking-spot parking-spot-filled"
              }
              key={index}
            >
              {spot.spot_no}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VirtualPaking;
