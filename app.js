const playButton = document.querySelector("#play");
const myAudioFile = document.querySelector("audio");

let isAudioPlaying = false;

function playTheAudio() {
    myAudioFile.play();
    isAudioPlaying = true;
    playButton.classList.replace("fa-play", "fa-pause");
}

function pauseTheAudio() {
    myAudioFile.pause();
    isAudioPlaying = false;
    playButton.classList.replace("fa-pause", "fa-play");
}

// Play Button

playButton.addEventListener("click", () => {
    if (isAudioPlaying) {
        pauseTheAudio();
    } else {
        playTheAudio();
    }
})

// Forward Button click
// 1. Image
// 2. Audio
// 3. Song Name
// 4. Singer Name   

const mySongImage = document.querySelector("img");
const mySongName = document.querySelector("h1");
const mySingerName = document.querySelector("h2");

const songsData = [
    {
        songImage: "images/image1.jpeg",
        songAudio: "audios/audio1.mp3",
        songName: "Hotel California",
        singerName: "Eagles",
        isLike: false,
        backgroundColor: "#cf8a36"
    },
    {
        songImage: "images/image2.jpeg",
        songAudio: "audios/audio2.mp3",
        songName: "Someting in the Way",
        singerName: "Nirvana",
        isLike: false,
        backgroundColor: "#30302f"
    },
    {
        songImage: "images/image3.jpeg",
        songAudio: "audios/audio3.mp3",
        songName: "In the End",
        singerName: "Linkin Park",
        isLike: false,
        backgroundColor: "beige"
    },
    {
        songImage: "images/image4.jpeg",
        songAudio: "audios/audio4.mp3",
        songName: "Tom Sawyer",
        singerName: "Rush",
        isLike: false, 
        backgroundColor: "#b5434b"
    },
    {
        songImage: "images/image5.jpg",
        songAudio: "audios/audio5.mp3",
        songName: "Nothing Else Matters",
        singerName: "Metallica",
        isLike: false, 
        backgroundColor: "#737071"
    },
    {
        songImage: "images/image6.jpeg",
        songAudio: "audios/audio6.mp3",
        songName: "Hey Jude",
        singerName: "The Beatles",
        isLike: false,
        backgroundColor: "#d9d2d4"
    }, 
    {
        songImage: "images/image7.jpeg",
        songAudio: "audios/audio7.mp3",
        songName: "Wish You Were Here",
        singerName: "Pink Floyd",
        isLike: false,
        backgroundColor: "#bfbfbf"
    }
]

const totalSongs = songsData.length;

let shuffle = false;

const websiteBody = document.body;

// Forward Button
const forwardButton = document.querySelector("#forward");

function changeSongData(info) {
    mySongImage.src = info.songImage;
    myAudioFile.src = info.songAudio;
    mySongName.textContent = info.songName;
    mySingerName.textContent = info.singerName;
    websiteBody.style.backgroundColor = info.backgroundColor;
    
    if (info.isLike) {
        likeButton.style.color = "red";
    } else {
        likeButton.style.color = "";
    }
}

function playForward() {
    if (index < totalSongs - 1) {
        index++;
    } else {
        index = 0;
    }

    changeSongData(songsData[index]);
    playTheAudio();
} 

let index = 0;

forwardButton.addEventListener("click", () => {
    if (shuffle) {
        generateRandomSongs();
    } else {
        playForward();
    }
})

// Backward Button

const backwardButton = document.querySelector("#backward");

backwardButton.addEventListener("click", () => {
    if (index > 0) {
        index--;
    } else {
        index = totalSongs - 1;
    }

    changeSongData(songsData[index]);
    playTheAudio();
})

// Update duration and progress bar

const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const progressLine = document.querySelector("#progress-line");

myAudioFile.addEventListener("timeupdate", (output) => {
    let fetchedCurrentTime = output.srcElement.currentTime;
    let fetchedDuration = output.srcElement.duration;

    // Update Progress Bar 

    let audioProgress = (fetchedCurrentTime / fetchedDuration) * 100;

    progressLine.style.width = `${audioProgress}%`;

    // If audio finished

    if (audioProgress == 100) {
        if (shuffle == true) {
            generateRandomSongs();
        } else {
            playForward();
        }
    }

    // fetched duration in minutes and seconds

    let durationInMinutes = Math.floor(fetchedDuration / 60);
    let durationInSeconds = Math.floor(fetchedDuration % 60);

    if (durationInSeconds < 10) {
        durationInSeconds = `0${durationInSeconds}`;
    }

    totalTime.textContent = `${durationInMinutes}:${durationInSeconds}`;

    // cuurent time in minutes and seconds

    let currentTimeInMinutes = Math.floor(fetchedCurrentTime / 60);
    let currentTimeInSeconds = Math.floor(fetchedCurrentTime % 60);

    if (currentTimeInSeconds < 10) {
        currentTimeInSeconds = `0${currentTimeInSeconds}`;
    }

    currentTime.textContent = `${currentTimeInMinutes}:${currentTimeInSeconds}`;
})

// Like Button

const likeButton = document.querySelector("#like");

likeButton.addEventListener("click", () => {
    if (songsData[index].isLike) {
        likeButton.style.color = "";
        localStorage.removeItem(mySongName.textContent, mySingerName.textContent);
        songsData[index].isLike = false;
    } else {
        likeButton.style.color = "red";
        localStorage.setItem(mySongName.textContent, mySingerName.textContent);
        songsData[index].isLike = true;
    }
})

// Shuffle Button

const shuffleButton = document.querySelector("#shuffle");

function generateRandomSongs() {
    let randomIndex = Math.floor(Math.random() * totalSongs);

    if (randomIndex == index) {
        randomIndex = Math.floor(Math.random() * totalSongs);
    }


    index = randomIndex;
    changeSongData(songsData[index]);
    playTheAudio();
}

shuffleButton.addEventListener("click", () => {
    if (!shuffle) {
        shuffle = true;
        shuffleButton.style.color = "green";
        generateRandomSongs();
    } else {
        shuffle = false;
        shuffleButton.style.color = "";
    }
})