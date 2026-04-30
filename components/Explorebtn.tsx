'use client';

import {SlideButton} from "@/components/ui/SlideButton";
import { openContactModal } from "@/components/contactBus";

const Explorebtn = () => {
    return (
        <div >
       <SlideButton name1='Click to Contact' name2='Just Click' onClick={openContactModal}/>

</div>

    )
}
export default Explorebtn
