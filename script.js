const message = `হয়তো আমাদের কথাও খুব বেশি হয়নি…    
কিন্তু তোমাকে প্রথম দেখার মুহূর্তটাই যেন আমার মনে একটা নরম কম্পন তৈরি করেছিল।    
যখনই তুমি পাশ দিয়ে যাও হৃদয়টা যেন একটু থমকে যায়। তুমি CST, 1st Semester, 2nd Shift এর...কিন্তু জানো?  
তোমার পরিচয়টা এখন আমার কাছে শুধু একটি তথ্য নয়, একটি অনুভূতি।    
জানি না আমি তোমার কাছে কে… কিন্তু তুমি আমার কাছে সত্যিই বিশেষ।    
যদি কখনো ইচ্ছে হয়, তোমার একটি উত্তর আমার দিনের রঙই বদলে দিতে পারে। 💖`;

const typingElement = document.getElementById("typingText");
let index = 0;

function typeText() {
  if (index < message.length) {
    let char = message.charAt(index);
    if (char === "💖" || char === "🥺") {
      typingElement.innerHTML += `<span class="emoji-sparkle">${char}</span>`;
    } else typingElement.innerHTML += char;
    index++;
    setTimeout(typeText, 30);
  }
}
typeText();

// Floating hearts
let heartInterval = setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (3 + Math.random() * 5) + "s";
  document.getElementById("hearts-container").appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}, 600);

// Confetti animation
function createConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 120;
  const confetti = [];

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - confettiCount,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360},100%,50%)`,
      tilt: Math.random() * 10 - 10
    });
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r/2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r/2);
      ctx.stroke();
    });
    update();
  }

  function update() {
    confetti.forEach(c => {
      c.y += Math.cos(c.d) + 1 + c.r/2;
      c.x += Math.sin(c.d);

      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  setInterval(draw, 16);
}

window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Buttons
const acceptBtn = document.getElementById("acceptBtn");
const rejectBtn = document.getElementById("rejectBtn");
const responseDiv = document.getElementById("responseMessage");
const body = document.body;
let bgMusic;

acceptBtn.addEventListener("click", () => {
  if (!bgMusic) {
    bgMusic = new Audio("https://files.catbox.moe/0sny8p.mp3");
    bgMusic.loop = true;
    bgMusic.play();
  }
  responseDiv.innerHTML = "💖 You accepted! Opening Google Form... 💖";
  responseDiv.style.opacity = 1;
  createConfetti();
  window.open("https://forms.gle/ETZ9pLBE1FeuurQW6", "_blank");
});

rejectBtn.addEventListener("click", () => {
  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }
  responseDiv.innerHTML = "💔 You rejected 💔";
  responseDiv.style.opacity = 1;
  clearInterval(heartInterval);
  body.style.background = "linear-gradient(to br, #a0aec0, #718096, #4a5568)";
});

// Hover hearts
document.querySelector(".card").addEventListener("mousemove", e => {
  const heart = document.createElement("div");
  heart.className = "hover-heart";
  heart.innerText = "❤️";
  heart.style.left = e.offsetX + "px";
  heart.style.top = e.offsetY + "px";
  document.querySelector(".card").appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
});
