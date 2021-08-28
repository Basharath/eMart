import React from 'react';

export default function NotFound({ type = 'record', text }) {
  return (
    <div className="text-secondary fs-1 text-center mt-5">
      {text || `No ${type} found`}
    </div>
  );
}
