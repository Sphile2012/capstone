import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messages.css';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data } = await axios.get('/api/messages/conversations');
      setConversations(data.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading messages...</div>;

  return (
    <div className="messages-page">
      <div className="container">
        <h1>Messages</h1>
        {conversations.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet</p>
            <p>When you contact a Host or send a reservation request, you'll see your messages here</p>
          </div>
        ) : (
          <div className="conversations-list">
            {conversations.map(conversation => (
              <div key={conversation._id} className="conversation-item card">
                <p>Conversation with host</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
