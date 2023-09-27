import React from "react";
import { createRoot } from 'react-dom/client';
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import Home from "./pages/Home";

// import "./index.css";

 export default function App() {
  return <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <Router>
        <Box sx={{
          minHeight: "100vh",
          width: "90%",
          ml: 3
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </Router>
    </LocalizationProvider>
  </div>
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
