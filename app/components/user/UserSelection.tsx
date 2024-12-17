import { useMood } from "@/app/context/MoodContext";

const UserSelection = () => {
    const { selectedMood } = useMood();
  return (
    <>
      {selectedMood && <div className="mb-1 ml-2 text-gray-500 text-sm font-semibold">Mood:      
        <span className='text-red-400 ml-1'>{selectedMood}</span></div>}
    </>
  )
}

export default UserSelection