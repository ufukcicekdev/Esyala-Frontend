import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// dialogData'nın türünü belirtin
interface CustomDialogProps {
  dialogData: Record<string, React.JSX.Element>; // Değerler React.JSX.Element türünde olmalı
}

export default function CustomDialog({ dialogData }: CustomDialogProps) {
  const [openDialogIndex, setOpenDialogIndex] = React.useState<number | null>(null);

  const handleOpen = (index: number) => {
    setOpenDialogIndex(index);
  };

  const handleClose = () => {
    setOpenDialogIndex(null);
  };

  return (
    <ul>
      {Object.keys(dialogData).map((title, index) => (
        <li key={title} className="cursor-pointer">
          <span
            className="hover:text-red-600 hover:underline"
            onClick={() => handleOpen(index)}
          >
            {title}
          </span>

          {/* Material-UI Dialog */}
          <Dialog
            open={openDialogIndex === index}
            onClose={handleClose}
            fullWidth
            maxWidth="lg" // Dialog genişliğini ayarlar
          >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <div className="py-4">
                {dialogData[title]}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" sx={{ fontSize: "1.25rem" }}>
                Kapat
              </Button>
            </DialogActions>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}
