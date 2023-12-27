import React from 'react';
import { Tr } from '@locales/index';
import { runtimeConfig } from '@configs/const';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    error: string | Error;
    errorInfo: { componentStack: string };
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {} as ErrorBoundaryState;
    }

    componentDidCatch(error: ErrorBoundaryState['error'], errorInfo: ErrorBoundaryState['errorInfo']) {
        // Catch errors in any components below and re-render with error message
        this.setState({ error, errorInfo });
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            if (runtimeConfig.debug) {
                return (
                    <div>
                        <h2>
                            <Tr id=/* i18n */ "Something went wrong" />
                        </h2>
                        <details style={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.error?.toString()}
                            <br />
                            {this.state.errorInfo.componentStack}
                        </details>
                    </div>
                );
            }
        }

        // Normally, just render children
        return this.props.children;
    }
}

export default ErrorBoundary;
