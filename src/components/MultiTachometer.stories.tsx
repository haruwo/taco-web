import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tachometer from './Tachometer';

const MultiTachometerDemo = () => {
    const gearRatios = [3.587, 2.022, 1.384, 1.000, 0.861, 0.773];
    const speed = 80;

    // 簡易的なRPM計算（実際のアプリではより複雑な計算を使用）
    const calculateRpm = (speed: number, gearRatio: number) => {
        const finalDriveRatio = 3.42;
        const wheelDiameter = 0.65; // メートル
        const rpmFactor = 60 / (Math.PI * wheelDiameter * 3.6);

        return speed * rpmFactor * gearRatio * finalDriveRatio;
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', maxWidth: '700px' }}>
            {gearRatios.map((ratio, index) => {
                const rpm = calculateRpm(speed, ratio);
                return (
                    <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
                        <Tachometer
                            rpm={rpm}
                            maxRpm={8000}
                            yellowZone={7000}
                            redZone={7500}
                            speed={speed}
                            gearNumber={index + 1}
                        />
                    </div>
                );
            })}
        </div>
    );
};

const meta: Meta<typeof MultiTachometerDemo> = {
    title: 'Components/MultiTachometer',
    component: MultiTachometerDemo,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof MultiTachometerDemo>;

export const Default: Story = {}; 