'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useEffect} from "react";
type ThemeColor = {
    label: string;
    name: string;
    color: string;
    dark: string;
};

const ThemeColors:ThemeColor[] =[
    {
        label:'blue',
        name:'blue',
        color:'bg-blue-500',
        dark:'blueD',
    },
    {
        label:'yellow',
        name:'yellow',
        color:'bg-yellow-400',
        dark:'yellowD',
    },
    {
        label:'orange',
        name:'orange',
        color:'bg-orange-400',
        dark:'orangeD',
    },
    {
        label:'red',
        name:'red',
        color:'bg-red-400',
        dark:'redD',
    },

    {
        label:'pink',
        name:'pink',
        color:'bg-pink-500',
        dark:'pinkD',

    },
    {
        label:'green',
        name:'green',
        color:'bg-green-500',
        dark:'greenD',
    },
    {
        label:'violet',
        name:'violet',
        color:'bg-violet-500',
        dark:'violetD',
    },
    {
        label:'slate',
        name:'slate',
        color:'bg-slate-400',
        dark:'slateD',

    }

]
export default  function ThemeToggle() {
    const { theme,setTheme } = useTheme();
    useEffect(() => {

        document.documentElement.classList.remove('light', 'dark', 'blue', 'blueD', 'orange', 'orangeD', 'yellow', 'yellowD', 'red', 'redD', 'pink', 'pinkD', 'green', 'greenD', 'violet', 'violetD', 'slate', 'slateD');


        if (theme) {
            document.documentElement.classList.add(theme);
        }
    }, [theme]);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                    <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                    <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
          <div className={`grid grid-cols-2 w-full`}>
              <DropdownMenuItem className={`col-span-1`} onClick={() => setTheme('light')}>
                  <div className={`grid grid-cols-2 w-full`}>
                      <div className={`rounded-full h-5 w-5 bg-gray-100`}></div>
                      Light
                  </div>
              </DropdownMenuItem>
              <DropdownMenuItem className={`col-span-1`} onClick={() => setTheme('dark')}>
                  <div className={`grid grid-cols-2 w-full`}>
                      <div className={`rounded-full h-5 w-5 bg-gray-900`}></div>
                      Dark
                  </div>
              </DropdownMenuItem>


          </div>
                {ThemeColors.map((color) => (
                    <div key={color.name} className={`grid grid-cols-2 w-full`}>
                        <DropdownMenuItem  onClick={() => setTheme(color.name)}>
                            <div className={`grid grid-cols-2 w-full`}>
                                <div className={`rounded-full h-5 w-5 ${color.color}`}></div>
                                {color.label}
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem  onClick={() => setTheme(color.dark)}>
                            <div className={`grid grid-cols-2 w-full`}>
                                <div className={`rounded-full h-5 w-5 ${color.color}`}></div>
                                {color.label}
                            </div>
                        </DropdownMenuItem>
                    </div>
                ))}
                <DropdownMenuItem className={`col-span-1`} onClick={() => setTheme('system')}>
                    <div className={` w-full flex justify-center`}>

                        System
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}