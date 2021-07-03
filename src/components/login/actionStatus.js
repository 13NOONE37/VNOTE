import React from 'react';
import 'css/login/actionStatus.css';

export default function actionStatus({ message, isPositive }) {
  return (
    <div
      className={`inputBox actionStatus ${
        isPositive ? 'positive' : 'negative'
      }`}
    >
      <span>{message}</span>
    </div>
  );
}
