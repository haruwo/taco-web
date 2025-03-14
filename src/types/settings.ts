export interface Settings {
    modelCode: string;
    description: string;
    gearRatios: {
        first: number;
        second: number;
        third: number;
        fourth: number;
        fifth: number;
        sixth: number;
        seventh: number;
        eighth: number;
        ninth: number;
        reverse: number;
    };
    finalDriveRatio: number;
    tireSize: string;
    yellowZone: number;
    redZone: number;
    maxRpm: number;
    startAngle: number;
    endAngle: number;
    columnsCount: number;
}

export interface PresetInfo {
    modelCode: string;
    description: string;
    url: string;
} 