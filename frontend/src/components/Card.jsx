/**
 * Card Component
 */

import React from 'react';
import './Card.css';

const Card = ({
  children,
  title,
  className = '',
  ...rest
}) => {
  return (
    <div className={`card ${className}`} {...rest}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
