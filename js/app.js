const loadCatagory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayManuData(data.data.news_category))
        .catch(error => console.log(error))
}

const displayManuData = (datas) => {
    console.log(datas);
    const menuContainer = document.getElementById("manu-section");

    datas.forEach(data => {
        console.log(data)
        const { category_id, category_name } = data;
        const li = document.createElement('li');
        li.innerHTML = `<a>${category_name}</a>`
        menuContainer.appendChild(li);
    })
}

loadCatagory();