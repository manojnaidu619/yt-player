declare namespace YT {
    class Player {
        constructor(
            element: Element | string,
            options: {
                videoId: string;
                playerVars?: {
                    autoplay?: 0 | 1;
                    start?: number;
                    controls?: 0 | 1;
                };
                events?: {
                    onReady?: (event: { target: Player }) => void;
                    onStateChange?: (event: { target: Player; data: number }) => void;
                };
            }
        );

        playVideo(): void;
        pauseVideo(): void;
        stopVideo(): void;
        getCurrentTime(): number;
        getDuration(): number;
        destroy(): void;
    }

    interface PlayerState {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
    }
}
