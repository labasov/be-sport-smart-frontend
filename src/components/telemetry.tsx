import { FC, PropsWithChildren, ReactElement, useEffect } from 'react';
import { TelemetryProvider } from './TelemetryContext';
import { getApplicationInsights, reactPlugin } from '../services/TelemetryService';

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
