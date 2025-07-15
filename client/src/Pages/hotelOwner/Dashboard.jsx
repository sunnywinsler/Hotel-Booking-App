import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { currency, user, getToken, toast, axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/bookings/hotel', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 md:px-12 lg:px-20">
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings, and analyze revenue — all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
        {/* Total Bookings */}
        <div className="bg-white shadow-md border rounded-lg flex items-center p-4">
          <img src={assets.totalBookingIcon} alt="Total Bookings" className="h-12 w-12" />
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-blue-900 text-xl font-semibold">{dashboardData.totalBookings}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white shadow-md border rounded-lg flex items-center p-4">
          <img src={assets.totalRevenueIcon} alt="Total Revenue" className="h-12 w-12" />
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-blue-900 text-xl font-semibold">
              {currency}{dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">Recent Bookings</h2>
      <div className="w-full overflow-x-auto border border-gray-300 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 font-medium text-gray-700">User Name</th>
              <th className="py-3 px-4 font-medium text-gray-700">Room Name</th>
              <th className="py-3 px-4 font-medium text-center text-gray-700">Total Amount</th>
              <th className="py-3 px-4 font-medium text-center text-gray-700">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.bookings.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-4">{item.user?.username || 'N/A'}</td>
                <td className="py-3 px-4">{item.room?.roomType || 'N/A'}</td>
                <td className="py-3 px-4 text-center">
                  {currency} {item.totalPrice}
                </td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${item.isPaid ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'}`}
                  >
                    {item.isPaid ? 'Completed' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
