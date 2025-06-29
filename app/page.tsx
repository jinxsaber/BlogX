import Main from "@/components/home"
import NavBar from "@/components/navBar"

export default function Home(){
    return (
      <div className="bg-gradient-to-br from-blue-400 to-[#f0f7ff] h-screen">
        <NavBar/>
        <Main/>
      </div>
    )
}