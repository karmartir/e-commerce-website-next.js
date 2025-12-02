'use client';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';

// Static target date (replace with desire date!)
const TARGET_DATE = new Date('2028-01-01T00:00:00');

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

const calculateTimeRemaining = (targetDate: Date) => {
    const now = new Date().getTime();
    const diff = Math.max(targetDate.getTime() - now, 0);

    const days = Math.floor(diff / MS_PER_DAY);
    const hours = Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR);
    const minutes = Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE);
    const seconds = Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND);

    return { days, hours, minutes, seconds };
};

const DealCountdown = () => {
    const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>()

    useEffect(() => {
        setTime(calculateTimeRemaining(TARGET_DATE));
    
        const timer = setInterval(() => {
            const newTime = calculateTimeRemaining(TARGET_DATE);
            setTime(newTime);
    
            if (
                newTime.days === 0 &&
                newTime.hours === 0 &&
                newTime.minutes === 0 &&
                newTime.seconds === 0
            ) {
                clearInterval(timer);
            }
        }, 1000);
    
        return () => clearInterval(timer); // cleanup on unmount
    }, []);
    if(!time){
       return <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
        <h3 className="text-3xl font-bold">Loading Countdown...</h3>
        </div>
        </section>
    }

    if(time.days === 0 &&
        time.hours === 0 &&
        time.minutes === 0 &&
        time.seconds === 0) {
            return (
            <section className="grid grid-cols-1 md:grid-cols-2 my-20">
                <div className="flex flex-col gap-2 justify-center">
                <h3 className="text-3xl font-bold">Deal Has Ended</h3>
                <p className="text-lg text-gray-600">
                    This deal is no longer available. Check out our latest promotions!
                </p>
               
                <div className="text-center mt-6 sm:mt-4">
                    <Button asChild >
                        <Link href='/search'>
                        View Product
                        </Link>
                    </Button>    
                </div>
                </div>
                <div className="flex justify-center">
                    <Image className='rounded-lg' src='/images/promo.jpg' alt='promotion image' width={300} height={200} />
                </div>
              </section>
             ); 
    }

    return (
    <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
        <h3 className="text-3xl font-bold">Special Offer Countdown</h3>
        <p className="text-lg text-gray-600">
            Don’t miss out on our limited-time special offers! Check back soon to take advantage of our exciting deals before they end.
        </p>
        <ul className="grid grid-cols-4 gap-4 text-center mt-4">
            <StatBox value={time.days} label="Days" />
            <StatBox value={time.hours} label="Hours" />
            <StatBox value={time.minutes} label="Minutes" />
            <StatBox value={time.seconds} label="Seconds" />
        </ul>
        <div className="text-center mt-6 sm:mt-4">
            <Button asChild >
                <Link href='/search'>
                View Product
                </Link>
            </Button>    
        </div>
        </div>
        <div className="flex justify-center">
            <Image className='rounded-lg' src='/images/promo.jpg' alt='promotion image' width={300} height={200} />
        </div>
      </section>
     );
}
const StatBox = ({value, label}: {value: number; label: string; }) => (
    <li className='p-4 w-full text-center flex flex-col items-center justify-center'>
        <p className="text-3xl font-bold w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-md">
            {String(value).padStart(2, '0')}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
    </li>
)
 
export default DealCountdown;