'use client';

import { LocalStorageKeys, LocalStoragePlayerState } from '@/types/local-storage';
import Script from 'next/script';
import { useCallback, useEffect, useRef } from 'react';

interface YouTubePlayerProps {
    videoUrl: string;
    onTimeUpdate?: (time: number) => void;
    initialTime?: number;
}

declare global {
    interface Window {
        YT: {
            Player: typeof YT.Player;
            PlayerState: YT.PlayerState;
        };
        onYouTubeIframeAPIReady: () => void;
    }
}

export function YouTubePlayer({ videoUrl, onTimeUpdate, initialTime = 0 }: YouTubePlayerProps) {
    const playerRef = useRef<YT.Player | null>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    // Extract video ID and timestamp from URL
    const getVideoDetails = useCallback(
        (url: string) => {
            // Extract video ID
            const idMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            const videoId = idMatch ? idMatch[1] : null;

            // Extract timestamp only if no stored playback time
            let startTime = 0;
            if (!initialTime) {
                const tParam = url.match(/[?&]t=(\d+)/);
                if (tParam) {
                    startTime = parseInt(tParam[1], 10);
                }
            }

            return { videoId, startTime };
        },
        [initialTime]
    );

    // Initialize player
    const initPlayer = useCallback(() => {
        const { videoId, startTime } = getVideoDetails(videoUrl);
        if (!videoId || !playerContainerRef.current) return;

        // Always prioritize initialTime (stored playback time) over URL timestamp
        const actualStartTime = initialTime || startTime;

        // Get the stored player state
        const wasPlaying = localStorage.getItem(LocalStorageKeys.playerState) === LocalStoragePlayerState.playing;

        // Cleanup existing player if any
        if (playerRef.current) {
            playerRef.current.destroy();
        }

        playerRef.current = new window.YT.Player(playerContainerRef.current, {
            videoId,
            playerVars: {
                autoplay: wasPlaying ? 1 : 0,
                start: Math.floor(actualStartTime),
                controls: 1,
            },
            events: {
                onReady: (event) => {
                    // Only play if it was playing before
                    if (wasPlaying) {
                        event.target.playVideo();
                    }

                    // Start tracking playback time
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }

                    intervalRef.current = setInterval(() => {
                        if (playerRef.current && onTimeUpdate) {
                            const currentTime = playerRef.current.getCurrentTime();
                            onTimeUpdate(currentTime);
                        }
                    }, 2000);
                },
                onStateChange: (event) => {
                    // Update time when user seeks or plays/pauses
                    if (playerRef.current && onTimeUpdate) {
                        const currentTime = playerRef.current.getCurrentTime();
                        onTimeUpdate(currentTime);
                    }

                    // Store player state
                    const state = event.data;
                    if (state === window.YT.PlayerState.PLAYING) {
                        localStorage.setItem(LocalStorageKeys.playerState, LocalStoragePlayerState.playing);
                    } else if (state === window.YT.PlayerState.PAUSED) {
                        localStorage.setItem(LocalStorageKeys.playerState, LocalStoragePlayerState.paused);
                    }
                },
            },
        });
    }, [videoUrl, initialTime, onTimeUpdate, getVideoDetails]);

    useEffect(() => {
        // Initialize YouTube API if not already loaded
        if (!window.YT) {
            window.onYouTubeIframeAPIReady = initPlayer;
        } else {
            initPlayer();
        }

        // Cleanup function
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [initPlayer]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="relative bg-card rounded-xl shadow-lg overflow-hidden border border-border">
                <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
                <div ref={playerContainerRef} className="aspect-video w-full" />
            </div>
        </div>
    );
}
