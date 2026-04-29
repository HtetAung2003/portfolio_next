import React from 'react'
import Explorebtn from "@/components/Explorebtn";
import {AnimatedGrid} from "@/components/ui/AnimatedGrid";
import Experience from "@/components/Experience";

const Page = () => {
    return (
        <>
            {/*for title and animate grid*/}
            <div className="relative  w-full">
        <AnimatedGrid  className="z-0" />
            <div className="absolute inset-0 flex  font-bold  z-10 pointer-events-none dark:text-white ">
                {/* Your content here */}
                <div className="absolute inset-0 flex items-center justify-center">
                <h1 >
                    Bringing Ideas to Life  Through Modern Web Dev
                </h1>
                </div>
            </div>
            </div>
            {/*sub title and btn*/}
            <div className="mt-10 flex w-full flex-col items-center justify-center gap-5 p-1 text-center sm:flex-row sm:text-left">
                <Explorebtn />

                <p className="w-full text-base sm:flex-1 sm:text-lg sm:ml-6">
                    CS Graduate & React Developer with 1 year of work  experience as a junior.
                    Exploring the best of hackathons, meetups, and conferences—all in one place.
                </p>
            </div>

            <Experience/>

</>

    )
}
export default Page
