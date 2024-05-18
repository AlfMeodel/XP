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
        path: "/page1",
        name: "Page1"
    },
    {
        path: "/page2",
        name: "Page2"
    },


]