import fish_burger from "./assets/fish-burger.png"
import cheeseburger from "./assets/cheeseburger.png"
import beef_burger from "./assets/beef-burger.png"

const divContent = document.getElementById("content")

export const navigators = {
    home: Home,
    menu: Menu,
    contact: Contact,
}

export function Navigation() {
    const navigation = document.createElement("nav")
    navigation.classList.add("navigation-bar")

    document.body.append(navigation)

    const headerTitle = document.createElement("h1")
    headerTitle.classList.add("header-title")
    headerTitle.textContent = "Sumip"
    navigation.appendChild(headerTitle)

    const navigationList = document.createElement("ul")
    navigationList.classList.add("nav-list")
    navigation.append(navigationList)


    Object.entries(navigators).forEach(([key, value]) => {
        const navigationUL = document.createElement("li")
        const ULlink = document.createElement("a")
        ULlink.href = `#${key}`
        ULlink.innerHTML = key.charAt(0).toUpperCase() + key.slice(1)

        navigationUL.appendChild(ULlink)
        navigationList.append(navigationUL)
    })

    const loginButton = document.createElement("button")
    loginButton.classList.add("login-button")
    loginButton.href = "#login";
    loginButton.textContent = "Login"
    navigation.append(loginButton)
    return
}

export function Home() {
    divContent.innerHTML = ""
    const homePage = document.createElement("div")
    homePage.classList.add("home-page")
    divContent.append(homePage)

    const homeTitleDiv = document.createElement("div")
    homePage.classList.add("home-title-div")

    const homeTitle = document.createElement("h1")
    homeTitle.textContent = "Fresh Flavors, Every Day"

    homePage.append(homeTitleDiv)
    homeTitleDiv.append(homeTitle)


    const homeSubtitle = document.createElement("p")
    homeSubtitle.textContent = "Fresh ingredients. Vibrant Flavors. A dining experience you'll love.";
    homeTitleDiv.append(homeSubtitle)

    const getStarted = document.createElement("button")
    getStarted.href = "menu.html"
    getStarted.id = "get-started-button"
    getStarted.textContent = "Get Started"
    homeTitleDiv.append(getStarted)
    
    getStarted.addEventListener("click", (e) => {
        e.preventDefault()
        const fn = navigators.menu
        if (fn) fn()
    })
    return
}

export function Menu() {
    divContent.innerHTML = ""
    const menuPage = document.createElement("div")
    menuPage.classList.add("menu-page")
    menuPage.id = "menu"
    divContent.append(menuPage)

    const menuPageContent = document.createElement("div")
    menuPageContent.classList.add("menu-page-content")
    menuPage.appendChild(menuPageContent)

    const burgerMenu = [
        {
            name: "Fish Burger",
            description: "A crispy golden-fried fish fillet, served on a soft toasted bun with fresh lettuce, juicy tomato slices, tangy pickles, and creamy tartar sauce. Perfectly seasoned for a light yet satisfying bite.",
            imageURL: fish_burger,
            id: "fish-burger",
        },
        {
            name: "Bacon CheeseBurger",
            description: "A juicy grilled beef patty topped with melted cheddar cheese and crispy bacon strips, served on a toasted sesame bun with fresh lettuce, tomato, onions, and our signature burger sauce.",
            imageURL: cheeseburger,
            id: "bacon-burger",
        },
        {
            name: "Beef Burger",
            description: "Classic and satisfying — a perfectly seasoned beef patty grilled to perfection, served on a soft bun with crisp lettuce, fresh tomato, onions, pickles, and a spread of creamy mayo or ketchup.",
            imageURL: beef_burger,
            id: "beef-burger",
        }
    ]

    burgerMenu.forEach((item, index) => {
        const menuItem = document.createElement("div")
        menuItem.classList.add("menu-item")
        menuPageContent.appendChild(menuItem)
        const menuIMG = document.createElement("img")
        menuIMG.src = item.imageURL;
        menuIMG.id = item.id
        menuItem.append(menuIMG)

        const menuName = document.createElement("h2")
        menuName.classList.add("menu-name")
        menuName.textContent = item.name
        menuItem.appendChild(menuName)

        const menuDescription = document.createElement("p")
        menuDescription.classList.add("menu-description")
        menuDescription.textContent = item.description
        menuItem.appendChild(menuDescription)

    })
    return
}

export function Contact() {
    divContent.innerHTML = ""
    const contactPage = document.createElement("div")
    contactPage.classList.add("contact-page")
    divContent.append(contactPage)

    const contactHeader = document.createElement("h1")
    contactHeader.textContent = "Contact Us"
    contactPage.appendChild(contactHeader)

    const contactDetails = document.createElement("pre")
    contactDetails.innerHTML = `
    John Philip P. Barcelo 
    09289306676
    philipjohn1627@gmail.com
    `
    contactPage.append(contactDetails)
    return
}