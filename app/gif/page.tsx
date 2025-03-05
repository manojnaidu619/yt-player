'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GifPage() {
    const router = useRouter();
    const [showQuestion, setShowQuestion] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowQuestion(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const handleBack = () => {
        router.back();
    };

    return (
        <main className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8">
            {!showQuestion ? (
                <div className="relative w-full max-w-2xl aspect-video">
                    <Image
                        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnVyeXNxN3Q2bGswY3MzYm8yOGhueXMxdmxjZXI4bTU3aTQ5Ym0zbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W6c7rx9ZQQwjYeerqa/giphy.gif"
                        alt="Funny GIF"
                        fill
                        className="object-contain rounded-xl"
                        priority
                        unoptimized
                    />
                </div>
            ) : (
                <div className="text-center space-y-8">
                    <h2 className="text-2xl font-bold">How many pillows were there on the bed? 🤨</h2>
                    <Button onClick={handleBack} size="lg" className="animate-fade-in">
                        Back to Video
                    </Button>
                </div>
            )}
        </main>
    );
}
