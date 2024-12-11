import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS

const MessageItem = ({ user, isIncoming }) => {
  const sampleTexts = [
    "Hey! How are you?",
    "Did you get my last message?",
    "I'm working on the project. It's going well.",
    "Let me know if you need anything.",
    "Have a great day ahead!",
  ];

  // Generate a random message from the sampleTexts
  const randomMessage =
    sampleTexts[user.id % sampleTexts.length] || "Hello there!";

  // Generate avatar using robohash with user ID
  const avatarUrl = `https://robohash.org/${user.id}?size=50x50`;

  // State to manage conversation visibility
  const [showConversation, setShowConversation] = useState(false);

  // Function to toggle conversation visibility
  const toggleConversation = () => {
    setShowConversation((prev) => !prev);
  };

  return (
    <div
      className="message-item"  // Added className for hover effect
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '15px 0',
        borderBottom: '1px solid #f0f2f5', // Adding a lighter separator
        paddingBottom: '15px',
        cursor: 'pointer',
        transition: 'all 0.3s ease', // Adding smooth transition
      }}
      onClick={toggleConversation} // Toggle on click
    >
      {/* User Avatar and Name */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <img
          src={avatarUrl}
          alt="avatar"
          style={{
            borderRadius: '50%',
            marginRight: '15px',
            width: '50px',
            height: '50px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', // Avatar shadow for depth
          }}
        />
        <p
          style={{
            margin: 0,
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#333', // Dark text for better readability
          }}
        >
          {user.name}
        </p>
      </div>

      {/* Message Bubble */}
      {showConversation ? (
        <div
          style={{
            backgroundColor: isIncoming ? '#e1ffc7' : '#daf0ff',
            padding: '12px 15px',
            borderRadius: '15px',
            maxWidth: '80%',
            marginBottom: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Soft shadow to pop up
            display: 'flex',
            flexDirection: 'column',
            alignItems: isIncoming ? 'flex-start' : 'flex-end',
            animation: 'fadeIn 0.3s ease', // Adding smooth fade-in animation
          }}
        >
          <p
            style={{
              margin: '5px 0',
              fontSize: '14px', // Smaller font for main message
              lineHeight: '1.4',
              color: '#333',
            }}
          >
            {randomMessage}
          </p>
          <p
            style={{
              margin: '5px 0',
              fontSize: '12px', // Small font for additional reply
              color: '#555',
              fontStyle: 'italic', // Italicize for different tone
            }}
          >
            {"Thanks for reaching out! Here's a quick reply."}
          </p>

          {/* Action Buttons (Like, Camera) Inside the Message Bubble */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start', // Align icons to the left inside the bubble
              marginTop: '10px',
            }}
          >
            {/* Like Button */}
            <button
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#0078d4',
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px', // Space between buttons
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the toggleConversation function
                alert('Liked!');
              }}
            >
              <i className="fa fa-thumbs-up" style={{ marginRight: '5px' }}></i> Like
            </button>

            {/* Camera Button */}
            <button
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#0078d4',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the toggleConversation function
                alert('Camera clicked!');
              }}
            >
              <i className="fa fa-camera" style={{ marginRight: '5px' }}></i> Camera
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: isIncoming ? '#e1ffc7' : '#daf0ff',
            padding: '10px 12px',
            borderRadius: '12px',
            maxWidth: '80%',
            marginBottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isIncoming ? 'flex-start' : 'flex-end',
            fontSize: '14px', // Smaller text for "click to view"
            color: '#777',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)', // Lighter shadow when collapsed
          }}
        >
          <p style={{ margin: '0' }}>Click to view conversation</p>
        </div>
      )}

      {/* Date and User ID */}
      <small style={{ fontSize: '10px', color: 'gray', marginTop: '5px' }}>
        User ID: {user.id}
      </small>
    </div>
  );
};

export default MessageItem;
