export const saveToLocal = (pokemon: string) => {

    // favorite will get the current values in local storage
    let favorites: string[] = getLocal();

    if (!favorites.includes(pokemon)) {
        favorites.push(pokemon)
    }

    localStorage.setItem("favorited", JSON.stringify(favorites));
}

export const getLocal = (): string[] => {
    let localStorageData: string | null = localStorage.getItem("favorited");

    if (localStorageData === null) {
        // If there is no data in local storage, it defaults to an empty array
        return [];
    }

    return JSON.parse(localStorageData);
}

export const removeFromLocal = (pokemon: string) => {
    let favorites: string[] = getLocal();
    let pokeIndex: number = favorites.indexOf(pokemon);
    favorites.splice(pokeIndex, 1);
    localStorage.setItem("favorited", JSON.stringify(favorites));
}
