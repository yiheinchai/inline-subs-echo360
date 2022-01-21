(function() {
    document.querySelector("#tooltips").innerHTML = `<div class="inline-subs" style="width: 100vw; background-color: white; bottom: 50px; font-size: 22px; display: flex; flex-flow: row; justify-content: center; z-index: 3; position: fixed">Welcome to Yi Hein's Inline Subs</div>`

    function updateSubtitle() {
        const width = document.querySelector('.screens').getBoundingClientRect().width
        document.querySelector("#tooltips").innerHTML = `<div class="inline-subs" style="width: ${width}px; background-color: white; bottom: 50px; font-size: 22px; display: flex; flex-flow: row; justify-content: center; z-index: 3; position: fixed">Welcome to Yi Hein's Inline Subs</div>`
        const text = document.querySelector(".highlight").textContent
        document.querySelector(".inline-subs").textContent = text
    }
    try {
        const observer = new MutationObserver(updateSubtitle)
        observer.observe(document.querySelector(".transcript-cues"), {
            attributes: true,
            childList: true,
            subtree: true
        })
    } catch {
        document.querySelector("#tooltips").innerHTML = `<div class="inline-subs" style="width: 100vw; background-color: white; bottom: 50px; font-size: 22px; display: flex; flex-flow: row; justify-content: center; z-index: 3; position: fixed; color: red;"><p>ERROR: Refresh the page, open transcript panel, paste the code again<p></div>`

    }

})();