'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { youtubeUrlSchema } from '@/lib/schemas';
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
            localStorage.setItem('youtubeUrl', url);
            localStorage.setItem('playbackTime', initialTime.toString());

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
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                                        <HelpCircle className="h-4 w-4" />
                                        <span className="sr-only">URL format info</span>
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <div className="space-y-3">
                                        <h4 className="font-medium">Accepted URL formats:</h4>
                                        <div className="space-y-2">
                                            <Badge variant="outline" className="w-full justify-start text-xs font-mono">
                                                https://youtube.com/watch?v=xxxxx
                                            </Badge>
                                            <Badge variant="outline" className="w-full justify-start text-xs font-mono">
                                                https://youtube.com/xxxxx
                                            </Badge>
                                            <Badge variant="outline" className="w-full justify-start text-xs font-mono">
                                                https://youtube.com/xxxxx?t=123
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            You can also include a timestamp (t=123) to start the video at a specific
                                            time.
                                        </p>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
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
                    <Button type="submit" className="w-full">
                        Play <SquarePlay />
                    </Button>
                </form>
            </div>
        </main>
    );
}
