type Props = {
    gameMode: string
    setGameMode: (gameMode: string) => void
}

export default function Title({ gameMode, setGameMode }: Readonly<Props>) {
    return (
        <>
            <h1>Cornflower Blue - Colour Guessing Game 🎨</h1>
            <div className="mode-container flex items-center gap-2"><h3>Game Mode:</h3>
                <div className="relative flex bg-gray-200 rounded-full p-0.5 text-sm" key="mode-toggle" id="mode-toggle">
                    <button
                        onClick={() => setGameMode('daily')}
                        className={`relative z-10 px-3 py-1 rounded-full transition-colors ${gameMode === 'daily' ? 'bg-white text-black shadow' : 'text-gray-500'}`}
                    >
                        Daily
                    </button>
                    <button
                        onClick={() => setGameMode('random')}
                        className={`relative z-10 px-3 py-1 rounded-full transition-colors ${gameMode === 'random' ? 'bg-white text-black shadow' : 'text-gray-500'}`}
                    >
                        Random
                    </button>
                </div>
            </div>
        </>
    )
}