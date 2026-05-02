# LinguaSpark Design Blueprint ⚡

## 1. Full App Feature List
- **World Explorer Map**: Non-linear learning path through themed "Worlds" (Island, City, Mountains, etc.).
- **Interactive Adventures**: High-energy lessons featuring:
    - Listen & Choose (Audio-visual matching)
    - Sentence Builder (Jumbled words)
    - Speak Practice (AI-powered pronunciation feedback)
    - Speed Match (Rapid word recognition)
    - Quiz Master (Concept verification)
- **AI Buddy (Sparky)**: A real-time conversational AI that acts as a friendly tutor and practice partner.
- **Energy System**: A regenerative resource required to embark on adventures (max 5).
- **Streak Tracker**: Encourages daily consistency with visual "fire" markers.
- **Personalized Onboarding**: Tailors the path based on user goals (Study, Job, Travel) and current level.
- **Confidence Mode**: Dedicated section for fluency practice and real-time verbal feedback.

## 2. App Screen List
- **Landing Screen**: High-impact hero section with primary entry point.
- **Onboarding Flow**: Multi-step goal and level diagnostic.
- **Dashboard (Home)**: Daily goal progress, current streak, and energy status.
- **World Map**: Visual representation of learning stages (Worlds).
- **Adventure View**: The interactive lesson interface.
- **Buddy Chat**: Real-time AI conversation interface.
- **Profile Screen**: User stats, badges, and progress overview.

## 3. User Flow Diagram (Logical)
`Landing` -> `Onboarding` (first time) -> `Dashboard`
`Dashboard` -> `World Map` -> `Adventure` -> `Reward Screen` -> `Dashboard`
`Dashboard` -> `Buddy Chat` -> `Practice` -> `Dashboard`

## 4. UI Component List
- **Bubble**: Interactive soft-bordered cards for selections.
- **SparkButton**: Primary CTA with shadow and scale effects.
- **GlassCard**: Transparent blurred panels for stats.
- **GradientWorld**: Large themed world containers.
- **ChatBubble**: Distinctive stylized messages for AI and User.

## 5. Database Schema (Firestore)
- `/users/{userId}`: 
    - `energy`: Number
    - `streak`: Number
    - `sparkPoints`: Number
    - `learningGoal`: String
- `/users/{userId}/progress/{worldId}`:
    - `completedAdventures`: Array<String>
- `/users/{userId}/chats/{chatId}`:
    - `messages`: Array<{role, text}>

## 6. Gamification Logic
- **Energy Recovery**: 1 energy recovered every 2 hours (simulated). 
- **Spark Points (✨)**: Earned per adventure (10-25 XP). Higher difficulty = more sparks.
- **Streaks (🔥)**: Increments if user completes 1 adventure per 24h window.
- **Badges**: Awarded for milestones (First 50 points, 7-day streak).

## 7. AI Integration Plan
- **Conversation Engine**: Uses `gemini-3-flash-preview` with a custom system prompt ("Sparky" persona).
- **Speech Recognition**: Integrated Web Speech API for real-time STT during Speak Practice.
- **Feedback Loop**: AI analyzes user input for common grammar patterns and provides "Spark Tips" for correction.
