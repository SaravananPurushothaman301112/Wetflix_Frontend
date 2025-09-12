import React, { PureComponent, useState } from 'react'
import "./advertisementpaymentpage.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import GreenVector from "../../../../assets/images/vectorGreen.png"
import UsersIcon from '../../../../assets/images/usersIcon.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from "../../../../assets/images/menuDotsIcon.png"
import Profile1 from '../../../../assets/images/profileCoverDp.png'
import Rectangle from "../../../../assets/images/rectangleShape.png"
import Paper from '@mui/material/Paper';
import { LineChart, Line, XAxis, YAxis, Area, CartesianGrid, Legend, AreaChart } from "recharts"
import { ResponsiveContainer } from 'recharts';
import { ComposedChart } from 'recharts';
import { Tooltip } from 'recharts';
import { Bar } from 'recharts';
import { BarChart } from 'recharts';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import Violet from "../../../../assets/images/violet.png"
import SkyBlue from "../../../../assets/images/skyBlue.png"
import { Box } from '@mui/material';
import Button from '@mui/material';
import { Typography } from '@mui/material';
import { Modal } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import KeyboardCommandKeyOutlinedIcon from '@mui/icons-material/KeyboardCommandKeyOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { Draggable, Droppable } from 'react-drag-and-drop'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import uploadCampaign from "../../../../assets/SvgIcons/uploadcampaign.svg"
import chooseFile from "../../../../assets/SvgIcons/ChooseFile.svg"


import Water from '../../../../assets/images/waterDrop.png'
import AdvertisementTaleData from './AdvertisementTaleData';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const cardData = [
  {
    cardHead: " Ads run in total",
    cardBody: "39",
    cardBodyNumber: "+3",
    CardBodyPara: "in last 6 months",
    cardBodyImage: <img src={UsersIcon} />,
    cardHeadIcon: <KeyboardArrowRightIcon />

  },
  {
    cardHead: "Overall clicks",
    cardBody: "6281",
    cardBodyNumber: "+18",
    CardBodyPara: "within 37 campaigns ran",
    cardBodyImage: <img src={UsersIcon} />,
    cardHeadIcon: <KeyboardArrowRightIcon />

  },
  {
    cardHead: "Average click rate",
    cardBody: "47%",
    cardBodyNumber: "-2.1%",
    CardBodyPara: "Users onboarded",
    cardBodyImage: <img src={UsersIcon} />,
    cardHeadIcon: <KeyboardArrowRightIcon />

  },
  {
    cardHead: "Conversion Rate",
    cardBody: "28",
    cardBodyNumber: "+3",
    CardBodyPara: "Users onboarded",
    cardBodyImage: <img src={UsersIcon} />,
    cardHeadIcon: <KeyboardArrowRightIcon />

  },

]

const data = [
  {
    month: "April",
    clicks: 185,
    spent: 176
  },
  {
    month: "May",
    clicks: 180,
    spent: 250
  },
  {
    month: "June",
    clicks: 191,
    spent: 1056
  },
  {
    month: "July",
    clicks: 192,
    spent: 2756
  },
  {
    month: "Aug",
    clicks: 100,
    spent: 3250
  },
  {
    month: "Sep",
    clicks: 90,
    spent: 3556
  },
]

const data1 = [
  {
    name: 'Mon',
    uv: 85,
  },
  {
    name: 'Tue',
    uv: 71,
  },
  {
    name: 'Wed',
    uv: 78,
  },
  {
    name: 'Thu',
    uv: 130,
  },
  {
    name: 'Fri',
    uv: 57,
  },
  {
    name: 'Sat',
    uv: 85,
  },
  {
    name: 'Sun',
    uv: 122,
  },
];




function AdvertisementPaymentPage() {


  // Function to trigger the file input click event
  const triggerFileInput = () => {
    document.querySelector('#fileInput').click();
  }


  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileName, setSelectedFileName] = useState("Upload File");

  // Function to handle the file selection and store the file object
  const onFileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);             // Update selected file state
      setSelectedFileName(file.name);    // Update file name state
    }
  }



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [cardVisible, setCardVisible] = useState("FirstModel")

  return (
    <>
      <div className='cardContainer'>
        {cardData.map((card) => (
          <div className='card1'>
            <div className='cardHead'>
              <p className='cardHeadP1'>{card.cardHead}</p>
              <p className='cardHeadP2'>{card.cardHeadIcon}</p>
            </div>
            <div className='cardBody'>
              <div className='cardBodyContainer'>
                <div className='cardBodyThings'>
                  <p className='cardBodyThingsP1' >{card.cardBody}</p>
                  <p className='cardBodyNumber'><span style={{
                    color: card.cardBodyNumber >= +3 ? "#147138" : card.cardBodyNumber <= "-3%" ? "#A9281E" : "yellow",
                    backgroundColor: card.cardBodyNumber >= +3 ? "#E7F4EE" : card.cardBodyNumber <= "-3%" ? "#FDEDEC" : "Yellow",
                    width: "63px",
                    height: "26px",
                    borderRadius: "100px",
                    padding: "4px 12px",
                    gap: "4px",
                  }}>{card.cardBodyNumber}{<img src={GreenVector} />}</span></p>
                </div>
                <p className='cardBodyBottom'>{card.CardBodyPara}</p>
              </div>
              <div className='cardImage'>
                {card.cardBodyImage}
              </div>
            </div>
          </div>
        ))}

      </div>
      <hr></hr>
      <div className='graphs'>

        <div className='areaGraph'>
          <div className='areaGraphHead'>
            <div className="areaGraphHead1">
              <p>Overall clicks</p>
            </div>
            <div className="areaGraphHead2">
              <p className="p1"><img src={Violet} />clicks</p>
              <p className="p2"><img src={SkyBlue} />spent</p>
            </div>
            <div className="areaGraphHead3">
              <select>
                <option>Past 6 months</option>
                <option>Past 4 months</option>
                <option>Past 3 months</option>
              </select>
              {/* <img src={Menu} /> */}
            </div>
          </div>

          {/* Use ResponsiveContainer to handle the chart's responsiveness */}
          <div className="areaChart">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data} margin={{ top: 10, right: 0, left: 35, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#78AAED" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8DDFE7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis stroke='#98A6B3' dataKey="month" axisLine={false} tickLine={false}  padding={{ left: 20 }} />
                <YAxis stroke='#98A6B3' axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="clicks" stroke="#5BD1DC" fillOpacity={1} fill="url(#colorPv)" />
                <Area type="monotone" dataKey="spent" stroke="#3480E5" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div className='barGraph'>
          <div className='barGraphHead'>

            <p>Ads run</p>
            <div className='barGraphHead1'>
              <select>
                <option>This week</option>
                <option>Next week</option>
              </select>
              {/* <button><img src={Menu} /></button> */}
            </div>
          </div>

          {/* Use ResponsiveContainer to handle the chart's responsiveness */}
          <div className="areaChart">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={data1} margin={{ top: 0, right: 0, left: 35, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPvv" x1="1" y1="0" x2="1" y2="1">
                    <stop offset="5%" stopColor="#5BD1DC" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#5BD1DC" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke='#98A6B3' tickLine={false} />
                <YAxis stroke='#98A6B3' tickLine={false} />
                <Bar dataKey="uv" barSize={40} radius={[10, 10, 10, 10]} fillOpacity={1} fill="url(#colorPvv)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className='campaignsHead'>
            <p>Campaigns</p>
            <div className='buttons'>
              <button className='bb1'>View all</button>
              <button className='bb2' onClick={handleOpen}>+ Start a new campaign</button>

              <Modal
                open={open}
                onClose={handleClose}
              >
                <Box 
                className="responsiveBox"
                
              >
                  {cardVisible === "FirstModel" ? (
                    <div  className='boxM'>
                      <p className='closeIcon' onClick={handleClose}><CloseIcon /></p>
                      <p className='title'>Start a campaign</p>
                      <div className='pointsContainer'>
                        <div className='point1'>
                          <button className='button1'>1</button>
                          <p className='pointBody'>Fill in campaign details</p>
                          <button className='rightArrowIcon'><KeyboardArrowRightIcon /></button>
                        </div>

                        <div className='point2'>
                          <button className='button2'>2</button>
                          <p className='pointBody'>Tailor your campaign</p>
                          <button className='rightArrowIcon'><KeyboardArrowRightIcon /></button>
                        </div>

                        <div className='point3'>
                          <button className='button3'>3</button>
                          <p className='pointBody'>Launch your campaign </p>
                          <button className='rightArrowIcon'><KeyboardArrowRightIcon /></button>
                        </div>

                      </div>
                      <div className='selectContainer'>
                        <p className='selectTitle'> Campaign type</p>
                        <div className='formContainer'>
                          {/* <FormControl fullWidth className='form'>
                        <InputLabel className='inputLabel'><MapOutlinedIcon />Lorem ipsum campaign</InputLabel>
                        <Select>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl> */}
                          <FormControl sx={{ m: 1, minWidth: 120 }} className='form'>
                            <Select

                              className='inputLabel'
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            {/* <FormHelperText>Without label</FormHelperText> */}
                          </FormControl>

                        </div>
                      </div>
                      <div className='textContainer'>
                        <p>Campaign name</p>
                        <div className='textBlock'>
                          <TextField className='text' placeholder='Enter a campaign name using few words' fullWidth></TextField>
                        </div>
                      </div>
                      <div className='dateContainer'>
                        <div className='startDate'>
                          <p>Start date</p>
                          <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker className="calender" />
                          </LocalizationProvider>
                        </div>
                        <div className='endDate'>
                          <p>End date</p>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className="calender" />
                          </LocalizationProvider>
                        </div>
                      </div>
                      <div className='buttons'>
                        <button className='cancel' onClick={handleClose}>Cancel</button>
                        <button className='continueButton' onClick={() => { setCardVisible("secondModel") }}>Continue</button>
                      </div>
                    </div>
                  ) : cardVisible === "secondModel" ? (
                    <div  className='boxM'>
                      <p className='closeIcon' onClick={handleClose}><CloseIcon /></p>
                      <p className='title'>Start a campaign</p>
                      <div className='pointsContainer'>
                        <div className='point1'>
                          <button className='buttonNo1'>1</button>
                          <p className='pointBody1'>Fill in campaign details</p>
                          <button className='rightArrowIcon'><KeyboardArrowRightIcon /></button>
                        </div>

                        <div className='point2'>
                          <button className='buttonNo2'>2</button>
                          <p className='pointBody2'>Tailor your campaign</p>
                          <button className='rightArrowIcon'><KeyboardArrowRightIcon /></button>
                        </div>

                        <div className='point3'>
                          <button className='buttonNo3'>3</button>
                          <p className='pointBody'>Launch your campaign </p>
                          <button className='rightArrowIcon'><KeyboardArrowRightIcon /></button>
                        </div>

                      </div>
                      <div className='dragAndDropContainer'>
                        <p className='dndP' >Upload a cover image</p>
                        <div className='Coverimg'>
                          <h3> Drag and drop an image</h3>
                          <p> Please make sure the image size is 800x800 and does not exceed 5MB in size.</p>
                          <img src={uploadCampaign} />
                          <p>or</p>


                          <div class="filename icon" onClick={triggerFileInput}>
                            <input type="file" id="fileInput" accept="image/png, image/jpg, image/jpeg" onChange={onFileSelected} hidden />
                            <button type="file">
                              <span id="selectedFileName">{selectedFileName}</span>
                              <img src={chooseFile} />
                            </button>

                          </div>



                        </div>
                        <div>



                          <Droppable>
                          </Droppable>
                        </div>
                      </div>
                      <div className='textContainer0'>
                        <div className='textTitle0'>
                          <p className='para1'>Advertisement title <span className='para2'> Lorem ipsum dolor sitet 10 words</span></p>
                          {/* <p className='para2'> Lorem ipsum dolor sitet 10 words</p> */}
                        </div>
                        <div className='textBlock'>
                          <TextField className='text' placeholder='Enter the title of your advertisement' fullWidth></TextField>
                        </div>
                      </div>

                      <div className='textContainer1'>
                        <div className='textTitle1'>
                          <p className='para1'>Advertisement sub title (optional) <span className='para2'>Lorem ipsum dolor sitet 15 words</span></p>
                          {/* <p className='para2'>Lorem ipsum dolor sitet 15 words</p> */}
                        </div>
                        <div className='textBlock1'>
                          <TextField className='text' placeholder='Enter the title of your advertisement' fullWidth></TextField>
                        </div>
                      </div>

                      <div className='textContainer2'>
                        <div className='textTitle2'>
                          <p>CTA Copy</p>
                        </div>
                        <div className='textBlock2'>
                          <TextField className='text' placeholder='Enter the copy text of the CTA button' fullWidth></TextField>
                        </div>
                      </div>

                      <div className='buttons'>
                        <button className='cancel' onClick={() => setCardVisible("FirstModel")}>Cancel</button>
                        <button className='continueButton' onClick={() => setCardVisible(" ")}>Continue</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: "50%" }} className='boxM' >
                      <p className='closeIcon' onClick={handleClose}><CloseIcon /></p>
                      <p className='title'>Start a campaign</p>
                      <div className='pointsContainer'>
                        <div className='point'>
                          <button className='buttonNo_1'>1</button>
                          <p className='pointBody3'>Fill in campaign details</p>
                          <button className='rightArrowIcon1'><KeyboardArrowRightIcon /></button>
                        </div>

                        <div className='point2'>
                          <button className='buttonNo_2'>2</button>
                          <p className='pointBody3'>Tailor your campaign</p>
                          <button className='rightArrowIcon1'><KeyboardArrowRightIcon /></button>
                        </div>

                        <div className='point3'>
                          <button className='buttonNo_3'>3</button>
                          <p className='pointBody3'>Launch your campaign </p>
                          <button className='rightArrowIcon1'><KeyboardArrowRightIcon /></button>
                        </div>
                      </div>

                      <div className='preview'>
                        <p>Preview</p>
                      </div>
                      <div className='campaignModelThree'>
                        <div className='shapes'>
                          <div className='subShapes1'>
                            <div className='circleShape'></div>
                            <div className='rectangularShape'></div>
                          </div>
                          <div className='subShapes'>
                            <div className='squareShape'></div>
                            <div className='squareShape'></div>
                            <div className='rectangleShape'></div>
                          </div>
                        </div>
                        <div className='bodyContainer'>
                          <div className='smallShapes'>
                            <div className='smallSquare'></div>
                            <div className='smallRectangle'></div>
                            <div className='smallRectangle'></div>
                            <div className='smallRectangle'></div>
                          </div>
                          <div className='verticalLine'></div>
                          <div className='bodyContent'>
                            <img src={Water} alt='water' />
                            <div className='bodyPara'>
                              <p className='para1'>Lorem Ipsum dolor sitet now!</p>
                              <p className='para2'>Semper tortor in egestas in dolor fames. Lacus netus egestas et.</p>
                            </div>
                            <button>Get Started</button>
                          </div>
                        </div>
                      </div>

                      <div className='buttons'>
                        <button className='cancelButton' onClick={() => setCardVisible("secondModel")}>Cancel</button>
                        <button className='confirmButton' onClick={() => { setCardVisible("FirstModel"); setOpen(false) }}>Confirm and pay</button>
                      </div>
                    </div>
                  )}
                </Box>
              </Modal>
            </div>

          </div>
          <AdvertisementTaleData />
        </div>
      </div>
    </>
  )
}

export default AdvertisementPaymentPage