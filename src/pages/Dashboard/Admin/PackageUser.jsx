// import { Helmet } from "react-helmet-async";
// import PackageUserDataRow from "../../../components/Dashboard/TableRows/PackageUserDataRow";

// const PackageUser = () => {
//   return (
//     <div className="container mx-auto px-4 sm:px-8">
//       <Helmet>
//         <title>Manage Users</title>
//       </Helmet>
//       <div className="py-8">
//         <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//           <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//             <table className="min-w-full leading-normal">
//               <thead>
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-5 py-3 bg-slate-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                   >
//                     Email
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-5 py-3 bg-slate-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                   >
//                     Package Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-5 py-3 bg-slate-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                   >
//                     Payment Date
//                   </th>

//                   <th
//                     scope="col"
//                     className="px-5 py-3 bg-slate-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                   >
//                    Amount
//                   </th>

//                   <th
//                     scope="col"
//                     className="px-5 py-3 bg-slate-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                   >
//                   payment intent id
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                           {users.map(user => (
//                             <PackageUserDataRow
//                               key={user?._id}
//                               user={user}
//                               refetch={refetch}
//                             />
//                           ))}
//                         </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageUser;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PackageUserDataRow from "../../../components/Dashboard/TableRows/PackageUserDataRow";
import { Helmet } from "react-helmet-async";

const PackageUser = () => {
  const axiosSecure = useAxiosSecure();
const { data: users = [], isLoading, isError } = useQuery({
  queryKey: ['payments'],
  queryFn: async () => {
    const { data } = await axiosSecure.get('/payments');
    return data;
  }
});


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading payment data.</p>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-left text-sm font-semibold">
                    Package Name
                  </th>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-left text-sm font-semibold">
                    Payment Date
                  </th>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-left text-sm font-semibold">
                    Amount
                  </th>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-left text-sm font-semibold">
                    Payment Intent ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <PackageUserDataRow
                    key={user._id}
                    user={user}
                    // refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageUser;
