import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

export function PrivateRoute(props: RouteProps & { enabled: boolean }): JSX.Element {
    if (!props.enabled) {
        return <Redirect to="/" />;
    }

    return <Route {...props}>{props.children}</Route>;
}