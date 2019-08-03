import './SlideUp.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import { Motion, spring } from 'react-motion';

export interface SlideUpProps {
    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly children: React.ReactNode;
}

const config = { stiffness: 200, damping: 25 };
const toCSS = ({ translateY, opacity, ...rest }): React.CSSProperties => {
    return {
        transform: `translateY(${translateY}px)`,
        opacity: opacity,
        ...rest
    };
};

export function SlideUp(props: SlideUpProps) {
    const { style, className } = props;
    const [canRender, setCanRender] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => setCanRender(true), 250);
    });

    if (!canRender) {
        return null;
    }

    return (
        <Motion
            defaultStyle={{
                translateY: 50,
                opacity: 0
            }}
            style={{
                translateY: spring(0, config),
                opacity: spring(1, config),
            }}
        >
            {
                (value) => (
                    <div
                        className={classNames('motion-slide-up', className)}
                        style={toCSS({
                            translateY: value.translateY,
                            opacity: value.opacity,
                            ...style
                        })}
                    >
                        {props.children}
                    </div>
                )
            }
        </Motion>
    );
}
