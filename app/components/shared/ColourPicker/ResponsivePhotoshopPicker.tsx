'use client';

import React, { useState } from 'react';
import { CustomPicker, InjectedColorProps } from 'react-color';
// @ts-expect-error - internal react-color components not typed
import { Saturation, Hue, EditableInput } from 'react-color/lib/components/common';

// pointer components
const SaturationPointer = () => (
    <div style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        border: '2px solid #fff',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.3)',
        transform: 'translate(-6px, -6px)',
    }} />
);

const HuePointer = () => (
    <div style={{
        width: '100%',
        height: '8px',
        borderRadius: '2px',
        border: '2px solid #fff',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.3)',
        transform: 'translateY(-4px)',
    }} />
);

const HuePointerHorizontal = () => (
    <div style={{
        width: '8px',
        height: '100%',
        borderRadius: '2px',
        border: '2px solid #fff',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.3)',
        transform: 'translateX(-4px)',
    }} />
);

type Props = InjectedColorProps & {
    currentColor?: string;
    onAccept?: () => void;
    onCancel?: () => void;
    header?: string;
};

const inputStyles = {
    input: {
        width: '40px',
        fontSize: '12px',
        padding: '4px',
        border: '1px solid #B3B3B3',
        borderRadius: '2px',
        textAlign: 'center' as const,
    },
    label: {
        fontSize: '12px',
        color: '#4D4D4D',
        marginRight: '4px',
    },
};

function ResponsivePhotoshopPickerComponent({
    hsl,
    hsv,
    rgb,
    hex,
    onChange,
    currentColor,
    header = 'Colour Picker'
}: Props) {
    /**  Customised photoshop picker from react-color library, with tailwind mobile responsiveness */
    const [initialColor] = useState(currentColor ?? hex);

    return (
        <div className="bg-[#DCDCDC] rounded shadow-lg w-full max-w-[513px]">
            {/* header */}
            <div
                className="h-6 leading-6 text-center text-sm text-[#4D4D4D] border-b border-[#B1B1B1] rounded-t"
                style={{
                    backgroundImage: 'linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%)',
                    boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02)'
                }}
            >
                {header}
            </div>

            {/* body */}
            <div className="p-3 md:p-4">
                {/* main pickers row */}
                <div className="flex flex-col md:flex-row gap-3">
                    {/* saturation square */}
                    <div
                        className="relative w-full aspect-square max-w-[200px] md:max-w-[256px] md:w-[256px] md:h-[256px] border-2 border-[#B3B3B3] border-b-[#F0F0F0] overflow-hidden"
                    >
                        <Saturation
                            hsl={hsl}
                            hsv={hsv}
                            pointer={SaturationPointer}
                            onChange={onChange}
                        />
                    </div>

                    {/* hue slider - horizontal on mobile */}
                    <div className="md:hidden relative w-full h-4 border-2 border-[#B3B3B3] border-b-[#F0F0F0]">
                        <Hue
                            hsl={hsl}
                            direction="horizontal"
                            pointer={HuePointerHorizontal}
                            onChange={onChange}
                        />
                    </div>

                    {/* hue slider - vertical on desktop */}
                    <div className="hidden md:block relative w-[19px] h-[256px] border-2 border-[#B3B3B3] border-b-[#F0F0F0]">
                        <Hue
                            hsl={hsl}
                            direction="vertical"
                            pointer={HuePointer}
                            onChange={onChange}
                        />
                    </div>

                    {/* controls - previews and fields */}
                    <div className="flex flex-row md:flex-col gap-3 md:w-[180px]">
                        {/* colour previews */}
                        <div className="flex flex-row md:flex-col gap-1">
                            <div>
                                <div className="text-xs text-[#4D4D4D] mb-1">new</div>
                                <div
                                    className="w-16 h-8 md:h-12 border border-[#B3B3B3]"
                                    style={{ backgroundColor: hex }}
                                />
                            </div>
                            <div>
                                <div className="text-xs text-[#4D4D4D] mb-1">current</div>
                                <div
                                    className="w-16 h-8 md:h-12 border border-[#B3B3B3]"
                                    style={{ backgroundColor: initialColor }}
                                />
                            </div>
                        </div>

                        {/* RGB/HSV fields - collapsible on mobile */}
                        <details className="md:hidden">
                            <summary className="text-xs text-[#4D4D4D] cursor-pointer py-1">
                                RGB Values
                            </summary>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <div className="flex items-center gap-1">
                                    <span style={inputStyles.label}>R</span>
                                    <EditableInput
                                        style={{ input: inputStyles.input }}
                                        label=""
                                        value={rgb?.r}
                                        onChange={(data: { r?: number }) => data.r !== undefined && onChange?.({ r: data.r, g: rgb?.g, b: rgb?.b }, null)}
                                    />
                                </div>
                                <div className="flex items-center gap-1">
                                    <span style={inputStyles.label}>G</span>
                                    <EditableInput
                                        style={{ input: inputStyles.input }}
                                        label=""
                                        value={rgb?.g}
                                        onChange={(data: { g?: number }) => data.g !== undefined && onChange?.({ r: rgb?.r, g: data.g, b: rgb?.b }, null)}
                                    />
                                </div>
                                <div className="flex items-center gap-1">
                                    <span style={inputStyles.label}>B</span>
                                    <EditableInput
                                        style={{ input: inputStyles.input }}
                                        label=""
                                        value={rgb?.b}
                                        onChange={(data: { b?: number }) => data.b !== undefined && onChange?.({ r: rgb?.r, g: rgb?.g, b: data.b }, null)}
                                    />
                                </div>
                            </div>
                        </details>

                        {/* desktop fields - always visible */}
                        <div className="hidden md:block space-y-2">
                            <div className="flex items-center gap-1">
                                <span style={inputStyles.label}>R</span>
                                <EditableInput
                                    style={{ input: inputStyles.input }}
                                    label=""
                                    value={rgb?.r}
                                    onChange={(data: { r?: number }) => data.r !== undefined && onChange?.({ r: data.r, g: rgb?.g, b: rgb?.b }, null)}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <span style={inputStyles.label}>G</span>
                                <EditableInput
                                    style={{ input: inputStyles.input }}
                                    label=""
                                    value={rgb?.g}
                                    onChange={(data: { g?: number }) => data.g !== undefined && onChange?.({ r: rgb?.r, g: data.g, b: rgb?.b }, null)}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <span style={inputStyles.label}>B</span>
                                <EditableInput
                                    style={{ input: inputStyles.input }}
                                    label=""
                                    value={rgb?.b}
                                    onChange={(data: { b?: number }) => data.b !== undefined && onChange?.({ r: rgb?.r, g: rgb?.g, b: data.b }, null)}
                                />
                            </div>
                            <div className="flex items-center gap-1 mt-3">
                                <span style={inputStyles.label}>#</span>
                                <EditableInput
                                    style={{ input: { ...inputStyles.input, width: '60px' } }}
                                    label=""
                                    value={hex?.replace('#', '')}
                                    onChange={(data: { hex?: string }) => data.hex !== undefined && onChange?.({ hex: data.hex }, null)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomPicker(ResponsivePhotoshopPickerComponent);
