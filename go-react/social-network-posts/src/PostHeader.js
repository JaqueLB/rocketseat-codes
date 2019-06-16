import React from 'react';
import PropTypes from 'prop-types';

const PostHeader = ({ avatar, name, time }) => (
  <div className="post-header">
    <div className="avatar">
      <img alt="Avatar" src={avatar} />
    </div>
    <div className="header-text">
      <p className="name">{name}</p>
      <p className="time">{time}</p>
    </div>
  </div>
);

PostHeader.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default PostHeader;
