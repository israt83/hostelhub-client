import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import {
  // FaUserCog,
  FaUtensils,
  FaListAlt,
  FaStar,
  FaConciergeBell,
  FaCalendarAlt,
} from "react-icons/fa";
const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />

      <MenuItem icon={FaUtensils} label="Add Meal" address="add-meal" />
      <MenuItem icon={FaListAlt} label="All Meals" address="all-meal" />
      <MenuItem icon={FaStar} label="All Reviews" address="all-reviews" />
      <MenuItem icon={FaConciergeBell}label="Serve Meals"address="manage-serve-meal"/>
      <MenuItem icon={FaCalendarAlt}label="Upcoming Meals" address="upcoming-meal"/>
    </>
  );
};

export default AdminMenu;
