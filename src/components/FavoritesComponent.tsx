import { useState } from 'react'
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import ModalClose from '@mui/joy/ModalClose';

export default function FavoritesComponent() {
  const [open, setOpen] = useState<boolean>(false);


  return (
    <div>
        <button className='font-kodchasan-medium text-2xl lg:text-xl xl:text-3xl bg-sky-200 border-2 border-black px-2 rounded-md' type="button"  onClick={() => setOpen(true)}>Favorites</button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <DialogTitle>Title</DialogTitle>
      </Drawer>
    </div>
  );
}