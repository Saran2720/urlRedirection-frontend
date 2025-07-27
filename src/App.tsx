
import { toast } from 'react-toastify';

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useTheme } from './contexts/ThemeContext'; 

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <InnerApp /> 
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const InnerApp = () => {
  const { theme } = useTheme(); // ✅ Safe to use here

  return (
    <TooltipProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"} // ✅ Works!
         toastClassName={() =>
    `relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer 
     ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`
  }
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};



export default App;
