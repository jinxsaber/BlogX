import NavBar from "@/components/navBar";
import Grid from "./components/grid";

export default function Home(){
    return(
        <div className="bg-gradient-to-br from-blue-400 to-[#f0f7ff] h-screen">
            <NavBar/>
            <Grid/>
        </div>
    )
}