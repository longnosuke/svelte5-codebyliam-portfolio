let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Track mouse position globally
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

export function launchConfetti(): void {
    const colors: string[] = ["#ff6b6b", "#ffc107", "#4dabf7", "#51cf66", "#845ef7"];
    const confettiCount = 25;
    let finishedCount = 0;

    for (let i = 0; i < confettiCount; i++) {
        const confetti: HTMLDivElement = document.createElement("div");
        confetti.className = "confetti";

        const size: number = Math.random() * 6 + 4;
        const color: string = colors[Math.floor(Math.random() * colors.length)];
        const rotate: number = Math.random() * 360;

        // Style setup
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size * 0.4}px`;
        confetti.style.backgroundColor = color;
        confetti.style.transform = `rotate(${rotate}deg)`;
        confetti.style.position = "fixed";
        confetti.style.left = `${mouseX}px`;
        confetti.style.top = `${mouseY}px`;
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        // Random movement
        const moveX: number = (Math.random() - 0.5) * 200;
        const moveY: number = Math.random() * -150 - 50;

        const animation: Animation = confetti.animate(
            [
                { transform: `translate(0,0) rotate(${rotate}deg)`, opacity: 1 },
                { transform: `translate(${moveX}px, ${moveY}px) rotate(${rotate + 600}deg)`, opacity: 0 }
            ],
            {
                duration: 900 + Math.random() * 600,
                easing: "cubic-bezier(.25,.46,.45,.94)",
                fill: "forwards"
            }
        );

        animation.onfinish = () => {
            confetti.remove();
            finishedCount++;
            if (finishedCount === confettiCount) {
                console.log("All confetti finished!");
            }
        };
    }
}
