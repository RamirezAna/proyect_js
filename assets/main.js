//=> https://rapidapi.com/ => para crear los endpoints para consumir
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCmrrDm66pzst7YzZ22J0cwQ&part=snippet%2Cid&order=date&maxResults=10';

/*referencia en donde queremos agregar en el html, teniendo en
cuenta el id*/
const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '58b702ae31msh62a5f5b7df33811p1f3e64jsn1e03cf5e2629',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
	const data = await response.json();
    return data;
}

/*
llamar a si misma.
(async () => {
})(); 
*/
//llamado
(async () => {
    try {
        const videos = await fetchData (API);

        //itera en cada respuesta y se muestra en el html
        let view = `
        ${videos.items.map(video => `
        <a title="click" href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">        
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" 
                        class="w-full">            
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div> 
         </a>
        `).slice(0,8).join('')}
           
        `;
        /*
        .slice(0,4).join('')}
        => este limita la cantidad a 4 y lo une con el join
        */

        //agregar con innerHTML
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();
 
