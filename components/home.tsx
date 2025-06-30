import Link from "next/link";

export default function Main(){
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-7xl pt-30 px-4 text-center font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Share your stories with the <div className="pt-6">World</div>
            </div>
            <div className="py-10 text-2xl px-80 text-center text-slate-600 leading-relaxed">A modern, intuitive platform for bloggers and readers. Create, share, and discover amazing content with our user-friendly interface.</div>
            <div className="flex gap-10 justify-center items-center">
                <Link href= "/create"><div className="border-1 border-blue-700 select-none text-white bg-blue-700 px-8 py-3 flex justify-center items-center rounded-2xl hover:bg-inherit hover:text-blue-700 font-medium">Start Writing</div></Link>
                <Link href = "/posts"><div className="border-1 border-blue-700 px-8 py-3 flex justify-center items-center rounded-2xl text-blue-700 hover:bg-blue-700 hover:text-white font-medium">Explore Posts</div></Link>
            </div>
        </div>
    )
}