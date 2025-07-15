import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Title from '../../components/Title';

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { currency, toast, axios, getToken, user } = useAppContext();

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms/owner', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const ToggleAvailability = async (roomId) => {
    const { data } = await axios.post(
      '/api/rooms/toggle-availability',
      { roomId },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );
    if (data.success) {
      toast.success(data.message);
      fetchRooms();
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />

      <p className="text-gray-500 mt-8">All Rooms</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {rooms.map((item, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4">
            <img
              src={item.images[0]}
              alt={item.roomType}
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="mt-3 text-lg font-semibold">{item.roomType}</h2>
            <p className="text-sm text-gray-500 mt-1">{item.amenities.join(', ')}</p>
            <p className="mt-2 text-gray-800 font-medium">
              {currency} {item.pricePerNight} / night
            </p>

            <label className="relative inline-flex items-center cursor-pointer mt-4">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={item.isAvailable}
                onChange={() => ToggleAvailability(item._id)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full peer transition-all duration-200"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
              <span className="ml-3 text-sm text-gray-700">
                {item.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRoom;
