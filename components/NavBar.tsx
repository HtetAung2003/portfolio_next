"use client";

import Link from "next/link";

import { openContactModal } from "@/components/contactBus";


const NavBar = () => {
    return (
     <header>
         <nav>
             <Link href='/' className='logo'>

                 <p>Portfolio</p>
             </Link>
             <ul>
                 <Link href='/'>Home</Link>
                 <Link href='/'>Work Experience</Link>
                 <Link href='/'>Project</Link>
                 <button
                     type="button"
                     onClick={openContactModal}
                     className="cursor-pointer text-left transition hover:text-primary"
                 >
                     Contact Me
                 </button>
             </ul>
         </nav>
     </header>
    )
}
export default NavBar
