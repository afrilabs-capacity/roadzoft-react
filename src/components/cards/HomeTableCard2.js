import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import styled from "styled-components";
import MapModal from "../modals/MapModal";
import { API_BASE } from "../../utils/Api";

const CardWrapper = styled.div.attrs(() => ({
  className:
    "home-card-table flex flex-row justify-between items-center border-b-2 border-gray-200",
}))``;

const HomeTableCard2 = () => {
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getMessages = async () => {
    const response = await fetch(`${API_BASE}/messages`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setMessages(result.data.data);
    setLoading(false);
    console.log("Messages", result);
  };

  React.useEffect(() => {
    getMessages();
  }, []);

  const data = React.useMemo(() => messages);

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h2>Latest Messages</h2>
        <Link className="mr-3" to="/messages" className="">
          View all Messages
        </Link>
      </div>

      <div className="home-card-wrapper w-full mt-1 mb-3 h-full">
        {data.slice(0, 5).map((item, i) => (
          <CardWrapper key={i}>
            <div style={{ width: 150 }}>
              <p className="">{item.title == null ? "N/A" : item.title}</p>
            </div>
            <div className="center-item">
              <p className="">{item.body.substring(0, 80)}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
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

export default HomeTableCard2;
