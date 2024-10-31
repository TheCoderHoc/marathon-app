let audio: HTMLAudioElement;

if (typeof window !== "undefined") {
    audio = new Audio("/completed.wav");
}

export const playTaskCompletionSound = () => {
    audio.play();
};
