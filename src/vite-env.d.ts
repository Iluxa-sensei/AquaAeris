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
            // Support dash-case attributes actually used in markup
            'camera-controls'?: boolean | string;
            'auto-rotate'?: boolean | string;
            'auto-rotate-delay'?: number | string;
            'rotation-per-second'?: string;
            'shadow-intensity'?: number | string;
            'environment-image'?: string;
            'disable-zoom'?: boolean | string;
            'interaction-prompt'?: 'auto' | 'none' | 'when-focused';
            'camera-orbit'?: string;
            'field-of-view'?: string;
            bounds?: 'tight' | 'legacy' | string;
            // Fallback for any other attributes
            [key: string]: any;
        };
    }
}