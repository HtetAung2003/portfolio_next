'use client';


import Image from "next/image";

const Explorebtn = () => {
    return (
<button type='button' onClick={ () => console.log('clicked')} className='mt-7 px-10 py-4 border   rounded-md  overflow-hidden '>
    <a href='/' className='flex text-center'>   Explore Events
        <Image src='/icons/arrow-down.svg' alt='down-arrow' width={24} height={24} /></a>

    </button>
    )
}
export default Explorebtn
