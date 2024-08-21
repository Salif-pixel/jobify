'use client';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import { useQuery } from '@tanstack/react-query';
import { getChartsDataAction } from '@/utils/actions';
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
function ChartsContainer() {
    const { data, isPending } = useQuery({
        queryKey: ['charts'],
        queryFn: () => getChartsDataAction(),
    });
    const { theme } = useTheme();
    const [primaryColor, setPrimaryColor] = useState('');


    useEffect(() => {
        const color = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary')
            .trim();

        console.log('Extracted color:', color); // Vérifiez la valeur extraite

        // Fonction pour convertir HSL à RGB
        function hslToRgb(h, s, l) {
            h = h % 360; // Assurez-vous que la teinte est dans la plage de 0 à 360
            s /= 100;
            l /= 100;
            let c = (1 - Math.abs(2 * l - 1)) * s;
            let x = c * (1 - Math.abs((h / 60) % 2 - 1));
            let m = l - c / 2;
            let r, g, b;
            if (0 <= h && h < 60) {
                r = c; g = x; b = 0;
            } else if (60 <= h && h < 120) {
                r = x; g = c; b = 0;
            } else if (120 <= h && h < 180) {
                r = 0; g = c; b = x;
            } else if (180 <= h && h < 240) {
                r = 0; g = x; b = c;
            } else if (240 <= h && h < 300) {
                r = x; g = 0; b = c;
            } else if (300 <= h && h < 360) {
                r = c; g = 0; b = x;
            }
            r = Math.round((r + m) * 255);
            g = Math.round((g + m) * 255);
            b = Math.round((b + m) * 255);
            return `rgb(${r}, ${g}, ${b})`;
        }

        // Fonction pour convertir RGB à Hex
        function rgbToHex(r, g, b) {
            return `#${[r, g, b].map(x => {
                const hex = Math.round(x).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }).join('')}`;
        }

        // Fonction pour analyser la couleur HSL
        function parseHslColor(color) {
            const [h, s, l] = color.split(' ').map(val => parseFloat(val.trim()));
            const rgb = hslToRgb(h, s, l);
            const [r, g, b] = rgb.match(/\d+/g).map(Number);
            return rgbToHex(r, g, b);
        }

        // Analyser et définir la couleur primaire
        const hexColor = parseHslColor(color);
        setPrimaryColor(hexColor);
        console.log('Processed hex color:', hexColor);
    }, [theme]);

    if (isPending) return <h2 className='text-xl font-medium'>Please wait...</h2>;
    if (!data || data.length < 1) return null;
    return (
        <section className='mt-16'>
            <h1 className='text-4xl font-semibold text-center'>
                Monthly Applications
            </h1>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data} margin={{ top: 50 }}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey='count' fill={primaryColor} className={`bg-primary`} barSize={75} />
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
}
export default ChartsContainer;