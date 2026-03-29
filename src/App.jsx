import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Settings from "./pages/Settings";
import Topics from "./pages/Topics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="habits" element={<Habits />} />
        <Route path="settings" element={<Settings />} />
        <Route path="topics" element={<Topics />} />
      </Route>
    </Routes>
  );
}

export default App;
