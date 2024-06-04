export interface Routes {
    path: string,
    name: string
}

export let routes: Routes[] = [
    {
        path: "/",
        name: "Home"
    },

    {
        path: "/calendar",
        name: "Calendar"
    },
    {
        path: "/pokemonpage",
        name: "Pokemon"
    },
    {
        path: "/troisD",
        name: "TroisD"
    },

]