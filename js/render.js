const headerContainer = document.querySelector("header")

const stringToHTML = (string) => {
    var parser = new DOMParser()
    var doc = parser.parseFromString(string, 'text/html')
    return doc.body.firstChild
}

fetch('/components/header.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.text()
    })
    .then(header => {
        const headerElement = stringToHTML(header)
        headerContainer.appendChild(headerElement)
        
        const links = Array.from(headerContainer.querySelectorAll(".navbar .list li a"))
        links.forEach(link => {
            activeLink(link)
        })
})

const activeLink = (link) => {
    const pathname = window.location.pathname
    const url = new URL(link.href)

    if (pathname.includes("index") && url.pathname === "/") {
        link.classList.add("active")
    }
    if (link.href.includes("#")) {
        return
    }
    const isActive = url.pathname === pathname
    if (isActive) {
        link.classList.add("active")
    }
}
    

