const bgMusic = document.getElementById("bgMusic");
const songSelect = document.getElementById("songSelect");

// اسم مجلد الأغاني
const musicFolder = "music/";

// هنا بتجيب كل الملفات الموجودة في المجلد
const songs = [
  "اختاري يلا مستنيه ايه ؟",
  "Ballad to a Mexican Desert.mp3",
  "Golden Brown (Slowed Down Version).mp3",
  "Eminem - Mockingbird.mp3",
  "men 9al en tla9e.mp3",
  "music5.mp3"
];

// إنشاء الخيارات تلقائيًا
songs.forEach(song => {
  let option = document.createElement("option");
  option.value = musicFolder + song;
  option.textContent = song.replace(".mp3","");
  songSelect.appendChild(option);
});

// تشغيل الأغنية عند اختيارها
songSelect.addEventListener("change", function(){
  let song = songSelect.value;
  bgMusic.src = song;
  bgMusic.play();
  updateMusicButton(true);
});

// ===== زرار تشغيل/إيقاف الموسيقى =====
let isMusicPlaying = true;

function toggleMusic(){
  if(bgMusic.paused){
    bgMusic.play();
    isMusicPlaying = true;
    updateMusicButton(true);
  } else {
    bgMusic.pause();
    isMusicPlaying = false;
    updateMusicButton(false);
  }
}

function updateMusicButton(playing){
  const musicIcon = document.getElementById("musicIcon");
  const musicText = document.getElementById("musicText");
  const musicToggle = document.getElementById("musicToggle");

  if(playing){
    musicIcon.textContent = "🎵";
    musicText.textContent = "إيقاف الموسيقى";
    musicToggle.style.borderColor = "rgba(255,0,110,0.5)";
  } else {
    musicIcon.textContent = "🔇";
    musicText.textContent = "تشغيل الموسيقى";
    musicToggle.style.borderColor = "rgba(100,100,100,0.5)";
  }
}

// تسجيل الدخول
function login(){
  let pass = document.getElementById("pass").value;

  if(pass === "0"){
    document.getElementById("login").style.display = "none";
    startHackEffect();

    setTimeout(() => {
      showHeart();
    }, 3000);

    setTimeout(() => {
      document.getElementById("hackEffect").style.display = "none";
      document.getElementById("heartPhotos").style.display = "none";
      document.getElementById("site").classList.remove("hidden");

      loadGallery();
      startBackground();
      createStars(100);
      initTimer();
      initMemoryBook();

      // تشغيل الموسيقى تلقائيًا بعد الدخول
      bgMusic.play().catch(e => console.log("Auto-play prevented"));
      updateMusicButton(true);
    }, 7000);
  } else {
    document.getElementById("error").textContent = "كلمة السر غلط!";
    document.getElementById("error").style.color = "#ff4444";
  }
}

// الجاليري
function loadGallery(){
  let gallery = document.querySelector(".cardGallery");
  gallery.innerHTML = ''; // Clear first
  for(let i = 1; i <= 28; i++){
    let img = document.createElement("img");
    img.src = "photos/" + i + ".webp";
    img.alt = "Photo " + i;
    img.loading = "lazy"; // Lazy loading for better performance
    gallery.appendChild(img);
  }
}

// الخلفية المتحركة
function startBackground(){
  const bg = document.getElementById("movingBackground");
  bg.innerHTML = ''; // Clear first
  for(let i = 0; i < 10; i++){
    let img = document.createElement("img");
    let num = Math.floor(Math.random() * 20) + 1;
    img.src = "photos/" + num + ".webp";
    img.className = "bgphoto";
    img.style.left = Math.random() * 100 + "%";
    img.style.animationDuration = (25 + Math.random() * 20) + "s";
    img.style.animationDelay = Math.random() * 5 + "s";
    bg.appendChild(img);
  }
}

// النجوم
function createStars(num){
  const stars = document.getElementById("stars");
  stars.innerHTML = ''; // Clear first
  for(let i = 0; i < num; i++){
    let star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.width = star.style.height = (1 + Math.random() * 3) + "px";
    star.style.animationDuration = (5 + Math.random() * 10) + "s";
    star.style.animationDelay = Math.random() * 5 + "s";
    star.style.opacity = Math.random();
    stars.appendChild(star);
  }
}

// ===== Enhanced Memory Book =====
let currentPage = 0;
const memories = [
  { title: "أول يوم عرفتك", text: "أول يوم عرفتك فيه كان يوم مختلف... يوم غير حياتي للأحسن. من ساعة ما عرفتك وأنا بحس إن الدنيا أجمل." },
  { title: "أول ضحكة", text: "أول مرة ضحكتيلي فيها حسيت إن قلبي طار. ضحكتك نور في حياتي." },
  { title: "أول خروجة", text: "أول مرة خرجنا مع بعض كانت أحلى يوم في حياتي. كنتي زي القمر." },
  { title: "أول هدية", text: "أول هدية جبتها ليكي كانت من قلبي، وكل هدية بعد كده كانت جزء من قلبي." },
  { title: "أحلامنا", text: "كل يوم بيفوت بيكي بيكون أحلى. باحلم بمستقبلنا مع بعض، وإن شاء الله يكون أحلى مما نتخيل." }
];

function initMemoryBook(){
  updateBookPages();
  updatePageIndicator();
}

function updateBookPages(){
  const leftPage = document.getElementById('leftPage');
  const rightPage = document.getElementById('rightPage');

  // Calculate which memories to show
  const leftIndex = currentPage * 2;
  const rightIndex = leftIndex + 1;

  // Update left page
  if(leftIndex < memories.length){
    leftPage.querySelector('h3').textContent = memories[leftIndex].title;
    leftPage.querySelector('p').textContent = memories[leftIndex].text;
    leftPage.querySelector('.page-number').textContent = (leftIndex + 1);
    leftPage.style.visibility = 'visible';
  } else {
    leftPage.style.visibility = 'hidden';
  }

  // Update right page
  if(rightIndex < memories.length){
    rightPage.querySelector('h3').textContent = memories[rightIndex].title;
    rightPage.querySelector('p').textContent = memories[rightIndex].text;
    rightPage.querySelector('.page-number').textContent = (rightIndex + 1);
    rightPage.style.visibility = 'visible';
  } else {
    rightPage.style.visibility = 'hidden';
  }
}

function nextPage(){
  if((currentPage + 1) * 2 < memories.length){
    const rightPage = document.getElementById('rightPage');

    // Add flip animation
    rightPage.classList.add('flipping-next');

    setTimeout(() => {
      currentPage++;
      updateBookPages();
      updatePageIndicator();
      rightPage.classList.remove('flipping-next');
    }, 400);
  }
}

function prevPage(){
  if(currentPage > 0){
    const leftPage = document.getElementById('leftPage');

    // Add flip animation
    leftPage.classList.add('flipping-prev');

    setTimeout(() => {
      currentPage--;
      updateBookPages();
      updatePageIndicator();
      leftPage.classList.remove('flipping-prev');
    }, 400);
  }
}

function updatePageIndicator(){
  document.getElementById('currentPageNum').textContent = currentPage + 1;
  document.getElementById('totalPages').textContent = Math.ceil(memories.length / 2);
}

// ===== Timer - Without Seconds =====
function initTimer(){
  // التاريخ اللي اتفقت عليه مع صفاء (13 سبتمبر 2024)
  const startDate = new Date("2024-09-13T00:00:00").getTime();

  function updateTimer(){
    const now = new Date().getTime();
    const diff = now - startDate;

    if(diff < 0){
      document.getElementById("days").innerText = "0";
      document.getElementById("hours").innerText = "0";
      document.getElementById("minutes").innerText = "0";
      return;
    }

    // حساب الوقت (بدون ثواني)
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    // تحديث الأرقام
    updateNumber("days", days);
    updateNumber("hours", hours.toString().padStart(2, '0'));
    updateNumber("minutes", minutes.toString().padStart(2, '0'));
  }

  function updateNumber(id, value){
    const element = document.getElementById(id);
    if(element.innerText !== value.toString()){
      element.style.transform = "scale(1.1)";
      setTimeout(() => {
        element.innerText = value;
        element.style.transform = "scale(1)";
      }, 150);
    }
  }

  updateTimer();
  setInterval(updateTimer, 60000); // Update every minute instead of every second
}

// Scroll to section
function scrollToSection(id){
  const element = document.getElementById(id);
  if(element){
    const offset = 80; // Header offset
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

// القلوب عند الضغط
let lastHeartTime = 0;
document.addEventListener("click", function(e){
  // Prevent hearts on buttons and images
  if(e.target.tagName === 'IMG' || e.target.tagName === 'BUTTON' || 
     e.target.closest('button') || e.target.closest('.cardGallery')){
    return;
  }

  // Throttle heart creation
  const now = Date.now();
  if(now - lastHeartTime < 100) return;
  lastHeartTime = now;

  let heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";
  heart.style.position = "fixed";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "9999";

  // Random heart color
  const colors = ['#ff006e', '#8338ec', '#ff4fd8', '#ff6b9d'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  heart.style.background = color;

  document.body.appendChild(heart);

  // Animate
  heart.animate([
    { transform: 'translate(-50%, -50%) scale(0) rotate(-45deg)', opacity: 1 },
    { transform: 'translate(-50%, -50%) scale(1.2) rotate(-45deg)', opacity: 1, offset: 0.3 },
    { transform: `translate(-50%, -${100 + Math.random() * 100}px) scale(0) rotate(-45deg)`, opacity: 0 }
  ], {
    duration: 1000 + Math.random() * 500,
    easing: 'ease-out'
  }).onfinish = () => heart.remove();
});

// Hack Effect
function startHackEffect(){
  const canvas = document.getElementById("hackEffect");
  canvas.style.display = "block";
  const ctx = canvas.getContext("2d");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const numbers = "0123456789";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for(let x = 0; x < columns; x++){
    drops[x] = 1;
  }

  function draw(){
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff4fd8";
    ctx.font = fontSize + "px monospace";

    for(let i = 0; i < drops.length; i++){
      const text = numbers[Math.floor(Math.random() * numbers.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if(drops[i] * fontSize > canvas.height && Math.random() > 0.975){
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const interval = setInterval(draw, 50);
  setTimeout(() => clearInterval(interval), 7000);
}

// Heart Photos Effect
function showHeart(){
  const container = document.getElementById("heartPhotos");
  container.style.display = "block";
  container.innerHTML = '';

  const photos = [];
  for(let i = 1; i <= 10; i++){
    photos.push("photos/" + i + ".webp");
  }

  const heartPoints = [];
  for(let t = 0; t < Math.PI * 2; t += 0.3){
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    heartPoints.push([x, y]);
  }

  heartPoints.forEach((p, i) => {
    let img = document.createElement("img");
    img.src = photos[i % photos.length];
    img.className = "heartImg";
    img.style.left = (200 + p[0] * 8) + "px";
    img.style.top = (200 + p[1] * 8) + "px";
    img.style.opacity = "0";
    img.style.transform = "scale(0)";
    container.appendChild(img);

    setTimeout(() => {
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    }, i * 150);
  });
}

// Image Viewer
let viewer = document.getElementById("imageViewer");
let viewerImg = document.getElementById("viewerImg");

document.addEventListener("click", function(e){
  if(e.target.closest(".cardGallery img")){
    viewer.style.display = "flex";
    viewerImg.src = e.target.src;
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }
});

document.getElementById("closeViewer").onclick = function(){
  viewer.style.display = "none";
  document.body.style.overflow = ""; // Restore scrolling
}

// Close viewer when clicking outside image
viewer.onclick = function(e){
  if(e.target === viewer){
    viewer.style.display = "none";
    document.body.style.overflow = "";
  }
}

// Swipe to close viewer on mobile
let touchStartX = 0;
let touchEndX = 0;

viewer.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

viewer.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe(){
  if(Math.abs(touchEndX - touchStartX) > 50){
    viewer.style.display = "none";
    document.body.style.overflow = "";
  }
}

// Birthday Functions
function openBirthday(){
  const popup = document.getElementById("birthdayPopup");
  popup.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Reset candles
  const flames = document.querySelectorAll(".flame");
  flames.forEach(flame => {
    flame.classList.remove("blown");
    flame.style.opacity = "1";
  });

  // Hide wish message
  const wish = document.getElementById("birthdayWish");
  if(wish){
    wish.classList.add("hidden");
  }

  // Reset text
  const blowText = document.querySelector(".blowText");
  if(blowText){
    blowText.innerHTML = "🎂 انفخي في المايك بقوة عشان تطفئي الشموع! 💨";
    blowText.style.color = "#fff";
  }

  // Start mic detection
  setTimeout(startMic, 500);
}

function closeBirthday(){
  const popup = document.getElementById("birthdayPopup");
  popup.style.display = "none";
  document.body.style.overflow = "";
}

// Close on Escape key
document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    closeBirthday();
    viewer.style.display = "none";
    document.body.style.overflow = "";
  }
});

// Blow candles function
function blowCandles(){
  const flames = document.querySelectorAll(".flame");

  // Check if already blown
  if(flames[0].classList.contains("blown")) return;

  // Add blown class to all flames with staggered animation
  flames.forEach((flame, index) => {
    setTimeout(() => {
      flame.classList.add("blown");
      createSmoke(flame);
    }, index * 150);
  });

  // Show wish message after all candles are blown
  setTimeout(() => {
    const wish = document.getElementById("birthdayWish");
    if(wish){
      wish.classList.remove("hidden");
    }

    createCelebration();
  }, flames.length * 150 + 300);
}

// Create smoke effect
function createSmoke(candleElement){
  const rect = candleElement.getBoundingClientRect();

  for(let i = 0; i < 3; i++){
    setTimeout(() => {
      const smoke = document.createElement("div");
      smoke.className = "smoke";
      smoke.style.left = (rect.left + rect.width/2) + "px";
      smoke.style.top = rect.top + "px";
      smoke.style.position = "fixed";
      smoke.style.pointerEvents = "none";
      smoke.style.zIndex = "100000";
      document.body.appendChild(smoke);

      setTimeout(() => smoke.remove(), 2000);
    }, i * 100);
  }
}

// Microphone detection
async function startMic(){
  try{
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const mic = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    mic.connect(analyser);
    analyser.fftSize = 512;

    const data = new Uint8Array(analyser.frequencyBinCount);
    let blowDetected = false;
    let blowThreshold = 50;
    let consecutiveBlows = 0;

    function detectBlow(){
      if(blowDetected) return;

      analyser.getByteFrequencyData(data);
      let volume = data.reduce((a, b) => a + b) / data.length;

      if(volume > blowThreshold){
        consecutiveBlows++;
        if(consecutiveBlows >= 2){
          blowDetected = true;
          blowCandles();
          stream.getTracks().forEach(track => track.stop());

          const blowText = document.querySelector(".blowText");
          if(blowText){
            blowText.innerHTML = "🎉 يااااي! شاطرة! الشموع اتطفت! 🎉";
            blowText.style.color = "#ff4fd8";
          }
          return;
        }
      } else {
        consecutiveBlows = 0;
      }

      requestAnimationFrame(detectBlow);
    }

    detectBlow();

    // Stop after 30 seconds if no blow detected
    setTimeout(() => {
      if(!blowDetected){
        stream.getTracks().forEach(track => track.stop());
      }
    }, 30000);

  } catch(e){
    console.log("Mic access denied or not available");
    const blowText = document.querySelector(".blowText");
    if(blowText){
      blowText.innerHTML = "🎤 اضغطي على الشاشة عشان تطفئي الشموع!";
    }

    // Add click fallback
    const popup = document.getElementById("birthdayPopup");
    popup.onclick = function(e){
      if(e.target.id !== "closeBirthday" && !e.target.closest(".birthdayBox")){
        blowCandles();
      }
    };
  }
}

// Celebration effect
function createCelebration(){
  const colors = ['#ff4fd8', '#ff6b9d', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff006e'];

  for(let i = 0; i < 50; i++){
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-10px";
      confetti.style.width = (8 + Math.random() * 8) + "px";
      confetti.style.height = confetti.style.width;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.zIndex = "100000";
      confetti.style.pointerEvents = "none";

      const duration = 2 + Math.random() * 2;
      confetti.style.animation = `fallConfetti ${duration}s linear forwards`;

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), duration * 1000);
    }, i * 30);
  }
}

// Add confetti animation
const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
  @keyframes fallConfetti {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
`;
document.head.appendChild(confettiStyle);

// Handle window resize
window.addEventListener('resize', () => {
  const canvas = document.getElementById("hackEffect");
  if(canvas){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if(now - lastTouchEnd <= 300){
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);
