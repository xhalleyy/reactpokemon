import { useState } from 'react'
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';

export default function FavoritesComponent() {
  const [open, setOpen] = useState<boolean>(false);

  const saveToLocal = (pokemon: string) => {

    // favorite will get the current values in local storage
    let favorites: string[] = getLocal();

    if (!favorites.includes(pokemon)) {
      favorites.push(pokemon)
    }

    localStorage.setItem("favorited", JSON.stringify(favorites));
  }

  const getLocal = (): string[] => {
    let localStorageData: string | null = localStorage.getItem("favorited");

    if (localStorageData === null) {
      // If there is no data in local storage, it defaults to an empty array
      return [];
    }

    return JSON.parse(localStorageData);
  }

  const removeFromLocal = (pokemon: string) => {
    let favorites: string[] = getLocal();
    let pokeIndex: number = favorites.indexOf(pokemon);
    favorites.splice(pokeIndex, 1);
    localStorage.setItem("favorited", JSON.stringify(favorites));
  }

  const favoritedPoke = () => {
    let favorites = getLocal();
  }

  return (
    <div>
      <button className='font-kodchasan-medium text-2xl lg:text-xl xl:text-3xl bg-sky-200 border-2 border-black px-2 rounded-md' type="button" onClick={() => setOpen(true)}>Favorites</button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <DialogTitle className='bg-sky-200 !m-0 pt-10 pb-5 !font-kodchasan-semi !text-2xl !xl:text-3xl !inline-flex !items-center !justify-center !text-center !text-gray-800'>Favorites</DialogTitle>
        <DialogContent className='bg-sky-200 dark:bg-gray-800 items-center'>

        </DialogContent>
      </Drawer>
    </div>
  );
}