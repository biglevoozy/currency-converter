import { createRoot } from 'react-dom/client';

import Home from './components/home/Home';

import './assets/styles/global.css';
import './assets/styles/reset.css';

createRoot(document.getElementById('root')!).render(<Home />);
