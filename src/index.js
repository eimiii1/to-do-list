import "./assets/style.css"
import {Navigation, Home, Menu, navigators} from "./source.js"

function Index() {
    Navigation()
    Home()

    function handleNavigation(event) {
            event.preventDefault()
            const page = event.target.hash.replace("#", "")
            const fn = navigators[page]
            if (fn) fn()   
    }
    
    const navs = document.querySelectorAll(".nav-list li a")
    navs.forEach((item, index) => {
        item.addEventListener("click", handleNavigation)
    })
}

Index()