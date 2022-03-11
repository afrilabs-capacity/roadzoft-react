import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import styled from "styled-components";
import MapModal from "../modals/MapModal";

const CardWrapper = styled.div.attrs(() => ({
  className:
    "home-card-table flex flex-row justify-between items-center border-b-2 border-gray-200",
}))`
  border-left: 10px solid ${(props) => props.color};
`;

const HomeTableCard = ({ data }) => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h2>Latest Reports</h2>
        <Link className="mr-3" to="/reports" className="">
          View all Reports
        </Link>
      </div>

      <div className="home-card-wrapper w-full mt-1 mb-3 h-full">
        {data.slice(0, 5).map((item, i) => (
          <CardWrapper
            key={i}
            color={item.status == "Approved" ? "#49BF78" : "#C8E883"}
          >
            <div style={{ minWidth: 150 }}>
              <p className="">
                {item.message == null ? "N/A" : item.message.substring(0, 25)}
              </p>
            </div>

            <div className="center-item">
              <p className="">
                {item.user.lga}, {item.user.State}
              </p>
              <MapModal
                apiKey="pk.eyJ1IjoibWljaG9sdXNhbnlhIiwiYSI6ImNrd3MybWM4YjEyOGwycHFvaDhsc2Z2Y3AifQ.uSFsVJGkOiUXSTG2SOES2A"
                latitude={parseFloat(item.latitude)}
                longitude={parseFloat(item.longitude)}
              />
            </div>
            <div className="center-item">
              <p className="">{item.user.name}</p>
              <p className="text-gray-400">{item.user.email}</p>
            </div>
            <div className="flex flex-col justify-between items-center">
              <Moment className="" format="DD-MM-YYYY">
                {item.created_at}
              </Moment>
              <Moment className="text-gray-400" fromNow>
                {item.created_at}
              </Moment>
            </div>
          </CardWrapper>
        ))}
      </div>
    </div>
  );
};

export default HomeTableCard;
