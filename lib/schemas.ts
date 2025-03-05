import { z } from 'zod';

// YouTube URL validation schema
export const youtubeUrlSchema = z.string().refine(
    (url) => {
        // Updated pattern to handle various YouTube URL formats including timestamps
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})([\?&].*)?$/;
        return pattern.test(url);
    },
    {
        message: 'Please enter a valid YouTube URL',
    }
);

// Type for the form
export type YoutubeFormData = z.infer<typeof youtubeUrlSchema>;
