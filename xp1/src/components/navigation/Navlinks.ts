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
        path: "/inscription",
        name: "Inscription"
    },
    {
        path: "/connexion",
        name: "Connexion"
    },
    {
        path: "/page2",
        name: "Page2"
    },


]