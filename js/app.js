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
        const { category_id, category_name } = data;
        const li = document.createElement('li');
        li.innerHTML = `<a onclick="loadNewsData('${category_id}')">${category_name}</a>`
        menuContainer.appendChild(li);
    })
}

const loadNewsData = id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => showNews(data.data))
        .catch(error => console.log(error))
}

const showNews = news => {
    console.log(news)
    const newsBody = document.getElementById("news-body");
    newsBody.textContent = '';

    news.forEach(newsItem => {
        console.log(newsItem);

        const { author, details, rating, thumbnail_url, title, total_view } = newsItem;

        console.log(details.length)
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl border my-6">
                <figure><img src="${thumbnail_url}"class="p-10" alt="Album"></figure>
                <div class="card-body">
                    <h2 class="card-title pt-8">${title}</h2>
                    <p>${details.length > 500 ? details.slice(0, 500) + "..." : details}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Listen</button>
                    </div>
                </div>
            </div>
        `
        newsBody.appendChild(newsDiv);
    })
}

loadCatagory();