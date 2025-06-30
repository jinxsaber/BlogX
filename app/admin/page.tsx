
import NavBar from "@/components/navBar"
import Admin from "./components/admin"

export default function Home(){
    return (
      <div className="bg-gradient-to-br from-blue-400 to-[#f0f7ff] h-screen">
        <NavBar/>
        <Admin/>
      </div>
    )
}