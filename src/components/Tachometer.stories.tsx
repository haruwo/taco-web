import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tachometer from './Tachometer';

const meta: Meta<typeof Tachometer> = {
    title: 'Components/Tachometer',
    component: Tachometer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        rpm: { control: { type: 'range', min: 0, max: 10000, step: 100 } },
        maxRpm: { control: { type: 'range', min: 5000, max: 15000, step: 1000 } },
        yellowZone: { control: { type: 'range', min: 3000, max: 12000, step: 500 } },
        redZone: { control: { type: 'range', min: 4000, max: 13000, step: 500 } },
        speed: { control: { type: 'range', min: 0, max: 300, step: 5 } },
        gearNumber: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Tachometer>;

export const Default: Story = {
    args: {
        rpm: 3000,
        maxRpm: 8000,
        yellowZone: 7000,
        redZone: 7500,
        speed: 60,
        gearNumber: 3,
    },
};

export const Redlining: Story = {
    args: {
        rpm: 7800,
        maxRpm: 8000,
        yellowZone: 7000,
        redZone: 7500,
        speed: 120,
        gearNumber: 4,
    },
};

export const HighRevLimit: Story = {
    args: {
        rpm: 6000,
        maxRpm: 12000,
        yellowZone: 10000,
        redZone: 11000,
        speed: 80,
        gearNumber: 2,
    },
};

export const LowRPM: Story = {
    args: {
        rpm: 800,
        maxRpm: 8000,
        yellowZone: 7000,
        redZone: 7500,
        speed: 10,
        gearNumber: 1,
    },
};

export const ReverseGear: Story = {
    args: {
        rpm: 2500,
        maxRpm: 8000,
        yellowZone: 7000,
        redZone: 7500,
        speed: 15,
        gearNumber: 'R',
    },
};

// 動的なタコメーターのデモ
const DynamicTachometerDemo = () => {
    const [rpm, setRpm] = useState(1000);
    const [direction, setDirection] = useState(1); // 1: 上昇, -1: 下降

    useEffect(() => {
        const interval = setInterval(() => {
            setRpm(prevRpm => {
                const newRpm = prevRpm + (direction * 50);

                // 方向を変更
                if (newRpm >= 8000) {
                    setDirection(-1);
                    return 8000;
                } else if (newRpm <= 800) {
                    setDirection(1);
                    return 800;
                }

                return newRpm;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [direction]);

    return (
        <Tachometer
            rpm={rpm}
            maxRpm={8000}
            yellowZone={7000}
            redZone={7500}
            speed={Math.round(rpm / 50)}
            gearNumber={3}
        />
    );
};

export const Dynamic: Story = {
    render: () => <DynamicTachometerDemo />
}; 