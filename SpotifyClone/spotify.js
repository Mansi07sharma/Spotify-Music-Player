async function getMusic(artistname) {
    let song=await fetch(`http://127.0.0.1:3000/SpotifyClone/Songs/${artistname}/`)
    let response=await song.text();
    // console.log(response);

    let div=document.createElement("div")
    div.innerHTML=response;
    let as=div.getElementsByTagName("a")
    let songs=[];
    for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3")){
        console.log(element.href);
        let refineName=element.href.replaceAll("%20"," ")    
        songs.push(refineName.split(`/${artistname}/`)[1])
        }
    }
    
    return songs;      
}

const playsong=(song,artist)=>{
    var audio=new Audio(`/SpotifyClone/Songs/${artist}/`+song)
    audio.play()
}

async function playMusic(artistname) {
    let songs=await getMusic(artistname);
    let songCards=document.createElement("ul")
    for (const song of songs) {
        songCards.innerHTML=songCards.innerHTML+`<li>
        <div class="playbox">
        <img class="invert" src="images/music.svg" alt="">
        <div class="info">
        <div>${song}</div>
        <div>${artistname}</div>
        </div>
        </div>
        <img class="invert" src="images/play.svg">
        </li>`;
    }

    let songFolder=document.querySelector(".songlist")
    songFolder.append(songCards)  
    Array.from(document.querySelector('.songlist').getElementsByClassName("info")).forEach(song => {
        song.addEventListener('click', ()=>{
           console.log(song.firstElementChild.innerHTML)
            playsong(song.firstElementChild.innerHTML,song.lastElementChild.innerHTML)
        })});
}

function nextPage(){
    let x=document.querySelector(".rightbox")
    x.innerHTML="";
    //background color
    document.querySelector(".rightbox").style.background="linear-gradient(120deg, #6f7381 0%, #474b5a 100%)";
    //image of artist with name
    let upperbox=document.createElement("div")
    upperbox.setAttribute("class","upperbox")
    document.querySelector(".rightbox").append(upperbox)

    let imagebox=document.createElement("img")
    imagebox.setAttribute("class","artist-pic")
    let src=this.firstElementChild
    imagebox.setAttribute("src",src.getAttribute('src'))
    document.querySelector(".upperbox").append(imagebox)

    let name=document.createElement("div")
    name.setAttribute("class","name")
    name.innerHTML=this.getAttribute('artist')
    document.querySelector(".upperbox").append(name)

    let songs=document.createElement("h2")
    songs.innerHTML="Songs"
    songs.setAttribute("class","headingsong")
    document.querySelector(".rightbox").append(songs)

    let songfolder=document.createElement("div")
    songfolder.setAttribute("class","songlist")
    document.querySelector(".rightbox").append(songfolder)

   
    let player=document.createElement("div")
    player.setAttribute("class","player")
    document.querySelector(".rightbox").append(player);
    //music button div
    let musicbuttons=document.createElement("div")
    musicbuttons.setAttribute("class","musicbuttons")
    document.querySelector(".player").append(musicbuttons);
    //buttons
    let prev=document.createElement("img")
    prev.setAttribute("src","images/previousSong.svg")
    let play=document.createElement("img")
    play.setAttribute("src","images/play.svg")
    let next=document.createElement("img")
    next.setAttribute("src","images/nextSong.svg")

    document.querySelector(".musicbuttons").append(prev)
    document.querySelector(".musicbuttons").append(play)
    document.querySelector(".musicbuttons").append(next)

    let seekbar=document.createElement("div")
    seekbar.setAttribute("class","seekbar")
    document.querySelector(".player").append(seekbar);

    let circle=document.createElement("div")
    circle.setAttribute("class","circle")
    document.querySelector(".seekbar").append(circle)

    const artistName = this.getAttribute('artist');
    if (artistName) {
        playMusic(artistName);
    }
    else{
        alert('no songs!!');
        
    }
}
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', nextPage);
});














