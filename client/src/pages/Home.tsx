import { HeroText } from "../components/HeroText";
import { useAppSelector } from "../hooks/hooks";

export default function Home() {
  const { currentUser } = useAppSelector((state) =>state.user)
  
  return (
    <div className="flex justify-center">
      <HeroText />
      <div>
        {currentUser?.email}
      </div>
    </div>
  )
}
