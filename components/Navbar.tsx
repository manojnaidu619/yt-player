'use client';

import { Linkedin, Video } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

export function Navbar() {
    return (
        <nav className="border-b bg-background">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <Link href="/" className="font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Video className="h-5 w-5" />
                    <span>YT player</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link
                            href="https://www.linkedin.com/in/manojkumar-1999/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn Profile</span>
                        </Link>
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
