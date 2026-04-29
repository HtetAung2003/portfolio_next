'use client';


import Image from "next/image";
import { Button } from "@/components/ui/button"
import {SlideButton} from "@/components/ui/SlideButton";

const Explorebtn = () => {
    return (
        <div >
       <SlideButton name1='Click to Contact' name2='Just Click' onClick={() => console.log('Go')}/>

</div>

    )
}
export default Explorebtn
