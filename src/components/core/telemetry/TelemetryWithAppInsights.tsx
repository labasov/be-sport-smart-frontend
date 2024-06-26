import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { ComponentClass, ComponentType } from 'react';

import { reactPlugin } from '../../../services/TelemetryService';

const withApplicationInsights = (component: ComponentType<unknown>, componentName: string): ComponentClass<ComponentType<unknown>, unknown> => withAITracking<typeof component>(reactPlugin, component, componentName);

export default withApplicationInsights;
