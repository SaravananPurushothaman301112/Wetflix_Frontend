
import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './paymentHistory.css';
import Menu from "../../../assets/images/menuDotsIcon.png";
import Profile1 from '../../../assets/images/profileCoverDp.png';
import Rectangle from "../../../assets/images/rectangleShape.png";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import  {ReactComponent as LeftArrow} from "../../../assets/SvgIcons/LeftArrow.svg";
import {ReactComponent as RightArrow} from "../../../assets/SvgIcons/RightArow.svg"


const PaymentHistory = () => {
    // Sample data to populate the table
    const rows = [
      {
          profile: (
              <div className="profileContainer">
                  <img className="img1" src={Rectangle} alt="Background" />
                  <img className="img2" src={Profile1} alt="Profile" />
              </div>
          ),
          name: "Sydney Boyer",
          id: "#39201",
          status: (
              <span style={{
                  color: '#A9281E',
                  backgroundColor: '#FDEDEC',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  textAlign: 'center',
              }}>
                  Failed
              </span>
          ),
          amount: "$41",
          dollar: "USD",
          plan: "Splash",
          date: "09 Dec 2019",
          menu: <MoreVertIcon />
      },
      {
          profile: (
              <div className="profileContainer">
                  <img className="img1" src={Rectangle} alt="Background" />
                  <img className="img2" src={Profile1} alt="Profile" />
              </div>
          ),
          name: "Todd Morar",
          id: "#39201",
          status: (
              <span style={{
                  color: '#A9281E',
                  backgroundColor: '#FDEDEC',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  textAlign: 'center',
              }}>
                  Failed
              </span>
          ),
          amount: "$41",
          dollar: "USD",
          plan: "Trickle",
          date: "09 Dec 2019",
          menu: <MoreVertIcon/>
      },
      {
          profile: (
              <div className="profileContainer">
                  <img className="img1" src={Rectangle} alt="Background" />
                  <img className="img2" src={Profile1} alt="Profile" />
              </div>
          ),
          name: "Clayton Hackett",
          id: "#39201",
          status: (
              <span style={{
                  color: '#0D894F',
                  backgroundColor: '#EAFBF0',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  textAlign: 'center',
              }}>
                  Success
              </span>
          ),
          amount: "$41",
          dollar: "USD",
          plan: "Splash",
          date: "09 Dec 2019",
           menu: <MoreVertIcon/>
      },
      {
          profile: (
              <div className="profileContainer">
                  <img className="img1" src={Rectangle} alt="Background" />
                  <img className="img2" src={Profile1} alt="Profile" />
              </div>
          ),
          name: "Sydney Boyer",
          id: "#39201",
          status: (
              <span style={{
                  color: '#0D894F',
                  backgroundColor: '#EAFBF0',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  textAlign: 'center',
              }}>
                  Success
              </span>
          ),
          amount: "$41",
          dollar: "USD",
          plan: "Splash",
          date: "09 Dec 2019",
           menu: <MoreVertIcon/>
      },
      {
          profile: (
              <div className="profileContainer">
                  <img className="img1" src={Rectangle} alt="Background" />
                  <img className="img2" src={Profile1} alt="Profile" />
              </div>
          ),
          name: "Todd Morar",
          id: "#39201",
          status: (
              <span style={{
                  color: '#0D894F',
                  backgroundColor: '#EAFBF0',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  textAlign: 'center',
              }}>
                  Success
              </span>
          ),
          amount: "$41",
          dollar: "USD",
          plan: "Splash",
          date: "09 Dec 2019",
           menu: <MoreVertIcon/>
      },
      {
          profile: (
              <div className="profileContainer">
                  <img className="img1" src={Rectangle} alt="Background" />
                  <img className="img2" src={Profile1} alt="Profile" />
              </div>
          ),
          name: "Clayton Hackett",
          id: "#39201",
          status: (
              <span style={{
                  color: '#0D894F',
                  backgroundColor: '#EAFBF0',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  textAlign: 'center',
              }}>
                  Success
              </span>
          ),
          amount: "$41",
          dollar: "USD",
          plan: "Splash",
          date: "09 Dec 2019",
           menu: <MoreVertIcon/>
      },
      {
          profile: (
              <div className="profileContainer">
                  <img className="img1" src={Rectangle} alt="Background" />
                  <img className="img2" src={Profile1} alt="Profile" />
              </div>
          ),
          name: "Sydney Boyer",
          id: "#39201",
          status: (
              <span style={{
                  color: '#0D894F',
                  backgroundColor: '#EAFBF0',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  textAlign: 'center',
              }}>
                  Success
              </span>
          ),
          amount: "$41",
          dollar: "USD",
          plan: "Splash",
          date: "09 Dec 2019",
           menu: <MoreVertIcon/>
      },
      {
          profile: (
              <div className="profileContainer">
                  <img className="img1" src={Rectangle} alt="Background" />
                  <img className="img2" src={Profile1} alt="Profile" />
              </div>
          ),
          name: "Todd Morar",
          id: "#39201",
          status: (
              <span style={{
                  color: '#0D894F',
                  backgroundColor: '#EAFBF0',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  textAlign: 'center',
              }}>
                  Success
              </span>
          ),
          amount: "$41",
          dollar: "USD",
          plan: "Splash",
          date: "09 Dec 2019",
           menu: <MoreVertIcon/>
      },
      {
          profile: (
              <div className="profileContainer">
                  <img className="img1" src={Rectangle} alt="Background" />
                  <img className="img2" src={Profile1} alt="Profile" />
              </div>
          ),
          name: "Sydney Boyer",
          id: "#39201",
          status: (
              <span style={{
                  color: '#0D894F',
                  backgroundColor: '#EAFBF0',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  textAlign: 'center',
              }}>
                  Success
              </span>
          ),
          amount: "$41",
          dollar: "USD",
          plan: "Splash",
          date: "09 Dec 2019",
           menu: <MoreVertIcon/>
      },
      {
          profile: (
              <div className="profileContainer">
                  <img className="img1" src={Rectangle} alt="Background" />
                  <img className="img2" src={Profile1} alt="Profile" />
              </div>
          ),
          name: "Clayton Hackett",
          id: "#39201",
          status: (
              <span style={{
                  color: '#0D894F',
                  backgroundColor: '#EAFBF0',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  textAlign: 'center',
              }}>
                  Success
              </span>
          ),
          amount: "$41",
          dollar: "USD",
          plan: "Splash",
          date: "09 Dec 2019",
           menu: <MoreVertIcon/>
      },
      {
        profile: (
            <div className="profileContainer">
                <img className="img1" src={Rectangle} alt="Background" />
                <img className="img2" src={Profile1} alt="Profile" />
            </div>
        ),
        name: "Sydney Boyer",
        id: "#39201",
        status: (
            <span style={{
                color: '#A9281E',
                backgroundColor: '#FDEDEC',
                borderRadius: '100px',
                padding: '4px 12px',
                textAlign: 'center',
            }}>
                Failed
            </span>
        ),
        amount: "$41",
        dollar: "USD",
        plan: "Splash",
        date: "09 Dec 2019",
         menu: <MoreVertIcon/>
    },
    {
        profile: (
            <div className="profileContainer">
                <img className="img1" src={Rectangle} alt="Background" />
                <img className="img2" src={Profile1} alt="Profile" />
            </div>
        ),
        name: "Todd Morar",
        id: "#39201",
        status: (
            <span style={{
                color: '#A9281E',
                backgroundColor: '#FDEDEC',
                borderRadius: '100px',
                padding: '4px 12px',
                textAlign: 'center',
            }}>
                Failed
            </span>
        ),
        amount: "$41",
        dollar: "USD",
        plan: "Trickle",
        date: "09 Dec 2019",
         menu: <MoreVertIcon/>
    },
    {
        profile: (
            <div className="profileContainer">
                <img className="img1" src={Rectangle} alt="Background" />
                <img className="img2" src={Profile1} alt="Profile" />
            </div>
        ),
        name: "Clayton Hackett",
        id: "#39201",
        status: (
            <span style={{
                color: '#0D894F',
                backgroundColor: '#EAFBF0',
                borderRadius: '100px',
                padding: '4px 12px',
                textAlign: 'center',
            }}>
                Success
            </span>
        ),
        amount: "$41",
        dollar: "USD",
        plan: "Splash",
        date: "09 Dec 2019",
         menu: <MoreVertIcon/>
    },
    {
        profile: (
            <div className="profileContainer">
                <img className="img1" src={Rectangle} alt="Background" />
                <img className="img2" src={Profile1} alt="Profile" />
            </div>
        ),
        name: "Sydney Boyer",
        id: "#39201",
        status: (
            <span style={{
                color: '#0D894F',
                backgroundColor: '#EAFBF0',
                borderRadius: '100px',
                padding: '4px 12px',
                textAlign: 'center',
            }}>
                Success
            </span>
        ),
        amount: "$41",
        dollar: "USD",
        plan: "Splash",
        date: "09 Dec 2019",
         menu: <MoreVertIcon/>
    },
    {
        profile: (
            <div className="profileContainer">
                <img className="img1" src={Rectangle} alt="Background" />
                <img className="img2" src={Profile1} alt="Profile" />
            </div>
        ),
        name: "Todd Morar",
        id: "#39201",
        status: (
            <span style={{
                color: '#0D894F',
                backgroundColor: '#EAFBF0',
                borderRadius: '100px',
                padding: '4px 12px',
                textAlign: 'center',
            }}>
                Success
            </span>
        ),
        amount: "$41",
        dollar: "USD",
        plan: "Splash",
        date: "09 Dec 2019",
         menu: <MoreVertIcon/>
    },
    {
        profile: (
            <div className="profileContainer">
                <img className="img1" src={Rectangle} alt="Background" />
                <img className="img2" src={Profile1} alt="Profile" />
            </div>
        ),
        name: "Clayton Hackett",
        id: "#39201",
        status: (
            <span style={{
                color: '#0D894F',
                backgroundColor: '#EAFBF0',
                borderRadius: '100px',
                padding: '4px 12px',
                textAlign: 'center',
            }}>
                Success
            </span>
        ),
        amount: "$41",
        dollar: "USD",
        plan: "Splash",
        date: "09 Dec 2019",
         menu: <MoreVertIcon/>
    },
    {
        profile: (
            <div className="profileContainer">
                <img className="img1" src={Rectangle} alt="Background" />
                <img className="img2" src={Profile1} alt="Profile" />
            </div>
        ),
        name: "Sydney Boyer",
        id: "#39201",
        status: (
            <span style={{
                color: '#0D894F',
                backgroundColor: '#EAFBF0',
                borderRadius: '100px',
                padding: '4px 12px',
                textAlign: 'center',
            }}>
                Success
            </span>
        ),
        amount: "$41",
        dollar: "USD",
        plan: "Splash",
        date: "09 Dec 2019",
         menu: <MoreVertIcon/>
    },
    {
        profile: (
            <div className="profileContainer">
                <img className="img1" src={Rectangle} alt="Background" />
                <img className="img2" src={Profile1} alt="Profile" />
            </div>
        ),
        name: "Todd Morar",
        id: "#39201",
        status: (
            <span style={{
                color: '#0D894F',
                backgroundColor: '#EAFBF0',
                borderRadius: '100px',
                padding: '4px 12px',
                textAlign: 'center',
            }}>
                Success
            </span>
        ),
        amount: "$41",
        dollar: "USD",
        plan: "Splash",
        date: "09 Dec 2019",
         menu: <MoreVertIcon/>
    },
    {
        profile: (
            <div className="profileContainer">
                <img className="img1" src={Rectangle} alt="Background" />
                <img className="img2" src={Profile1} alt="Profile" />
            </div>
        ),
        name: "Sydney Boyer",
        id: "#39201",
        status: (
            <span style={{
                color: '#0D894F',
                backgroundColor: '#EAFBF0',
                borderRadius: '100px',
                padding: '4px 12px',
                textAlign: 'center',
            }}>
                Success
            </span>
        ),
        amount: "$41",
        dollar: "USD",
        plan: "Splash",
        date: "09 Dec 2019",
         menu: <MoreVertIcon/>
    },
    {
        profile: (
            <div className="profileContainer">
                <img className="img1" src={Rectangle} alt="Background" />
                <img className="img2" src={Profile1} alt="Profile" />
            </div>
        ),
        name: "Clayton Hackett",
        id: "#39201",
        status: (
            <span style={{
                color: '#0D894F',
                backgroundColor: '#EAFBF0',
                borderRadius: '100px',
                padding: '4px 12px',
                textAlign: 'center',
            }}>
                Success
            </span>
        ),
        amount: "$41",
        dollar: "USD",
        plan: "Splash",
        date: "09 Dec 2019",
         menu: <MoreVertIcon/>
    },
      
      
  ];
  

    const data = {
        columns: [
            { label: '', field: 'profile', sort: 'disabled', width: 150 },
            { label: 'NAME', field: 'name', sort: 'asc', width: 200 },
            { label: 'REF ID', field: 'id', sort: 'asc', width: 150 },
            { label: 'STATUS', field: 'status', sort: 'asc', width: 150 },
            { label: 'AMOUNT', field: 'amount', sort: 'asc', width: 100 },
            { label: 'CURRENT PLAN', field: 'plan', sort: 'asc', width: 150 },
            { label: 'TRANSACTION DATE', field: 'date', sort: 'asc', width: 200 },
            // { label: '', field: 'menu',sort: 'disabled', width: 50 }
        ],
        rows: rows
    };

    return (
        <div>
            <div className='paymentTitle'>
                <h5>Payment History</h5>
            </div>
            <div className='tableContainer'>
                <MDBDataTable
                    responsive
                    data={data}
                    paging={true}
                    entries={10}
                    searching={false}
                    noBottomColumns
                    paginationLabel={[
                        <LeftArrow style={{height: '15px', }} />, 
                        <RightArrow style={{ height: '15px' }} />
                      ]}
                />
            </div>
        </div>
    );
}

export default PaymentHistory;
