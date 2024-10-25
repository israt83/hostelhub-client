import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const HostMenu = () => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label='Add Meal' address='add-meal' />
      <MenuItem icon={MdHomeWork} label='My requesting' address='my-requestring' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Requesting'
        address='manage-requesting'
      />
    </>
  )
}

export default HostMenu
