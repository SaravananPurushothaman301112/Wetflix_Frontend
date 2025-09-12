import React, { useEffect } from "react";
import Styles from "./Index.module.css";
import {ReactComponent as DownLoadIcon} from "../../../assets/SvgIcons/DownLoadIcon.svg";
import {ReactComponent as AddIcon} from "../../../assets/SvgIcons/AddIcon.svg";
import VisaLogo from "../../../assets/images/VisaLogo.png";
import { ReactComponent as EditIcon } from "../../../assets/SvgIcons/EditIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/SvgIcons/DeleteIcon.svg";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ReactComponent as LeftArrowIcon} from "../../../assets/SvgIcons/LeftArrowIcon.svg"
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import {ReactComponent as RectangleGreyIcon} from '../../../assets/SvgIcons/RectangleGreyIcon.svg'
import { Link } from "react-router-dom";
import PaymentDataTable from "./PaymentDataTable";


const PaymentPage=()=>{
      const authUserr = JSON.parse(localStorage.getItem("Booking Id"));
  console.log(authUserr.userplanid,"authUserr")
   
    const Data =[
        {
         id:1, 
         TankName:'$41',
         Status:'Success', 
         WaterLevel:'#39201', 
         LastRefil:'Subscription update', 
         NextMaintainence:'Sep 14, 11:56 PM', 
         LastUpdated:'Credit card'
        },
        {
         id:2, 
         TankName:'$41',
         Status:'Failed', 
         WaterLevel:'#39201', 
         LastRefil:'Subscription update', 
         NextMaintainence:'Sep 14, 11:56 PM', 
         LastUpdated:'Credit card'
        },
        {
         id:3, 
         TankName:'$41',
         Status:'Success', 
         WaterLevel:'#39201', 
         LastRefil:'Subscription update', 
         NextMaintainence:'Sep 14, 11:56 PM', 
         LastUpdated:'Credit card'
        }
    ]

    return(<>
    
        <>
        <div className={Styles.PaymentPageContainer}>
            <div className={Styles.MyCurrentPlanContainer}>
                <p className={Styles.MyCurrentPlanContainerText}>My Current Plan</p>
                <div className={Styles.MyCurrentPlanContainerContent}> 
                    <div className={Styles.MyCurrentPlan}>
                        <p className={Styles.MyCurrentPlanText}>My Current Plan</p>
                        <div className={Styles.MyCurrentPlanBasicWithADSContent}>
                            <p className={Styles.MyCurrentPlanBasicWithADSContentText}>Basic with ads</p>
                            <p className={Styles.MyCurrentPlanBasicWithADSContentTextActive}>Active</p>
                        </div>
                    </div>
                    <div className={Styles.MyCurrentPlan}>
                        <p className={Styles.MyCurrentPlanText}>Ends on</p>
                        <div className={Styles.MyCurrentPlanBasicWithADSContent}>
                            <p className={Styles.MyCurrentPlanBasicWithADSContentText}>20 Aug 2025</p>
                        </div>
                    </div>
                    <div className={Styles.MyCurrentPlan}>
                        <p className={Styles.MyCurrentPlanText}>Paid</p>
                        <div className={Styles.MyCurrentPlanBasicWithADSContent}>
                            <p className={Styles.MyCurrentPlanBasicWithADSContentText}>$120 yearly</p>
                        </div>
                    </div>
                   <Link to="/change_plan" className={Styles.LinkedComponents}><button className={Styles.ChangePlanButton}>Change Plan</button></Link>
                   {/* <button className={Styles.DownloadInvoiceButton}> <DownLoadIcon/>Download invoice</button> */}
                </div>
            </div>
            <div className={Styles.PaymentMethodsContainer}>
                   <div className={Styles.PaymentMethodsAddMoreContainer}>
                    <p className={Styles.PaymentMethodsAddMoreContainerText}>Payment methods</p>
                    <div className={Styles.PaymentMethodsAddMoreContainerButton}>
                    Add a new <AddIcon/>
                    </div>
                   </div>
                   <div className={Styles.PaymentMethodsDetailsContainer}>
                    <div className={Styles.PaymentMethodsContent}>
                        <img src={VisaLogo} alt=""/>
                        <div className={Styles.PaymentMethodsContentTextContainer}>
                            <p className={Styles.PaymentMethodsNumber}> Visa card ending **** 3452</p>
                            <p className={Styles.PaymentMethodsNumberExpireDate}>expires Sep, 2027
                            </p>  
                        </div>
                       
                    </div>
                    <div className={Styles.PaymentMethodsContentIconContainer}>
                                <p className={Styles.PaymentMethodsContentIconIcon}><EditIcon/></p>
                                <p className={Styles.PaymentMethodsContentIconIcon}><DeleteIcon/></p>
                                <p className={Styles.PaymentMethodsContentIconIcon}><MoreVertIcon className={Styles.MoreIconPayment}/></p>
                    </div>
                   </div> 
                   <div className={Styles.PaymentPageTransactionHistoryContainer}>
                        <div className={Styles.PaymentPageTransactionHistoryHeader}>
                            <p className={Styles.PaymentPageTransactionHistoryHeaderText}>Transaction history</p>
                            {/* <div className={Styles.PaymentMethodsAddMoreContainerButton}>
                                View all <LeftArrowIcon/>
                            </div> */}
                        </div>
             {/* <table>
                <thead>
                    <tr className={Styles.TableHead}>
                    <th className={Styles.TableHeadText}></th>
                        <th className={Styles.TableHeadText}>Amount</th>
                        <th className={Styles.TableHeadTextREFID}>REF ID</th>
                        <th className={Styles.TableHeadTextREFID}>Description</th>
                        <th className={Styles.TableHeadText}>Date</th>
                        <th className={Styles.TableHeadText}>PAYMENT method</th>
                        <th className={Styles.TableHeadText}></th>
                    </tr>
                </thead>
                <tbody>
                {getPaymentResponse?.data?.map((data)=> (
                    <tr className={Styles.TableBody} key={data.id}>
                        <RectangleGreyIcon/>
                        <td className={Styles.TankName}>{data.amount}<p className={Styles.TankNameUSD}>TTD</p></td>
                        <td className={Styles.TankName}>{data.reference}</td>
                        <td className={Styles.TankName}>Subscription update</td>
                        <td className={Styles.TankName}>{data.createdat}</td>
                        <td className={Styles.TankName}>Credit Cord</td>
                        <td className={Styles.Status}>
                        <div>
                            <div
                                style={{
                                color: data.Status === 'Success' ? '#0D894F' : data.Status === 'Failed' ? '#890D0D' : '#545F71', 
                                backgroundColor: data.Status === 'Success' ? '#E7F4EE' : data.Status === 'Failed' ? '#F4E7E7' : '#EEF1F4',
                                borderRadius: '100px',
                                padding: '4px 12px',
                                
                                }}
                            >{data.Status}</div>
                        </div>
                        </td>
                        <td><MoreVertSharpIcon /></td>
                    </tr>
                ))}
                </tbody>
            </table> */}
            <PaymentDataTable/>
                   </div>
            </div>
        </div>
        </>
        </>
    )
}
export default PaymentPage