const today = new Date().toISOString().split("T")[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split("T")[0];

import DOMComponent from '../pages/Topics/ReactJS/DOM.jsx';

export const seedHabits = [
  {
    id: "1",
    name: "Morning Meditation",
    category: "Wellness",
    frequency: "daily",
    color: "#8b5cf6",
    icon: "brain",
    completedToday: true,
    streak: 12,
    completedDates: [today, yesterday, twoDaysAgo],
    createdAt: "2024-01-15T08:00:00.000Z",
  },
  {
    id: "2",
    name: "Read 30 Minutes",
    category: "Learning",
    frequency: "daily",
    color: "#3b82f6",
    icon: "book-open",
    completedToday: false,
    streak: 8,
    completedDates: [yesterday, twoDaysAgo],
    createdAt: "2024-01-20T09:00:00.000Z",
  },
  {
    id: "3",
    name: "Exercise",
    category: "Fitness",
    frequency: "daily",
    color: "#10b981",
    icon: "dumbbell",
    completedToday: true,
    streak: 15,
    completedDates: [today, yesterday, twoDaysAgo],
    createdAt: "2024-01-10T07:00:00.000Z",
  },
  {
    id: "4",
    name: "Drink 8 Glasses of Water",
    category: "Health",
    frequency: "daily",
    color: "#06b6d4",
    icon: "droplet",
    completedToday: true,
    streak: 20,
    completedDates: [today, yesterday, twoDaysAgo],
    createdAt: "2024-01-05T06:00:00.000Z",
  },
  {
    id: "5",
    name: "Practice Coding",
    category: "Learning",
    frequency: "daily",
    color: "#f59e0b",
    icon: "code",
    completedToday: false,
    streak: 5,
    completedDates: [yesterday],
    createdAt: "2024-02-01T10:00:00.000Z",
  },
  {
    id: "6",
    name: "Weekly Review",
    category: "Productivity",
    frequency: "weekly",
    color: "#ec4899",
    icon: "clipboard-check",
    completedToday: false,
    streak: 4,
    completedDates: [],
    createdAt: "2024-01-25T11:00:00.000Z",
  },
];

export const seedTopics = [
  {
    id: "react-dom",
    name: "Real DOM & Virtual DOM",
    category: "ReactJS",
    difficulty: "Beginner",
    status: "Active",
    updatedAt: today,
    description: "Understanding the difference between Real DOM and Virtual DOM in React.",
    content: DOMComponent,
  },
  {
    id: "1",
    name: "Building Consistent Habits",
    category: "Self Improvement",
    difficulty: "Beginner",
    status: "Active",
    updatedAt: "2024-03-15",
    description: "Learn the fundamentals of habit formation and consistency.",
    content: `Building consistent habits is the foundation of personal growth and success. This guide covers the essential principles of habit formation, including the habit loop (cue, routine, reward), the importance of starting small, and strategies for maintaining consistency over time.

Key Principles:
1. Start with tiny habits that take less than 2 minutes
2. Stack new habits onto existing routines
3. Design your environment for success
4. Track your progress visually
5. Never miss twice in a row

The science shows that it takes an average of 66 days to form a new habit. During this period, consistency is more important than intensity. Focus on showing up every day, even if just for a few minutes.

Remember: Habits are the compound interest of self-improvement. Small, daily improvements lead to remarkable long-term results.`,
  },
  {
    id: "2",
    name: "The Science of Habit Loops",
    category: "Psychology",
    difficulty: "Intermediate",
    status: "Active",
    updatedAt: "2024-03-12",
    description: "Understanding the neurological patterns behind habits.",
    content: `The habit loop is a neurological pattern that governs any habit. Understanding this loop is crucial for both building good habits and breaking bad ones.

The Three Components:
1. CUE: The trigger that initiates the behavior
2. ROUTINE: The behavior itself
3. REWARD: The benefit you gain from the behavior

Neurologically, habits are stored in the basal ganglia, a part of the brain associated with emotions, patterns, and memories. When a behavior becomes habitual, the prefrontal cortex (responsible for decision-making) is less active, making the behavior automatic.

To change a habit:
- Keep the same cue and reward
- Change only the routine
- This is called the Golden Rule of Habit Change

Advanced techniques include implementation intentions ("When X happens, I will do Y") and temptation bundling (pairing something you need to do with something you want to do).`,
  },
  {
    id: "3",
    name: "Habit Stacking Techniques",
    category: "Productivity",
    difficulty: "Beginner",
    status: "Active",
    updatedAt: "2024-03-10",
    description: "Link new habits to existing routines for better success.",
    content: `Habit stacking is one of the most effective strategies for building new habits. The concept is simple: link a new habit to an existing one.

The Formula:
"After I [CURRENT HABIT], I will [NEW HABIT]."

Examples:
- After I pour my morning coffee, I will meditate for one minute
- After I sit down at my desk, I will write my top 3 priorities
- After I finish dinner, I will read for 20 minutes

Why It Works:
Your current habits are already wired into your brain. By connecting a new behavior to an existing one, you leverage the neural pathways that already exist.

Building a Stack:
You can chain multiple habits together:
1. After I wake up, I will make my bed
2. After I make my bed, I will do 10 pushups
3. After I do pushups, I will take a shower

Tips for Success:
- Choose a cue that happens at the same time daily
- Be specific about the time and location
- Start with small habits before building complex stacks`,
  },
  {
    id: "4",
    name: "Breaking Bad Habits",
    category: "Self Improvement",
    difficulty: "Advanced",
    status: "Active",
    updatedAt: "2024-03-08",
    description: "Strategies for eliminating unwanted behaviors.",
    content: `Breaking bad habits requires a different approach than building good ones. You must address the root cause while making the behavior harder to perform.

The Four Laws of Behavior Change (Inverted):
1. Make it INVISIBLE (remove cues)
2. Make it UNATTRACTIVE (reframe mindset)
3. Make it DIFFICULT (increase friction)
4. Make it UNSATISFYING (add accountability)

Practical Strategies:

Remove Triggers:
- Delete apps that waste your time
- Keep unhealthy food out of the house
- Change your environment

Find Substitutes:
- Replace the bad habit with a healthier one that provides similar rewards
- If you stress eat, try stress walking instead

Use Commitment Devices:
- Tell others about your goal
- Create financial stakes
- Use apps that block distracting websites

Understand Your Triggers:
Common triggers include stress, boredom, social situations, and certain locations. Identify your triggers and plan alternative responses.

Remember: You don't eliminate bad habits; you replace them. Every behavior serves a purpose—find healthier ways to meet those needs.`,
  },
  {
    id: "5",
    name: "Morning Routine Mastery",
    category: "Productivity",
    difficulty: "Intermediate",
    status: "Active",
    updatedAt: "2024-03-05",
    description: "Design a powerful morning routine for peak performance.",
    content: `Your morning routine sets the tone for the entire day. A well-designed morning routine can increase productivity, reduce stress, and improve overall well-being.

Core Components:

1. Wake Up Consistently
   - Same time every day (including weekends)
   - Avoid hitting snooze
   - Get natural light within 30 minutes

2. Hydrate First
   - Drink water before coffee
   - Your body is dehydrated after sleep
   - Add lemon for additional benefits

3. Move Your Body
   - Even 10 minutes makes a difference
   - Increases energy and alertness
   - Options: stretching, yoga, walking, full workout

4. Mindfulness Practice
   - Meditation or journaling
   - Sets a calm, focused mindset
   - Start with just 5 minutes

5. Plan Your Day
   - Review calendar and tasks
   - Identify top 3 priorities
   - Time block important work

Sample Routine (60 minutes):
- 6:00 - Wake up, drink water
- 6:10 - Light stretching
- 6:20 - Meditation
- 6:35 - Shower and get ready
- 6:50 - Healthy breakfast
- 7:00 - Review daily plan

Customize your routine based on your goals and lifestyle. The best routine is one you can stick to consistently.`,
  },
  {
    id: "6",
    name: "Tracking and Measuring Progress",
    category: "Analytics",
    difficulty: "Beginner",
    status: "Active",
    updatedAt: "2024-03-01",
    description: "How to effectively track habits and measure improvement.",
    content: `What gets measured gets managed. Tracking your habits provides motivation, accountability, and valuable insights into your behavior patterns.

Benefits of Habit Tracking:
1. Creates visual proof of progress
2. Motivates you to maintain streaks
3. Reveals patterns in your behavior
4. Provides accountability

Tracking Methods:

Paper-Based:
- Bullet journal
- Calendar marking
- Habit tracker printables

Digital:
- Habit tracking apps
- Spreadsheets
- Calendar apps

What to Track:
- Completion (yes/no)
- Quality or intensity
- Time spent
- Related metrics (mood, energy)

Best Practices:
1. Track immediately after completing the habit
2. Keep it simple—don't track too many habits
3. Review weekly to identify patterns
4. Celebrate milestones

The Two-Day Rule:
Never miss twice in a row. Missing once is human; missing twice starts a new (bad) habit. If you miss one day, make it your mission to get back on track the next day.

Metrics That Matter:
- Completion rate (%)
- Longest streak
- Total days completed
- Consistency over time`,
  },
];

export const defaultSettings = {
  notifications: true,
  reminderTime: "09:00",
  weekStartsOn: "monday",
};
