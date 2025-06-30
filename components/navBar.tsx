import Link from "next/link"


export default function NavBar(){
    return (
        <div className="w-screen px-20 h-20 flex items-center justify-between text-xl">
            <div className="text-3xl"><Link href = "/">Blog</Link></div>
            <div className=""></div>
            <div className="flex gap-10 justify-between">
                <div><Link href= "/">Home</Link></div>
                <div><Link href = "/posts">Explore</Link></div>
            </div>
            <div className=""></div>
            <div className="flex justify-between gap-10">
                <div className=""><Link href="/create">Write</Link></div>
                <div id="login" className="">Admin</div>
            </div>
            
        </div>
    )
}