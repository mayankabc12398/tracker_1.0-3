const today = new Date().toISOString().split("T")[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split("T")[0];

import DOMComponent from '../pages/Topics/ReactJS/DOM.jsx';
import ImpTopicComponent from '../pages/Topics/ReactJS/ImpTopic.jsx';
import ReactDiffingAlgorithmComponent from '../pages/Topics/ReactJS/ReactDiffingAlgorithm.jsx';
import ReactFiberArchitectureComponent from '../pages/Topics/ReactJS/ReactFiberArchitecture.jsx';
import ReactMemoHooksComponent from '../pages/Topics/ReactJS/ReactMemoHooks.jsx';
import ReactRenderingProcessComponent from '../pages/Topics/ReactJS/ReactRenderingProcess.jsx';
import ReactRerenderStepperComponent from '../pages/Topics/ReactJS/ReactRerenderStepper.jsx';
import ReactuseEffectComponent from '../pages/Topics/ReactJS/ReactuseEffect.jsx';
import ReconciliationComponent from '../pages/Topics/ReactJS/Reconciliation.jsx';
import ConverdTopicComponent from '../pages/Topics/ReactJS/converdTopic.jsx';

import JSEngineInternalsComponent from '../pages/Topics/EngineInternals/JSEngineInternals.jsx';
import BrowserRenderingComponent from '../pages/Topics/EngineInternals/BrowserRendering.jsx';
import ReactInternalsComponent from '../pages/Topics/EngineInternals/ReactInternals.jsx';

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
    id: "react-imp-topic",
    name: "Important React Topics",
    category: "ReactJS",
    difficulty: "Beginner",
    status: "Active",
    updatedAt: today,
    description: "Overview of important React concepts.",
    content: ImpTopicComponent,
  },
  {
    id: "react-diffing",
    name: "React Diffing Algorithm",
    category: "ReactJS",
    difficulty: "Advanced",
    status: "Active",
    updatedAt: today,
    description: "Deep dive into how React computes minimal changes using the Diffing Algorithm.",
    content: ReactDiffingAlgorithmComponent,
  },
  {
    id: "react-fiber",
    name: "React Fiber Architecture",
    category: "ReactJS",
    difficulty: "Advanced",
    status: "Active",
    updatedAt: today,
    description: "Understanding React Fiber: the core reconciliation engine behind React.",
    content: ReactFiberArchitectureComponent,
  },
  {
    id: "react-memo-hooks",
    name: "React Memo and Hooks",
    category: "ReactJS",
    difficulty: "Intermediate",
    status: "Active",
    updatedAt: today,
    description: "Optimizing React components with React.memo and performance hooks like useMemo and useCallback.",
    content: ReactMemoHooksComponent,
  },
  {
    id: "react-rendering",
    name: "React Rendering Process",
    category: "ReactJS",
    difficulty: "Intermediate",
    status: "Active",
    updatedAt: today,
    description: "How React goes from state changes to updating the screen.",
    content: ReactRenderingProcessComponent,
  },
  {
    id: "react-rerender-stepper",
    name: "React Re-render Stepper",
    category: "ReactJS",
    difficulty: "Intermediate",
    status: "Active",
    updatedAt: today,
    description: "Step-by-step breakdown of how and when React triggers re-renders.",
    content: ReactRerenderStepperComponent,
  },
  {
    id: "react-useeffect",
    name: "React useEffect Deep Dive",
    category: "ReactJS",
    difficulty: "Intermediate",
    status: "Active",
    updatedAt: today,
    description: "Mastering side effects in React using the useEffect hook.",
    content: ReactuseEffectComponent,
  },
  {
    id: "react-reconciliation",
    name: "React Reconciliation",
    category: "ReactJS",
    difficulty: "Advanced",
    status: "Active",
    updatedAt: today,
    description: "Understanding the Reconciliation phase and how React synchronizes the UI efficiently.",
    content: ReconciliationComponent,
  },
  {
    id: "react-converd",
    name: "React Covered Topics",
    category: "ReactJS",
    difficulty: "Beginner",
    status: "Active",
    updatedAt: today,
    description: "A summary or additional covered React topics.",
    content: ConverdTopicComponent,
  },
  {
    id: "engine-js-v8",
    name: "JavaScript Engine Internals",
    category: "Engine Internals",
    difficulty: "Advanced",
    status: "Active",
    updatedAt: today,
    description: "How JavaScript goes from human-readable code to machine execution in milliseconds.",
    content: JSEngineInternalsComponent,
  },
  {
    id: "engine-browser-render",
    name: "Browser Rendering Pipeline",
    category: "Engine Internals",
    difficulty: "Advanced",
    status: "Active",
    updatedAt: today,
    description: "The Critical Rendering Path (CRP): How pixels actually get painted to the screen.",
    content: BrowserRenderingComponent,
  },
  {
    id: "engine-react-internals",
    name: "React Internals Foundation",
    category: "Engine Internals",
    difficulty: "Advanced",
    status: "Active",
    updatedAt: today,
    description: "The core architecture: Scheduler, Reconciler, and Renderer.",
    content: ReactInternalsComponent,
  },
];

export const defaultSettings = {
  notifications: true,
  reminderTime: "09:00",
  weekStartsOn: "monday",
};
