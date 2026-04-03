

import OverallWorkingFlowofJavaScriptComponent from '../pages/Topics/Javascript/OverallWorkingFlowofJavaScript.jsx';
import JavascriptBasic from '../pages/Topics/Javascript/JavascriptBasic.jsx'
import JavascriptAdvanced from '../pages/Topics/Javascript/JavascriptAdvanced.jsx'
import JavaScriptEngine from '../pages/Topics/Javascript/JavaScriptEngine.jsx'
import LexicalEnvironment from '../pages/Topics/Javascript/LexicalEnvironment.jsx'
import HoistinginJavaScript from '../pages/Topics/Javascript/HoistinginJavaScript.jsx'

const today = new Date().toISOString().split("T")[0];

export const javascriptData = [
    {
        id: "overall-working-flow-of-javascript",
        name: "Overall Working Flow of JavaScript",
        category: "JavaScript",
        difficulty: "Beginner",
        status: "Active",
        updatedAt: today,
        description: "Overall Working Flow of JavaScript",
        content: OverallWorkingFlowofJavaScriptComponent,
    },
    {
        id: "javascript-basic",
        name: "Javascript Basic",
        category: "JavaScript",
        difficulty: "Beginner",
        status: "Active",
        updatedAt: today,
        description: "Javascript Basic",
        content: JavascriptBasic,
    },
    {
        id: "javascript-advance",
        name: "Javascript Advance",
        category: "JavaScript",
        difficulty: "Advance",
        status: "Active",
        updatedAt: today,
        description: "Javascript Advance",
        content: JavascriptAdvanced,
    },
    {
        id: "javascript-engine",
        name: "JavaScript Engine",
        category: "JavaScript Engine",
        difficulty: "Advance",
        status: "Active",
        updatedAt: today,
        description: "JavaScript Engine",
        content: JavaScriptEngine,
    },
    {
        id: "lexical-environment",
        name: "Lexical Environment",
        category: "JavaScript",
        difficulty: "Advance",
        status: "Active",
        updatedAt: today,
        description: "Lexical Environment",
        content: LexicalEnvironment,
    },
    {
        id: "hoisting-in-javascript",
        name: "Hoisting in JavaScript",
        category: "JavaScript",
        difficulty: "Advance",
        status: "Active",
        updatedAt: today,
        description: "Hoisting in JavaScript",
        content: HoistinginJavaScript,
    },
];