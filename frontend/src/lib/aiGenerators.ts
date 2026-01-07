// AI Generation utilities with live, dynamic generation behavior - Fully client-side implementation

interface VideoKeyword {
  keywords: string[];
  videoUrl: string;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
}

interface AvatarStyle {
  keywords: string[];
  image: string;
  style: string;
}

interface ThumbnailContext {
  keywords: string[];
  image: string;
  title: string;
  description: string;
  category: string;
}

// Video generation mapping with MP4 URLs from static assets
const videoDatabase: VideoKeyword[] = [
  {
    keywords: ['business', 'corporate', 'professional', 'office', 'meeting', 'team', 'success', 'growth', 'pitch', 'presentation', 'conference', 'executive', 'leadership', 'strategy', 'enterprise', 'company', 'work', 'career', 'sales', 'marketing', 'finance', 'management', 'entrepreneur', 'startup', 'investment', 'profit', 'revenue', 'commerce', 'trade', 'industry', 'economy'],
    videoUrl: '/assets/generated/video-business.mp4',
    thumbnail: '/assets/generated/video-thumb-business.png',
    title: 'Business Success Story',
    description: 'Professional business content highlighting teamwork and corporate achievement.',
    category: 'business',
  },
  {
    keywords: ['tech', 'technology', 'software', 'coding', 'programming', 'digital', 'innovation', 'startup', 'demo', 'app', 'platform', 'system', 'computer', 'data', 'ai', 'artificial', 'intelligence', 'machine', 'learning', 'automation', 'cyber', 'cloud', 'internet', 'web', 'mobile', 'device', 'gadget', 'electronic', 'robot', 'algorithm', 'code', 'developer', 'engineer', 'hardware', 'network', 'database', 'api'],
    videoUrl: '/assets/generated/video-tech.mp4',
    thumbnail: '/assets/generated/video-thumb-tech.png',
    title: 'Tech Innovation Showcase',
    description: 'A dynamic video featuring cutting-edge technology and digital innovation themes.',
    category: 'technology',
  },
  {
    keywords: ['nature', 'environment', 'environmental', 'green', 'eco', 'eco-friendly', 'sustainable', 'sustainability', 'earth', 'planet', 'wildlife', 'natural', 'organic', 'renewable', 'conservation', 'climate', 'ecology', 'biodiversity', 'forest', 'ocean', 'clean', 'energy', 'outdoor', 'landscape', 'tree', 'plant', 'water', 'sky', 'mountain', 'river', 'garden', 'park', 'animal', 'bird', 'wilderness', 'ecosystem'],
    videoUrl: '/assets/generated/video-nature.mp4',
    thumbnail: '/assets/generated/video-thumb-nature.png',
    title: 'Nature & Sustainability',
    description: 'Beautiful natural landscapes showcasing environmental themes and sustainability.',
    category: 'nature',
  },
  {
    keywords: ['lifestyle', 'health', 'fitness', 'wellness', 'yoga', 'meditation', 'balance', 'living', 'vlog', 'daily', 'routine', 'personal', 'life', 'wellbeing', 'mindfulness', 'exercise', 'nutrition', 'self-care', 'hobby', 'leisure', 'relax', 'home', 'family', 'travel', 'food', 'cooking', 'recipe', 'workout', 'gym', 'sport', 'healthy', 'diet', 'beauty', 'fashion'],
    videoUrl: '/assets/generated/video-lifestyle.mp4',
    thumbnail: '/assets/generated/video-thumb-lifestyle.png',
    title: 'Lifestyle & Wellness',
    description: 'Inspiring lifestyle content focused on health, wellness, and balanced living.',
    category: 'lifestyle',
  },
  {
    keywords: ['creative', 'art', 'design', 'music', 'artist', 'painting', 'craft', 'imagination', 'ad', 'advertisement', 'advertising', 'marketing', 'campaign', 'visual', 'graphic', 'illustration', 'animation', 'artistic', 'expression', 'color', 'style', 'aesthetic', 'beauty', 'fashion', 'photo', 'photography', 'video', 'film', 'media', 'content', 'brand', 'inspire', 'inspiration', 'culture', 'entertainment'],
    videoUrl: '/assets/generated/video-creative.mp4',
    thumbnail: '/assets/generated/video-thumb-creative.png',
    title: 'Creative Expression',
    description: 'Artistic and creative content showcasing imagination and artistic expression.',
    category: 'creative',
  },
];

// Avatar generation mapping
const avatarDatabase: AvatarStyle[] = [
  {
    keywords: ['professional', 'business', 'corporate', 'formal', 'suit', 'male', 'man'],
    image: '/assets/generated/avatar-male-professional.png',
    style: 'Professional Male',
  },
  {
    keywords: ['professional', 'business', 'corporate', 'formal', 'suit', 'female', 'woman'],
    image: '/assets/generated/avatar-female-professional.png',
    style: 'Professional Female',
  },
  {
    keywords: ['casual', 'friendly', 'relaxed', 'informal', 'male', 'man'],
    image: '/assets/generated/avatar-male-casual.png',
    style: 'Casual Male',
  },
  {
    keywords: ['casual', 'friendly', 'relaxed', 'informal', 'female', 'woman'],
    image: '/assets/generated/avatar-female-casual.png',
    style: 'Casual Female',
  },
  {
    keywords: ['creative', 'artist', 'artistic', 'colorful', 'unique', 'expressive'],
    image: '/assets/generated/avatar-artist-creative.png',
    style: 'Creative Artist',
  },
  {
    keywords: ['tech', 'modern', 'futuristic', 'digital', 'innovative', 'contemporary'],
    image: '/assets/generated/avatar-tech-modern.png',
    style: 'Tech Modern',
  },
];

// Thumbnail database with semantic categories
const thumbnailDatabase: ThumbnailContext[] = [
  {
    keywords: ['business', 'professional', 'corporate', 'work', 'office', 'meeting', 'presentation', 'finance', 'marketing', 'sales', 'strategy', 'leadership', 'management', 'entrepreneur', 'startup', 'investment', 'commerce', 'trade', 'industry', 'economy'],
    image: '/assets/generated/sample-thumbnail-2.png',
    title: 'Professional Business Thumbnail',
    description: 'Clean, professional thumbnail design perfect for business and corporate content.',
    category: 'business',
  },
  {
    keywords: ['creative', 'art', 'design', 'colorful', 'vibrant', 'artistic', 'visual', 'graphic', 'illustration', 'style', 'aesthetic', 'beauty', 'fashion', 'inspiration', 'culture', 'entertainment', 'music', 'painting', 'craft', 'imagination'],
    image: '/assets/generated/sample-thumbnail-3.png',
    title: 'Creative Content Thumbnail',
    description: 'Artistic thumbnail with creative elements and engaging visuals for creative content.',
    category: 'creative',
  },
  {
    keywords: ['tech', 'technology', 'digital', 'innovation', 'software', 'coding', 'programming', 'app', 'web', 'mobile', 'data', 'ai', 'computer', 'internet', 'cyber', 'developer', 'engineer', 'hardware', 'network', 'database', 'api', 'algorithm', 'machine', 'learning'],
    image: '/assets/generated/sample-thumbnail-1.png',
    title: 'Dynamic Tech Thumbnail',
    description: 'Eye-catching thumbnail with bold text and vibrant colors for tech content.',
    category: 'technology',
  },
  {
    keywords: ['lifestyle', 'health', 'fitness', 'wellness', 'yoga', 'food', 'cooking', 'travel', 'vlog', 'daily', 'personal', 'home', 'family', 'hobby', 'leisure', 'relax', 'meditation', 'exercise', 'nutrition', 'self-care', 'workout', 'gym', 'sport', 'healthy', 'diet'],
    image: '/assets/generated/sample-thumbnail-1.png',
    title: 'Lifestyle Content Thumbnail',
    description: 'Engaging thumbnail design for lifestyle, wellness, and personal content.',
    category: 'lifestyle',
  },
  {
    keywords: ['nature', 'environment', 'green', 'eco', 'sustainable', 'outdoor', 'landscape', 'wildlife', 'natural', 'earth', 'planet', 'conservation', 'climate', 'ecology', 'forest', 'ocean', 'tree', 'plant', 'water', 'mountain', 'river', 'garden', 'animal', 'bird'],
    image: '/assets/generated/sample-thumbnail-3.png',
    title: 'Nature & Environment Thumbnail',
    description: 'Beautiful thumbnail showcasing natural themes and environmental content.',
    category: 'nature',
  },
  {
    keywords: ['education', 'learning', 'tutorial', 'teaching', 'course', 'lesson', 'training', 'study', 'school', 'university', 'knowledge', 'skill', 'guide', 'how-to', 'instruction', 'academic', 'student', 'teacher', 'professor', 'lecture'],
    image: '/assets/generated/sample-thumbnail-2.png',
    title: 'Educational Content Thumbnail',
    description: 'Professional thumbnail design for educational and tutorial content.',
    category: 'education',
  },
  {
    keywords: ['gaming', 'game', 'gamer', 'esports', 'stream', 'streaming', 'play', 'player', 'console', 'pc', 'video-game', 'multiplayer', 'online', 'competitive', 'tournament', 'twitch', 'youtube-gaming'],
    image: '/assets/generated/sample-thumbnail-1.png',
    title: 'Gaming Content Thumbnail',
    description: 'Dynamic thumbnail design for gaming and streaming content.',
    category: 'gaming',
  },
];

// Post generation templates with variations
const postTemplates = {
  motivational: [
    (topic: string) => `🚀 Ready to level up?\n\n${topic}\n\nSuccess isn't just about what you accomplish—it's about what you inspire others to do. Every challenge is an opportunity in disguise.\n\n💡 Key takeaways:\n• Embrace the journey, not just the destination\n• Learn from setbacks and grow stronger\n• Surround yourself with positive energy\n\nWhat's your biggest win this week? Share below! 👇\n\n#Motivation #Success #Growth #Inspiration`,
    (topic: string) => `✨ Transform Your Mindset\n\n${topic}\n\nThe difference between where you are and where you want to be is the action you take today. Don't wait for the perfect moment—create it.\n\n🎯 Remember:\n• Small steps lead to big changes\n• Your potential is limitless\n• Believe in your journey\n\nTag someone who needs to see this! 💪\n\n#Mindset #Transformation #DreamBig #Hustle`,
    (topic: string) => `🌟 Your Daily Dose of Inspiration\n\n${topic}\n\nGreat things never come from comfort zones. Push yourself, challenge your limits, and watch yourself grow beyond what you thought possible.\n\n💫 Today's mantra:\n• Progress over perfection\n• Consistency beats intensity\n• You are capable of amazing things\n\nDrop a 🔥 if you're ready to conquer today!\n\n#Inspiration #Motivation #GrowthMindset #SuccessMindset`,
  ],
  
  professional: [
    (topic: string) => `📊 Industry Insights\n\n${topic}\n\nIn today's rapidly evolving landscape, staying ahead requires continuous adaptation and strategic thinking. Here are three critical considerations:\n\n1️⃣ Innovation drives competitive advantage\n2️⃣ Data-informed decisions yield better outcomes\n3️⃣ Collaboration amplifies individual expertise\n\nThe organizations that thrive are those that embrace change while maintaining their core values.\n\nWhat trends are you seeing in your industry? Let's discuss.\n\n#Business #Leadership #Strategy #Innovation`,
    (topic: string) => `💼 Professional Perspective\n\n${topic}\n\nNavigating today's business environment demands both agility and foresight. Success comes from balancing immediate execution with long-term vision.\n\n🎯 Key focus areas:\n• Strategic planning and execution\n• Building high-performing teams\n• Leveraging technology for growth\n• Maintaining competitive edge\n\nHow is your organization adapting to change? I'd love to hear your insights.\n\n#BusinessStrategy #Leadership #ProfessionalDevelopment #Innovation`,
    (topic: string) => `🚀 Driving Business Excellence\n\n${topic}\n\nThe future belongs to organizations that can anticipate change and act decisively. Excellence isn't a destination—it's a continuous journey of improvement and innovation.\n\n📈 Essential elements:\n• Clear vision and mission alignment\n• Empowered and engaged teams\n• Customer-centric approach\n• Sustainable growth strategies\n\nWhat's your approach to driving excellence? Share your thoughts below.\n\n#BusinessExcellence #CorporateStrategy #Leadership #Growth`,
  ],
  
  casual: [
    (topic: string) => `Hey everyone! 👋\n\n${topic}\n\nJust wanted to share some thoughts on this. It's been on my mind lately and I think it's worth talking about.\n\nHere's what I've learned:\n✨ Keep it simple\n✨ Stay authentic\n✨ Have fun with it\n\nLife's too short to overthink everything, right? Sometimes the best approach is just to dive in and see what happens.\n\nWhat do you think? Drop your thoughts in the comments! 💬\n\n#JustSharing #Thoughts #Community`,
    (topic: string) => `So here's the thing... 🤔\n\n${topic}\n\nI've been thinking about this a lot lately, and honestly, it's pretty interesting when you really dig into it.\n\n💭 Quick thoughts:\n• It's all about perspective\n• Everyone's experience is different\n• There's no one-size-fits-all answer\n\nAnyone else feel the same way? Let me know! 👇\n\n#RealTalk #Thoughts #Community #Authentic`,
    (topic: string) => `Random thought of the day 💡\n\n${topic}\n\nYou know what? Sometimes the simplest things make the biggest difference. Just wanted to put this out there and see what you all think.\n\n🌈 My take:\n• Keep it real\n• Stay curious\n• Enjoy the process\n\nWhat's your hot take on this? Comment below! 🙌\n\n#Thoughts #Community #KeepItReal #DailyVibes`,
  ],
  
  educational: [
    (topic: string) => `📚 Learning Moment\n\n${topic}\n\nLet's break this down into digestible insights:\n\n🔍 The Context:\nUnderstanding the fundamentals is crucial for mastery. This concept has far-reaching implications across multiple domains.\n\n💡 Key Principles:\n• Foundation before complexity\n• Practice reinforces understanding\n• Application solidifies knowledge\n\n🎯 Practical Application:\nStart small, build consistently, and measure your progress. The compound effect of daily learning is remarkable.\n\nWhat's one thing you learned recently? Share your knowledge!\n\n#Learning #Education #Knowledge #Growth`,
    (topic: string) => `🎓 Knowledge Share\n\n${topic}\n\nEducation is a journey, not a destination. Today, let's explore this concept together and uncover valuable insights.\n\n📖 Core Concepts:\n• Understanding the why behind the what\n• Connecting theory to practice\n• Building on existing knowledge\n• Continuous improvement mindset\n\n✅ Action Steps:\nTake what you learn and apply it immediately. Real learning happens through doing.\n\nWhat's your learning goal this week? Let's support each other!\n\n#Education #Learning #PersonalGrowth #KnowledgeSharing`,
    (topic: string) => `💡 Educational Insight\n\n${topic}\n\nDeep understanding comes from asking the right questions and seeking meaningful answers. Let's explore this together.\n\n🔑 Essential Elements:\n• Critical thinking over memorization\n• Practical application of concepts\n• Learning from both success and failure\n• Sharing knowledge with others\n\n🌱 Growth Mindset:\nEvery expert was once a beginner. Embrace the learning process and celebrate progress.\n\nWhat's the most valuable lesson you've learned recently?\n\n#LifelongLearning #Education #Growth #Knowledge`,
  ],
};

// Message generation templates with variations
const messageTemplates = {
  greeting: [
    (context: string) => `Subject: Greetings and Introduction\n\nDear [Recipient],\n\nI hope this message finds you well. ${context}\n\nI wanted to reach out and introduce myself. I'm excited about the possibility of connecting and exploring potential opportunities for collaboration.\n\nI'd love to learn more about your work and share some insights from my own experience. Would you be open to a brief conversation in the coming weeks?\n\nLooking forward to hearing from you.\n\nWarm regards,\n[Your Name]`,
    (context: string) => `Subject: Hello and Introduction\n\nHi [Recipient],\n\nI hope you're having a great day! ${context}\n\nI came across your profile and was impressed by your work. I believe there could be some interesting synergies between what we're both doing.\n\nWould you be interested in connecting for a quick chat? I'd love to learn more about your projects and share some ideas.\n\nBest wishes,\n[Your Name]`,
  ],
  
  followup: [
    (context: string) => `Subject: Following Up on Our Recent Discussion\n\nHi [Recipient],\n\nThank you for taking the time to speak with me recently. ${context}\n\nI've been reflecting on our conversation and wanted to follow up on a few key points we discussed:\n\n• [Point 1]: I believe there's significant potential here\n• [Point 2]: This aligns well with our mutual goals\n• [Point 3]: Next steps could include...\n\nWould you be available for a quick call next week to explore these ideas further? I'm flexible with timing and happy to work around your schedule.\n\nBest regards,\n[Your Name]`,
    (context: string) => `Subject: Quick Follow-Up\n\nHello [Recipient],\n\nI wanted to circle back on our recent conversation. ${context}\n\nA few thoughts have been percolating since we last spoke:\n\n→ The opportunity we discussed has even more potential than I initially thought\n→ I've identified some additional resources that could be valuable\n→ I'd love to move forward with the next steps we outlined\n\nDo you have 15 minutes this week for a quick sync? Let me know what works for you.\n\nThanks,\n[Your Name]`,
  ],
  
  announcement: [
    (context: string) => `Subject: Important Update\n\nDear Team,\n\n${context}\n\nI'm pleased to share some exciting news with you all. After careful consideration and planning, we're moving forward with an initiative that will benefit everyone involved.\n\nKey highlights:\n✓ Enhanced collaboration opportunities\n✓ Streamlined processes\n✓ Improved outcomes for all stakeholders\n\nWe'll be sharing more details in the coming days. In the meantime, please don't hesitate to reach out if you have any questions or concerns.\n\nThank you for your continued dedication and support.\n\nBest,\n[Your Name]`,
    (context: string) => `Subject: Exciting News to Share\n\nHello Everyone,\n\n${context}\n\nI'm thrilled to announce some developments that I believe will make a positive impact on our work together.\n\n🎯 What's happening:\n• New opportunities for growth and development\n• Enhanced tools and resources\n• Stronger support systems\n• Improved communication channels\n\nMore information will follow soon. I'm excited about what's ahead and grateful for your ongoing commitment.\n\nWarm regards,\n[Your Name]`,
  ],
  
  professional: [
    (context: string) => `Subject: Professional Inquiry\n\nDear [Recipient],\n\n${context}\n\nI am writing to express my interest in discussing potential collaboration opportunities. Your expertise in this field is well-recognized, and I believe there may be mutual benefits to exploring how we might work together.\n\nSpecifically, I am interested in:\n\n1. Understanding your current initiatives\n2. Exploring areas of alignment\n3. Discussing potential next steps\n\nWould you be available for a brief introductory call? I'm happy to accommodate your schedule and can be flexible with timing.\n\nI look forward to the possibility of connecting.\n\nSincerely,\n[Your Name]\n[Your Title]\n[Contact Information]`,
    (context: string) => `Subject: Collaboration Opportunity\n\nDear [Recipient],\n\n${context}\n\nI'm reaching out to explore potential partnership opportunities that could be mutually beneficial. Your work in this space has caught my attention, and I see several areas where our efforts might align.\n\nI'd appreciate the opportunity to:\n• Share insights about my current projects\n• Learn more about your initiatives\n• Identify potential synergies\n• Discuss ways we might collaborate\n\nWould you have time for a brief conversation in the coming weeks? I'm flexible and happy to work around your availability.\n\nThank you for considering this.\n\nBest regards,\n[Your Name]`,
  ],
};

// Image prompt templates with variations
const imagePromptTemplates = {
  futuristic: [
    (theme: string) => `A stunning futuristic scene featuring ${theme}, rendered in ultra-high definition with dramatic lighting. Cyberpunk aesthetic with neon accents, holographic elements, and sleek metallic surfaces. Advanced technology seamlessly integrated into the environment. Cinematic composition with depth of field, volumetric lighting, and rich color grading. 8K resolution, photorealistic detail.`,
    (theme: string) => `Sci-fi inspired visualization of ${theme} in a dystopian future setting. Neon-lit cityscape with flying vehicles, holographic advertisements, and advanced robotics. Dark atmosphere with vibrant color pops. Ray-traced reflections, atmospheric fog, and dramatic shadows. Ultra-detailed, cinematic quality, 8K resolution.`,
    (theme: string) => `Futuristic concept art depicting ${theme} with cutting-edge technology. Sleek chrome surfaces, glowing blue accents, and transparent holographic displays. Advanced AI interfaces and quantum computing elements. Professional CGI quality with perfect lighting and composition. Photorealistic rendering, 8K detail.`,
  ],
  
  minimalist: [
    (theme: string) => `Minimalist composition showcasing ${theme} with clean lines and negative space. Soft, natural lighting with subtle shadows. Muted color palette featuring whites, beiges, and gentle pastels. Simple geometric shapes and uncluttered design. Scandinavian aesthetic with emphasis on functionality and elegance. High-key lighting, serene atmosphere.`,
    (theme: string) => `Ultra-minimalist interpretation of ${theme} with maximum negative space. Monochromatic color scheme with single accent color. Clean typography, geometric precision, and perfect balance. Japanese-inspired simplicity meets modern design. Soft diffused lighting, peaceful mood, high-end photography quality.`,
    (theme: string) => `Minimalist design featuring ${theme} in a zen-like composition. Neutral tones, natural materials, and organic textures. Emphasis on empty space and visual breathing room. Subtle gradients and soft shadows. Contemporary minimalism with timeless appeal. Professional studio lighting, 4K clarity.`,
  ],
  
  artistic: [
    (theme: string) => `Artistic interpretation of ${theme} in the style of contemporary digital art. Bold brushstrokes, vibrant colors, and dynamic composition. Abstract elements blended with realistic details. Expressive use of light and shadow. Inspired by modern impressionism with a touch of surrealism. Rich textures and layered depth.`,
    (theme: string) => `Creative artistic rendering of ${theme} with painterly effects. Vivid color palette, expressive brushwork, and emotional depth. Mix of abstract and figurative elements. Inspired by post-impressionism and modern art movements. Dramatic lighting, rich textures, gallery-quality finish.`,
    (theme: string) => `Abstract artistic vision of ${theme} with bold creative choices. Experimental color combinations, dynamic shapes, and fluid forms. Contemporary art style with digital painting techniques. Emotional and evocative composition. Museum-quality artwork with stunning visual impact.`,
  ],
  
  natural: [
    (theme: string) => `Beautiful natural scene featuring ${theme} in golden hour lighting. Lush organic elements with rich earth tones and vibrant greens. Soft, warm sunlight filtering through the environment. Photorealistic detail with emphasis on natural textures. Serene and peaceful atmosphere. Professional nature photography style with shallow depth of field.`,
    (theme: string) => `Breathtaking nature photography of ${theme} during magic hour. Dramatic sky with warm sunset colors. Rich natural details, organic textures, and vibrant flora. Misty atmosphere with rays of light. National Geographic quality, perfect composition, stunning clarity.`,
    (theme: string) => `Pristine natural landscape showcasing ${theme} in perfect lighting conditions. Crystal clear details, vivid natural colors, and perfect exposure. Morning dew, soft mist, and gentle sunlight. Wildlife photography quality with professional equipment. 8K resolution, award-winning composition.`,
  ],
  
  professional: [
    (theme: string) => `Professional, high-quality image of ${theme} suitable for corporate use. Clean, modern aesthetic with balanced composition. Neutral color palette with strategic accent colors. Sharp focus and excellent lighting. Business-appropriate styling with attention to detail. Studio-quality production values.`,
    (theme: string) => `Corporate photography featuring ${theme} with professional polish. Clean background, perfect lighting, and sharp focus. Business-appropriate color scheme and composition. High-end commercial photography quality. Suitable for marketing materials and presentations. 4K resolution, flawless execution.`,
    (theme: string) => `Premium business imagery of ${theme} with executive appeal. Sophisticated styling, professional lighting setup, and perfect composition. Neutral tones with subtle brand colors. Commercial photography quality suitable for annual reports and corporate communications. Impeccable detail and clarity.`,
  ],
};

// Caption templates with different tones and variations
const captionTemplates = {
  professional: [
    (keywords: string) => ({
      caption: `Excited to share insights on ${keywords}. In today's dynamic landscape, staying informed and adaptable is key to success. Let's continue pushing boundaries and creating meaningful impact together. 💼✨`,
      hashtags: ['#Professional', '#Business', '#Growth', '#Success', '#Leadership', '#Innovation', '#Networking', '#CareerDevelopment'],
      tone: 'Professional',
    }),
    (keywords: string) => ({
      caption: `Reflecting on ${keywords} and its impact on our industry. Strategic thinking and continuous learning drive excellence. Proud to be part of a community that values innovation and collaboration. 🚀`,
      hashtags: ['#BusinessLeadership', '#ProfessionalGrowth', '#Innovation', '#Strategy', '#Excellence', '#Networking', '#CareerSuccess', '#Industry'],
      tone: 'Professional',
    }),
    (keywords: string) => ({
      caption: `Diving deep into ${keywords} today. The intersection of strategy and execution is where real value is created. Grateful for the opportunity to learn and grow with amazing professionals. 💡`,
      hashtags: ['#ProfessionalDevelopment', '#BusinessStrategy', '#Leadership', '#Growth', '#Innovation', '#Success', '#Networking', '#Excellence'],
      tone: 'Professional',
    }),
  ],
  
  casual: [
    (keywords: string) => ({
      caption: `Just vibing with ${keywords} today! 🌟 Life's all about finding those little moments that make you smile. Who else is feeling the good energy? Drop a ❤️ if you're with me!`,
      hashtags: ['#Vibes', '#GoodEnergy', '#DailyLife', '#Mood', '#Lifestyle', '#Authentic', '#RealTalk', '#Community'],
      tone: 'Casual',
    }),
    (keywords: string) => ({
      caption: `${keywords} hitting different today 😊 Sometimes you just gotta appreciate the simple things, you know? Living my best life one moment at a time. What's making you happy today? 💫`,
      hashtags: ['#GoodVibes', '#DailyMood', '#LifeStyle', '#Authentic', '#RealLife', '#Community', '#Blessed', '#Grateful'],
      tone: 'Casual',
    }),
    (keywords: string) => ({
      caption: `Can we talk about ${keywords} for a sec? 🤔 This is exactly what I needed today. Keeping it real and staying positive. Tag someone who gets it! ✨`,
      hashtags: ['#KeepItReal', '#Vibes', '#DailyLife', '#Mood', '#Authentic', '#Community', '#PositiveEnergy', '#Life'],
      tone: 'Casual',
    }),
  ],
  
  inspirational: [
    (keywords: string) => ({
      caption: `${keywords} reminds us that every journey begins with a single step. 🚀 Embrace the challenges, celebrate the victories, and never stop believing in your potential. Your story matters. Keep shining! ✨`,
      hashtags: ['#Inspiration', '#Motivation', '#BelieveInYourself', '#DreamBig', '#PositiveVibes', '#Mindset', '#Goals', '#YouGotThis'],
      tone: 'Inspirational',
    }),
    (keywords: string) => ({
      caption: `Let ${keywords} be your reminder that greatness lives within you. 💫 Every setback is a setup for a comeback. Stay focused, stay hungry, and watch yourself transform. You're capable of amazing things! 🌟`,
      hashtags: ['#Motivation', '#Inspiration', '#Mindset', '#Success', '#DreamBig', '#BelieveInYourself', '#PositiveVibes', '#Growth'],
      tone: 'Inspirational',
    }),
    (keywords: string) => ({
      caption: `${keywords} is proof that when you align your actions with your dreams, magic happens. ✨ Don't wait for permission to be great. Start today, start now. Your future self will thank you! 🚀`,
      hashtags: ['#Inspiration', '#Motivation', '#DreamBig', '#Success', '#Mindset', '#Goals', '#BelieveInYourself', '#Transformation'],
      tone: 'Inspirational',
    }),
  ],
};

// Thumbnail hooks - engaging opening phrases categorized by context
const thumbnailHooksByCategory: Record<string, string[]> = {
  business: [
    "The Secret to",
    "How to Master",
    "The Ultimate Guide to",
    "Everything You Need About",
    "The Truth About",
    "The Best Way to",
    "Unlock the Power of",
    "Transform Your",
    "Boost Your",
    "Maximize Your",
  ],
  technology: [
    "You Won't Believe",
    "The Future of",
    "How to Master",
    "The Complete Guide to",
    "Discover the Power of",
    "Unlock the Secrets of",
    "The Hidden Benefits of",
    "What Nobody Tells You About",
    "Revolutionary",
    "Next-Level",
  ],
  creative: [
    "The Art of",
    "Discover the Magic of",
    "Unlock Your",
    "Transform Your",
    "The Creative Guide to",
    "Master the Art of",
    "Unleash Your",
    "The Secret to",
    "Inspiring",
    "Amazing",
  ],
  lifestyle: [
    "Why You Should",
    "The Best Way to",
    "Transform Your",
    "The Complete Guide to",
    "Discover the Joy of",
    "Everything About",
    "The Truth About",
    "How to Master",
    "Perfect",
    "Ultimate",
  ],
  nature: [
    "Explore the Beauty of",
    "Discover",
    "The Wonders of",
    "Amazing",
    "Breathtaking",
    "The Secret World of",
    "Journey Through",
    "Experience",
  ],
  education: [
    "Learn",
    "Master",
    "The Complete Guide to",
    "Everything You Need About",
    "How to",
    "The Ultimate Tutorial on",
    "Step-by-Step Guide to",
    "Beginner's Guide to",
    "Pro Tips for",
    "Essential",
  ],
  gaming: [
    "Epic",
    "Ultimate",
    "Pro Guide to",
    "Master",
    "Dominate",
    "Win at",
    "The Best",
    "Insane",
    "Legendary",
    "Top Secrets of",
  ],
  default: [
    "You Won't Believe",
    "The Secret to",
    "How to Master",
    "The Ultimate Guide to",
    "Everything You Need About",
    "The Truth About",
    "Why You Should",
    "The Best Way to",
    "Discover the Power of",
    "Unlock the Secrets of",
  ],
};

// Thumbnail styles - visual design approaches categorized by context
const thumbnailStylesByCategory: Record<string, string[]> = {
  business: [
    "Professional & Sleek",
    "Minimalist Clean",
    "Elegant & Sophisticated",
    "Modern Gradient",
    "High Contrast",
    "Bold & Vibrant",
    "Corporate Blue",
    "Executive Style",
  ],
  technology: [
    "Futuristic Tech",
    "Neon Glow",
    "High Contrast",
    "Modern Gradient",
    "Bold & Vibrant",
    "Dark & Dramatic",
    "Cyber Style",
    "Digital Matrix",
  ],
  creative: [
    "Colorful Pop Art",
    "Bold & Vibrant",
    "Bright & Energetic",
    "Retro Vintage",
    "Dynamic Action",
    "Artistic Expression",
    "Rainbow Burst",
    "Abstract Modern",
  ],
  lifestyle: [
    "Warm & Inviting",
    "Bright & Energetic",
    "Cool & Calm",
    "Minimalist Clean",
    "Elegant & Sophisticated",
    "Natural & Organic",
    "Cozy Aesthetic",
    "Fresh & Light",
  ],
  nature: [
    "Natural & Organic",
    "Earth Tones",
    "Fresh & Green",
    "Serene & Peaceful",
    "Vibrant Nature",
    "Sunset Glow",
    "Ocean Blue",
    "Forest Green",
  ],
  education: [
    "Professional & Sleek",
    "Minimalist Clean",
    "High Contrast",
    "Bold & Vibrant",
    "Modern Gradient",
    "Clear & Focused",
    "Academic Style",
    "Smart Design",
  ],
  gaming: [
    "Dark & Dramatic",
    "Neon Glow",
    "High Contrast",
    "Bold & Vibrant",
    "Epic Style",
    "Action Packed",
    "Intense Colors",
    "Gamer Aesthetic",
  ],
  default: [
    "Bold & Vibrant",
    "Minimalist Clean",
    "Dark & Dramatic",
    "Bright & Energetic",
    "Professional & Sleek",
    "Colorful Pop Art",
    "Elegant & Sophisticated",
    "Modern Gradient",
    "High Contrast",
    "Neon Glow",
  ],
};

// Script templates with variations
const scriptTemplates = {
  informative: [
    (topic: string) => ({
      intro: `Hey everyone, welcome back to the channel! Today, we're diving deep into ${topic}. This is a topic that's been getting a lot of attention lately, and for good reason. By the end of this video, you'll have a comprehensive understanding of the key concepts and practical applications. So let's get started!`,
      body: `Let's break this down into three main points. First, we need to understand the fundamentals of ${topic}. This forms the foundation of everything we'll discuss. Second, let's explore the real-world applications and why this matters to you. The impact is more significant than you might think. Third, we'll look at best practices and actionable steps you can take right away. These strategies have been proven effective by industry experts and everyday practitioners alike.`,
      outro: `And that's a wrap on ${topic}! I hope you found this information valuable and actionable. If you enjoyed this video, don't forget to hit that like button and subscribe for more content like this. Drop a comment below with your thoughts or questions—I love hearing from you! Thanks for watching, and I'll see you in the next one!`,
      topic: topic,
    }),
    (topic: string) => ({
      intro: `Welcome back! In today's video, we're exploring ${topic} in detail. Whether you're new to this or looking to deepen your understanding, this video has something for everyone. I've done extensive research to bring you the most accurate and useful information. Let's jump right in!`,
      body: `Now, let's examine ${topic} from multiple angles. The first thing you need to know is the core concept and why it matters. Understanding this foundation is crucial. Next, we'll look at how this applies in different scenarios and contexts. You'll see that the principles remain consistent even as the applications vary. Finally, I'll share some expert insights and data-backed recommendations that you can implement immediately.`,
      outro: `That wraps up our deep dive into ${topic}. I hope this gave you valuable insights and practical knowledge you can use. If you found this helpful, please like and subscribe—it really helps the channel grow. Have questions or want me to cover something specific? Leave a comment below! See you in the next video!`,
      topic: topic,
    }),
  ],
  
  entertaining: [
    (topic: string) => ({
      intro: `What's up, awesome people! You clicked on this video about ${topic}, and trust me, you're in for a treat! We're about to have some fun while learning something cool. Buckle up, because this is going to be entertaining AND educational. Let's jump right in!`,
      body: `Okay, so here's the deal with ${topic}—it's actually way more interesting than it sounds! Let me tell you a quick story that'll blow your mind. [Insert engaging anecdote]. But wait, there's more! The really cool part is how this applies to everyday life. You've probably experienced this without even realizing it. And here's the kicker—you can actually use this knowledge to impress your friends or make your life easier. How awesome is that?`,
      outro: `Alright, that's all for today's adventure into ${topic}! If you had as much fun as I did, smash that like button and subscribe so you don't miss out on more awesome content. Got any wild stories or experiences related to this? Share them in the comments—I read every single one! Until next time, stay awesome!`,
      topic: topic,
    }),
    (topic: string) => ({
      intro: `Hey hey hey! Welcome to the most entertaining video about ${topic} you'll watch today! I promise this won't be boring—we're going to make learning fun. Grab your snacks, get comfortable, and let's have a blast exploring this together!`,
      body: `So ${topic}... sounds serious, right? WRONG! This is actually super fascinating when you look at it the right way. Picture this: [engaging scenario]. Mind = blown, right? But it gets even better. The way this connects to your daily life is honestly hilarious when you think about it. I've got some stories that'll make you laugh and learn at the same time. Trust me, you'll never look at this the same way again!`,
      outro: `And scene! That's our fun-filled journey through ${topic}. If you enjoyed this rollercoaster of knowledge and entertainment, hit that like button with the force of a thousand suns! Subscribe for more content that makes learning actually enjoyable. Drop your funniest related story in the comments—let's keep the good vibes going! Catch you in the next one!`,
      topic: topic,
    }),
  ],
  
  tutorial: [
    (topic: string) => ({
      intro: `Hello and welcome! In this tutorial, we're going to learn about ${topic} step by step. Whether you're a complete beginner or looking to refine your skills, this guide will walk you through everything you need to know. I'll be showing you exactly how to do this, so feel free to follow along. Let's begin!`,
      body: `Step one: Let's start with the basics of ${topic}. Make sure you have everything ready before we proceed. Step two: Now we're going to implement the core concepts. Pay close attention to this part, as it's crucial for success. I'll demonstrate each step clearly. Step three: Here's where we put it all together. This is the most exciting part where you'll see real results. Don't worry if it takes a few tries—practice makes perfect!`,
      outro: `Congratulations! You've just learned ${topic} from start to finish. Remember, the key is practice and patience. If you found this tutorial helpful, please like and subscribe for more step-by-step guides. Have questions or need clarification on any step? Leave a comment below, and I'll help you out. Happy learning, and see you in the next tutorial!`,
      topic: topic,
    }),
    (topic: string) => ({
      intro: `Welcome to this comprehensive tutorial on ${topic}! Today, I'm going to show you exactly how to master this skill from scratch. No prior experience needed—just follow along with me. By the end of this video, you'll be confident in your abilities. Let's get started with step one!`,
      body: `First, we'll cover the essential setup for ${topic}. This foundation is critical, so don't skip this part. Next, I'll walk you through the main process, breaking it down into manageable chunks. Watch carefully as I demonstrate each technique. Then, we'll tackle some common challenges you might face and how to overcome them. I'll show you pro tips that will save you time and frustration.`,
      outro: `Excellent work! You've now completed the full tutorial on ${topic}. Practice these steps regularly to build your confidence and skill. If this tutorial was helpful, please give it a thumbs up and subscribe for more detailed guides. Got stuck on something? Comment below with your question and I'll personally help you troubleshoot. Keep practicing, and I'll see you in the next tutorial!`,
      topic: topic,
    }),
  ],
};

// Helper function to find best match based on keywords with improved semantic matching
function findBestMatch<T extends { keywords: string[]; category?: string }>(
  database: T[],
  prompt: string
): T | null {
  const promptLower = prompt.toLowerCase();
  
  // Calculate match scores for each item
  const scores = database.map((item) => {
    let score = 0;
    
    // Check each keyword
    item.keywords.forEach((keyword) => {
      const keywordLower = keyword.toLowerCase();
      
      // Exact word match (highest priority) - use word boundaries
      const wordBoundaryRegex = new RegExp(`\\b${keywordLower}\\b`, 'i');
      if (wordBoundaryRegex.test(promptLower)) {
        score += 10;
      }
      // Partial match (lower priority)
      else if (promptLower.includes(keywordLower)) {
        score += 5;
      }
    });
    
    return { item, score };
  });

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);
  
  // If no matches found (score is 0), return null
  if (scores[0].score === 0) {
    return null;
  }
  
  return scores[0].item;
}

// Helper function to detect semantic category from prompt
function detectCategory(prompt: string): string {
  const promptLower = prompt.toLowerCase();
  
  // Business/Corporate
  if (/\b(business|corporate|professional|office|meeting|finance|marketing|sales|entrepreneur|startup|investment|commerce|trade|industry|economy)\b/i.test(promptLower)) {
    return 'business';
  }
  
  // Technology
  if (/\b(tech|technology|software|coding|programming|digital|app|web|mobile|data|ai|artificial|intelligence|machine|learning|cyber|cloud|internet|developer|engineer|algorithm)\b/i.test(promptLower)) {
    return 'technology';
  }
  
  // Creative/Art
  if (/\b(creative|art|design|music|artist|painting|craft|imagination|advertising|visual|graphic|illustration|animation|artistic|culture|entertainment)\b/i.test(promptLower)) {
    return 'creative';
  }
  
  // Lifestyle/Wellness
  if (/\b(lifestyle|health|fitness|wellness|yoga|meditation|food|cooking|travel|vlog|personal|home|family|hobby|leisure|exercise|nutrition|workout|gym|sport)\b/i.test(promptLower)) {
    return 'lifestyle';
  }
  
  // Nature/Environment
  if (/\b(nature|environment|green|eco|sustainable|outdoor|landscape|wildlife|natural|earth|planet|conservation|climate|ecology|forest|ocean|tree|plant|animal)\b/i.test(promptLower)) {
    return 'nature';
  }
  
  // Education/Learning
  if (/\b(education|learning|tutorial|teaching|course|lesson|training|study|school|university|knowledge|skill|guide|how-to|instruction|academic)\b/i.test(promptLower)) {
    return 'education';
  }
  
  // Gaming
  if (/\b(gaming|game|gamer|esports|stream|streaming|play|player|console|video-game|multiplayer|competitive|tournament)\b/i.test(promptLower)) {
    return 'gaming';
  }
  
  return 'default';
}

// Helper function to get random variation from template array
function getRandomVariation<T>(templates: T[]): T {
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
}

// Helper function to get random item from array based on input hash for consistency
function getRandomItem<T>(array: T[], seed?: string): T {
  if (seed) {
    // Use seed to generate consistent "random" index
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    const index = Math.abs(hash) % array.length;
    return array[index];
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Helper function to detect tone/style from prompt
function detectTone(prompt: string): keyof typeof postTemplates {
  const promptLower = prompt.toLowerCase();
  
  if (
    promptLower.includes('motivat') ||
    promptLower.includes('inspir') ||
    promptLower.includes('encourag')
  ) {
    return 'motivational';
  }
  
  if (
    promptLower.includes('profession') ||
    promptLower.includes('business') ||
    promptLower.includes('corporate') ||
    promptLower.includes('industry')
  ) {
    return 'professional';
  }
  
  if (
    promptLower.includes('learn') ||
    promptLower.includes('educat') ||
    promptLower.includes('teach') ||
    promptLower.includes('explain')
  ) {
    return 'educational';
  }
  
  return 'casual';
}

// Helper function to detect message type
function detectMessageType(prompt: string): keyof typeof messageTemplates {
  const promptLower = prompt.toLowerCase();
  
  if (
    promptLower.includes('follow') ||
    promptLower.includes('follow-up') ||
    promptLower.includes('followup')
  ) {
    return 'followup';
  }
  
  if (
    promptLower.includes('announc') ||
    promptLower.includes('update') ||
    promptLower.includes('news')
  ) {
    return 'announcement';
  }
  
  if (
    promptLower.includes('greet') ||
    promptLower.includes('hello') ||
    promptLower.includes('introduction') ||
    promptLower.includes('introduce')
  ) {
    return 'greeting';
  }
  
  return 'professional';
}

// Helper function to detect image prompt style
function detectImagePromptStyle(prompt: string): keyof typeof imagePromptTemplates {
  const promptLower = prompt.toLowerCase();
  
  if (
    promptLower.includes('futur') ||
    promptLower.includes('sci-fi') ||
    promptLower.includes('cyberpunk') ||
    promptLower.includes('tech')
  ) {
    return 'futuristic';
  }
  
  if (
    promptLower.includes('minimal') ||
    promptLower.includes('simple') ||
    promptLower.includes('clean')
  ) {
    return 'minimalist';
  }
  
  if (
    promptLower.includes('art') ||
    promptLower.includes('paint') ||
    promptLower.includes('abstract') ||
    promptLower.includes('creative')
  ) {
    return 'artistic';
  }
  
  if (
    promptLower.includes('nature') ||
    promptLower.includes('natural') ||
    promptLower.includes('outdoor') ||
    promptLower.includes('landscape')
  ) {
    return 'natural';
  }
  
  return 'professional';
}

// Helper function to detect caption tone
function detectCaptionTone(prompt: string): keyof typeof captionTemplates {
  const promptLower = prompt.toLowerCase();
  
  if (
    promptLower.includes('profession') ||
    promptLower.includes('business') ||
    promptLower.includes('corporate')
  ) {
    return 'professional';
  }
  
  if (
    promptLower.includes('inspir') ||
    promptLower.includes('motivat') ||
    promptLower.includes('uplift')
  ) {
    return 'inspirational';
  }
  
  return 'casual';
}

// Helper function to detect script style
function detectScriptStyle(prompt: string): keyof typeof scriptTemplates {
  const promptLower = prompt.toLowerCase();
  
  if (
    promptLower.includes('entertain') ||
    promptLower.includes('fun') ||
    promptLower.includes('engaging')
  ) {
    return 'entertaining';
  }
  
  if (
    promptLower.includes('tutorial') ||
    promptLower.includes('how to') ||
    promptLower.includes('guide') ||
    promptLower.includes('step')
  ) {
    return 'tutorial';
  }
  
  return 'informative';
}

// Extract topic from prompt
function extractTopic(prompt: string): string {
  // Remove common instruction words and get the core topic
  const cleaned = prompt
    .replace(/^(write|create|generate|compose|make|draft)\s+(a|an|the)?\s*/i, '')
    .replace(/\s+(post|message|email|content|text|video)\s+(about|on|regarding)?\s*/i, ' ')
    .trim();
  
  // Capitalize first letter and ensure we have meaningful content
  if (!cleaned) {
    return 'Exploring new ideas and opportunities';
  }
  
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

// Helper function to check if input contains a URL
function isURL(input: string): boolean {
  const urlPattern = /https?:\/\/[^\s]+/;
  return urlPattern.test(input);
}

// Extract URL domain or keywords for thumbnail generation
function extractUrlContext(input: string): string {
  // Check if input contains a URL
  const urlMatch = input.match(/https?:\/\/[^\s]+/);
  
  if (urlMatch) {
    const url = urlMatch[0];
    // Extract domain or path keywords
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '');
      const path = urlObj.pathname;
      
      // Combine domain and path keywords
      return `${domain} ${path}`.toLowerCase();
    } catch (e) {
      // If URL parsing fails, use the whole input
      return input.toLowerCase();
    }
  }
  
  // If no URL, use the input as keywords
  return input.toLowerCase();
}

// Progressive text generation with typing effect callback
async function generateTextProgressively(
  text: string,
  onProgress: (partial: string) => void,
  speed: number = 20
): Promise<void> {
  const words = text.split(' ');
  let currentText = '';
  
  for (let i = 0; i < words.length; i++) {
    currentText += (i > 0 ? ' ' : '') + words[i];
    onProgress(currentText);
    
    // Variable delay for more natural typing
    const delay = speed + Math.random() * 10;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

// Main generation functions with live progressive updates
export async function generateVideo(
  prompt: string,
  onProgress?: (progress: number) => void
): Promise<{
  videoUrl: string | null;
  thumbnail: string | null;
  title: string;
  description: string;
  promptCaption: string;
  noMatch?: boolean;
}> {
  // Simulate realistic processing with progress updates
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    if (onProgress) onProgress((i / steps) * 100);
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  
  // Find best match using keyword scoring system
  const match = findBestMatch(videoDatabase, prompt);
  
  // Use the user's prompt as the caption/title
  const promptCaption = extractTopic(prompt);
  
  // If no match found, return error state with helpful suggestions
  if (!match) {
    return {
      videoUrl: null,
      thumbnail: null,
      title: 'No Matching Video Found',
      description: 'We couldn\'t find a video matching your prompt. Please try keywords like: business, tech, nature, lifestyle, or creative.',
      promptCaption: promptCaption,
      noMatch: true,
    };
  }
  
  return {
    videoUrl: match.videoUrl,
    thumbnail: match.thumbnail,
    title: match.title,
    description: match.description,
    promptCaption: promptCaption,
    noMatch: false,
  };
}

export async function generateAvatar(
  prompt: string,
  onProgress?: (progress: number) => void
): Promise<{
  image: string;
  style: string;
}> {
  // Simulate processing with progress updates
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    if (onProgress) onProgress((i / steps) * 100);
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  
  const match = findBestMatch(avatarDatabase, prompt);
  
  // For avatars, use fallback if no match - but vary the selection
  const finalMatch = match || avatarDatabase[Math.floor(Math.random() * avatarDatabase.length)];
  
  return {
    image: finalMatch.image,
    style: finalMatch.style,
  };
}

export async function generatePost(
  prompt: string,
  onProgressText?: (partial: string) => void
): Promise<string> {
  // Initial delay for realism
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const tone = detectTone(prompt);
  const topic = extractTopic(prompt);
  const templateVariations = postTemplates[tone];
  const template = getRandomVariation(templateVariations);
  const fullText = template(topic);
  
  // Generate text progressively with typing effect
  if (onProgressText) {
    await generateTextProgressively(fullText, onProgressText, 15);
  }
  
  return fullText;
}

export async function generateMessage(
  prompt: string,
  onProgressText?: (partial: string) => void
): Promise<string> {
  // Initial delay for realism
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const messageType = detectMessageType(prompt);
  const context = extractTopic(prompt);
  const templateVariations = messageTemplates[messageType];
  const template = getRandomVariation(templateVariations);
  const fullText = template(context);
  
  // Generate text progressively with typing effect
  if (onProgressText) {
    await generateTextProgressively(fullText, onProgressText, 15);
  }
  
  return fullText;
}

export async function generateImagePrompt(
  prompt: string,
  onProgressText?: (partial: string) => void
): Promise<string> {
  // Initial delay for realism
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const style = detectImagePromptStyle(prompt);
  const theme = extractTopic(prompt);
  const templateVariations = imagePromptTemplates[style];
  const template = getRandomVariation(templateVariations);
  const fullText = template(theme);
  
  // Generate text progressively with typing effect
  if (onProgressText) {
    await generateTextProgressively(fullText, onProgressText, 20);
  }
  
  return fullText;
}

export async function generateCaption(
  prompt: string,
  onProgressText?: (partial: string) => void
): Promise<{
  caption: string;
  hashtags: string[];
  tone: string;
}> {
  // Initial delay for realism
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const tone = detectCaptionTone(prompt);
  const keywords = extractTopic(prompt);
  const templateVariations = captionTemplates[tone];
  const template = getRandomVariation(templateVariations);
  const result = template(keywords);
  
  // Generate caption progressively with typing effect
  if (onProgressText) {
    await generateTextProgressively(result.caption, (partial) => {
      onProgressText(partial);
    }, 15);
  }
  
  return result;
}

export async function generateThumbnail(
  prompt: string,
  onProgress?: (progress: number) => void
): Promise<{
  image: string;
  title: string;
  description: string;
  thumbnailText: string;
  hook: string;
  style: string;
}> {
  // Validate input - require topic to be entered
  if (!prompt || prompt.trim().length === 0) {
    throw new Error('Please enter a topic or URL to generate a thumbnail.');
  }

  // Simulate processing with progress updates
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    if (onProgress) onProgress((i / steps) * 100);
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  
  // Check if input is a URL
  const hasURL = isURL(prompt);
  
  // Extract context from URL or prompt
  const context = extractUrlContext(prompt);
  const topic = extractTopic(prompt);
  
  // Detect semantic category for context-aware selection
  const category = detectCategory(context);
  
  // Generate thumbnail text (bolded topic) - use first 3-5 words for better readability
  const words = topic.split(' ');
  const thumbnailText = words.slice(0, Math.min(5, words.length)).join(' ').toUpperCase();
  
  // Select hook and style based on detected category with seed for consistency
  const hookOptions = thumbnailHooksByCategory[category] || thumbnailHooksByCategory.default;
  const styleOptions = thumbnailStylesByCategory[category] || thumbnailStylesByCategory.default;
  
  // Use prompt as seed for consistent results for same input
  const hook = getRandomItem(hookOptions, prompt);
  const style = getRandomItem(styleOptions, prompt);
  
  // Find best matching thumbnail based on keywords and category
  const match = findBestMatch(thumbnailDatabase, context);
  
  // Use matched thumbnail or fallback to category-based selection
  let thumbnail: ThumbnailContext;
  if (match) {
    thumbnail = match;
  } else {
    // Try to find by category
    const categoryMatch = thumbnailDatabase.find(t => t.category === category);
    thumbnail = categoryMatch || thumbnailDatabase[Math.floor(Math.random() * thumbnailDatabase.length)];
  }
  
  // Generate dynamic title and description based on context
  let dynamicTitle: string;
  let dynamicDescription: string;
  
  if (hasURL) {
    dynamicTitle = `${hook} ${topic}`;
    dynamicDescription = `Thumbnail generated from URL with ${style} style. Optimized for ${category} content with maximum engagement and click-through rates.`;
  } else {
    dynamicTitle = `${hook} ${topic}`;
    dynamicDescription = `Thumbnail generated with ${style} style. Perfect for ${category} content to engage your audience with compelling visuals.`;
  }
  
  return {
    image: thumbnail.image,
    title: dynamicTitle,
    description: dynamicDescription,
    thumbnailText: thumbnailText,
    hook: hook,
    style: style,
  };
}

export async function generateScript(
  prompt: string,
  onProgressText?: (partial: string) => void
): Promise<{
  intro: string;
  body: string;
  outro: string;
  topic: string;
}> {
  // Initial delay for realism
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const style = detectScriptStyle(prompt);
  const topic = extractTopic(prompt);
  const templateVariations = scriptTemplates[style];
  const template = getRandomVariation(templateVariations);
  const result = template(topic);
  
  // Generate script sections progressively with typing effect
  if (onProgressText) {
    // Generate intro
    await generateTextProgressively(result.intro, (partial) => {
      onProgressText(JSON.stringify({ intro: partial, body: '', outro: '', topic: result.topic }));
    }, 15);
    
    // Small pause between sections
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Generate body
    await generateTextProgressively(result.body, (partial) => {
      onProgressText(JSON.stringify({ intro: result.intro, body: partial, outro: '', topic: result.topic }));
    }, 15);
    
    // Small pause between sections
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Generate outro
    await generateTextProgressively(result.outro, (partial) => {
      onProgressText(JSON.stringify({ intro: result.intro, body: result.body, outro: partial, topic: result.topic }));
    }, 15);
  }
  
  return result;
}
