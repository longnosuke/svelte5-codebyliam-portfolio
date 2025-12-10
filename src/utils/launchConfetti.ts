export function launchConfetti(): void {
    const colors: string[] = ["#ff6b6b", "#ffc107", "#4dabf7", "#51cf66", "#845ef7"];

    for (let i = 0; i < 25; i++) {
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
        confetti.style.left = `${window.innerWidth / 2}px`;
        confetti.style.top = `${window.innerHeight / 2}px`;

        document.body.appendChild(confetti);

        // Random movement
        const x: number = (Math.random() - 0.5) * 350;
        const y: number = Math.random() * -250 - 100;

        const animation: Animation = confetti.animate(
            [
                { transform: `translate(0,0) rotate(${rotate}deg)`, opacity: 1 },
                { transform: `translate(${x}px, ${y}px) rotate(${rotate + 600}deg)`, opacity: 0 }
            ],
            {
                duration: 900 + Math.random() * 600,
                easing: "cubic-bezier(.25,.46,.45,.94)",
                fill: "forwards"
            }
        );

        animation.onfinish = () => confetti.remove();
    }
}
