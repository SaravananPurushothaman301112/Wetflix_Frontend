import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionHistory } from "../../../Redux/Actions";
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Styles from './Index.module.css';
import Profile1 from '../../../assets/images/profileCoverDp.png';
import Rectangle from "../../../assets/images/rectangleShape.png";
import { ReactComponent as LeftArrow } from "../../../assets/SvgIcons/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../../assets/SvgIcons/RightArow.svg"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  border: 'px solid #ECF0F4',
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function PaymentDataTable() {
  const dispatch = useDispatch();
  const getPaymentResponse = useSelector((payment) => payment.GetPayment.transactionDetails);
  const UserIDDataHome = JSON.parse(localStorage.getItem("auth"));

  const [selectedData, setSelectedData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    dispatch(getTransactionHistory(UserIDDataHome.userId));
  }, [dispatch, UserIDDataHome.userId]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    let time = Number(timestamp); 
    if (isNaN(time)) {
        console.error("Invalid timestamp:", timestamp);
        return "Invalid Date"; 
    }

    const date = new Date(time < 10000000000 ? time * 1000 : time);

    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = date.getDate(); 
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};


  
  

  const handleOpenAlert = (data) => {
    setSelectedData(data);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => setOpenAlert(false);

  const data = {
    columns: [
      { label: '', field: 'profile', sort: 'disabled', width: 150  },
      { label: "Amount", field: "amount", sort: "asc", width: 150 },
      { label: "REF ID", field: "reference", sort: "asc", width: 200 },
      { label: "Description", field: "description", sort: "asc", width: 200 },
      { label: "Date", field: "date", sort: "asc", width: 150 },
      { label: "Payment Method", field: "paymentMethod", sort: "asc", width: 200 },
      { label: "Status", field: "status", sort: "asc", width: 150 },
      // { label: "", field: "action", sort: "disabled", width: 100 }
    ],
    rows: Array.isArray(getPaymentResponse?.data) ? getPaymentResponse.data.map((row) => ({
  profile: (
    <div className="profileContainer">
        <img className="img1" src={Rectangle} alt="Background" />
    </div>
  ),
  amount: (
    <span>
      <strong>${row.amount}</strong>{" "}
      <span style={{ color: "#A0A0A0" }}>{row.currency}</span>
    </span>
  ),
  reference: row.reference,
  description: row.description, // ✅ FIXED LINE
  date: row.createdat ? formatDate(row.createdat) : "N/A",
  paymentMethod: 'Credit/Debit Card',
  status: (
    <div
      style={{
        color: row.paymentstatus === 'Failed' ? '#E46A11' : '#0D894F',
        backgroundColor: row.paymentstatus === 'Failed' ? '#FDF1E8' : '#E7F4EE',
        width: 'fit-content',
        borderRadius: '100px',
        padding: '4px 12px',
        textAlign: 'center',
      }}
    >
      <div>Success</div>
    </div>
  ),
  action: (
    <Button onClick={() => handleOpenAlert(row)}>
      <MoreVertSharpIcon />
    </Button>
  )
})) : []

  };

  return (
    <div className={Styles.main} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', padding: '0 15px' }}>
        <MDBDataTable
          data={data}
          paging={true}       // Enable pagination
          searching={true}    // Enable search
          sortable={true}     // Enable sorting
          info={true}         // Enable table info
          responsive={true} 
          entries={10}   // Enable responsiveness
          noBottomColumns     // Hide the "bottom columns" section
          paginationLabel={[
            <LeftArrow style={{ height: '15px', }} />,
            <RightArrow style={{ height: '15px' }} />
          ]} 
        />
      </div>

    </div>
  );
}
