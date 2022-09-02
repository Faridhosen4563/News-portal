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
    toggleLoader(true);
}

const showNews = news => {
    console.log(news)
    const newsBody = document.getElementById("news-body");
    newsBody.textContent = '';

    news.forEach(newsItem => {
        console.log(newsItem);

        const { author, details, rating, thumbnail_url, title, total_view, image_url, _id } = newsItem;
        const { name, published_date, img } = author;

        console.log(details.length)
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl border my-6">
                <figure><img src="${thumbnail_url}"class="p-10" alt="Album"></figure>
                <div class="card-body">
                    <h2 class="card-title pt-8">${title}</h2>
                    <p>${details.length > 500 ? details.slice(0, 500) + "..." : details}</p>
                    <div class="card-actions justify-between mb-4 items-center">
                        <div class="flex flex-row gap-4">
                            <div>
                                <img src=${img ? img : "no img"} alt="author" class="w-16 h-16 rounded-full">
                            </div>
                            <div>
                                <p class="text-lg font-medium">${name ? name : "no name found"}</p>
                                <p>${published_date ? published_date : "no data found"}</p>
                            </div>
                        </div>
                        <div>
                            <p><i class="fa-solid fa-eye"></i> ${total_view}</p>
                        </div>
                        <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>
                        </div>
                        <label onclick="showmodalbody('${_id ? _id : "no id found"}')"
                         for="news-modal" class="modal-button text-blue-500 hover:text-blue-800 hover:cursor-pointer pr-4"><i class="fa-solid fa-arrow-right"></i></label>
                    </div>
                </div>
            </div>
        `
        newsBody.appendChild(newsDiv);

    })
    toggleLoader(false);
}

const showmodalbody = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data[0]))
        .catch(error => console.log(error))


}

const displayModal = data => {
    console.log(data);

    const { image_url, rating, title, others_info } = data;
    const { number, badge } = rating;
    const { is_todays_pick, is_trending } = others_info;

    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = `
        <div class="card card-compact w-full bg-base-100">
            <figure><img src="${image_url ? image_url : "no image found"}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${title}</h2>
                <p>is_todays_pick : ${is_todays_pick ? "yes, this is todays pick" : "no, this is not todays pick"}</p>
                <p>is_trending : ${is_trending ? "yes, this is hot news" : "no, this is not."}</p>
                <div class="card-actions justify-between">
                     <p><i class="fa-solid fa-star"></i> ${number ? number : "no data"}</p>
                     <p><i class="fa-solid fa-certificate"></i> ${badge ? badge : "no data found"}</p>
                </div>
            </div>
        </div>
    `
}

const toggleLoader = (isLoad) => {
    const loader = document.getElementById("loader");
    if (isLoad) {
        loader.classList.remove('hidden');
    }
    else {
        loader.classList.add('hidden');
    }
}

loadCatagory();
