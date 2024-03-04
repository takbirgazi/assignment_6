
const discusCrad = document.getElementById("discussCard");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
// Show Latest Post
fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts")
.then( res => res.json())
.then(data => {
    let latestPost = document.getElementById("latestPost");
    data.forEach(element => {
       const div = document.createElement("div");
       div.innerHTML =`
                    <div class="border rounded-lg p-2 flex flex-col gap-2">
                    <img class="rounded" src="${element?.cover_image}" alt="">
                    <div class="flex items-center gap-1"><img src="images/date.png" alt=""><span>${element?.author?.posted_date}</span></div>
                    <p class="text-black font-bold text-sm">${element?.title}</p>
                    <p class="text-sm">${element?.description}</p>
                    <div class="flex gap-1 items-center ">
                        <img class="h-8 w-8 rounded-full" src="${element?.profile_image}" alt="">
                        <div>
                        <p class="text-sm text-black font-bold">${element?.author?.name}</p>
                        <p class="text-xs">${element?.author?.designation}</p>
                        </div>
                    </div>
                </div>
       `;
       latestPost.appendChild(div);
    })
});
// Show Latest All Post
fetch("https://openapi.programming-hero.com/api/retro-forum/posts")
.then(res => res.json())
.then(data => {
    let discusCrad = document.getElementById("discussCard");
    data.posts.forEach(element =>{
        const div = document.createElement("div");
        div.innerHTML = `
                <div class="flex gap-2 border rounded-md p-4">
                <div class="w-10%">
                <div class="relative">
                    <div>
                    <img class="w-12 h-10 rounded" src="${element.image}" />
                    </div>
                    <div class="w-2 h-2 rounded-full ${element.isActive ? "bg-green-500" : "bg-red-500"} absolute top-0 right-0"></div>
                </div>
                </div>
                <div class="flex gap-2 flex-col w-[90%]">
                <p class="text-xs text-black"><span># ${element.category}</span> <span>Author : ${element.author.name}</span></p>
                <p class="text-sm text-black font-bold">${element.title}</p>
                <p class="text-xs border-b-2 border-dashed pb-6">${element.description}</p>
                <div class="flex justify-between items-center mb-5">
                    <div class="flex lg:w-[60%] gap-1 items-center justify-between flex-row">
                    <div class="flex items-center gap-1">
                        <img src="images/msg.png" alt="">
                        <p>${element.comment_count}</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <img src="images/eye.png" alt="">
                        <p class="viewCount">${element.view_count}</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <img src="images/time.png" alt="">
                        <p>${element.posted_time}</p>
                    </div>
                </div>
                <div class="lg:w-[40%] flex items-center justify-end cursor-pointer">
                    <img class="mailButton" src="images/email.png" alt="">
                </div>
                </div>
            </div>                
            </div>
        `;
    discusCrad.appendChild(div);
    })


})
// Read Post Count
discusCrad.addEventListener("click", (event)=>{

    const postView = event.target.parentNode.parentNode.children[0].children[1].children[1].innerText;
    const postTittle = event.target.parentNode.parentNode.parentNode.children[1].innerText;

    const readPost = document.getElementById("readPost");
    const redpostCount = document.getElementById("redpostCount");
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="flex gap-3 my-4 bg-white rounded-md p-2 items-start">
                <p class="flex-1 text-black opacity-70">${postTittle}</p> 
                <div class="flex gap-1 h-10 items-center">
                <img src="images/eye.png" alt="">
                <span>${postView}</span>
                </div>
            </div>
    `;
    let count =  parseInt(redpostCount.innerText);
    count += 1; 
    redpostCount.innerText = count;

    readPost.appendChild(div);

})
// Show Post By Search
searchButton.addEventListener("click",()=>{
    const sarchText = searchInput.value;
    fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${sarchText}`)
    .then(res => res.json())
    .then(data => {
        let discusCradBySearch = document.getElementById("discussCard");
        let loading = document.getElementById("loaddingDiv");
        discusCradBySearch.innerHTML = "";
        loading.classList.remove("hidden");
        setTimeout(()=>{
            data.posts.forEach(element =>{
                const div = document.createElement("div");
                div.innerHTML =`
                        <div class="flex gap-2 border rounded-md p-4">
                        <div class="w-10%">
                        <div class="relative">
                            <div>
                            <img class="w-12 h-10 rounded" src="${element.image}" />
                            </div>
                            <div class="w-2 h-2 rounded-full ${element.isActive ? "bg-green-500" : "bg-red-500"} absolute top-0 right-0"></div>
                        </div>
                        </div>
                        <div class="flex gap-2 flex-col w-[90%]">
                        <p class="text-xs text-black"><span># ${element.category}</span> <span>Author : ${element.author.name}</span></p>
                        <p class="text-sm text-black font-bold">${element.title}</p>
                        <p class="text-xs border-b-2 border-dashed pb-6">${element.description}</p>
                        <div class="flex justify-between items-center mb-5">
                            <div class="flex lg:w-[60%] gap-1 items-center justify-between flex-row">
                            <div class="flex items-center gap-1">
                                <img src="images/msg.png" alt="">
                                <p>${element.comment_count}</p>
                            </div>
                            <div class="flex items-center gap-1">
                                <img src="images/eye.png" alt="">
                                <p class="viewCount">${element.view_count}</p>
                            </div>
                            <div class="flex items-center gap-1">
                                <img src="images/time.png" alt="">
                                <p>${element.posted_time}</p>
                            </div>
                        </div>
                        <div class="lg:w-[40%] flex items-center justify-end cursor-pointer">
                            <img class="mailButton" src="images/email.png" alt="">
                        </div>
                        </div>
                    </div>                
                    </div>
                `;
                discusCradBySearch.appendChild(div);
                loading.classList.add("hidden");
            })
        },2000)})
})