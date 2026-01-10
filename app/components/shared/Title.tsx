type Props = {
    gameMode: string
    setGameMode: (gameMode: string) => void
}

export default function Title({ gameMode, setGameMode }: Readonly<Props>) {
    return (
        <>
            <h1>Cornflower Blue - Colour Guessing Game 🎨</h1>
            <div className="relative flex bg-gray-200 rounded-full p-1" key="mode-toggle">
                <div
                    className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow transition-transform duration-200 ${gameMode === 'random' ? 'translate-x-full' : 'translate-x-0'
                        }`}
                />
                <button
                    onClick={() => setGameMode('daily')}
                    className={`relative z-10 px-4 py-2 rounded-full transition-colors ${gameMode === 'daily' ? 'text-black' : 'text-gray-500'}`}
                >
                    Daily
                </button>
                <button
                    onClick={() => setGameMode('random')}
                    className={`relative z-10 px-4 py-2 rounded-full transition-colors ${gameMode === 'random' ? 'text-black' : 'text-gray-500'}`}
                >
                    Random
                </button>
            </div>
        </>
    )
}