const app = () => {
	const song = document.querySelector('.song');
	const play = document.querySelector('.play');
	const outline = document.querySelector('.moving-outline circle');
	const video = document.querySelector('.vid-container video');


   //now we have to select all the sounds so 
   const sounds = document.querySelectorAll('.sound-picker button');
   //time display
   const timeDisplay = document.querySelector('.time-display');
   const timeSelect = document.querySelectorAll('.time-select button');
   //getting the length of the outline of the outer circle 
   const outlinelength = outline.getTotalLength();
   console.log(outlinelength);

   //duration
   let fakeDuration = 600;




     outline.style.strokeDasharray = outlinelength;
     outline.style.strokeDashoffset = outlinelength;

   //pick different sounds
   

   sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});


    //for playing sounds
    play.addEventListener('click',() =>{
    	
    	checkPlaying(song);
    });


    //selecting sound for each button
   

    timeSelect.forEach(option => {
  option.addEventListener("click", function() {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
  });
});

    // creating a func to stop and play the song
    const checkPlaying = song => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};



//animating the circle
song.ontimeupdate =() =>{
	let currentTime = song.currentTime;
	let elapsed = fakeDuration - currentTime;
	let seconds = Math.floor(elapsed%60);
	let minutes = Math.floor(elapsed/60);

	//animate on circle
	let progress = outlinelength -(currentTime/fakeDuration) *outlinelength;
	outline.style.strokeDashoffset = progress;

	//animating the text
	timeDisplay.textContent = `${minutes}:${seconds}`;

	if(currentTime >= fakeDuration){
		song.pause();
		song.currentTime = 0;
		play.src = "./svg/play.svg";
		video.pause();

	}
};
     




};







app();