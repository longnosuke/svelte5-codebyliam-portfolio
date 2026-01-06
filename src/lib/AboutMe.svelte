<script>
    import ClickMe from "./ClickMe.svelte";
    import homeAvatar from "../assets/home-avatar.JPG";
    import webnowLogo from "../assets/webnow-logo.webp";
    import newstyledirectLogo from "../assets/newstyledirect-logo.png";
    import CV from "../assets/pdf/NguyenThanhLong_CV.pdf"

    function handleMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        card.style.setProperty(
            "--x",
            `${e.clientX - rect.left}px`
        );
        card.style.setProperty(
            "--y",
            `${e.clientY - rect.top}px`
        );
    }

    function handleLeave(e) {
        const card = e.currentTarget;
        card.style.removeProperty("--x");
        card.style.removeProperty("--y");
    }
</script>

<a id="about-me" class="section-heading">ABOUT ME</a>
<div class="container">
    <div class="rotating-text">
        <svg viewBox="0 0 200 200">
            <path id="curve" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="transparent"/>
            <text>
                <textPath href="#curve" startOffset="0%">
                    FULLSTACK • DEVELOPER • BASED IN VIETNAM •
                </textPath>
            </text>
        </svg>
    </div>
    <!-- Profile Card -->
    <div class="card profile-card hover-border" onmousemove={handleMove} onmouseleave={handleLeave} role="region" aria-label="Profile information">
        <div class="profile-image">
            <div class="avatar">
                <span class="avatar-placeholder"><img src={homeAvatar} alt="Avatar" /></span>
            </div>
        </div>
        <h2 class="name">Thanh Long</h2>
        <a href="mailto:info.liamnguyen@gmail.com" class="email">info.liamnguyen@gmail.com</a>
        <a href={CV} target="_blank" class="download-btn">Download CV</a>
    </div>

    <!-- About Me Info Card -->
    <div class="card info-card hover-border" onmousemove={handleMove} onmouseleave={handleLeave} role="region" aria-label="Profile information">
        <h3>About Me</h3>
        <div class="status">
            <span class="status-icon">✓</span>
            <span class="status-text">Open to work</span>
        </div>

        <p class="bio">
            Fullstack developer with passion for creating beautiful and functional web experiences.
            I'm all about crafting user-friendly interfaces that are both functional and visually compelling.
        </p>

        <p class="bio">
            Born and raised in Vietnam. When I'm not busy coding, you'll likely find me exploring new technologies,
            playing games, or enjoying good coffee.
        </p>
    </div>

    <!-- Latest Roles Card -->
    <div class="card roles-card hover-border" onmousemove={handleMove} onmouseleave={handleLeave} role="region" aria-label="Profile information">
        <h3>Latest Roles</h3>

        <div class="role-item">
            <div class="role-icon">
                <img src={webnowLogo} alt="Webnow Icon" />
            </div>
            <div class="role-info">
                <div class="role-title">Website Developer</div>
                <div class="role-company">Webnow</div>
            </div>
        </div>

        <div class="role-item">
            <div class="role-icon">
                <img src={newstyledirectLogo} alt="NewstyleDirect Icon" />
            </div>
            <div class="role-info">
                <div class="role-title">Web Developer</div>
                <div class="role-company">Newstyledirect</div>
            </div>
        </div>
    </div>

    <!-- Interactive Card -->
    <div class="card interactive-card hover-border click-me" onmousemove={handleMove} onmouseleave={handleLeave} role="region" aria-label="Profile information">
        <h3>✨ Interactive Design</h3>
        <p>I like to add interactive elements to my projects.</p>
        <ClickMe />
    </div>

    <div class="card tech-card hover-border" onmousemove={handleMove} onmouseleave={handleLeave} role="region" aria-label="Profile information">
        <h3>Main Tech Stack</h3>

        <div class="tech-grid">
            <div class="tech-item">
                <div class="tech-icon">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 98.1 118" style="enable-background:new 0 0 98.1 118;" xml:space="preserve">
                    <style type="text/css">
                        .st0{fill:#FF3E00;}
                        .st1{fill:#FFFFFF;}
                    </style>
                    <path class="st0" d="M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3  c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1  c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6"/>
                    <path class="st1" d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1  c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72  c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7  c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5  c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1  c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1  c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5  c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9"/>
                    </svg>
                </div>
                <div class="tech-name">Svelte</div>
            </div>
            <div class="tech-item">
                <div class="tech-icon">
                    <svg viewBox="0 -166 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                        <g fill="#CC0000">
                            <path d="M219.115365,150.633753 C219.115365,150.633753 241.684635,148.699244 241.684635,119.552645 C241.684635,90.4060453 214.343577,87.697733 214.343577,87.697733 L165.078086,87.697733 L165.078086,179.651385 L189.839798,179.651385 L189.839798,157.469018 L211.248363,179.651385 L247.875063,179.651385 L219.115365,150.633753 Z M209.571788,131.804534 L189.839798,131.804534 L189.839798,110.782872 L209.700756,110.782872 C209.700756,110.782872 215.246348,112.846348 215.246348,121.229219 C215.246348,129.612091 209.571788,131.804534 209.571788,131.804534 Z M302.815113,88.3425693 L277.666499,88.3425693 C259.74005,88.3425693 253.678589,104.592443 253.678589,112.330479 L253.678589,179.651385 L278.827204,179.651385 L278.827204,163.530479 L302.428212,163.530479 L302.428212,179.651385 L326.803023,179.651385 L326.803023,112.330479 C326.803023,92.7274559 309.005542,88.3425693 302.815113,88.3425693 Z M302.428212,137.479093 L278.698237,137.479093 L278.698237,115.167758 C278.698237,115.167758 278.698237,110.138035 286.565239,110.138035 L295.206045,110.138035 C302.170277,110.138035 302.299244,115.167758 302.299244,115.167758 L302.299244,137.479093 L302.428212,137.479093 Z M338.281108,88.3425693 L364.461461,88.3425693 L364.461461,179.651385 L338.281108,179.651385 L338.281108,88.3425693 Z M401.217128,156.050378 L401.217128,88.3425693 L375.165743,88.3425693 L375.165743,156.050378 L375.165743,179.651385 L401.217128,179.651385 L436.425189,179.651385 L436.425189,156.050378 L401.217128,156.050378 Z M445.065995,156.308312 L445.065995,179.651385 L487.238287,179.651385 C495.879093,179.651385 510.710327,173.33199 511.226196,155.663476 L511.226196,146.635768 C511.226196,131.546599 498.84534,122.647859 487.238287,122.647859 L466.216625,122.647859 L466.216625,111.81461 L507.873048,111.81461 L507.873048,88.3425693 L467.893199,88.3425693 C457.575819,88.3425693 443.776322,96.8544081 443.776322,112.71738 L443.776322,120.842317 C443.776322,136.70529 457.446851,144.830227 467.893199,144.830227 C496.910831,144.959194 460.928967,144.830227 487.754156,144.830227 L487.754156,156.179345 L445.065995,156.308312 Z">

                            </path>
                            <path d="M9.02770781,179.522418 L110.911839,179.522418 C110.911839,179.522418 91.4377834,90.6639798 155.921411,54.6821159 C169.978841,47.8468514 214.730479,22.311335 287.983879,76.4775819 C290.30529,74.543073 292.497733,72.995466 292.497733,72.995466 C292.497733,72.995466 225.434761,6.06146096 150.76272,13.5415617 C113.233249,16.8947103 67.0629723,51.0710327 39.9798489,96.2095718 C12.8967254,141.348111 9.02770781,179.522418 9.02770781,179.522418 Z M221.307809,20.763728 L221.823678,12.1229219 C220.662972,11.4780856 217.438791,9.93047859 209.313854,7.60906801 L208.797985,16.1209068 C213.053904,17.5395466 217.180856,19.0871537 221.307809,20.763728 Z M209.055919,48.1047859 L208.54005,56.2297229 C212.79597,56.3586902 217.051889,56.8745592 221.307809,57.77733 L221.823678,49.7813602 C217.438791,48.8785894 213.182872,48.3627204 209.055919,48.1047859 Z M161.338035,7.86700252 L162.627708,7.86700252 L160.048363,-7.10542736e-15 C156.050378,-7.10542736e-15 151.923426,0.257934509 147.667506,0.773803526 L150.117884,8.38287154 C153.857935,7.99596977 157.597985,7.86700252 161.338035,7.86700252 Z M167.528463,55.3269521 L170.49471,64.2256927 C174.234761,62.4201511 177.974811,60.8725441 181.714861,59.7118388 L178.877582,51.2 C174.492695,52.4896725 170.752645,53.9083123 167.528463,55.3269521 Z M108.97733,21.4085642 L103.173804,12.5098237 C99.9496222,14.186398 96.5964736,15.9919395 93.1143577,18.0554156 L99.0468514,27.0831234 C102.4,25.0196474 105.624181,23.0851385 108.97733,21.4085642 Z M135.415617,79.4438287 L141.606045,88.729471 C143.798489,85.5052897 146.377834,82.5390428 149.215113,79.572796 L143.411587,70.8030227 C140.44534,73.511335 137.737028,76.4775819 135.415617,79.4438287 Z M116.715365,120.971285 L127.161713,129.225189 C127.677582,124.195466 128.580353,119.165743 129.870025,114.13602 L120.584383,106.784887 C118.907809,111.556675 117.747103,116.328463 116.715365,120.971285 Z M60.2277078,59.7118388 L51.0710327,51.715869 C47.7178841,54.9400504 44.4937028,58.1642317 41.5274559,61.3884131 L51.4579345,69.9002519 C54.1662469,66.418136 57.1324937,62.9360202 60.2277078,59.7118388 Z M21.279597,117.360202 L6.44836272,111.943577 C3.99798489,117.489169 1.28967254,123.937531 0,127.419647 L14.8312343,132.836272 C16.5078086,128.451385 19.2161209,122.13199 21.279597,117.360202 Z M114.780856,153.728967 C115.038791,160.564232 115.683627,166.109824 116.328463,169.978841 L131.804534,175.524433 C130.643829,170.49471 129.483123,164.820151 128.70932,158.75869 L114.780856,153.728967 Z">

                            </path>
                        </g>
                    </svg>
                </div>
                <div class="tech-name">Ruby on Rails</div>
            </div>
            <div class="tech-item">
                <div class="tech-icon">
                    <svg width="432.071pt" height="445.383pt" viewBox="0 0 432.071 445.383" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                    <g id="orginal" style="fill-rule:nonzero;clip-rule:nonzero;stroke:#000000;stroke-miterlimit:4;">
                        </g>
                                            <g id="Layer_x0020_3" style="fill-rule:nonzero;clip-rule:nonzero;fill:none;stroke:#FFFFFF;stroke-width:12.4651;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;">
                    <path style="fill:#000000;stroke:#000000;stroke-width:37.3953;stroke-linecap:butt;stroke-linejoin:miter;" d="M323.205,324.227c2.833-23.601,1.984-27.062,19.563-23.239l4.463,0.392c13.517,0.615,31.199-2.174,41.587-7c22.362-10.376,35.622-27.7,13.572-23.148c-50.297,10.376-53.755-6.655-53.755-6.655c53.111-78.803,75.313-178.836,56.149-203.322    C352.514-5.534,262.036,26.049,260.522,26.869l-0.482,0.089c-9.938-2.062-21.06-3.294-33.554-3.496c-22.761-0.374-40.032,5.967-53.133,15.904c0,0-161.408-66.498-153.899,83.628c1.597,31.936,45.777,241.655,98.47,178.31    c19.259-23.163,37.871-42.748,37.871-42.748c9.242,6.14,20.307,9.272,31.912,8.147l0.897-0.765c-0.281,2.876-0.157,5.689,0.359,9.019c-13.572,15.167-9.584,17.83-36.723,23.416c-27.457,5.659-11.326,15.734-0.797,18.367c12.768,3.193,42.305,7.716,62.268-20.224    l-0.795,3.188c5.325,4.26,4.965,30.619,5.72,49.452c0.756,18.834,2.017,36.409,5.856,46.771c3.839,10.36,8.369,37.05,44.036,29.406c29.809-6.388,52.6-15.582,54.677-101.107"/>
                                                <path style="fill:#336791;stroke:none;" d="M402.395,271.23c-50.302,10.376-53.76-6.655-53.76-6.655c53.111-78.808,75.313-178.843,56.153-203.326c-52.27-66.785-142.752-35.2-144.262-34.38l-0.486,0.087c-9.938-2.063-21.06-3.292-33.56-3.496c-22.761-0.373-40.026,5.967-53.127,15.902    c0,0-161.411-66.495-153.904,83.63c1.597,31.938,45.776,241.657,98.471,178.312c19.26-23.163,37.869-42.748,37.869-42.748c9.243,6.14,20.308,9.272,31.908,8.147l0.901-0.765c-0.28,2.876-0.152,5.689,0.361,9.019c-13.575,15.167-9.586,17.83-36.723,23.416    c-27.459,5.659-11.328,15.734-0.796,18.367c12.768,3.193,42.307,7.716,62.266-20.224l-0.796,3.188c5.319,4.26,9.054,27.711,8.428,48.969c-0.626,21.259-1.044,35.854,3.147,47.254c4.191,11.4,8.368,37.05,44.042,29.406c29.809-6.388,45.256-22.942,47.405-50.555    c1.525-19.631,4.976-16.729,5.194-34.28l2.768-8.309c3.192-26.611,0.507-35.196,18.872-31.203l4.463,0.392c13.517,0.615,31.208-2.174,41.591-7c22.358-10.376,35.618-27.7,13.573-23.148z"/>
                                                <path d="M215.866,286.484c-1.385,49.516,0.348,99.377,5.193,111.495c4.848,12.118,15.223,35.688,50.9,28.045c29.806-6.39,40.651-18.756,45.357-46.051c3.466-20.082,10.148-75.854,11.005-87.281"/>
                                                <path d="M173.104,38.256c0,0-161.521-66.016-154.012,84.109c1.597,31.938,45.779,241.664,98.473,178.316c19.256-23.166,36.671-41.335,36.671-41.335"/>
                                                <path d="M260.349,26.207c-5.591,1.753,89.848-34.889,144.087,34.417c19.159,24.484-3.043,124.519-56.153,203.329"/>
                                                <path style="stroke-linejoin:bevel;" d="M348.282,263.953c0,0,3.461,17.036,53.764,6.653c22.04-4.552,8.776,12.774-13.577,23.155c-18.345,8.514-59.474,10.696-60.146-1.069c-1.729-30.355,21.647-21.133,19.96-28.739c-1.525-6.85-11.979-13.573-18.894-30.338    c-6.037-14.633-82.796-126.849,21.287-110.183c3.813-0.789-27.146-99.002-124.553-100.599c-97.385-1.597-94.19,119.762-94.19,119.762"/>
                                                <path d="M188.604,274.334c-13.577,15.166-9.584,17.829-36.723,23.417c-27.459,5.66-11.326,15.733-0.797,18.365c12.768,3.195,42.307,7.718,62.266-20.229c6.078-8.509-0.036-22.086-8.385-25.547c-4.034-1.671-9.428-3.765-16.361,3.994z"/>
                                                <path d="M187.715,274.069c-1.368-8.917,2.93-19.528,7.536-31.942c6.922-18.626,22.893-37.255,10.117-96.339c-9.523-44.029-73.396-9.163-73.436-3.193c-0.039,5.968,2.889,30.26-1.067,58.548c-5.162,36.913,23.488,68.132,56.479,64.938"/>
                                                <path style="fill:#FFFFFF;stroke-width:4.155;stroke-linecap:butt;stroke-linejoin:miter;" d="M172.517,141.7c-0.288,2.039,3.733,7.48,8.976,8.207c5.234,0.73,9.714-3.522,9.998-5.559c0.284-2.039-3.732-4.285-8.977-5.015c-5.237-0.731-9.719,0.333-9.996,2.367z"/>
                                                <path style="fill:#FFFFFF;stroke-width:2.0775;stroke-linecap:butt;stroke-linejoin:miter;" d="M331.941,137.543c0.284,2.039-3.732,7.48-8.976,8.207c-5.238,0.73-9.718-3.522-10.005-5.559c-0.277-2.039,3.74-4.285,8.979-5.015c5.239-0.73,9.718,0.333,10.002,2.368z"/>
                                                <path d="M350.676,123.432c0.863,15.994-3.445,26.888-3.988,43.914c-0.804,24.748,11.799,53.074-7.191,81.435"/>
                                                <path style="stroke-width:3;" d="M0,60.232"/>
                    </g>
                    </svg>
                </div>
                <div class="tech-name">PostgreSQL</div>
            </div>
            <div class="tech-item">
                <div class="tech-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><defs><linearGradient id="a" x1="0" x2="128" y1="64" y2="64" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9553e9"/><stop offset="1" stop-color="#6d74ed"/></linearGradient></defs><path fill="url(#a)" d="M92.433 28.433H55.625L91.192 64 55.625 99.567h36.808L128 64zm-55.625 0H0L35.567 64 0 99.567h36.808L72.375 64z"/></svg>
                </div>
                <div class="tech-name">Inertia.js</div>
            </div>
        </div>
    </div>
</div>

<style>
  .section-heading {
    font-size: 5rem;
    text-align: center;
    font-family: 'Apparel', sans-serif;
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: center;
    margin-top: 10rem;
    margin-bottom: 3rem;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 50px 100px;
    gap: 20px;
    margin: 0 auto;
    max-width: 1400px;
    position: relative;
  }

  .card {
    border-radius: 24px;
    padding: 30px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(201, 201, 201, 0.2);
    min-height: 200px;
  }

  .card h3 {
    margin: 0 0 20px 0;
    font-size: 1.4rem;
    color: white;
    font-weight: 600;
  }

  .card p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }

  /* Profile Card */
  .profile-card {
    grid-row: span 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    padding: 50px 30px;
  }

  .profile-image {
    margin-bottom: 20px;
    position: relative;
  }

  .avatar {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.3);
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      aspect-ratio: 1;
    }
  }

  .avatar::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(138, 116, 249, 0.2));
  }

  .name {
    font-size: 1.8rem;
    color: white;
    margin: 10px 0 5px 0;
    font-weight: 600;
  }

  .email {
    margin: 0 0 25px 0;
    font-size: 0.95rem;
  }

  .download-btn {
    background: #ff6b00;
    color: white;
    border: none;
    padding: 12px 32px;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 30px;
  }

  .rotating-text {
    position: absolute;
    top: -2%;
    right: 2%;
    z-index: 2;
    width: 150px;
    height: 150px;
    animation: rotate 20s linear infinite;
  }

  .rotating-text text {
    fill: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Info Card */
  .info-card {
    grid-column: span 2;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    color: rgba(76, 175, 80, 0.9);
  }

  .status-icon {
    width: 20px;
    height: 20px;
    background: rgba(76, 175, 80, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  .bio {
    margin: 0 0 15px 0;
  }

  /* Roles Card */
  .roles-card {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .role-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    transition: background 0.3s ease;
  }

  .role-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .role-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
    background: rgb(220, 220, 220);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .role-info {
    flex: 1;
  }

  .role-title {
    color: white;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .role-company {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
  }

  /* Tech Card */
  .tech-card {
    grid-column: span 3;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }

  .tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px 10px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .tech-item:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }

  .tech-icon svg{
    height: 30px;
    width: 30px;
  }

  .tech-name {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    text-align: center;
  }

  /* Interactive Card */
  .interactive-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .interactive-card p {
    margin: 5px 0 20px 0;
  }

  /* Hover Effects */
  .hover-border {
    position: relative;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease, background 0.3s ease;
  }

  .hover-border::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: 24px;
    background: radial-gradient(
            300px circle at var(--x, 50%) var(--y, 50%),
            rgb(248, 121, 80),
            transparent 50%
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .hover-border:hover::before {
    opacity: 1;
  }

  .hover-border:hover {
    transform: translateY(-4px);
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .tech-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 1024px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
      padding: 40px 50px;
    }

    .profile-card {
      grid-column: span 2;
      grid-row: span 1;
    }

    .info-card,
    .tech-card {
      grid-column: span 2;
    }
  }

  @media (max-width: 768px) {
    .rotating-text {
      display: none;
    }

    .section-heading {
      font-size: 3rem;
      margin-top: 5rem;
    }

    .container {
      grid-template-columns: 1fr;
      padding: 30px 20px;
      gap: 15px;
    }

    .profile-card,
    .info-card,
    .roles-card,
    .tech-card,
    .interactive-card,
    .focus-card {
      grid-column: 1;
    }

    .tech-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .card {
      min-height: 150px;
    }
  }
</style>