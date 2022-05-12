import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@mui/material';

export default function ControlledTooltips(props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      title={<Typography fontSize={14}>{props.title}</Typography>}
    >
      {props.children}
    </Tooltip>
  );
}
