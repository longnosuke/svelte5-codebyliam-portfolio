<footer>
    <div class="bottomMenu">
        <button class="bottomMenu__item bottomMenu__item--active">
            <span class="title"> Home </span>
            <svg viewbox="0 0 24 24" id="mdi-home">
                <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z"></path>
            </svg>
        </button>
        <span class="seperator"></span>
        <button class="bottomMenu__item">
            <span class="title"> Github </span>
            <svg viewbox="0 0 24 24" id="mdi-github">
                <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path>
            </svg>
        </button>
        <button class="bottomMenu__item">
            <span class="title"> Twitter </span>
            <svg viewbox="0 0 24 24" id="mdi-github">
                <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path>
            </svg>
        </button>
        <button class="bottomMenu__item">
            <span class="title"> Github </span>
            <svg viewbox="0 0 24 24" id="mdi-github">
                <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path>
            </svg>
        </button>
    </div>
</footer>

<style>
  footer {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgb(44, 44, 44);
    backdrop-filter: blur(10px);
  }

  /* Bottom menu wrapper */
  .bottomMenu {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
  }

  /* Separator */
  .bottomMenu .seperator {
    width: 1px;
    height: 24px;
    background: rgb(44, 44, 44);
    margin: 0px -4px;
  }

  /* Base item */
  .bottomMenu__item {
    position: relative;
    border: none;
    background: #212121;
    border-radius: 12px;
    transition: all 0.25s;
  }

  /* Active indicator */
  .bottomMenu__item--active::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 5px;
    height: 5px;
    background: #cacaca;
    border-radius: 16px;
    transform: translateX(-50%);
  }

  /* Title tooltip */
  .bottomMenu__item .title {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    border-radius: 4px;
    padding: 2px 4px;
    font-size: 0.5rem;
    color: rgba(255, 255, 255, 0.714);
    background: #f2f2f26a;
  }

  /* Icons */
  .bottomMenu__item svg {
    width: 24px;
    height: 24px;
    color: #919191;
    stroke: currentColor;
    fill: currentColor;
    transition: all 0.25s;
  }

  /* Hover + focus interactions */
  .bottomMenu__item:hover,
  .bottomMenu__item:focus {
    z-index: 999;
    transform: scale(1.1);
    margin: 0 10px;
  }

  /* Show tooltip on hover */
  .bottomMenu__item:hover .title,
  .bottomMenu__item:focus .title {
    display: block;
  }

  /* Grow icon on hover */
  .bottomMenu__item:hover svg,
  .bottomMenu__item:focus svg {
    width: 34px;
    height: 34px;
  }
</style>
