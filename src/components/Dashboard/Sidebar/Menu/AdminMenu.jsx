import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import {
  FaUtensils,
  FaListAlt,
  FaStar,
  FaConciergeBell,
  FaCalendarAlt,
  FaUserPlus 
} from "react-icons/fa";
const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem icon={FaUserPlus } label="All Package user" address="package-user" />
      <MenuItem icon={FaUtensils} label="Add Meal" address="add-meal" />
      <MenuItem icon={FaListAlt} label="All Meals" address="all-meal" />
      <MenuItem icon={FaStar} label="All Reviews" address="all-reviews" />
      <MenuItem
        icon={FaConciergeBell}
        label="Serve Meals"
        address="manage-serve-meal"
      />
      <MenuItem
        icon={FaCalendarAlt}
        label="Upcoming Meals"
        address="upcoming-meal"
      />
    </>
  );
};

export default AdminMenu;
