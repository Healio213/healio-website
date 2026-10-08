import React, { forwardRef, useContext } from 'react';
import { LeadCaptureContext } from '@/components/LeadCaptureProvider';
import { shouldCaptureApplicationLink } from '@/lib/lead-capture';

const LeadCaptureLink = forwardRef(({ href, trackingCategory, onClick, onAuxClick, ...props }, ref) => {
  const context = useContext(LeadCaptureContext);
  const capture = (event) => {
    if (!context || !shouldCaptureApplicationLink(href, context.pathname)) return false;
    event.preventDefault();
    context.requestApplication(href, trackingCategory, () => onClick?.(event));
    return true;
  };

  return (
    <a
      {...props}
      ref={ref}
      href={href}
      onClick={(event) => { if (!capture(event)) onClick?.(event); }}
      onAuxClick={(event) => { if (event.button !== 1 || !capture(event)) onAuxClick?.(event); }}
    />
  );
});
LeadCaptureLink.displayName = 'LeadCaptureLink';
export default LeadCaptureLink;
