<script lang="ts">
    import gsap from "gsap";
    import { onMount } from "svelte";

    let alreadyPlayed = false;

    onMount(() => {
        alreadyPlayed = sessionStorage.getItem("loaderPlayed") === "true";

        // If played → instantly hide loader, skip GSAP entirely
        if (alreadyPlayed) {
            const screen = document.querySelector(".loading-screen");
            if (screen) screen.style.display = "none";
            return;
        }

        runLoader(); // otherwise, run animations normally
    });

    function runLoader() {
        const counter3 = document.querySelector(".counter-3");

        // Build numbers for counter-3
        if (counter3) {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 10; j++) {
                    const div = document.createElement("div");
                    div.className = "num";
                    div.textContent = j.toString();
                    counter3.appendChild(div);
                }
            }
            const finalDiv = document.createElement("div");
            finalDiv.className = "num";
            finalDiv.textContent = "0";
            counter3.appendChild(finalDiv);
        }

        // Counter animation helper
        function animate(counter: Element | null, duration: number, delay = 0) {
            if (!counter) return;
            const numHeight = counter.querySelector(".num")?.clientHeight || 0;
            const totalDistance =
                (counter.querySelectorAll(".num").length - 1) * numHeight;

            gsap.to(counter, {
                y: -totalDistance,
                duration,
                delay,
                ease: "power2.inOut",
            });
        }

        animate(counter3, 5);
        animate(document.querySelector(".counter-4"), 2);
        animate(document.querySelector(".counter-2"), 6);
        animate(document.querySelector(".counter-1"), 2, 4);

        gsap.to(".digit", {
            top: "-150px",
            stagger: { amount: 0.25 },
            delay: 6,
            duration: 1,
            ease: "power4.inOut",
        });

        gsap.from(".loader-1", {
            width: 0,
            duration: 6,
            ease: "power2.inOut",
        });

        gsap.to(".loader", {
            background: "none",
            delay: 6,
            duration: 0.1,
        });

        gsap.to(".loader-1", {
            rotate: 90,
            duration: 0.5,
            delay: 6,
        });

        gsap.to(".loader", {
            scale: 500,
            duration: 1,
            delay: 7,
            ease: "power2.inOut",
        });

        gsap.to(".loading-screen", {
            opacity: 0,
            duration: 0.5,
            delay: 7.5,
            ease: "power1.inOut",
            onComplete: () => {
                const screen = document.querySelector(".loading-screen");
                if (screen) screen.style.display = "none";

                // Mark loader as played
                sessionStorage.setItem("loaderPlayed", "true");
            }
        });

        gsap.to("h1", {
            delay: 7,
            y: -80,
            duration: 1.5,
            ease: "power4.inOut",
            stagger: { amount: 0.1 },
        });
    }
</script>

<style>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    color: white;
    pointer-events: none;
    overflow: hidden;
    z-index: 9999;
  }

  .counter {
    position: fixed;
    left: 150px;
    bottom: 150px;
    display: flex;
    height: 100px;
    font-size: 100px;
    line-height: 102px;
    clip-path: polygon(0 0, 100% 0, 100% 100px, 0 100px);
    font-weight: 400;
    color: white;
    overflow: hidden;
  }

  .counter-1,
  .counter-2,
  .counter-3,
  .counter-4 {
    position: relative;
    top: -15px;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 10px;
    transform: translate(-50%, -50%);
    display: flex;
    background: #161616;
  }

  .loader-1 {
    position: relative;
    background: #EA550C;
    width: 100%;
  }
</style>

<div class="loading-screen">
    <div class="loader">
        <div class="loader-1 bar"></div>
        <div class="loader-2 bar"></div>
    </div>

    <div class="counter">
        <div class="counter-1 digit">
            <div class="num">0</div>
            <div class="num num1offset1">1</div>
        </div>

        <div class="counter-2 digit">
            <div class="num">0</div>
            <div class="num num1offset2">1</div>
            <div class="num">2</div>
            <div class="num">3</div>
            <div class="num">4</div>
            <div class="num">5</div>
            <div class="num">6</div>
            <div class="num">7</div>
            <div class="num">8</div>
            <div class="num">9</div>
            <div class="num">0</div>
        </div>

        <div class="counter-3 digit">
            <div class="num">0</div>
            <div class="num">1</div>
            <div class="num">2</div>
            <div class="num">3</div>
            <div class="num">4</div>
            <div class="num">5</div>
            <div class="num">6</div>
            <div class="num">7</div>
            <div class="num">8</div>
            <div class="num">9</div>
        </div>

        <div class="counter-4 digit">
            <div class="num">%</div>
        </div>
    </div>
</div>
