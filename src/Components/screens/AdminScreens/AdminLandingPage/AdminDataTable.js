
import React, { useEffect, useState } from "react";
import { MDBDataTable } from 'mdbreact';
import './Usersanddevicespage.css';
import Menu from "../../../assets/images/menuDotsIcon.png";
import Profile1 from '../../../assets/images/profileCoverDp.png';
import Rectangle from "../../../assets/images/rectangleShape.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllDevices } from '../../../Redux/Actions';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function AdminDataTable() {

    const dispatch = useDispatch();
    const deviceSet = useSelector(device => device.Device?.deviceResponse || {}); // Default to empty object if undefined
    const [sortOrder, setSortOrder] = useState('asc'); // State to track sorting order

    useEffect(() => {
        dispatch(getAllDevices());
    }, [dispatch]);

    // Function to toggle sorting by nextmaintenance (Next Cleaning date)
    const handleSortByDate = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
    };

    // Check if deviceSet.data is available before mapping
    const sortedRows = deviceSet.data ? deviceSet.data.map(row => 
        row.devices.map(device => ({
            profile: (
                <div className="profileContainer">
                    <img className="img1" src={Rectangle} alt="Background" />
                    <img className="img2" src={Profile1} alt="Profile" />
                </div>
            ),
            username: device.username,
            waterlevel: device.waterlevel,
            devicesCount: row.devicesCount,
            nextmaintenance: new Date(device.nextmaintenance).toLocaleDateString("en-GB", {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                timeZone: 'America/Port_of_Spain'
            }),
            
            nextmaintenanceDate: new Date(device.nextmaintenance), // Raw date for sorting
            devicestatus: (
                <span style={{
                    color: device.devicestatus === 'Disconnected' ? '#E46A11' : device.devicestatus === 'ACTIVE' ? '#0D894F' : '#545F71',
                    backgroundColor: device.devicestatus === 'Disconnected' ? '#FDF1E8' : device.devicestatus === 'ACTIVE' ? '#E7F4EE' : '#EEF1F4',
                    borderRadius: '100px',
                    padding: '4px 12px',
                    textAlign: 'center'
                }}>
                    {device.devicestatus}
                </span>
            ),
            lastupdated: new Date(device.lastupdated).toLocaleDateString("en-GB", {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                timeZone: 'America/Port_of_Spain'
            }),
            
            menu: <MoreVertIcon/>
        }))
    ).flat() : []; // Handle empty or undefined data safely

    // Sort rows by 'nextmaintenanceDate' when sorting is triggered
    const sortedData = sortOrder === 'asc'
        ? sortedRows.sort((a, b) => new Date(a.nextmaintenanceDate) - new Date(b.nextmaintenanceDate))
        : sortedRows.sort((a, b) => new Date(b.nextmaintenanceDate) - new Date(a.nextmaintenanceDate));

        const data = {
            columns: [
                { label: '', field: 'profile', sort: 'disabled', width: 150 },
                { label: 'User Name', field: 'username', sort: 'disabled', width: 200 },
                { label: 'Water Level', field: 'waterlevel', sort: 'disabled', width: 100 },
                { label: 'No. of Devices', field: 'devicesCount', sort: 'disabled', width: 100 },
                { label: 'Next Cleaning', field: 'nextmaintenance', sort: 'disabled', width: 150 },
                { label: 'Status', field: 'devicestatus', sort: 'disabled', width: 100 },
                { label: 'Last Updated', field: 'lastupdated', sort: 'disabled', width: 150 },
                // { label: '', field: 'menu', sort: 'disabled', width: 50 }
            ],
            rows: sortedData.slice(0, 2) 
        };
        

    return (
        <>
            {/* <hr /> */}
            <div>
              
                <div className='tableContainer'>
                    <MDBDataTable
                        responsive
                        data={data}
                        paging={false} searching={false} info={false}
                        // entries={10}
                        noBottomColumns
                    />
                </div>
            </div>
        </>
    );
}
