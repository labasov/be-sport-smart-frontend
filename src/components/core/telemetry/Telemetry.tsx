import { FC, PropsWithChildren, ReactElement, useEffect } from 'react';

import { getApplicationInsights, reactPlugin } from '../../../services/TelemetryService';

import { TelemetryProvider } from './TelemetryContext';

type TelemetryProps = PropsWithChildren<unknown>;

const Telemetry: FC<TelemetryProps> = (props: TelemetryProps): ReactElement => {

    useEffect(() => {
        getApplicationInsights();
    }, []);

    return (
        <TelemetryProvider value={reactPlugin}>
            {props.children}
        </TelemetryProvider>
    );
}

export default Telemetry;
