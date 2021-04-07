import React from 'react';
import { notify as note } from 'react-notify-toast'
const customColor = { background: '#0E1717', text: "#FFFFFF" }
export function notify({
  message,
  description,
  txid,
  type = 'custom',
  placement = 'bottomLeft',
}: {
  message: string;
  description?: string | JSX.Element;
  txid?: string;
  type?: string;
  placement?: string;
}) {
  note.show(
    <div>
      <div>{message}</div>
      <div>{description}</div>
    </div>, type, 3000, type === 'custom' ? customColor : null
  );
}