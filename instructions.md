# YouTube Video Player - Development Requirements (Next.js)

This document outlines the requirements and development phases for building a YouTube Video Player web app using Next.js (latest version).

---

## Features Overview

1. User can enter a YouTube video URL and save it.
2. Video should autoplay after saving.
3. Playback position should be remembered if the user leaves and comes back.
4. Edit button to change the video URL.
5. Navigation between three pages:
    - Home Page - Enter video URL.
    - Video Page - Play video and allow editing.
    - GIF Page - Show a funny GIF and navigate back to the Video Page.

---

## Development Phases

### Phase 1: Basic Functionality (Core Features)

-   Set up Next.js project and check package.json for already installed packages.
-   Use shadcn/ui for UI components and TailwindCSS for styling (Avoid writing custom CSS).
-   Create three pages (Home, Video, GIF).
-   Implement state management (use useState and localStorage for storing video URL).
-   Create the YouTube Video Player Component:
    -   Input field to enter a YouTube URL.
    -   Save button to switch to the video player.
    -   Autoplay functionality using YouTube iFrame API.

---

### Phase 2: Enhance User Experience

-   Use Zod for form validation and store validation schemas in a dedicated folder (e.g., /lib/schemas).
-   Implement playback position memory:
    -   Store the current playback time in localStorage.
    -   When the user comes back, resume from the last saved time.
-   Add an "Edit" button to reset the video URL and go back to the input form.
-   Improve routing and navigation using next/link:
    -   Redirect to the Video Page after saving.
    -   Clicking Edit should take the user back to Home Page.
    -   Clicking Back on the GIF Page should return to Video Page with autoplay.

---

### Phase 3: Final Touches and Edge Cases

-   Create the GIF Page with a funny GIF(use a simple gif from giphy.com).
-   Ensure smooth transitions between pages.
-   Handle invalid YouTube URLs using Zod validation.
-   Ensure proper UI and responsiveness using shadcn/ui components.

---

## Example User Flow

### Scenario 1: First-time User

1. User opens the app and sees an input field.
2. Enters a YouTube video URL and clicks Save.
3. Redirected to Video Page, video autoplays.

---

### Scenario 2: User Leaves and Returns

1. User watches the video for a few minutes.
2. Leaves the page and comes back.
3. Video should resume from where the user left off, not restart.

---

### Scenario 3: User Clicks "Edit"

1. User watches the video and wants to change it.
2. Clicks Edit, goes back to Home Page.
3. Enters a new YouTube URL, clicks Save.
4. Redirected to Video Page, and the new video plays.

---

### Scenario 4: User Goes to GIF Page

1. User watches the video, clicks a link to the GIF Page.
2. Sees a funny GIF with a Back button.
3. Clicks Back, returns to Video Page.
4. Video should resume from the last position.

---

## Edge Cases to Cover

-   Invalid YouTube URLs - Show an error message using Zod validation.
-   User enters a non-YouTube link - Prevent saving and show validation.
-   Playback position resets if a new video is entered - Ensure old progress is not carried over.
-   Navigation between pages does not break video state.
-   Autoplay works across different browsers (some browsers block autoplay).
-   Ensure correct use of shadcn/ui components for form fields, buttons, and layout.

---

## Development Guidelines and Best Practices

-   Check package.json for currently installed dependencies before installing new ones.
-   Use shadcn/ui for UI components and TailwindCSS for styling (Avoid writing custom CSS).
-   Use Zod for form validation and store validation schemas in /lib/schemas.
-   Follow best practices for Next.js development (e.g., using server components where needed).
-   Do not write test cases (not required for this project).
