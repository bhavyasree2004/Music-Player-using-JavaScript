const documentbody=document.body;
const allsong=document.getElementById("all-song");
const card=document.getElementById("card");
const playlist=document.getElementById("playlist");
const  togglelabel=document.querySelector('.toggle-label');
const songslist=document.getElementById('songs-list');
const genreSelect=document.getElementById('genre');
togglelabel.addEventListener('click',()=>{
    documentbody.classList.toggle("dark-mode");
});
const songs=[
    {id:1,name:"As it was",artist:"Harry Styles",img:"https://pagesix.com/wp-content/uploads/sites/3/2014/08/harry-styles.jpg?quality=90&strip=all&w=1157",genre:"rock",source:"Audios/AS_IT_WAS.mp3"},
    {id:2,name:"Agar tum saath ho",artist:"Arjith Singh",img:"https://i.ytimg.com/vi/xRb8hxwN5zc/maxresdefault.jpg",genre:"pop",source:"Audios/AGAR_TUM.mp3"},
    {id:3,name:"Vintunnaava",artist:"Karthik",img:"https://teluguinfo.net/wp-content/uploads/2022/03/vintunnava-768x432.jpg",genre:"pop",source:"Audios/VINTUNNAAVA.mp3"},
    {id:4,name:"Chinuku taake",artist:"Vivek",img:"https://tse2.mm.bing.net/th?id=OIP.-oJN6ywbl8hi8vnuFWk10QHaEK&pid=Api&P=0&h=180",genre:"hip-hop",source:"Audios/CHINUKU_TAAKE.mp3"},
    {id:5,name:"Gaallo thelinattu",artist:"Tippu",img:"https://www.justwatch.com/images/backdrop/174580796/s1440/jalsa",genre:"pop",source:"Audios/GAALLO_THELINATTU.mp3"},
    {id:6,name:"Uppenentha",artist:"Devi Sri Prasad",img:"https://m.media-amazon.com/images/M/MV5BY2VjMmQ1NjAtMzRiZS00MWVmLTlmZTgtY2M0ZDRlMWUzZjJiXkEyXkFqcGdeQXVyNjE2NTgxOTE@._V1_.jpg",genre:"rock",source:"Audios/UPPENANTHA.mp3"},
];
const songbuttons=document.getElementById('song-buttons');
function showSongs(genre='all'){
    songbuttons.innerHTML='';
    const filteredSongs=genre==='all'? songs: songs.filter(song=>song.genre===genre);
    filteredSongs.forEach(song=>{
        const button1=document.createElement('button');
        button1.classList.add('style-button');
        button1.setAttribute('data-id',song.id);
        button1.textContent=`${song.name}`;
        button1.addEventListener('click',()=>{
            currentSongIndex=songs.findIndex(s=>s.id===song.id);
            renderCurrentSong();
        });
        songbuttons.appendChild(button1);
    });
}
genreSelect.addEventListener('change',()=>{
    showSongs(genreSelect.value)
});
showSongs();
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const addToPlaylistButton = document.getElementById('add-to-playlist');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover-image-source');
const title = document.getElementById('song-name');
const artist = document.getElementById('artist-name');
let currentSongIndex = 0;
let playlists={};
let selectedPlaylist = null;
function renderCurrentSong() {
    const song = songs[currentSongIndex];
    audio.src = song.source;
    title.textContent = song.name;
    artist.textContent = song.artist;
    cover.src = song.img;
    audio.play();
}
function nextSong(){
    currentSongIndex=(currentSongIndex+1)%songs.length;
    renderCurrentSong();
}
function prevSong(){
    currentSongIndex=(currentSongIndex-1+songs.length)%songs.length;
    renderCurrentSong();
}
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
const playlistNameinput=document.getElementById('playlist-name');
const allPlaylistsContainer = document.getElementById('all-playlists');
const createPlaylistButton = document.getElementById('create-playlist');
const currentPlaylistContainer=document.getElementById('current-playlist');
function renderPlaylistSongs(playlistName) {
    const playlist = playlists[playlistName];
    currentPlaylistContainer.innerHTML = '';
    playlist.forEach(song => {
        const songDiv = document.createElement('button');
        songDiv.classList.add('style-button');
        songDiv.textContent = `${song.name}`;
        songDiv.addEventListener('click',()=>{
            currentSongIndex=songs.findIndex(s=>s.id===song.id);
            renderCurrentSong();
        });
        currentPlaylistContainer.appendChild(songDiv);
    });
}
function renderPlaylists(){
    allPlaylistsContainer.innerHTML = '';
    for (const [name, playlist] of Object.entries(playlists)) {
        const playlistDiv = document.createElement('button');
        playlistDiv.classList.add('style-button');
        selectedPlaylist = name;
        playlistDiv.textContent = name;
        playlistDiv.addEventListener('click', () => renderPlaylistSongs(name));
        allPlaylistsContainer.appendChild(playlistDiv);
    }
}
function createPlaylist(){
    const playlistName=playlistNameinput.value.trim();
    if(playlistName && !playlists[playlistName]){
        playlists[playlistName]=[];
        playlistNameinput.value='';
        renderPlaylists();
    }

}
function addToPlaylist(){
    if (selectedPlaylist) {
        const song = songs[currentSongIndex];
        if (!playlists[selectedPlaylist].some(s => s.id === song.id)) {
            playlists[selectedPlaylist].push(song);
            renderPlaylistSongs(selectedPlaylist);
        }
    } 
    else {
        alert('Please select a playlist first.');
    }
}
createPlaylistButton.addEventListener('click', createPlaylist);
addToPlaylistButton.addEventListener('click', addToPlaylist);