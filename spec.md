# AI Tools Website

## Overview
A modern single-page website showcasing AI tools for content creators with a dark SaaS theme, built using only HTML5, CSS3, and vanilla JavaScript.

## Design Requirements
- Dark SaaS/AI aesthetic with gradient accents
- Glassmorphism card effects
- Smooth animations and transitions
- Fully responsive design
- Mobile-friendly navigation with toggle menu
- SEO-optimized structure
- AdSense-ready with ad placeholder areas

## Page Structure
The website consists of a single-page layout with the following sections:

### Navigation
- Fixed header with smooth scroll navigation
- Mobile hamburger menu toggle
- Links to main sections (Home, Tools, FAQs)
- User authentication state display: "Welcome, [username]" when logged in
- Smooth navigation between all main sections with interactive content loading

### Hero Section
- Headline: "All-in-One AI Tools for Creators"
- "Get Started" button that opens login modal if user is not authenticated
- Engaging visual design with gradients

### Login Modal
- Modal window with email/username and password input fields
- Client-side form validation for required fields and email format
- "Forgot password" placeholder link
- Login button that simulates authentication
- Client-side login state management using localStorage
- Close button and overlay click to dismiss modal

### AI Tools Dashboard
Grid layout featuring eight fully functional tool cards:
- AI Video Creator
- Avatar Generator  
- Post Generator
- Message Composer
- Image Prompt Generator
- Caption & Hashtag Generator
- Thumbnail Generator
- YouTube Script Generator

Each tool opens an interactive modal with:
- Text input area for user prompts with validation for empty or invalid prompts
- Live, dynamic AI generation functionality with real-time progressive content updates
- Generated content display area showing actual results based on user prompts
- Action buttons: Copy to Clipboard, Download (fully functional)
- Character counter for text inputs
- Error handling for invalid or empty prompts
- Functional close button

#### AI Tool Functionality
All tools implement live generation behavior with progressive content updates and animated transitions:

- **Video Generator**: Implements a comprehensive input form with parameters for duration (15s, 30s, 60s), topic selection, style preferences (cinematic, documentary, promotional), and mood settings (energetic, calm, professional). The Prompt Builder processes these parameters into a structured prompt that is sent to the backend `generateVideoAI()` method. The backend makes authenticated HTTP outcalls to RunwayML API using securely loaded API keys from environment variables. Returns downloadable MP4 URLs with metadata. Features robust video playback with proper error handling, asset path validation, codec support verification, and streaming readiness checks. Displays interactive live generation interface with progress indicators, error recovery options, and smooth reveal of final video output from RunwayML responses.

- **Avatar Generator**: Generates unique avatar selections based on user input style keywords (professional, casual, creative, tech, etc.). Shows progressive loading animation and dynamically selects from available avatar assets with smooth reveal animation.

- **Post Generator**: Produces varied social media post content with live typing animation effect. Generates unique posts each time based on user prompt context, tone, and style preferences. Content appears progressively with realistic typing simulation.

- **Message Composer**: Creates contextual messages with live generation feedback. Shows progressive text appearance with typing animation. Generates varied output based on message type and context from user input.

- **Image Prompt Generator**: Dynamically generates creative image prompts with live typing effect. Shows progressive content reveal and includes random but theme-relevant preview suggestions based on user keywords. Features smooth animation transitions and copy-to-clipboard functionality.

- **Caption & Hashtag Generator**: Produces varied captions and hashtags with live generation animation. Content appears progressively with typing effect. Adapts output to input context and selected tone with unique results each generation.

- **Thumbnail Generator**: Features an interactive input form with parameters for text content, emotion selection (excited, serious, curious, inspiring), and color preferences (vibrant, minimal, dark, bright). The Prompt Builder processes these inputs into a structured prompt sent to the backend `generateTextImage()` method. The backend makes authenticated HTTP outcalls to OpenAI API using securely loaded API keys from environment variables for text-to-image generation. Displays live generation interface with progress indicators and smooth reveal of thumbnail variations streamed from OpenAI responses. Ensures unique and content-matched results for each submission with varied hooks, styling approaches, and visual elements based on the processed prompt parameters.

- **YouTube Script Generator**: Generates complete scripts with live typing animation across multiple sections (intro, body, outro). Shows progressive content reveal with realistic generation timing. Produces unique scripts based on topic and style inputs with smooth text appearance effects.

All generation processes include:
- Progressive content updates with smooth animations
- Realistic loading states with progress indicators
- Retry options for failed generations
- Clear visual feedback during loading→output transitions
- Unique output generation based on user input
- Responsive UI with smooth state transitions
- Robust error handling with user-friendly fallback messages

### FAQ Section
- Fully interactive accordion functionality
- Smooth expand/collapse transitions
- Multiple FAQ items with questions and answers
- Professional styling consistent with dark theme

### Content Sections
SEO and ad-optimized content areas:
- "How AI Helps Content Creators"
- "Benefits of AI Tools"

### Footer
- Links to Privacy Policy and Terms of Service
- Contact information
- Additional navigation links

## Additional Pages
- Privacy Policy page (pages/privacy.html)
- Terms of Service page (pages/terms.html)

## Authentication System
- Client-side only authentication simulation
- Login state stored in localStorage
- Username display in header when authenticated
- Login modal triggered by "Get Started" button for unauthenticated users
- Simple form validation with error messaging

## Backend Requirements
The backend must provide AI generation APIs with HTTP outcalls to external services:

### Video Generation API (`generateVideoAI()`)
- Accepts structured prompts with topic, style, mood, and duration parameters from frontend
- Makes authenticated HTTP outcalls to RunwayML API endpoint (https://api.runwayml.com/v1/video/generate) using `httpPostRequest` from `http-outcalls/outcall.mo`
- Includes proper headers: `Authorization: Bearer YOUR_RUNWAY_API_KEY` and `Content-Type: application/json`
- Sends JSON payload with user parameters to RunwayML text-to-video generation service
- Receives RunwayML response containing video URL or base64 video file
- Returns video content directly to frontend as public URL or base64 string for immediate playback
- Provides comprehensive error handling for API failures with structured error messages instead of blank responses
- Implements retry logic for failed HTTP outcalls
- Ensures type definitions align with existing frontend hooks (`useGenerateVideoAI`)
- Includes `RunwayResponse` type definitions for proper response handling

### Text-to-Image Generation API (`generateTextImage()`)
- Accepts structured prompts with text content, emotion, and color preferences from frontend
- Makes authenticated HTTP outcalls to OpenAI API using API keys securely loaded from environment variables
- Handles prompt-based content generation for thumbnail and image creation
- Returns image URLs and metadata streamed from OpenAI responses
- Generates unique design decisions based on input parameters
- Provides varied output for each unique prompt submission
- Implements full error handling and retry mechanisms for API failures

### API Integration Requirements
- Secure API key management using environment variables for both RunwayML and OpenAI services
- HTTP outcall functionality for external API communication using `httpPostRequest`
- Authentication handling for OpenAI and RunwayML services
- Response parsing and error handling for external API responses
- Rate limiting and retry logic for API calls
- Proper error propagation to frontend with clear status messages

## Frontend Requirements
The frontend must integrate with backend endpoints:

### Updated Query Hooks (`useQueries.ts`)
- Call backend endpoints `generateTextImage()` and `generateVideoAI()`
- Handle streaming responses from OpenAI and RunwayML APIs
- Implement proper error handling and retry logic
- Manage loading states and progress indicators

### Enhanced Modal Components
- `VideoCreatorModal.tsx`: Display live progress with final results from RunwayML responses
- `ThumbnailGeneratorModal.tsx`: Display live progress with final results from OpenAI responses
- Maintain user flow: User Input → Prompt Builder → AI Model → Output (Video/Thumbnail)
- Full error handling with clear status messages and retry options
- Real-time progress updates during API processing

## Technical Requirements
- No external dependencies or frameworks
- CDN assets only for any third-party resources
- Optimized for static hosting (GitHub Pages, Internet Computer asset canister)
- Fast loading performance
- Semantic HTML5 structure
- Modern CSS3 features including flexbox/grid
- Vanilla JavaScript for all interactivity
- Live AI generation capabilities with progressive content updates via external API integration
- Real-time generation logic using backend HTTP outcalls to OpenAI and RunwayML
- Animated typing effects and incremental progress indicators
- Dynamic content selection based on external API responses with unique results each time
- Smooth UI state transitions from loading to content display
- Comprehensive error handling with retry logic and user feedback
- Content language: English

## Ad Integration
- Top banner ad placement
- Sidebar ad areas
- In-content ad slots
- AdSense-friendly markup and spacing

## Functionality
- Smooth scrolling navigation between all sections
- Responsive mobile menu
- Interactive tool modals with live AI generation functionality via external APIs
- Progressive content updates with animated transitions from OpenAI and RunwayML responses
- Real-time generation feedback with typing animations
- Dynamic asset selection based on external API responses
- Login modal with form validation
- Client-side authentication state management
- Interactive FAQ accordion with smooth transitions
- Fully functional copy to clipboard for generated content
- Download functionality for generated content including videos and images from external APIs
- Professional animations and transitions throughout
- Consistent dark mode theming across all components
- Live generation progress indicators with retry mechanisms
- Realistic AI processing animations with seamless content preview
- Unique output generation ensuring varied results each time via OpenAI and RunwayML integration
- Backend HTTP outcall integration for Video Creator and Thumbnail Generator tools
- Error-free video playback with proper asset validation and codec support
- Context-aware thumbnail generation with prompt-specific content variation via OpenAI API
- Secure API key management and authenticated requests to external services
