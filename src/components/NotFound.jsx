import React from 'react';

export default function NotFound({ type = 'record' }) {
  return (
    <div className="text-secondary fs-1 text-center mt-5">No {type} found</div>
  );
}
