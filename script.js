const color_form = document.getElementById("color-picker")
const color_palette = document.getElementById("color-scheme")


color_form.addEventListener("submit",function(e){
    e.preventDefault()
    const formData = new FormData(color_form)
    let color = formData.get("color").substring(1)
    let scheme = formData.get("scheme")
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}`,
    {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => res.json())
      .then(data => render(data.colors))
      color_form.reset()
})

function render (colors){
    let innerhtml = ``
    colors.forEach(color => {
        innerhtml += `<div class="color-hex"><div style="height: 22rem; background-color:${color.hex.value}" data-color="${color.hex.value} aria-label='data-color="${color.hex.value}'"></div><h4>${color.hex.value}</h4></div>`
    });
    color_palette.innerHTML = innerhtml;
    document.querySelectorAll(".color-hex div[data-color]").forEach(div => {
        div.addEventListener('click', function(){
            const hexValue = div.getAttribute('data-color');
            navigator.clipboard.writeText(hexValue);
            alert('Hex Code copied')
        })
    }) 
}