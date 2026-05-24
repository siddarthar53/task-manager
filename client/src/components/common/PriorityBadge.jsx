import React from 'react';

const PriorityBadge = React.memo(({ priority }) => {
  const classes = {
    low: 'badge-low',
    medium: 'badge-medium',
    high: 'badge-high',
  };

  const icons = { low: '↓', medium: '→', high: '↑' };

  return (
    <span className={classes[priority] || 'badge-low'}>
      {icons[priority]} {priority}
    </span>
  );
});

PriorityBadge.displayName = 'PriorityBadge';
export default PriorityBadge;
