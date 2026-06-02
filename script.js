let hasUserInteracted = false;

function initMedia() {
  console.log("initMedia called");
  const backgroundMusic = document.getElementById('background-music');
  const backgroundVideo = document.getElementById('background');
  if (!backgroundMusic || !backgroundVideo) {
    console.error("Media elements not found");
    return;
  }
  backgroundMusic.volume = 0.1;
  backgroundMusic.preload = 'auto';
  try { backgroundMusic.load(); } catch (e) {}
  backgroundVideo.muted = true; 

  
  backgroundVideo.play().catch(err => {
    console.error("Failed to play background video:", err);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const visitorCount = document.getElementById('visitor-count');
  const backgroundMusic = document.getElementById('background-music');
  const hackerMusic = document.getElementById('hacker-music');
  const rainMusic = document.getElementById('rain-music');
  const animeMusic = document.getElementById('anime-music');
  const carMusic = document.getElementById('car-music');
  const homeButton = document.getElementById('home-theme');
  const hackerButton = document.getElementById('hacker-theme');
  const rainButton = document.getElementById('rain-theme');
  const animeButton = document.getElementById('anime-theme');
  const carButton = document.getElementById('car-theme');
  const resultsButtonContainer = document.getElementById('results-button-container');
  const resultsButton = document.getElementById('results-theme');
  const volumeIcon = document.getElementById('volume-icon');
  const volumeSlider = document.getElementById('volume-slider');
  const transparencySlider = document.getElementById('transparency-slider');
  const backgroundVideo = document.getElementById('background');
  const hackerOverlay = document.getElementById('hacker-overlay');
  const snowOverlay = document.getElementById('snow-overlay');
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');
  const pythonBar = document.getElementById('python-bar');
  const cppBar = document.getElementById('cpp-bar');
  const csharpBar = document.getElementById('csharp-bar');
  const resultsHint = document.getElementById('results-hint');
  const profilePicture = document.querySelector('.profile-picture');
  const profileContainer = document.querySelector('.profile-container');
  const socialIcons = document.querySelectorAll('.social-icon');
  const badges = document.querySelectorAll('.badge');

  
  const cursor = document.querySelector('.custom-cursor');
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (isTouchDevice) {
    document.body.classList.add('touch-device');
    if (cursor) cursor.style.display = 'none';
  } else {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'scale(0.8) translate(-50%, -50%)';
    });

    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'scale(1) translate(-50%, -50%)';
    });
  }


  const startMessage = "Welcome! Click to continue!";
  let startTextContent = '';
  let startIndex = 0;
  let startCursorVisible = true;

  function typeWriterStart() {
    if (startIndex < startMessage.length) {
      startTextContent = startMessage.slice(0, startIndex + 1);
      startIndex++;
    }
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
    setTimeout(typeWriterStart, 100);
  }


  setInterval(() => {
    startCursorVisible = !startCursorVisible;
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
  }, 500);


const supabaseClient = window.supabase.createClient(
  "https://farebujaeqgfegagxhid.supabase.co",
  "sb_publishable__8Bh-LJpSf6NEOgPau0RYw_yfA6iaWw"
);

async function initializeVisitorCounter() {
  try {
    await supabaseClient
      .from("profile_views")
      .insert({});

    const { count, error } = await supabaseClient
      .from("profile_views")
      .select("*", {
        count: "exact",
        head: true
      });

    if (error) throw error;

    visitorCount.textContent = count.toLocaleString("en-US");
  } catch (err) {
    console.error("Supabase Counter Error:", err);
    visitorCount.textContent = "0";
  }
}

initializeVisitorCounter();

  let hasStartedExperience = false;

  async function playBackgroundMusic() {
    if (!backgroundMusic) return;

    try {
      backgroundMusic.muted = false;
      backgroundMusic.volume = 0.1;
      backgroundMusic.preload = 'auto';
      try { backgroundMusic.load(); } catch (e) {}
      await backgroundMusic.play();
      startBottomVisualizer(backgroundMusic);
    } catch (err) {
      console.error("Failed to play music after user interaction:", err);
    }
  }

  async function startExperience(e) {
    if (e) e.preventDefault();
    if (hasStartedExperience) return;
    hasStartedExperience = true;

    await playBackgroundMusic();

    startScreen.classList.add('hidden');
    profileBlock.classList.remove('hidden');

    gsap.killTweensOf(profileBlock);
    gsap.set(profileBlock, {
      autoAlpha: 0,
      scale: 0.985,
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0
    });

    gsap.to(profileBlock, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.75,
      ease: 'power2.out',
      onComplete: () => {
        profileContainer.classList.add('orbit');
      }
    });

    if (!isTouchDevice && typeof cursorTrailEffect !== 'undefined') {
      try {
        new cursorTrailEffect({ length: 10, size: 8, speed: 0.2 });
      } catch (err) {
        console.error("Failed to initialize cursor trail effect:", err);
      }
    }

    typeWriterName();
    typeWriterBio();
  }

  startScreen.addEventListener('pointerup', startExperience, { once: true });
  startScreen.addEventListener('click', startExperience, { once: true });


  const name = "k1mberlye";
  let nameText = '';
  let nameIndex = 0;
  let isNameDeleting = false;
  let nameCursorVisible = true;

  function typeWriterName() {
    if (!isNameDeleting && nameIndex < name.length) {
      nameText = name.slice(0, nameIndex + 1);
      nameIndex++;
    } else if (isNameDeleting && nameIndex > 0) {
      nameText = name.slice(0, nameIndex - 1);
      nameIndex--;
    } else if (nameIndex === name.length) {
      isNameDeleting = true;
      setTimeout(typeWriterName, 10000);
      return;
    } else if (nameIndex === 0) {
      isNameDeleting = false;
    }
    profileName.textContent = nameText + (nameCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) {
      profileName.classList.add('glitch');
      setTimeout(() => profileName.classList.remove('glitch'), 200);
    }
    setTimeout(typeWriterName, isNameDeleting ? 150 : 300);
  }

  setInterval(() => {
    nameCursorVisible = !nameCursorVisible;
    profileName.textContent = nameText + (nameCursorVisible ? '|' : ' ');
  }, 500);


  const bioMessages = [
    "Website Specialist • PC Optimization Specialist • Custom Windows optimization",
  ];
  let bioText = '';
  let bioIndex = 0;
  let bioMessageIndex = 0;
  let isBioDeleting = false;
  let bioCursorVisible = true;

  function typeWriterBio() {
    if (!isBioDeleting && bioIndex < bioMessages[bioMessageIndex].length) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex + 1);
      bioIndex++;
    } else if (isBioDeleting && bioIndex > 0) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex - 1);
      bioIndex--;
    } else if (bioIndex === bioMessages[bioMessageIndex].length) {
      isBioDeleting = true;
      setTimeout(typeWriterBio, 2000);
      return;
    } else if (bioIndex === 0 && isBioDeleting) {
      isBioDeleting = false;
      bioMessageIndex = (bioMessageIndex + 1) % bioMessages.length;
    }
    profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) {
      profileBio.classList.add('glitch');
      setTimeout(() => profileBio.classList.remove('glitch'), 200);
    }
    setTimeout(typeWriterBio, isBioDeleting ? 75 : 150);
  }

  setInterval(() => {
    bioCursorVisible = !bioCursorVisible;
    profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' ');
  }, 500);


  let currentAudio = backgroundMusic;
  let isMuted = false;

  if (volumeIcon) volumeIcon.addEventListener('click', () => {
    isMuted = !isMuted;
    currentAudio.muted = isMuted;
    volumeIcon.innerHTML = isMuted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });

  if (volumeIcon) volumeIcon.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isMuted = !isMuted;
    currentAudio.muted = isMuted;
    volumeIcon.innerHTML = isMuted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });

  if (volumeSlider) volumeSlider.addEventListener('input', () => {
    currentAudio.volume = volumeSlider ? volumeSlider.value : 0.3;
    isMuted = false;
    currentAudio.muted = false;
    volumeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });


  if (transparencySlider) transparencySlider.addEventListener('input', () => {
    const opacity = transparencySlider.value;
    if (opacity == 0) {
      profileBlock.style.background = 'rgba(0, 0, 0, 0)';
      profileBlock.style.borderOpacity = '0';
      profileBlock.style.borderColor = 'transparent';
      profileBlock.style.backdropFilter = 'none';
      skillsBlock.style.background = 'rgba(0, 0, 0, 0)';
      skillsBlock.style.borderOpacity = '0';
      skillsBlock.style.borderColor = 'transparent';
      skillsBlock.style.backdropFilter = 'none';
   
      profileBlock.style.pointerEvents = 'auto';
      socialIcons.forEach(icon => {
        icon.style.pointerEvents = 'auto';
        icon.style.opacity = '1';
      });
      badges.forEach(badge => {
        badge.style.pointerEvents = 'auto';
        badge.style.opacity = '1';
      });
      profilePicture.style.pointerEvents = 'auto';
      profilePicture.style.opacity = '1';
      profileName.style.opacity = '1';
      profileBio.style.opacity = '1';
      visitorCount.style.opacity = '1';
    } else {
      profileBlock.style.background = `rgba(0, 0, 0, ${opacity})`;
      profileBlock.style.borderOpacity = opacity;
      profileBlock.style.borderColor = '';
      profileBlock.style.backdropFilter = `blur(${10 * opacity}px)`;
      skillsBlock.style.background = `rgba(0, 0, 0, ${opacity})`;
      skillsBlock.style.borderOpacity = opacity;
      skillsBlock.style.borderColor = '';
      skillsBlock.style.backdropFilter = `blur(${10 * opacity}px)`;
      profileBlock.style.pointerEvents = 'auto';
      socialIcons.forEach(icon => {
        icon.style.pointerEvents = 'auto';
        icon.style.opacity = '1';
      });
      badges.forEach(badge => {
        badge.style.pointerEvents = 'auto';
        badge.style.opacity = '1';
      });
      profilePicture.style.pointerEvents = 'auto';
      profilePicture.style.opacity = '1';
      profileName.style.opacity = '1';
      profileBio.style.opacity = '1';
      visitorCount.style.opacity = '1';
    }
  });


  function switchTheme(videoSrc, audio, themeClass, overlay = null, overlayOverProfile = false) {
    let primaryColor;
    switch (themeClass) {
      case 'home-theme':
        primaryColor = '#00CED1';
        break;
      case 'hacker-theme':
        primaryColor = '#22C55E';
        break;
      case 'rain-theme':
        primaryColor = '#1E3A8A';
        break;
      case 'anime-theme':
        primaryColor = '#DC2626';
        break;
      case 'car-theme':
        primaryColor = '#EAB308';
        break;
      default:
        primaryColor = '#00CED1';
    }
    document.documentElement.style.setProperty('--primary-color', primaryColor);

    gsap.to(backgroundVideo, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        backgroundVideo.src = videoSrc;

        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        currentAudio = audio;
        currentAudio.volume = volumeSlider ? volumeSlider.value : 0.3;
        currentAudio.muted = isMuted;
        currentAudio.play().catch(err => console.error("Failed to play theme music:", err));

        document.body.classList.remove('home-theme', 'hacker-theme', 'rain-theme', 'anime-theme', 'car-theme');
        document.body.classList.add(themeClass);

        hackerOverlay.classList.add('hidden');
        snowOverlay.classList.add('hidden');
        profileBlock.style.zIndex = overlayOverProfile ? 10 : 20;
        skillsBlock.style.zIndex = overlayOverProfile ? 10 : 20;
        if (overlay) {
          overlay.classList.remove('hidden');
        }

        if (themeClass === 'hacker-theme') {
          resultsButtonContainer.classList.remove('hidden');
        } else {
          resultsButtonContainer.classList.add('hidden');
          skillsBlock.classList.add('hidden');
          resultsHint.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.to(profileBlock, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
        }

        gsap.to(backgroundVideo, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            profileContainer.classList.remove('orbit');
            void profileContainer.offsetWidth;
            profileContainer.classList.add('orbit');
          }
        });
      }
    });
  }


  homeButton.addEventListener('click', () => {
    switchTheme('assets/background.mp4', backgroundMusic, 'home-theme');
  });
  homeButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/background.mp4', backgroundMusic, 'home-theme');
  });

  hackerButton.addEventListener('click', () => {
    switchTheme('assets/hacker_background.mp4', hackerMusic, 'hacker-theme', hackerOverlay, false);
  });
  hackerButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/hacker_background.mp4', hackerMusic, 'hacker-theme', hackerOverlay, false);
  });

  rainButton.addEventListener('click', () => {
    switchTheme('assets/rain_background.mov', rainMusic, 'rain-theme', snowOverlay, true);
  });
  rainButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/rain_background.mov', rainMusic, 'rain-theme', snowOverlay, true);
  });

  animeButton.addEventListener('click', () => {
    switchTheme('assets/anime_background.mp4', animeMusic, 'anime-theme');
  });
  animeButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/anime_background.mp4', animeMusic, 'anime-theme');
  });

  carButton.addEventListener('click', () => {
    switchTheme('assets/car_background.mp4', carMusic, 'car-theme');
  });
  carButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/car_background.mp4', carMusic, 'car-theme');
  });

 
  function handleTilt(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let clientX, clientY;

    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mouseX = clientX - centerX;
    const mouseY = clientY - centerY;

    const maxTilt = 15;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    gsap.to(element, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  }

  if (!isTouchDevice) {
    profileBlock.addEventListener('mousemove', (e) => handleTilt(e, profileBlock));
    skillsBlock.addEventListener('mousemove', (e) => handleTilt(e, skillsBlock));

    profileBlock.addEventListener('mouseleave', () => {
      gsap.to(profileBlock, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
    });

    skillsBlock.addEventListener('mouseleave', () => {
      gsap.to(skillsBlock, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
    });
  }


  profilePicture.addEventListener('mouseenter', () => {
    glitchOverlay.style.opacity = '1';
    setTimeout(() => {
      glitchOverlay.style.opacity = '0';
    }, 500);
  });


  profilePicture.addEventListener('click', () => {
    profileContainer.classList.remove('fast-orbit');
    profileContainer.classList.remove('orbit');
    void profileContainer.offsetWidth;
    profileContainer.classList.add('fast-orbit');
    setTimeout(() => {
      profileContainer.classList.remove('fast-orbit');
      void profileContainer.offsetWidth;
      profileContainer.classList.add('orbit');
    }, 500);
  });

  profilePicture.addEventListener('touchstart', (e) => {
    e.preventDefault();
    profileContainer.classList.remove('fast-orbit');
    profileContainer.classList.remove('orbit');
    void profileContainer.offsetWidth;
    profileContainer.classList.add('fast-orbit');
    setTimeout(() => {
      profileContainer.classList.remove('fast-orbit');
      void profileContainer.offsetWidth;
      profileContainer.classList.add('orbit');
    }, 500);
  });

 
  let isShowingSkills = false;
  resultsButton.addEventListener('click', () => {
    if (!isShowingSkills) {
      gsap.to(profileBlock, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          profileBlock.classList.add('hidden');
          skillsBlock.classList.remove('hidden');
          gsap.fromTo(skillsBlock,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
          gsap.to(pythonBar, { width: '87%', duration: 2, ease: 'power2.out' });
          gsap.to(cppBar, { width: '75%', duration: 2, ease: 'power2.out' });
          gsap.to(csharpBar, { width: '80%', duration: 2, ease: 'power2.out' });
        }
      });
      resultsHint.classList.remove('hidden');
      isShowingSkills = true;
    } else {
      gsap.to(skillsBlock, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          skillsBlock.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.fromTo(profileBlock,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        }
      });
      resultsHint.classList.add('hidden');
      isShowingSkills = false;
    }
  });

  resultsButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (!isShowingSkills) {
      gsap.to(profileBlock, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          profileBlock.classList.add('hidden');
          skillsBlock.classList.remove('hidden');
          gsap.fromTo(skillsBlock,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
          gsap.to(pythonBar, { width: '87%', duration: 2, ease: 'power2.out' });
          gsap.to(cppBar, { width: '75%', duration: 2, ease: 'power2.out' });
          gsap.to(csharpBar, { width: '80%', duration: 2, ease: 'power2.out' });
        }
      });
      resultsHint.classList.remove('hidden');
      isShowingSkills = true;
    } else {
      gsap.to(skillsBlock, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          skillsBlock.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.fromTo(profileBlock,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        }
      });
      resultsHint.classList.add('hidden');
      isShowingSkills = false;
    }
  });


  typeWriterStart();
});

/* =========================================================
   DISCORD LIVE DATA
   Isi bagian CONFIG ini saja.
   - DISCORD_USER_ID wajib angka, bukan username.
   - DISCORD_INVITE_CODE ambil dari link invite: discord.gg/KODEINI
   - Untuk status live, akun Discord kamu harus join server Lanyard: https://discord.gg/lanyard
   ========================================================= */
const DISCORD_CONFIG = {
  userId: "1076515431906549831",
  inviteCode: "https://discord.gg/9j4Y7z79Y5"
};

function getDiscordAvatarUrl(user) {
  if (!user || !user.id || !user.avatar) return "assets/profile.gif";
  const ext = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
}

function getDiscordServerIconUrl(guild) {
  if (!guild || !guild.id || !guild.icon) return "assets/server-icon.jpg";
  const ext = guild.icon.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${ext}?size=256`;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

function setImage(id, src) {
  const el = document.getElementById(id);
  if (el && src) el.src = src;
}

async function loadDiscordUserLive() {
  if (!DISCORD_CONFIG.userId || DISCORD_CONFIG.userId.includes("ISI_")) return;

  const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_CONFIG.userId}`);
  const json = await res.json();
  if (!json.success || !json.data) return;

  const data = json.data;
  const user = data.discord_user;
  const status = data.discord_status || "offline";

  setImage("discord-user-avatar", getDiscordAvatarUrl(user));
  setText("discord-username", user.global_name || user.display_name || user.username || "discord user");

  const statusDot = document.getElementById("discord-user-status");
  if (statusDot) statusDot.className = `discord-status ${status}`;

  const customStatus = data.activities?.find(a => a.type === 4)?.state;
  const playing = data.activities?.find(a => a.type === 0)?.name;
  const listening = data.listening_to_spotify ? `Listening to ${data.spotify.song}` : null;

  const fallbackStatus = {
    online: "Online",
    idle: "Idle",
    dnd: "Do not disturb",
    offline: "Currently doing nothing"
  };

  setText("discord-activity", customStatus || listening || (playing ? `Playing ${playing}` : fallbackStatus[status]));
}

async function loadDiscordServerLive() {
  if (!DISCORD_CONFIG.inviteCode || DISCORD_CONFIG.inviteCode.includes("ISI_")) return;

  const inviteCode = DISCORD_CONFIG.inviteCode.replace("https://discord.gg/", "").replace("discord.gg/", "").trim();
  const res = await fetch(`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=true`);
  const data = await res.json();
  if (!data || !data.guild) return;

  setText("discord-server-name", data.guild.name || "Discord Server");
  setText("discord-online-count", `${Number(data.approximate_presence_count || 0).toLocaleString()} online`);
  setText("discord-member-count", `${Number(data.approximate_member_count || 0).toLocaleString()} members`);
  setImage("discord-server-icon", getDiscordServerIconUrl(data.guild));

  const join = document.getElementById("discord-join-link");
  if (join) join.href = `https://discord.gg/${inviteCode}`;
}

async function loadDiscordLiveCards() {
  try { await loadDiscordUserLive(); } catch (err) { console.log("Lanyard user failed:", err); }
  try { await loadDiscordServerLive(); } catch (err) { console.log("Discord invite failed:", err); }
}

document.addEventListener("DOMContentLoaded", () => {
  loadDiscordLiveCards();
  setInterval(loadDiscordLiveCards, 30000);
});


/* =========================================================
   BOTTOM AUDIO VISUALIZER - Linux/CAVA style
   Works after the user taps/clicks the start screen.
   ========================================================= */
let bottomVisualizerStarted = false;
let bottomVisualizerAudioContext = null;

function startBottomVisualizer(audioElement) {
  if (bottomVisualizerStarted || !audioElement) return;

  const canvas = document.getElementById("bottom-visualizer");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  bottomVisualizerStarted = true;

  try {
    bottomVisualizerAudioContext = new (window.AudioContext || window.webkitAudioContext)();

    if (bottomVisualizerAudioContext.state === "suspended") {
      bottomVisualizerAudioContext.resume().catch(() => {});
    }

    const source = bottomVisualizerAudioContext.createMediaElementSource(audioElement);
    const analyser = bottomVisualizerAudioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(bottomVisualizerAudioContext.destination);

    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.82;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function resizeVisualizer() {
      const isMobile = window.innerWidth <= 768;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssHeight = isMobile ? 72 : 120;

      canvas.style.height = cssHeight + "px";
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeVisualizer();
    window.addEventListener("resize", resizeVisualizer);

    function drawVisualizer() {
      requestAnimationFrame(drawVisualizer);

      const width = window.innerWidth;
      const height = window.innerWidth <= 768 ? 72 : 120;

      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, width, height);

      const bars = window.innerWidth <= 768 ? 34 : 58;
      const gap = window.innerWidth <= 768 ? 3 : 4;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        const dataIndex = Math.floor((i / bars) * bufferLength);
        const value = dataArray[dataIndex] || 0;

        const normalized = value / 255;
        const barHeight = Math.max(3, normalized * height);
        const x = i * barWidth;
        const y = height - barHeight;

        const gradient = ctx.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, "rgba(0, 206, 209, 0.95)");
        gradient.addColorStop(0.45, "rgba(255, 107, 158, 0.55)");
        gradient.addColorStop(1, "rgba(0, 206, 209, 0.02)");

        ctx.shadowBlur = 16;
        ctx.shadowColor = "#00CED1";
        ctx.fillStyle = gradient;

        const radius = 8;
        const drawWidth = Math.max(2, barWidth - gap);

        roundRect(ctx, x + gap / 2, y, drawWidth, barHeight + 10, radius);
        ctx.fill();
      }
    }

    drawVisualizer();
  } catch (err) {
    console.error("Visualizer failed:", err);
    bottomVisualizerStarted = false;
  }
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}


/* =========================================
   FAKE TERMINAL
   open from the "open terminal" button or Ctrl + `
========================================= */
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-terminal-btn');
  const overlay = document.getElementById('terminal-overlay');
  const closeBtn = document.getElementById('terminal-close');
  const output = document.getElementById('terminal-output');
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  const visitorCount = document.getElementById('visitor-count');

  if (!openBtn || !overlay || !closeBtn || !output || !form || !input) return;

  let bootedOnce = false;

  const bootLines = [
    { text: 'initializing k1mberlye profile shell...', type: 'dim' },
    { text: 'loading modules: discord, supabase, visualizer...', type: 'dim' },
    { text: 'checking access token...', type: 'dim' },
    { text: 'access granted.', type: 'success' },
    { text: '' },
    { text: 'type help to see available commands.', type: 'warning' }
  ];

  const commands = {
    help: [
      'available commands:',
      '  about      show profile info',
      '  services   show what i do',
      '  status     show current status',
      '  views      show profile views',
      '  socials    show social links',
      '  contact    show contact info',
      '  discord    open discord invite',
      '  saweria    open saweria page',
      '  clear      clear terminal',
      '  exit       close terminal'
    ],
    about: [
      'user: k1mberlye / aresrhdn',
      'role: profile website builder + pc optimization specialist',
      'stack: html, css, javascript, vercel, supabase',
      'vibe: cyberpunk glassmorphism with live widgets'
    ],
    services: [
      'services:',
      '  > pc optimization',
      '  > gaming performance tweaks',
      '  > custom windows optimization',
      '  > interactive profile website'
    ],
    status: [
      'status: online',
      'mode: building something cool',
      'audio visualizer: active',
      'discord presence: live'
    ],
    socials: [
      'socials:',
      '  github   : github.com/k1mberlye',
      '  website  : aresrhdn.my.id',
      '  discord  : check the discord card'
    ],
    contact: [
      'contact:',
      '  discord: use the discord card',
      '  support: saweria.co/aresrhdn'
    ]
  };

  function appendLine(text = '', type = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`.trim();
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function appendCommand(command) {
    appendLine(`k1mberlye@profile:~$ ${command}`, 'command');
  }

  async function typeLines(lines, delay = 90) {
    for (const item of lines) {
      const text = typeof item === 'string' ? item : item.text;
      const type = typeof item === 'string' ? '' : item.type;
      appendLine(text, type);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  async function openTerminal() {
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('terminal-open');

    if (!bootedOnce) {
      output.innerHTML = '';
      bootedOnce = true;
      await typeLines(bootLines, 105);
    }

    setTimeout(() => input.focus(), 70);
  }

  function closeTerminal() {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('terminal-open');
  }

  function handleCommand(rawCommand) {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    appendCommand(command);

    if (command === 'clear') {
      output.innerHTML = '';
      return;
    }

    if (command === 'exit') {
      appendLine('closing terminal...', 'dim');
      setTimeout(closeTerminal, 350);
      return;
    }

    if (command === 'views') {
      const views = visitorCount ? visitorCount.textContent : 'loading';
      appendLine(`profile views: ${views}`, 'success');
      return;
    }

    if (command === 'discord') {
      appendLine('opening discord...', 'success');
      const discordLink = document.querySelector('.discord-card a, a[href*="discord"]');
      if (discordLink && discordLink.href) {
        window.open(discordLink.href, '_blank');
      } else {
        appendLine('discord link not found in this page.', 'warning');
      }
      return;
    }

    if (command === 'saweria') {
      appendLine('opening saweria...', 'success');
      window.open('https://saweria.co/aresrhdn', '_blank');
      return;
    }

    if (commands[command]) {
      commands[command].forEach(line => appendLine(line));
      return;
    }

    appendLine(`command not found: ${command}`, 'error');
    appendLine('type help for command list.', 'dim');
  }

  openBtn.addEventListener('click', openTerminal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const command = input.value;
    input.value = '';
    handleCommand(command);
  });

  closeBtn.addEventListener('click', closeTerminal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeTerminal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      closeTerminal();
    }

    if (e.ctrlKey && e.key === '`') {
      e.preventDefault();
      if (overlay.classList.contains('hidden')) openTerminal();
      else closeTerminal();
    }
  });
});
