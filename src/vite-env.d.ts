/// <reference types="vite/client" />

declare namespace JSX {
    interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            src?: string;
            poster?: string;
            alt?: string;
            ar?: boolean | string;
            autoplay?: boolean | string;
            cameraControls?: boolean | string;
            autoRotate?: boolean | string;
            autoRotateDelay?: number | string;
            rotationPerSecond?: string;
            exposure?: number | string;
            environmentImage?: string;
            shadowIntensity?: number | string;
            disableZoom?: boolean | string;
            interactionPrompt?: 'auto' | 'none' | 'when-focused';
        };
    }
}