import React, { PureComponent, useEffect, useState } from "react";
import Users from "../../../assets/images/usersIcon.png";
import DeviceSetUp from "../../../assets/images/deviceSetUp.png";
import Revenue from "../../../assets/images/revenueIcon.png";
import GreenVector from "../../../assets/images/vectorGreen.png";
import OrangeVector from "../../../assets/images/vectorOrange.png";
import "./adminLandPage.css";
import { green, orange } from "@mui/material/colors";
import RectangleBox from "../../../assets/images/rectangleShape.png";
import ProfileDp1 from "../../../assets/images/profileCoverPic.png";
import ProfileDp2 from "../../../assets/images/profileCoverDp.png";
import Menu from "../../../assets/images/menuDotsIcon.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { getAllDevices } from "../../../Redux/Actions";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Scatter,
  ResponsiveContainer,
  AreaChart,
} from "recharts";
import { Tooltip } from "recharts";
import { ImageOutlined, ShowChart } from "@mui/icons-material";
import Violet from "../../../assets/images/violet.png";
import SkyBlue from "../../../assets/images/skyBlue.png";
import { useDispatch, useSelector } from "react-redux";
import { metricsData } from "../../../Redux/Actions";
import { Link } from "react-router-dom";
import usersAndDevicesPage from "./UsersAndDevicesPage";
import { getUsersOnboard } from "../../../Redux/Actions";
import { getRevenue } from "../../../Redux/Actions";
import AdminDataTable from "./AdminDataTable";

const data0 = [
  {
    weekDay: "Mon",
    barView: 80,
    linearView: 80,
  },
  {
    weekDay: "Tue",
    barView: 65,
    linearView: 65,
  },
  {
    weekDay: "Wed",
    barView: 78,
    linearView: 78,
  },
  {
    weekDay: "Thurs",
    barView: 130,
    linearView: 130,
  },
  {
    weekDay: "Fri",
    barView: 60,
    linearView: 60,
  },
  {
    weekDay: "Sat",
    barView: 75,
    linearView: 75,
  },
  {
    weekDay: "Sun",
    barView: 110,
    linearView: 110,
  },
];

const data0m = [
  {
    weekDay: "Week 1",
    barView: 80,
    linearView: 80,
  },
  {
    weekDay: "Week 2",
    barView: 65,
    linearView: 65,
  },
  {
    weekDay: "Week 3",
    barView: 78,
    linearView: 78,
  },
  {
    weekDay: "Week 4",
    barView: 130,
    linearView: 130,
  },
];

const data3m = [
  {
    weekDay: "W 1",
    barView: 80,
    linearView: 80,
  },
  {
    weekDay: "W 2",
    barView: 10,
    linearView: 10,
  },
  {
    weekDay: "W 3",
    barView: 30,
    linearView: 30,
  },
  {
    weekDay: "W 4",
    barView: 50,
    linearView: 50,
  },
  {
    weekDay: "W 5",
    barView: 12,
    linearView: 120,
  },
  {
    weekDay: "W 6",
    barView: 120,
    linearView: 120,
  },
  {
    weekDay: "W 7",
    barView: 180,
    linearView: 180,
  },
  {
    weekDay: "W 8",
    barView: 60,
    linearView: 60,
  },
  {
    weekDay: "W 9",
    barView: 20,
    linearView: 20,
  },
  {
    weekDay: "W 10",
    barView: 15,
    linearView: 15,
  },
  {
    weekDay: "W 11",
    barView: 5,
    linearView: 5,
  },
  {
    weekDay: "W 12",
    barView: 40,
    linearView: 40,
  },
];

const data1 = [
  {
    day: "Mon",
    linearView: 68,
  },
  {
    day: "Tue",
    linearView: 75,
  },
  {
    day: "Wed",
    linearView: 70,
  },
  {
    day: "Thu",
    linearView: 80,
  },
  {
    day: "Fri",
    linearView: 76,
  },
  {
    day: "Sat",
    linearView: 109,
  },
  {
    day: "Sun",
    linearView: 85,
  },
];

const data1m = [
  {
    day: "Week 1",
    linearView: 68,
  },
  {
    day: "Week 2",
    linearView: 75,
  },
  {
    day: "Week 3",
    linearView: 70,
  },
  {
    day: "Week 4",
    linearView: 80,
  },
];
const data3rm = [
  {
    day: "Jan",
    linearView: 68,
  },
  {
    day: "Feb",
    linearView: 75,
  },
  {
    day: "Mar",
    linearView: 70,
  },
];

function createData(name, device, water, cleaning, status, updated) {
  return { name, device, water, cleaning, status, updated };
}

const rows = [
  createData(
    "Sidney Boyer",
    "ellofewbf",
    "0.5/5L",
    "09 Dec 2019",
    "Weak",
    "05:18AM"
  ),
  createData(
    "Todd Morar",
    "---",
    "0.5/5L",
    "09 Dec 2019",
    "Connected",
    "05:18AM"
  ),
  createData(
    "Sidney Boyer",
    "hellopeifw",
    "0.5/5L",
    "09 Dec 2019",
    "Weak",
    "05:18AM"
  ),
  createData(
    "Todd Morar",
    "---",
    "0.5/5L",
    "09 Dec 2019",
    "Connected",
    "05:18AM"
  ),
  createData(
    "Sidney Boyer",
    "jhgffgojj",
    "0.5/5L",
    "09 Dec 2019",
    "Weak",
    "05:18AM"
  ),
];

function AdminLandPage() {
  const metricslist = useSelector((matrix) => matrix.matrices.matricesResponse);
  // console.log("metricslist",metricslist.data.totalRevenues)
  useEffect(() => {
    dispatch(metricsData());
    //   setUserID(loginResponse?.data)
    // setMetricsDataList(metricslist?.data)
  }, []);

  const cardData = [
    {
      cardImage: <img src={Users} />,
      cardBody: metricslist?.data?.totalUsersOnboarded,
      cardBodyNum: metricslist?.data?.newUsersOnboardedToday + "  ",
      cardFootPara: "Users onboarded",
    },
    {
      cardImage: <img src={DeviceSetUp} />,
      cardBody: metricslist?.data?.totalDevicesSetUp,
      cardBodyNum: metricslist?.data?.newDevicesSetUpToday + "  ",
      cardFootPara: "Device set up",
    },
    {
      cardImage: <img src={Revenue} />,
      cardBody: metricslist?.data?.totalRevenues + " TTD",
      cardBodyNum: metricslist?.data?.todayRevenues + "  ",
      cardFootPara: "Total Revenues",
    },
  ];

  let dispatch = useDispatch();

  const payment = useSelector((addpay) => addpay.Device.deviceResponse);

  console.log("payment data", payment.data);

  useEffect(() => {
    dispatch(getAllDevices());
    //   setUserID(loginResponse?.data)
  }, []);

  const [tableData, setDatbleData] = useState();
  useEffect(() => {
    if (payment && payment?.statusCode === 200) {
      setDatbleData(payment.data.slice(0, 1));
    }
  }, [payment]);

  // const [metricsDataList,setMetricsDataList]=useState([]);

  // console.log(metricsDataList    , "cardDatacardDatacardDatacardDatacardData");

  // onboarded API data

  const onboard = useSelector(
    (boarded) => boarded.getUsersOnboarded.onboardSuccessfull
  );

  const [userListMap, setUserListMap] = useState("this week");

  useEffect(() => {
    dispatch(getUsersOnboard(userListMap));
    //   setUserID(loginResponse?.data)
  }, [userListMap]);

  const handleSelectChange = (event) => {
    if (event.target.value === "one") {
      setUserListMap("this week");
    }
    if (event.target.value === "two") {
      setUserListMap("this month");
    }
    if (event.target.value === "three") {
      setUserListMap("last 3 months");
    }
  };

  // Revenue Api data

  const revenuelist = useSelector(
    (revenuedata) => revenuedata.Revenue.revenueSuccess
  );

  const [userRevenue, setUserRevenue] = useState("this week");

  useEffect(() => {
    dispatch(getRevenue(userRevenue));
  }, [userRevenue]);

  const handleRevenueChange = (event) => {
    if (event.target.value === "four") {
      setUserRevenue("this week");
    }
    if (event.target.value === "five") {
      setUserRevenue("this month");
    }
    if (event.target.value === "six") {
      setUserRevenue("last 3 months");
    }
  };

  return (
    <>
      <div>
        <div className="dashboardTopContainer">
          {cardData?.map((data) => (
            <div className="card1">
              <div className="cardImg">{data.cardImage}</div>
              <div className="cardItems">
                <p className="p1">{data.cardBody}</p>
                <div className="subbP">
                  <p className="pp2">
                    <span
                      style={{
                        color:
                          data.cardBody >= 1
                            ? "#147138"
                            : data.cardBody >= 1
                            ? "#BD630A"
                            : "black",
                        backgroundColor:
                          data.cardBodyNum >= 0
                            ? "#E7F4EE"
                            : data.cardBodyNum >= 0
                            ? "#FEF2E7"
                            : "#FFFFFF",
                        width: "60px",
                        height: "56px",
                        borderRadius: "100px",
                        padding: "5px 12px",
                        gap: "4px",
                      }}
                    >
                      {data.cardBodyNum}
                      <img src={GreenVector} />
                    </span>
                  </p>
                </div>
              </div>
              <div className="cardPara">
                <p>{data.cardFootPara}</p>
              </div>
            </div>
          ))}
         
        </div>
        <hr></hr>
        <div className="graphContainer">
          <div className="graphBar">
            <div className="graphHeadings">
              <div className="graphHeadings1">
                <p>Users onboarded</p>
              </div>
              <div className="graphHeadings2">
                <p className="p1">
                  <span className="skyblueCircle"></span>
                  Bar view
                </p>
                <p className="p2">
                  <span className="darkblueCircle"></span>
                  Linear view
                </p>
              </div>
              <div className="graphHeadings3">
                <select onChange={handleSelectChange}>
                  <option value="one">This Week</option>
                  <option value="two">This Month</option>
                  <option value="three">Last 3 Month</option>
                </select>
                {/* <img src={Menu} /> */}
              </div>
            </div>
            <div className="barChart">
              <ResponsiveContainer width="90%" height={400}>
                {" "}
                {/* Adjust height as needed */}
                <ComposedChart
                  data={onboard.data}
                  margin={{ top: 20, right: 0, left: 0, bottom: 50 }}
                >
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5BD1DC" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#5BD1DC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="period"
                    stroke="#98A6B3"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="usersCount"
                    stroke="#98A6B3"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar
                    dataKey="usersCount"
                    barSize={40}
                    radius={[10, 10, 10, 10]}
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                  <Line
                    type="linear"
                    dataKey="usersCount"
                    stroke="#3480E5"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="graphArea">
            <div className="areaGraphHeadings">
              <h5>Revenues</h5>
              <select onChange={handleRevenueChange}>
                <option value="four">This Week</option>
                <option value="five">This Month</option>
                <option value="six">Last 3 Month</option>
              </select>
            </div>
            <div className="areaChart">
              <ResponsiveContainer width="90%" height={300}>
                {" "}
                {/* Adjust height as needed */}
                <AreaChart
                  data={revenuelist.data}
                  margin={{
                    top: 10,
                    right: 0,
                    left: 20,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3480E5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3480E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="period"
                    stroke="#98A6B3"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="totalRevenue"
                    stroke="#98A6B3"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalRevenue"
                    stroke="#3480E5"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <hr></hr>
        <div>
          <div className="detailsHeading">
            <h2>Users & Devices</h2>
            <Link to="/users_and_devices">
              <button className="viewButton">
                <h3>View all</h3>
              </button>
            </Link>
            {/* <button className='viewButton' onClick={usersAndDevicesPage}><h3>View all</h3></button> */}
          </div>
          <div className="tableContainer">
            <AdminDataTable/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLandPage;
