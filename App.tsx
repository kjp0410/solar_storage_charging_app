import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Me from './pages/Me';
import StationOverview from './pages/StationOverview';
import StationAlarms from './pages/StationAlarms';
import StationAnalysis from './pages/StationAnalysis';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<Me />} />
        <Route path="/station/:id/overview" element={<StationOverview />} />
        <Route path="/station/:id/alarms" element={<StationAlarms />} />
        <Route path="/station/:id/analysis" element={<StationAnalysis />} />
        {/* Redirect unknown station routes to overview */}
        <Route path="/station/:id" element={<Navigate to="overview" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
