//////////////////////////////////////// Youtube
let ytPlayer = document.querySelector('[id^="yt-player"]');
if (ytPlayer) {
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var playerInfoList = [
    {
      id: "yt-player-1",
      videoId: "TlnbPLpZBmQ",
      trigger: "trigger-yt-player-1",
      container: "display-yt-player-1",
      transition: "transition-yt-player-1",
      opacityTransition: true,
    },
    {
      id: "yt-player-2",
      videoId: "SBTwhbsGhys",
      trigger: "trigger-yt-player-2",
      container: "display-yt-player-2",
      transition: "transition-yt-player-2",
      opacityTransition: false,
    },
  ];

  var players = [];

  function onYouTubeIframeAPIReady() {
    if (typeof playerInfoList === "undefined") return;

    for (var i = 0; i < playerInfoList.length; i++) {
      var player = createPlayer(playerInfoList[i]);
      players[i] = player;
    }
  }

  function createPlayer(playerInfo) {
    let triggerElem = document.getElementById(
      (playerInfo.trigger = `trigger-${playerInfo.id}`)
    );
    let triggerVideo = triggerElem.querySelector("video");
    let containerElem = document.getElementById(
      (playerInfo.container = `display-${playerInfo.id}`)
    );
    let triggerOverlay = triggerElem.querySelector(".video-bg__lightbox");
    let transitionElem = document.getElementById(
      (playerInfo.transition = `transition-${playerInfo.id}`)
    );

    if (!triggerElem || !containerElem) {
      return;
    }

    return new YT.Player(playerInfo.id, {
      videoId: playerInfo.videoId,
      playerVars: {
        rel: 0,
        enablejsapi: 1,
        modestbranding: 1,
        iv_load_policy: 3,
        origin: "https://acquisition.dannyaquino.com/",
      },
      events: {
        onReady: (event) => {
          function displayPlayer() {
            if (gsap && transitionElem && triggerOverlay) {
              let youtubeTL = gsap.timeline({ paused: true, once: true });

              youtubeTL
                .add(function () {
                  lenis.scrollTo(containerElem, { offset: -80 });
                })
                .to(transitionElem, {
                  clipPath: playerInfo.opacityTransition
                    ? "none"
                    : "inset(0% -1% 0% 0%)",
                  opacity: 1,
                  duration: 0.5,
                })
                .to(
                  triggerOverlay,
                  {
                    zIndex: 0,
                    duration: 0.5,
                  },
                  "<"
                )
                .to(triggerElem, {
                  height: "56.25vw",
                  duration: 0.5,
                })
                .set(event.target.g, {
                  height: "56.25vw",
                })
                .set(containerElem, {
                  visibility: "inherit",
                  height: "56.25vw",
                })
                .add(function () {
                  event.target.playVideo();
                })
                .to(transitionElem, {
                  opacity: 0,
                  delay: 1,
                })
                .set(transitionElem, {
                  display: "none",
                });

              youtubeTL.play();
            } else {
              containerElem.style.display = "block";
              triggerElem.style.display = "none";
            }

            if (triggerVideo) {
              triggerVideo.pause();
            }
          }

          function closePlayer() {
            containerElem.style.display = "none";
            triggerElem.style.display = "block";
            if (triggerVideo) {
              triggerVideo.play();
            }
            event.target.pauseVideo();
          }

          triggerElem.addEventListener("click", displayPlayer);
        },
        onStateChange: (event) => {
          if (event.data === 3) {
            players.forEach((player) => {
              if (player === event.target) {
                return;
              }
              player.pauseVideo();
            });
          }
        },
      },
    });
  }
}