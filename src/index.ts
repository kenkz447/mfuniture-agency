import './styles.scss';

import { startup } from './scripts';

const runTheApp = () => {
    const rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'root');
    
    document.body.append(rootElement);

    startup(rootElement);

    if (module.hot) {
        module.hot.accept(['./scripts'], () => {
            const { startup: nextStartup } = require('./scripts');
            nextStartup(rootElement);
        });
    }
};

runTheApp();