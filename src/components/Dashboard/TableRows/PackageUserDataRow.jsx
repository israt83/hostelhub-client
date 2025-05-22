

import PropTypes from "prop-types";

const PackageUserDataRow = ({ user }) => {
  const formattedDate = new Date(user?.payment_date).toLocaleDateString();

  return (
    <tr>
      <td className="px-5 py-5 border-b bg-white text-sm text-gray-900">
        {user?.name}
      </td>
      <td className="px-5 py-5 border-b bg-white text-sm text-gray-900">
        {user?.email}
      </td>
      <td className="px-5 py-5 border-b bg-white text-sm text-gray-900">
        {user?.package_name}
      </td>
      <td className="px-5 py-5 border-b bg-white text-sm text-gray-900">
        {formattedDate}
      </td>
      <td className="px-5 py-5 border-b bg-white text-sm text-gray-900">
        ${user?.amount.toFixed(2)}
      </td>
      <td className="px-5 py-5 border-b bg-white text-sm text-gray-900">
        {user?.payment_intent_id}
      </td>
    </tr>
  );
};

PackageUserDataRow.propTypes = {
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func,
};

export default PackageUserDataRow;
