"use client"
import { useMemo } from 'react';


export default function GroupAvatar({ images, className = '', size = 'md' }) {
    const dimensions = useMemo(() => {
        if (typeof size === 'number') {
            return {
                container: size,
                image: size,
                half: size / 2,
                quarter: size / 2
            };
        }

        const sizes = {
            sm: { container: 40, image: 40, half: 20, quarter: 20 },
            md: { container: 64, image: 64, half: 32, quarter: 32 },
            lg: { container: 80, image: 80, half: 40, quarter: 40 },
            xl: { container: 96, image: 96, half: 48, quarter: 48 }
        };

        return sizes[size] || sizes.md;
    }, [size]);

    const imageCount = Math.min(images.length, 4);
    const img = images.slice(0, imageCount);

    // Base styles
    const containerStyle = {
        width: dimensions.container,
        height: dimensions.container,
    };

    const fullImageStyle = {
        width: dimensions.image,
        height: dimensions.image,
    };

    const halfWidthStyle = {
        width: '50%',
        height: dimensions.image,
    };

    const halfHeightStyle = {
        width: '100%',
        height: '50%',
    };

    const quarterStyle = {
        width: '50%',
        height: '50%',
    };

    return (
        <div
            className={`overflow-hidden rounded-xl bg-neutral-200 flex flex-wrap ${className}`}
            style={containerStyle}
        >
            {imageCount === 1 && (
                <img
                    src={img[0]}
                    alt="Avatar"
                    className="object-cover"
                    style={fullImageStyle}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            )}

            {imageCount === 2 && (
                <>
                    <img
                        src={img[0]}
                        alt="Avatar 1"
                        className="object-cover"
                        style={halfWidthStyle}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    <img
                        src={img[1]}
                        alt="Avatar 2"
                        className="object-cover"
                        style={halfWidthStyle}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </>
            )}

            {imageCount === 3 && (
                <>
                    <div className="flex w-full h-1/2">
                        <img
                            src={img[0]}
                            alt="Avatar 1"
                            className="object-cover w-1/2 h-full"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <img
                            src={img[1]}
                            alt="Avatar 2"
                            className="object-cover w-1/2 h-full"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                    <img
                        src={img[2]}
                        alt="Avatar 3"
                        className="object-cover w-full h-1/2"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </>
            )}

            {imageCount === 4 && (
                <>
                    <div className="flex w-full h-1/2">
                        <img
                            src={img[0]}
                            alt="Avatar 1"
                            className="object-cover w-1/2 h-full"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <img
                            src={img[1]}
                            alt="Avatar 2"
                            className="object-cover w-1/2 h-full"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                    <div className="flex w-full h-1/2">
                        <img
                            src={img[2]}
                            alt="Avatar 3"
                            className="object-cover w-1/2 h-full"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <img
                            src={img[3]}
                            alt="Avatar 4"
                            className="object-cover w-1/2 h-full"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}