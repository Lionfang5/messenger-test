import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageItem from './components/MessageItem'; // Import the MessageItem component

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  axios
    .get('https://gorest.co.in/public/v1/users')
    .then((response) => {
      console.log(response.data); // Log the API response to inspect it
      setUsers(response.data.data); // Assuming data is in 'data' field
      setLoading(false);
    })
    .catch((err) => {
      setError('Error fetching users');
      setLoading(false);
    });
}, []);


  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse', // Newest message at the bottom
          height: '80vh',
          overflowY: 'scroll',
          backgroundColor: '#f0f2f5',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
        }}
      >
        {users.map((user, index) => (
          <MessageItem key={user.id} user={user} isIncoming={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
};

export default App;
