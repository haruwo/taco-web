'use client';

import { Suspense } from 'react';
import GearRatioForm from '@/components/GearRatioForm';

export default function Home() {
    return (
        <main className="min-h-screen py-8">
            <Suspense fallback={<div>Loading...</div>}>
                <GearRatioForm />
            </Suspense>
        </main>
    );
} 