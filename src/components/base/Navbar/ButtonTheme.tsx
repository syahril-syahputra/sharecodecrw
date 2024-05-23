'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export const ButtonTheme = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <span
            className="cursor-pointer rounded-md px-2 py-0 hover:bg-slate-400 active:bg-slate-600"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? <Moon /> : <Sun />}
        </span>
        // <button
        //     className={` right-5 top-2 w-fit rounded-md bg-slate-200 p-2 duration-200 hover:scale-110 active:scale-100 dark:bg-[#212933]`}
        //     onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        // >
        //     <Button>
        //         <HiShoppingCart className="mr-2 h-5 w-5" />
        //         <p>Buy now</p>
        //     </Button>
        //     {theme === 'light' ? 'Dark' : 'Light'}
        // </button>
    );
};
