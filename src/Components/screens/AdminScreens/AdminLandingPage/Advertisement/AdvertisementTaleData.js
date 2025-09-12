import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Menu from "../../../../assets/images/menuDotsIcon.png";
import Rectangle from "../../../../assets/images/rectangleShape.png";
import "./advertisementpaymentpage.css";

const AdvertisementTaleData = () => {
  // Data for the table
  const data = {
    columns: [
      { label: '', field: 'icon', sort: 'disabled', width: 50 },
      { label: 'CAMPAIGN NAME', field: 'name',sort: 'disabled', width: 200 },
      { label: 'STATUS', field: 'status', sort: 'disabled',width: 100 },
      { label: 'START DATE', field: 'start',sort: 'disabled', width: 150 },
      { label: 'END DATE', field: 'end',sort: 'disabled', width: 150 },
      { label: 'CLICKS', field: 'clicks',sort: 'disabled', width: 100 },
      { label: 'CONVERSIONS', field: 'conversions', sort: 'disabled',width: 100 },
      { label: 'AMOUNT SPENT', field: 'amountSpent',sort: 'disabled', width: 150 },
    //   { label: '', field: 'menu', sort: 'disabled', width: 50 },
    ],
    rows: [
      {
        icon: <img className="img1" src={Rectangle} alt="icon" />,
        name: 'Etiam scelerisque velit',
        status: (
          <span
            style={{
              color: '#F38416',
              backgroundColor: '#FEF2E7',
              borderRadius: '100px',
              padding: '4px 12px',
              display: 'inline-block',
            }}
          >
            Paused
          </span>
        ),
        start: '09 Dec 2019',
        end: '09 Dec 2019',
        clicks: 1282,
        conversions: 212,
        amountSpent: '$212.21',
        menu: <img src={Menu} alt="menu" />,
      },
      {
        icon: <img className="img1" src={Rectangle} alt="icon" />,
        name: 'Aliquet purus pretium',
        status: (
          <span
            style={{
              color: '#1B767E',
              backgroundColor: '#E2F7F9',
              borderRadius: '100px',
              padding: '4px 12px',
              display: 'inline-block',
            }}
          >
            Active
          </span>
        ),
        start: '09 Dec 2019',
        end: '09 Dec 2019',
        clicks: 2723,
        conversions: 54,
        amountSpent: '$762.21',
        menu: <img src={Menu} alt="menu" />,
      },
      {
        icon: <img className="img1" src={Rectangle} alt="icon" />,
        name: 'Non duis nam',
        status: (
          <span
            style={{
              color: '#147138',
              backgroundColor: '#EAFBF0',
              borderRadius: '100px',
              padding: '4px 12px',
              display: 'inline-block',
            }}
          >
            Completed
          </span>
        ),
        start: '09 Dec 2019',
        end: '09 Dec 2019',
        clicks: 5839,
        conversions: 23,
        amountSpent: '$432.21',
        menu: <img src={Menu} alt="menu" />,
      },
      {
        icon: <img className="img1" src={Rectangle} alt="icon" />,
        name: 'Quis neque sapien',
        status: (
          <span
            style={{
              color: 'red',
              backgroundColor: 'rgb(254, 247, 245)',
              borderRadius: '100px',
              padding: '4px 12px',
              display: 'inline-block',
            }}
          >
            Cancelled
          </span>
        ),
        start: '09 Dec 2019',
        end: '09 Dec 2019',
        clicks: 122,
        conversions: 1,
        amountSpent: '$23.21',
        menu: <img src={Menu} alt="menu" />,
      },
    ],
  };

  return (
    <div className="tableContainer">
      <MDBDataTable
        data={data}
        paging={false}
        searching={false}
        info={false}
        hover
        responsive
        className="advertisementTable"
      />
    </div>
  );
};

export default AdvertisementTaleData;
