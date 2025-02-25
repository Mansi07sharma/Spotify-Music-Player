//back to home page
document.querySelector(".home").addEventListener("click", () => {
    location.reload();
})

//Function for getting songs
async function getMusic(artistname) {
    let song = await fetch(`./Songs/${artistname}/`)
    let response = await song.text();
    // console.log(response);

    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            console.log(element.href);
            let refineName = element.href.replaceAll("%20", " ")
            songs.push(refineName.split(`/${artistname}/`)[1])
        }
    }
    return songs;
}

//function to play song
var recentsong = new Audio();
const playsong = (song, artist) => {
    recentsong.src = "/SpotifyClone/Songs/" + artist + "/" + song;
    recentsong.play()

    //upadte player bar
    if (recentsong.played) {
        playbutton.src = "images/pause.svg"
        document.querySelector(".songdetail").firstElementChild.innerHTML = song.split("-")[0].trim() + "..."
    }
}

//function to make song card
let songs;
async function playMusic(artistname) {
    songs = await getMusic(artistname);
    document.querySelector(".songdetail").firstElementChild.innerHTML = songs[0]
    let songCards = document.createElement("ul")
    for (const song of songs) {
        songCards.innerHTML = songCards.innerHTML + `<li>
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

    let songFolder = document.querySelector(".songlist")
    songFolder.append(songCards)
    Array.from(document.querySelector('.songlist').getElementsByTagName("li")).forEach(song => {
        song.addEventListener('click', () => {
            console.log(song.querySelector(".info").firstElementChild.innerHTML)
            playsong(song.querySelector(".info").firstElementChild.innerHTML, song.querySelector(".info").lastElementChild.innerHTML)
        })
    });

    //function to convert seconds to sec:min formate
    function secMinFormatter(seconds) {
        let mins = Math.floor(seconds / 60).toString().padStart(2, '0')
        let sec = Math.floor(seconds % 60).toString().padStart(2, '0')
        return `${mins}:${sec}`
    }

    //play/pause
    playbutton.addEventListener("click", () => {
        if (recentsong.paused) {
            if (recentsong.src != "") {
                console.log('heyy');
                recentsong.play()
            }
            else {
                console.log(document.querySelector('.songlist').querySelector(".info").firstElementChild.innerHTML,
                    document.querySelector('.songlist').querySelector(".info").lastElementChild.innerHTML);

                playsong(document.querySelector('.songlist').querySelector(".info").firstElementChild.innerHTML,
                    document.querySelector('.songlist').querySelector(".info").lastElementChild.innerHTML)
            }
            playbutton.src = "images/pause.svg"
        }
        else {
            recentsong.pause()
            playbutton.src = "images/play.svg"
        }
    })

    //timestamp setting
    recentsong.addEventListener("timeupdate", () => {
        console.log(secMinFormatter(recentsong.currentTime), secMinFormatter(recentsong.duration));
        document.querySelector(".time-vol").firstElementChild.innerHTML = `${secMinFormatter(recentsong.currentTime)}/${secMinFormatter(recentsong.duration)}`
        document.querySelector(".circle").style.left = (recentsong.currentTime / recentsong.duration) * 100 + "%";
    })

    //controlling circle on click
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percentager = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percentager + "%";
        recentsong.currentTime = (recentsong.duration * percentager) / 100;
        console.log(e);

    })

    //previous
    previousbutton.addEventListener("click", () => {
        let songartist = (recentsong.src.split("/").slice(-2, -1))[0];
        let indexOfSong = songs.indexOf(((recentsong.src.split("/").slice(-1))[0]).replaceAll("%20", " "));
        if (indexOfSong - 1 >= 0) {
            playsong(songs[indexOfSong - 1], songartist);
        }
        else {
            alert("No more previous music!!");
        }
    })

    //next
    nextbutton.addEventListener("click", () => {
        let songartist = (recentsong.src.split("/").slice(-2, -1))[0];
        let indexOfSong = songs.indexOf(((recentsong.src.split("/").slice(-1))[0]).replaceAll("%20", " "));
        if (indexOfSong + 1 < songs.length) {
            playsong(songs[indexOfSong + 1], songartist);
        }
        else {
            alert("No more next music!!");
        }
    })

    //volume functioning
    document.querySelector(".time-vol>img").addEventListener("click", (e) => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            recentsong.volume = 0;
            console.log(document.querySelector(".time-vol").lastElementChild.value);
            document.querySelector(".time-vol").lastElementChild.value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            recentsong.volume = 0.5;
            document.querySelector(".time-vol").lastElementChild.value = 50;
        }
    })

    //volume varying
    document.querySelector(".time-vol").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        recentsong.volume = parseInt(e.target.value) / 100;
    })
}

//function for next page design
function nextPage() {
    let x = document.querySelector(".rightbox")
    x.innerHTML = "";
    //background color
    document.querySelector(".rightbox").style.background = "linear-gradient(120deg, #6f7381 0%, #474b5a 100%)";
    //image of artist with name
    let upperbox = document.createElement("div")
    upperbox.setAttribute("class", "upperbox")
    document.querySelector(".rightbox").append(upperbox)

    let imagebox = document.createElement("img")
    imagebox.setAttribute("class", "artist-pic")
    let src = this.firstElementChild
    imagebox.setAttribute("src", src.getAttribute('src'))
    document.querySelector(".upperbox").append(imagebox)

    let name = document.createElement("div")
    name.setAttribute("class", "name")
    name.innerHTML = this.getAttribute('artist')
    document.querySelector(".upperbox").append(name)

    let songs = document.createElement("h2")
    songs.innerHTML = "Songs"
    songs.setAttribute("class", "headingsong")
    document.querySelector(".rightbox").append(songs)

    let songfolder = document.createElement("div")
    songfolder.setAttribute("class", "songlist")
    document.querySelector(".rightbox").append(songfolder)

    // player to play
    let player = document.createElement("div")
    player.setAttribute("class", "player")
    document.querySelector(".rightbox").append(player);

    //information of song (name + play/pause + time)
    let songinfo = document.createElement("div")
    songinfo.setAttribute("class", "songdetail")
    document.querySelector(".player").append(songinfo);

    //name of song
    let musicname = document.createElement("div")
    document.querySelector(".songdetail").append(musicname)

    //music button div
    let musicbuttons = document.createElement("div")
    musicbuttons.setAttribute("class", "musicbuttons")
    document.querySelector(".songdetail").append(musicbuttons);

    //buttons
    let prev = document.createElement("img")
    prev.setAttribute("id", "previousbutton")
    prev.setAttribute("src", "images/previousSong.svg")
    let play = document.createElement("img")
    play.setAttribute("id", "playbutton")
    play.setAttribute("src", "images/play.svg")
    let next = document.createElement("img")
    next.setAttribute("id", "nextbutton")
    next.setAttribute("src", "images/nextSong.svg")

    document.querySelector(".musicbuttons").append(prev)
    document.querySelector(".musicbuttons").append(play)
    document.querySelector(".musicbuttons").append(next)

    //time+volume
    let tv = document.createElement("div")
    tv.setAttribute("class", "time-vol");
    document.querySelector(".songdetail").append(tv)
    //timestamp
    let timestamp = document.createElement("div")
    timestamp.innerHTML = "00:00/00:00"
    document.querySelector(".time-vol").append(timestamp)
    //volume img
    let volimg = document.createElement("img")
    volimg.setAttribute("src", "images/volume.svg")
    document.querySelector(".time-vol").append(volimg)
    //vol input
    let vol = document.createElement("input");
    vol.setAttribute("type", "range");
    document.querySelector(".time-vol").append(vol)

    //seekbar
    let seekbar = document.createElement("div")
    seekbar.setAttribute("class", "seekbar")
    document.querySelector(".player").append(seekbar);
    //seekbar circle
    let circle = document.createElement("div")
    circle.setAttribute("class", "circle")
    document.querySelector(".seekbar").append(circle)

    //artist's music
    const artistName = this.getAttribute('artist');
    if (artistName) {
        playMusic(artistName);
    }
    else {
        alert('no songs!!');
    }
}

//oncllick functioning
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', nextPage);
});

//hamburger working
document.querySelector(".hambug").addEventListener("click", () => {
    document.querySelector(".leftbox").style.left = "0%";
})

//cross img working
document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".leftbox").style.left = "-100%";
})

//popup page
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.querySelector(".login-popup");
    const closeBtn = document.querySelector(".cross-popup");
    const login = document.querySelectorAll(".popup");
    const signup = document.querySelectorAll(".sign-popup")
    // Show the popup when clicking the button
    login.forEach(e => {
        e.addEventListener("click", () => {
            document.querySelector(".h2-popup").innerHTML = "Log in to Spotify";
            document.querySelector(".log-popup").innerHTML = "Log in";
            document.querySelector(".forget-popup").innerHTML = "Forgot your password?"
            document.querySelector(".container").style.display = "none";
            document.querySelector(".footer").style.display = "none";
            popup.style.display = "flex";
        });
    });
    signup.forEach(e => {
        e.addEventListener("click", () => {
            document.querySelector(".h2-popup").innerHTML = "Sign up to Spotify";
            document.querySelector(".log-popup").innerHTML = "Sign up";
            document.querySelector(".forget-popup").innerHTML = "Already have an account?"
            document.querySelector(".container").style.display = "none";
            document.querySelector(".footer").style.display = "none";
            popup.style.display = "flex";
        });
    });
    // Hide the popup when clicking the close button
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        document.querySelector(".container").style.display = "flex";
        document.querySelector(".footer").style.display = "flex";
    });

    // Hide the popup when clicking outside the popup content
    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
            document.querySelector(".container").style.display = "flex";
            document.querySelector(".footer").style.display = "flex";
        }
    });

    //switch to login/signup
    document.querySelector(".forget-popup").addEventListener("click",(e)=>{
        if(e.target.innerHTML=="Already have an account?"){
            e.target.innerHTML="Forgot your password?";
            document.querySelector(".h2-popup").innerHTML = "Log in to Spotify";
            document.querySelector(".log-popup").innerHTML = "Log In";
        }
        else{
            e.target.innerHTML="Already have an account?";
            document.querySelector(".h2-popup").innerHTML = "Sign up to Spotify";
            document.querySelector(".log-popup").innerHTML = "Sign up";
        }
        
    })
});











