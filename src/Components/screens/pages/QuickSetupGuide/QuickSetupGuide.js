import React, { useState } from "react";
import Styles from "./Index.module.css";
import QuickSetUpImage from "../../../assets/images/QuickSetUpImage.png";
import waterdrop from "../../../assets/videos/Waterdrop1.mp4";
import ADDCollasble from "../../../assets/images/ADDCollasble.png";
import CancelCollasble from "../../../assets/images/CancelCollasble.png";
// import {ReactComponent as bulletMark} from "../../../assets/SvgIcons/bulletMark.svg"
import { ReactComponent as Bullet } from "../../../assets/SvgIcons/bulletMark.svg";

const QuickSetupGuide = () => {
  const [open, setOpen] = useState(false);
  const [openOne, setOpenOne] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [openThree, setOpenThree] = useState(false);

  const handleOpenCloseTable = () => {
    if (open === false) {
      setOpen(true);
    }
    if (open === true) {
      setOpen(false);
    }
  };
  const handleOpenCloseTableOne = () => {
    if (openOne === false) {
      setOpenOne(true);
    }
    if (openOne === true) {
      setOpenOne(false);
    }
  };

  const handleOpenCloseTableTwo = () => {
    if (openTwo === false) {
      setOpenTwo(true);
    }
    if (openTwo === true) {
      setOpenTwo(false);
    }
  };
  const handleOpenCloseTableThree = () => {
    if (openThree === false) {
      setOpenThree(true);
    }
    if (openThree === true) {
      setOpenThree(false);
    }
  };

  return (
    <div className={Styles.QuickSetupGuideMainContainer}>
      <div className={Styles.QuickSetupGuideContainer}>
        <p className={Styles.QuickSetupGuideContainerText}>Quick setup guide</p>
        <div className={Styles.QuickSetupGuideContent}>
          <div className={Styles.QuickSetupGuideContentStepOne}>
            <p className={Styles.QuickSetupGuideContentStepText}>Step 1</p>
            <p className={Styles.QuickSetupGuideContentStepVulputate}>
            Power On & Connect to Wi-Fi 
            </p> 
            <div className={Styles.bulletPoints}>
            <span><Bullet/></span><p className={Styles.QuickSetupGuideContentStepPharagrph}>
            
            Turn on the device (it starts in AP mode).

            </p>
            </div>
            <div className={Styles.bulletPoints}>
            <span><Bullet/></span><p className={Styles.QuickSetupGuideContentStepPharagrph}>
            
             On your mobile phone, access the configuration page.
            </p>
            </div>
            <div className={Styles.bulletPoints}>
          <span><Bullet/></span><p className={Styles.QuickSetupGuideContentStepPharagrph}>
            
            Enter your Wi-Fi SSID and password to connect the device to the internet.
            </p>
            </div>
            <div className={Styles.QuickSetupGuideContentImageContent}>
              <img src={QuickSetUpImage} alt="" />
            </div>
          </div>
          <div className={Styles.QuickSetupGuideContentStepOne}>
            <p className={Styles.QuickSetupGuideContentStepText}>Step 2</p>
            <p className={Styles.QuickSetupGuideContentStepVulputate}>
            Configure the Device 
            </p>
            <div className={Styles.bulletPoints}>
            <span><Bullet/></span><p className={Styles.QuickSetupGuideContentStepPharagrph}>
            
            Enter Device ID, User ID, Tank Max & Min Heights, and Tank Model in the configuration page.

            </p>
            </div>
            <div className={Styles.bulletPoints}>
            <span><Bullet/></span><p className={Styles.QuickSetupGuideContentStepPharagrph}>
            
            Once setup is complete, the device switches to Station mode and connects to the cloud.
            </p>
            </div>
            <div className={Styles.bulletPoints}>
            <span><Bullet/></span><p className={Styles.QuickSetupGuideContentStepPharagrph}>
            
            Check the dashboard to confirm data is being sent successfully.
            </p>
            </div>
            <div className={Styles.QuickSetupGuideContentImageContent}>
              <img src={QuickSetUpImage} alt="" />
            </div>
          </div>
          <div className={Styles.QuickSetupGuideContentStepOne}>
            <p className={Styles.QuickSetupGuideContentStepText}>Step 3</p>
            <p className={Styles.QuickSetupGuideContentStepVulputate}>
            Troubleshooting & Reset
            </p>
            <div className={Styles.bulletPoints}>
            <span><Bullet/></span><p className={Styles.QuickSetupGuideContentStepPharagrph}>
            
            If data does not appear in the dashboard, check your internet connection.

            </p>
            </div>
            <div className={Styles.bulletPoints}>
            <span><Bullet/></span><p className={Styles.QuickSetupGuideContentStepPharagrph}>
            
            The device retries for 2 minutes before requiring manual reset.

            </p>
            </div>
            <div className={Styles.bulletPoints}>
            <span><Bullet/></span><p className={Styles.QuickSetupGuideContentStepPharagrph}>
            
            To change Wi-Fi credentials or tank settings, manually reset the device.
            </p>
            </div>
            <div className={Styles.QuickSetupGuideContentImageContent}>
              <img src={QuickSetUpImage} alt="" />
            </div>
          </div>
        </div>
        <div className={Styles.QuickSetupGuideVideAndQAContainer}>
          <div className={Styles.QuickSetUpVideo}>
            <video 
              className={Styles.QuickSetUpVideoVideo} 
              src={waterdrop} 
              controls  
              autoPlay 
              loop 
              muted 
            />
          
            <p className={Styles.QuickSetUpVideoText}>
              Watch this quick video setup guide
            </p>
          </div>
          <div className={Styles.QuickSetUpFQAContainer}>
            <p className={Styles.QuickSetUpFQAContainerTitle}>
              FAQ (Frequently asked questions)
            </p>
            <div className={Styles.QuickSetUpFQAContent}>
              <div
                className={Styles.collapseTableContent}
                onClick={() => handleOpenCloseTable()}
              >
                <div className={Styles.collapseTableContentTitle} style={{backgroundColor: open === true ? "#E6EBF6":"#fff"}}>
                  <p className={Styles.collapseTableContentText}>
                    Nunc orci amet et fames quam amet a.
                  </p>{" "}
                  {open === false ? (
                    <img src={ADDCollasble} alt="" />
                  ) : (
                    <img src={CancelCollasble} alt="" />
                  )}
                </div>
                {open === true ? (
                  <p className={Styles.collapseTableContentContent}>
                    Lacus facilisis neque egestas felis nascetur imperdiet
                    sapien sollicitudin nibh. Ac felis ac porta consequat
                    pretium.{" "}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={Styles.QuickSetUpFQAContent}>
              <div
                className={Styles.collapseTableContent}
                onClick={() => handleOpenCloseTableOne()}
              >
                <div className={Styles.collapseTableContentTitle} style={{backgroundColor: openOne === true ? "#E6EBF6":"#fff"}}>
                  <p className={Styles.collapseTableContentText}>
                  Lectus sagittis aliquet integer ac ac tempus eu vitae.
                  </p>{" "}
                  {openOne === false ? (
                    <img src={ADDCollasble} alt="" />
                  ) : (
                    <img src={CancelCollasble} alt="" />
                  )}
                </div>
                {openOne === true ? (
                  <p className={Styles.collapseTableContentContent}>
                    Lacus facilisis neque egestas felis nascetur imperdiet
                    sapien sollicitudin nibh. Ac felis ac porta consequat
                    pretium.{" "}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={Styles.QuickSetUpFQAContent}>
              <div
                className={Styles.collapseTableContent}
                onClick={() => handleOpenCloseTableTwo()}
              >
                <div className={Styles.collapseTableContentTitle} style={{backgroundColor: openTwo === true ? "#E6EBF6":"#fff"}}>
                  <p className={Styles.collapseTableContentText}>
                  Sagittis venenatis pellentesque eu quam amet.
                  </p>{" "}
                  {openTwo === false ? (
                    <img src={ADDCollasble} alt="" />
                  ) : (
                    <img src={CancelCollasble} alt="" />
                  )}
                </div>
                {openTwo === true ? (
                  <p className={Styles.collapseTableContentContent}>
                    Lacus facilisis neque egestas felis nascetur imperdiet
                    sapien sollicitudin nibh. Ac felis ac porta consequat
                    pretium.{" "}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={Styles.QuickSetUpFQAContent}>
              <div
                className={Styles.collapseTableContent}
                onClick={() => handleOpenCloseTableThree()}
              >
                <div className={Styles.collapseTableContentTitle} style={{backgroundColor: openThree === true ? "#E6EBF6":"#fff"}}>
                  <p className={Styles.collapseTableContentText}>
                  A mi magna ultricies aenean leo sit.
                  </p>{" "}
                  {openThree === false ? (
                    <img src={ADDCollasble} alt="" />
                  ) : (
                    <img src={CancelCollasble} alt="" />
                  )}
                </div>
                {openThree === true ? (
                  <p className={Styles.collapseTableContentContent}>
                    Lacus facilisis neque egestas felis nascetur imperdiet
                    sapien sollicitudin nibh. Ac felis ac porta consequat
                    pretium.{" "}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuickSetupGuide;
