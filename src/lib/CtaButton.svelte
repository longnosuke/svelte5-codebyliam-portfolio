<script lang="ts">
    let { href, label } = $props<string>();
</script>

<a href={href} target="_blank" class="cta">
    <span> </span>
    <span> </span>
    <span> </span>
    <span> </span>
    {label}
</a>
<style>

.cta {
    position: relative;
    padding: 12px 24px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.4);
    color: #999;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 4px;
    font: 700 30px consolas;
    overflow: hidden;
    font-size: clamp(1rem, 2vw, 1rem);
    transition: all 0.3s;
}

.cta:hover {
    color: var(--accent);
    background: #212121;
}

.cta span:nth-child(1) {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, #171618, var(--accent));
    animation: animate1 2s linear infinite;
}

@keyframes animate1 {
    0% {
        transform: translateX(-100%);
    }
    100% {
    transform: translateX(100%);
}
}

.cta span:nth-child(2) {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 1px;
    background: linear-gradient(to bottom, #171618, var(--accent));
    animation: animate2 2s linear infinite;
    animation-delay: 1s;
}
@keyframes animate2 {
    0% {
        transform: translateY(-100%);
    }
    100% {
    transform: translateY(100%);
}
}

.cta span:nth-child(3) {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to left, #171618, var(--accent));
    animation: animate3 2s linear infinite;
}

@keyframes animate3 {
    0% {
        transform: translateX(100%);
    }
    100% {
    transform: translateX(-100%);
}
}

.cta span:nth-child(4) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
    background: linear-gradient(to top, #171618, var(--accent));
    animation: animate4 2s linear infinite;
    animation-delay: 1s;
}

@keyframes animate4 {
    0% {
        transform: translateY(100%);
    }
    100% {
    transform: translateY(-100%);
}
}
</style>