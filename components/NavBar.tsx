import Link from "next/link";
import Image from "next/image";


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
                 <Link href='/'>Contact Me</Link>
             </ul>
         </nav>
     </header>
    )
}
export default NavBar
