import NavBar from "@/components/navBar";
import Blog from "./components/blog";

export default function Home(){
    return(
        <div className="bg-gradient-to-br from-blue-400 to-[#f0f7ff] h-screen">
            <NavBar/>
            <Blog/>
        </div>
    )
}