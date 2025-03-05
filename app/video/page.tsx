'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { YouTubePlayer } from '@/components/YouTubePlayer';
import { Eye, TvMinimalPlay } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VideoPage() {
    const router = useRouter();
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const savedUrl = localStorage.getItem('youtubeUrl');
        if (!savedUrl) {
            router.replace('/');
            return;
        }
        setVideoUrl(savedUrl);
    }, []);

    const handleTimeUpdate = (time: number) => {
        localStorage.setItem('playbackTime', time.toString());
    };

    const handleEdit = () => {
        localStorage.removeItem('youtubeUrl');
        localStorage.removeItem('playbackTime');
        router.push('/');
    };

    const handleGifPage = () => {
        router.push('/gif');
    };

    // Get initial playback time
    const initialTime = isClient ? parseFloat(localStorage.getItem('playbackTime') || '0') : 0;

    if (!isClient || !videoUrl) {
        return (
            <main className="container mx-auto p-4">
                <div className="max-w-4xl mx-auto space-y-4">
                    {/* Video Player Skeleton */}
                    <div className="w-full p-4">
                        <div className="relative bg-card rounded-xl shadow-lg overflow-hidden border border-border">
                            <Skeleton className="aspect-video w-full" />
                        </div>
                    </div>

                    {/* Buttons Skeleton */}
                    <div className="flex gap-4 justify-center mt-24">
                        <Skeleton className="h-10 w-[140px]" />
                        <Skeleton className="h-10 w-[120px]" />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto p-4">
            <div className="max-w-4xl mx-auto space-y-4">
                <YouTubePlayer videoUrl={videoUrl} onTimeUpdate={handleTimeUpdate} initialTime={initialTime} />

                <div className="flex gap-4 justify-center mt-24">
                    <Button variant="outline" onClick={handleEdit} className="gap-2">
                        <TvMinimalPlay className="h-4 w-4" />
                        Change Video
                    </Button>
                    <Button onClick={handleGifPage} className="gap-2">
                        <Eye className="h-4 w-4" />
                        View GIF
                    </Button>
                </div>
            </div>
        </main>
    );
}
