<!--<script>-->
<!--    import {gsap} from 'gsap'-->
<!--    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);-->

<!--    let slidesScroller = document.querySelector("#landingSlidesScroller");-->
<!--    let landingSlides = document.querySelectorAll(".landingSlide");-->
<!--    let landingSlidesLength = landingSlides.length;-->
<!--    let landingSlidesImagesContainer = document.getElementById("landingSlidesImages");-->
<!--    let landingSlidesImages = document.getElementsByClassName("landingSlidesImage");-->
<!--    let backgroundColors = [];-->
<!--    let highlightColors = [];-->
<!--    let titlePlaceholder = document.getElementById("titlePlaceholder");-->
<!--    let currentSlide = 0;-->
<!--    let upButton = document.getElementById("upButton");-->
<!--    let downButton = document.getElementById("downButton");-->

<!--    /*-->
<!--     * Initialise View-->
<!--     */-->
<!--    landingSlides.forEach((landingSlide, i) => {-->
<!--        backgroundColors.push(landingSlide.getAttribute("background-color"));-->
<!--        highlightColors.push(landingSlide.getAttribute("highlight-color"));-->
<!--    });-->

<!--    landingSlides.forEach((landingSlide, i) => {-->
<!--        const currentBackgroundColor = backgroundColors[i];-->
<!--        const currentHighlightColor = highlightColors[i];-->
<!--        const currentSlide = landingSlide;-->

<!--        ScrollTrigger.create({-->
<!--            trigger: slidesScroller,-->
<!--            markers: true,-->
<!--            start: () => (window.innerHeight * i) - 1 + " top",-->
<!--            end: () => "+=" + window.innerHeight,-->
<!--            onEnter: () => {-->
<!--                startSlideEntranceAnimation(currentBackgroundColor, currentHighlightColor, currentSlide, i);-->
<!--            },-->
<!--            onLeave: () => {-->
<!--                startSlideExitAnimation(currentSlide);-->
<!--            },-->
<!--            onEnterBack: () => {-->
<!--                startSlideEntranceAnimation(currentBackgroundColor, currentHighlightColor, currentSlide, i);-->
<!--            },-->
<!--            onLeaveBack: () => {-->
<!--                startSlideExitAnimation(currentSlide);-->
<!--            }-->
<!--        });-->
<!--    });-->

<!--    ScrollTrigger.create({-->
<!--        trigger: slidesScroller,-->
<!--        markers: true,-->
<!--        pin: true,-->
<!--        start: "top top",-->
<!--        end: () => "+=" + (((landingSlidesLength - 1) * window.innerHeight)),-->
<!--    });-->

<!--    upButton.addEventListener("click", slidePrev);-->
<!--    downButton.addEventListener("click", slideNext);-->

<!--    function goToSlide(index) {-->
<!--        gsap.to(window, {-->
<!--            scrollTo: {y: (index * innerHeight), autoKill: false},-->
<!--            duration: 0.3-->
<!--        });-->
<!--    }-->

<!--    function slideNext() {-->
<!--        let newCurrentSlide = currentSlide + 1;-->
<!--        if (newCurrentSlide < landingSlidesLength) {-->
<!--            goToSlide(newCurrentSlide);-->
<!--        } else {-->
<!--            currentSlide = null;-->
<!--        }-->
<!--    }-->

<!--    function slidePrev() {-->
<!--        let newCurrentSlide = currentSlide - 1;-->
<!--        if (newCurrentSlide >= 0) {-->
<!--            goToSlide(newCurrentSlide);-->
<!--        }-->
<!--    }-->

<!--    function startSlideEntranceAnimation(backgroundColor, highlightColor, landingSlide, index) {-->
<!--        currentSlide = index;-->
<!--        gsap.to("body", {-->
<!--            backgroundColor: backgroundColor,-->
<!--            overwrite: 'auto'-->
<!--        });-->

<!--        gsap.to(titlePlaceholder, {-->
<!--            fill: highlightColor-->
<!--        });-->

<!--        gsap.to(landingSlidesImagesContainer, {-->
<!--            y: -((landingSlidesImages[0]).outerHeight(true) * currentSlide)-->
<!--        });-->

<!--        let timeline = gsap.timeline();-->
<!--        timeline.to(landingSlide, {-->
<!--            duration: 0.3,-->
<!--            opacity: 0,-->
<!--            y: 40-->
<!--        }).to(landingSlide, {-->
<!--            duration: 0.3,-->
<!--            opacity: 1,-->
<!--            y: 0-->
<!--        });-->

<!--        timeline.play();-->
<!--    }-->

<!--    function startSlideExitAnimation(landingSlide) {-->
<!--        let timeline = gsap.timeline();-->
<!--        timeline.to(landingSlide, {-->
<!--            duration: 0,-->
<!--            opacity: 1,-->
<!--            y: 0-->
<!--        }).to(landingSlide, {-->
<!--            duration: 0,-->
<!--            opacity: 0,-->
<!--            y: 40-->
<!--        });-->

<!--        timeline.play();-->
<!--    }-->
<!--</script>-->
<div id="main">
    <div id="landingSlider">
        <div id="landingSlidesScroller">
            <div id="landingSlidesContainer">
                <div id="landingSlidesContent">
                    <div id="titlePlaceholderContainer">
                        <svg id="titlePlaceholder" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink"
                             x="0px" y="0px" viewBox="0 0 42.7 133.8" style="enable-background:new 0 0 42.7 133.8;"
                             xml:space="preserve">
                            <path d="M25.3,113.4L5,133.8l-5-5l15.4-15.4L0,97.9l0.1-0.1l-0.1,0l15.4-15.4L0,66.9l15.4-15.4L0,36l0,0l0,0l15.5-15.5  L0,5l5-5l20.4,20.4l-0.1,0.1L9.9,35.9l15.4,15.5l0,0l0,0.1L9.9,66.9l15.4,15.4l-0.1,0.1l0.1,0.1L9.9,97.8l15.4,15.4V113.4  L25.3,113.4z M42.7,20.4L42.7,20.4L22.3,0l-5,5l15.5,15.5L17.3,35.9l0,0l0,0l15.5,15.5L17.3,66.9l5,5l10.5,10.4L17.3,97.8l0.1,0  l-0.1,0.1l15.5,15.4l-15.5,15.5l5,5l20.4-20.4l0-0.1l0,0L27.3,97.8l15.4-15.4l-0.1-0.1l0.1-0.1L27.3,66.9l15.4-15.4l0,0l0,0  L27.3,35.9L42.7,20.4L42.7,20.4z"></path>
                        </svg>
                    </div>
                    <div id="landingSlidesTextContainer">
                        <section class="landingSlide" background-color="#6a1b9a" highlight-color="#00eabd">
                            <h2 style="color: #00eabd">Slide 1</h2>
                            <p>Lorem Ipsum</p>
                        </section>
                        <section class="landingSlide" background-color="#fc0026" highlight-color="#ffffff">
                            <h2 style="color: #ffffff">Slide 2</h2>
                            <p>Lorem Ipsum</p>
                        </section>
                        <section class="landingSlide" background-color="#00b985" highlight-color="#ffffff">
                            <h2 style="color: #ffffff">Slide 3</h2>
                            <p>Lorem Ipsum</p>
                        </section>
                    </div>
                </div>
                <div id="landingSlidesImages">
                    <img class="landingSlidesImage" src="https://craqdesignstudio.it/wp-content/uploads/2020/12/Raggruppa-1102.png">
                    <img class="landingSlidesImage" src="https://craqdesignstudio.it/wp-content/uploads/2020/12/Raggruppa-11022.png">
                    <img class="landingSlidesImage" src="https://craqdesignstudio.it/wp-content/uploads/2020/12/Raggruppa-1102.png">
                </div>
            </div>
        </div>
    </div>
    <section id="landingOtherProjects">

    </section>
    <footer>

    </footer>
</div>

<style>
  @import url('https://fonts.googleapis.com/css?family=Signika+Negative:300,400&display=swap');
  #main {
    margin-top: 0 !important;
  }

  #siteHead {
    position: fixed;
  }

  footer {
    width: 100%;
    height: 150px;
    background: black;
  }

  /*
   * --- LANDING SLIDER ---
   *
   * From width 0 to 479
   */
  #landingSlider {
    width: 100%;
    box-sizing: border-box;
  }
  #landingSlider #landingSlidesScroller {
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  #landingSlider #landingSlidesScroller #landingSlidesContainer {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 50px 100px 0 100px;
    position: relative;
    display: flex;
  }
  #landingSlider #landingSlidesScroller #landingSlidesContainer #landingSlidesContent {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
  }
  #landingSlider #landingSlidesScroller #landingSlidesContainer #landingSlidesContent #titlePlaceholderContainer {
    box-sizing: border-box;
    background: transparent;
    width: 70px;
    margin-right: 30px;
  }
  #landingSlider #landingSlidesScroller #landingSlidesContainer #landingSlidesContent #titlePlaceholderContainer svg {
    width: 70px;
  }
  #landingSlider #landingSlidesScroller #landingSlidesContainer #landingSlidesContent #landingSlidesTextContainer {
    position: relative;
    flex-grow: 1;
  }
  #landingSlider #landingSlidesScroller #landingSlidesContainer #landingSlidesContent #landingSlidesTextContainer .landingSlide {
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    height: 100%;
    opacity: 0;
  }
  #landingSlider #landingSlidesScroller #landingSlidesContainer #landingSlidesContent #landingSlidesTextContainer .landingSlide h2 {
    font-size: 50px;
    line-height: 60px;
    margin: 0;
  }
  #landingSlider #landingSlidesScroller #landingSlidesContainer #landingSlidesContent #landingSlidesTextContainer .landingSlide p {
    color: #FFFFFF;
    font-size: 18px;
    line-height: 21px;
    width: 80%;
  }
  #landingSlider #landingSlidesScroller #landingSlidesContainer #landingSlidesImages {
    width: 50%;
  }
  #landingSlider #landingSlidesScroller #landingSlidesContainer #landingSlidesImages img {
    width: 100%;
    margin-bottom: 50px;
  }

  #landingOtherProjects {
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    background: blue;
  }

  /*
   * Desktop from now on
   */
  .buttonsContainer {
    position: fixed;
    top: 10px;
    left: 10px;
    width: 60px;
    background: black;
  }
  .buttonsContainer .button {
    width: 50px;
    margin: 5px;
    background: white;
    text-align: center;
    line-height: 40px;
  }

  /*
   * Write Style From Here
   */
</style>