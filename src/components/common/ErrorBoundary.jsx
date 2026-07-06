import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-16 text-center">
          <div className="bg-surface border border-white/10 rounded-2xl p-8 md:p-12 max-w-lg w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            
            <h1 className="text-3xl font-heading font-bold text-white mb-4">
              Something went wrong
            </h1>
            
            <p className="text-gray mb-8">
              We apologize for the inconvenience. An unexpected error occurred while rendering this page.
            </p>

            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-yellow-500 transition-colors w-full sm:w-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
