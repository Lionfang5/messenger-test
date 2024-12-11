import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../redux/messageSlice';
import MessageItem from './MessageItem';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column-reverse', // Newest message at the bottom
    height: '80vh',
    overflowY: 'scroll',
    backgroundColor: '#f0f2f5',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
};

const MessageList = () => {
  const dispatch = useDispatch();
  const { messages, loading, error, page } = useSelector((state) => state.messages);

  const containerRef = useRef(null);

  // Fetch messages on mount
  useEffect(() => {
    dispatch(fetchMessages(page));
  }, [dispatch, page]);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container && container.scrollTop === 0 && !loading) {
      dispatch(fetchMessages(page));
    }
  }, [dispatch, page, loading]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Always scroll to bottom
    }
  }, [messages]);

  return (
    <div ref={containerRef} style={styles.container}>
      {error && <p>Error: {error}</p>}
      {messages.map((user, index) => (
        <MessageItem key={user.id} user={user} isIncoming={index % 2 === 0} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default MessageList;
