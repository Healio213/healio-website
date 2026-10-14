import React, { forwardRef } from 'react';
import { GUIDED_CALLBACK_PREVIEW, openGuidedCallback } from '@/lib/guided-callback';
import { PHONE_APPOINTMENT_BOOKING } from '@/lib/appointmentBooking';

const GuidedCallbackButton = forwardRef(({ product = 'any', tariff, children, onClick, className = '', ...props }, ref) => (
  !GUIDED_CALLBACK_PREVIEW && PHONE_APPOINTMENT_BOOKING ? <a
    {...props}
    ref={ref}
    href={PHONE_APPOINTMENT_BOOKING.url}
    target="_blank"
    rel="noopener noreferrer"
    data-guided-callback={product}
    className={className}
    onClick={onClick}
  >{children}</a> : <button
    {...props}
    ref={ref}
    type="button"
    data-guided-callback={product}
    className={className}
    onClick={(event) => {
      onClick?.(event);
      if (!event.defaultPrevented) openGuidedCallback({ product, tariff });
    }}
  >{children}</button>
));
GuidedCallbackButton.displayName = 'GuidedCallbackButton';
export default GuidedCallbackButton;
