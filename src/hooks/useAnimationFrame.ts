import React, { useCallback } from "react";

const useAnimationFrame = (callback: (deltaTime: number) => void) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef<number | null>();
    const previousTimeRef = React.useRef<number | null>();

    const animate = useCallback(
        (time: number) => {
            if (previousTimeRef.current != undefined) {
                const deltaTime = time - previousTimeRef.current;
                callback(deltaTime);
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        },
        [callback]
    );

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            requestRef.current && cancelAnimationFrame(requestRef.current);
        };
    }, [callback, animate]);
};

export default useAnimationFrame;
