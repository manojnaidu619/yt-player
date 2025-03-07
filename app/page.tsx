'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { youtubeUrlSchema } from '@/lib/schemas';
import { LocalStorageKeys, LocalStoragePlayerState } from '@/types/local-storage';
import { HelpCircle, SquarePlay } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
    const [url, setUrl] = useState('');
    const router = useRouter();

    const getInitialTimestamp = (url: string): number => {
        const tParam = url.match(/[?&]t=(\d+)/);
        return tParam ? parseInt(tParam[1], 10) : 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Validate the URL
            youtubeUrlSchema.parse(url);

            // Get initial timestamp from URL if present
            const initialTime = getInitialTimestamp(url);

            // Store in localStorage
            localStorage.setItem(LocalStorageKeys.youtubeUrl, url);
            localStorage.setItem(LocalStorageKeys.playbackTime, initialTime.toString());
            localStorage.setItem(LocalStorageKeys.playerState, LocalStoragePlayerState.playing);

            // Navigate to video page
            router.push('/video');
        } catch {
            // Show error toast if validation fails
            toast.error('Invalid YouTube URL', {
                description: 'Please enter a valid YouTube URL',
            });
        }
    };

    return (
        <main className="container mx-auto flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-12">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">YT Player</h1>
                    <p className="text-gray-500">Enter a YouTube video URL to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="url">YouTube URL</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" className="size-4 p-0">
                                        <HelpCircle className="size-4" />
                                        <span className="sr-only">URL format info</span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="space-y-3">
                                        <h4 className="font-medium">Accepted URL formats:</h4>
                                        <div className="space-y-2">
                                            <Badge variant="outline" className="w-full justify-start text-xs font-mono">
                                                https://youtube.com/watch?v=xxxxx
                                            </Badge>
                                            <Badge variant="outline" className="w-full justify-start text-xs font-mono">
                                                https://youtu.be/xxxxx
                                            </Badge>
                                            <Badge variant="outline" className="w-full justify-start text-xs font-mono">
                                                https://youtu.be/xxxxx?t=123
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            You can also include a timestamp (t=123) to start the video at a specific
                                            time
                                        </p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <Input
                            id="url"
                            type="url"
                            placeholder="Paste your YouTube URL here"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full gap-2">
                        Play <SquarePlay className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </main>
    );
}
