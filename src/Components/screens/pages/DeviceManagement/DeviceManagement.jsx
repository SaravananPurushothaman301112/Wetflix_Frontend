import React from 'react'
import './DeviceManagement.scss'
import {ReactComponent as PlusIcon} from '../../../assets/SvgIcons/PlusIcon.svg'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import Rectangle from '../../../assets/images/Rectangle.png'
import DeviceManagementTable from './DeviceManagementTable';
import "./DeviceManagement.css"

const DeviceManagement = () => {

 
  return (
    <div className='DeviceManagement'>
        <div className='Top'>
            <div className='HeadTextAddButton'>
                <div className='HeadText'>
                    <p></p>
                </div>
                {/* <div className='AddButton'>
                    <button><PlusIcon/>Add device</button>
                </div> */}
            </div>
        </div>
        <DeviceManagementTable/>
    </div>
  )
}

export default DeviceManagement