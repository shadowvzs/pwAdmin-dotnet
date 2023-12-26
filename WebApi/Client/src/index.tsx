import { createRoot } from 'react-dom/client';
import 'reflect-metadata';

import App from '@app/index';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);