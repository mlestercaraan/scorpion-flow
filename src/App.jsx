import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blueprint from '@/pages/Blueprint';
import { SessionProvider } from '@/lib/SessionContext';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-7xl font-light text-slate-300">404</h1>
        <p className="text-slate-600">This page could not be found.</p>
        <button
          onClick={() => (window.location.href = '/')}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          Go home
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <SessionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Blueprint />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default App;
