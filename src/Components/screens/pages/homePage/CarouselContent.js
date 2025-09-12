import { useState } from "react";
import Styles from "./Index.module.css";
import LeftArrowButton from "../../../assets/images/LeftArrowButton.png";
import RightArrowButton from "../../../assets/images/RightArrowButton.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function CarouselContent() {

  const [filterReplace, setReplaceFilter] = useState('');
  const [tankCleanUp, setTankCleanUp] = useState([]);

  const getAllDeviceListByIdResponse = useSelector(
    (device) => device.DeviceList.deviceDataByDeviceId
  );
  console.log(getAllDeviceListByIdResponse,"bjhvhsfd")

  useEffect(() =>{
    if(getAllDeviceListByIdResponse.statusCode === 200){
      function daysRemaining(futureDate) {
        const targetDate = new Date(futureDate);
        const currentDate = new Date();
        const timeDifference = targetDate - currentDate;
        const daysDifference = Math.ceil(timeDifference / (1000*60*60*24));
        return daysDifference;
      }
      setReplaceFilter(daysRemaining(getAllDeviceListByIdResponse.data.filterReplace))
      setTankCleanUp(daysRemaining(getAllDeviceListByIdResponse.data.tankCleanup))
    }
  })
  console.log("filterReplace", filterReplace);
  console.log("tankCleanUp", tankCleanUp)
  const [open, setOpen]=useState(false)
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const handleOpenClose=()=>{
    if(open === false){
        setOpen(true)
    }if(open === true){
        setOpen(false)
    }
}
return (
  <div className={Styles.CarouselContainer}>
    {open === false ?
    <div className={Styles.HomePageDeviceManagement}>
      <div className={Styles.HomePageDeviceManagementHeaderContent}>
        <button className={Styles.HomePageDeviceManagementHeaderButton} onClick={()=> handleOpenClose()}>
          {/* {/ <img src={LeftArrowButton} alt="" />{" "}  /} */}
        </button>
        <p className={Styles.HomePageDeviceManagementText}>
          Device Maintenance
        </p>
        <button className={Styles.HomePageDeviceManagementHeaderButton} onClick={()=> handleOpenClose()}>
           {/* {/ <img src={RightArrowButton} alt="" />{" "}  /} */}
        </button>
      </div>
      <div className={Styles.HomePageDeviceManagementTextContent}>
      <div className={Styles.HomePageDeviceManagementContentData}>
        <p className={Styles.HomePageDeviceManagementContentDataCircle}></p>
        <p className={Styles.HomePageDeviceManagementContentDataText}>
          Replace filter      
        </p>
        <p className={Styles.HomePageDeviceManagementContentDataTextWork}>
          in every
        </p>
      </div>
      <p className={Styles.ReplaceFilter}>
      {`${"180"}`} Days
      </p>
    </div>
      <div className={Styles.HomePageDeviceManagementTextContent}>
        <div className={Styles.HomePageDeviceManagementContentData}>
          <p className={Styles.HomePageDeviceManagementContentDataCircle}></p>
          <p className={Styles.HomePageDeviceManagementContentDataText}>
            Tank cleanup
          </p>
          <p className={Styles.HomePageDeviceManagementContentDataTextWork}>
            in
          </p>
        </div>
        <p className={Styles.HomePageDeviceManagementContentDataTextWorkDays}>
        {getAllDeviceListByIdResponse.data?.tankCleanupRemainingDays}{"  "}Days
        </p>
      </div>

        
        <div className={Styles.HomePageDeviceManagementTextContentLine}>
          <div className={Styles.HomePageDeviceManagementContentData}>
            <p className={Styles.HomePageDeviceManagementContentDataCircle}></p>
            <p className={Styles.HomePageDeviceManagementContentDataText}>
              Lorem ipsum dolor sit amet consectetur. Id placerat libero at
              venenatis congue nascetur elementum.
            </p>
          </div>
        </div>
      </div>
        :
      <div className={Styles.HomePageDeviceManagement}>
        {/* <div className={Styles.HomePageDeviceManagementHeaderContent}>
          <button className={Styles.HomePageDeviceManagementHeaderButton} onClick={()=> handleOpenClose()}>
            <img src={LeftArrowButton} alt="" />{" "}
          </button>
          <p className={Styles.HomePageDeviceManagementText}>Device Details</p>
          <button className={Styles.HomePageDeviceManagementHeaderButton} onClick={()=> handleOpenClose()}>
            <img src={RightArrowButton} alt="" />{" "}
          </button>
        </div>
        <div className={Styles.HomePageHardwareInformationContainer}>
          <div className={Styles.HomePageHardwareInformationContent}>
            <div className={Styles.HomePageHardwareInformationTextContent}>
              <p className={Styles.HomePageHardwareInformationTextContentText}>
                Device Voltage
              </p>
              <p
                className={Styles.HomePageHardwareInformationTextContentVersion}
              >
                4.2V
              </p>
            </div>
            <p
              className={
                Styles.HomePageHardwareInformationTextContentLineBorder
              }
            ></p>
          </div>
          <div className={Styles.HomePageHardwareInformationContent}>
            <div className={Styles.HomePageHardwareInformationTextContent}>
              <p className={Styles.HomePageHardwareInformationTextContentText}>
                Auxiliary Power
              </p>
              <p
                className={Styles.HomePageHardwareInformationTextContentVersion}
              >
                ON
              </p>
            </div>
            <p
              className={
                Styles.HomePageHardwareInformationTextContentLineBorder
              }
            ></p>
          </div>

          <div className={Styles.HomePageHardwareInformationContent}>
            <div className={Styles.HomePageHardwareInformationTextContent}>
              <p className={Styles.HomePageHardwareInformationTextContentText}>
                Sensor Status
              </p>
              <p
                className={Styles.HomePageHardwareInformationTextContentVersion}
              >
                {Math.floor(Math.random() * 100) + 1}%
              </p>
            </div>
            <p
              className={
                Styles.HomePageHardwareInformationTextContentLineBorder
              }
            ></p>
          </div>
        </div> */}
        <div className={Styles.HomePageHardwareInformationContainerFooter}>
          <p className={Styles.HomePageHardwareInformationContainerFooterText}>
            Last updated: {time} ,{date}
          </p>
        </div>
      </div>}
    </div>
  );
}

export default CarouselContent;
