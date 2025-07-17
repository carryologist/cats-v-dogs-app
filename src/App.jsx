import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [votes, setVotes] = useState({
    independence: { cats: 0, dogs: 0 },
    loyalty: { cats: 0, dogs: 0 },
    maintenance: { cats: 0, dogs: 0 },
    entertainment: { cats: 0, dogs: 0 },
    attitude: { cats: 0, dogs: 0 }
  })

  const [userVotes, setUserVotes] = useState({})

  useEffect(() => {
    const savedVotes = localStorage.getItem('catsDogVotes')
    const savedUserVotes = localStorage.getItem('userVotes')
    if (savedVotes) setVotes(JSON.parse(savedVotes))
    if (savedUserVotes) setUserVotes(JSON.parse(savedUserVotes))
  }, [])

  const vote = (category, animal) => {
    if (userVotes[category]) return // Already voted
    
    const newVotes = {
      ...votes,
      [category]: {
        ...votes[category],
        [animal]: votes[category][animal] + 1
      }
    }
    
    const newUserVotes = { ...userVotes, [category]: animal }
    
    setVotes(newVotes)
    setUserVotes(newUserVotes)
    localStorage.setItem('catsDogVotes', JSON.stringify(newVotes))
    localStorage.setItem('userVotes', JSON.stringify(newUserVotes))
  }

  const categories = [
    {
      id: 'independence',
      title: 'Master of Independence',
      catDesc: '"I don\'t need you... but I\'ll sit on your keyboard anyway"',
      dogDesc: '"WHERE ARE YOU GOING? CAN I COME? PLEASE DON\'T LEAVE ME!"'
    },
    {
      id: 'loyalty',
      title: 'Loyalty Level',
      catDesc: '"I love you... when it\'s dinner time"',
      dogDesc: '"I would literally die for you and also for this tennis ball"'
    },
    {
      id: 'maintenance',
      title: 'High Maintenance Factor',
      catDesc: '"Clean my litter box, peasant"',
      dogDesc: '"WALK ME! FEED ME! LOVE ME! REPEAT!"'
    },
    {
      id: 'entertainment',
      title: 'Entertainment Value',
      catDesc: '"Watch me knock things off tables for 3 hours"',
      dogDesc: '"I will chase my own tail until I achieve enlightenment"'
    },
    {
      id: 'attitude',
      title: 'Attitude Problem',
      catDesc: '"I am a tiny god and you are my servant"',
      dogDesc: '"Everyone is my best friend, especially the mailman!"'
    }
  ]

  const funFacts = [
    "Cats sleep 12-16 hours a day. Dogs sleep 12-14 hours. Both are living the dream.",
    "A group of cats is called a 'clowder'. A group of dogs is called a 'pack'. A group of cat people is called 'single'.",
    "Cats have 32 muscles in each ear. Dogs have 18. Cats are clearly overachievers.",
    "Dogs have been man's best friend for 15,000 years. Cats have been tolerating humans for 9,000 years.",
    "The average cat can jump 6 times its length. The average dog runs into glass doors."
  ]

  const getWinner = (category) => {
    const catVotes = votes[category].cats
    const dogVotes = votes[category].dogs
    const total = catVotes + dogVotes
    
    if (total === 0) return null
    
    return {
      winner: catVotes > dogVotes ? 'cats' : dogVotes > catVotes ? 'dogs' : 'tie',
      catPercent: Math.round((catVotes / total) * 100),
      dogPercent: Math.round((dogVotes / total) * 100),
      total
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">🐈‍⬛ vs 🐶</h1>
          <h2 className="text-3xl font-bold text-white mb-2">The Ultimate Showdown</h2>
          <p className="text-xl text-white opacity-90">Finally settle the age-old debate with completely scientific voting</p>
        </header>

        <div className="grid gap-8 mb-12">
          {categories.map((category) => {
            const result = getWinner(category.id)
            const hasVoted = userVotes[category.id]
            
            return (
              <div key={category.id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                  {category.title}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🐈‍⬛</div>
                    <p className="text-gray-600 mb-4 italic">{category.catDesc}</p>
                    <button
                      onClick={() => vote(category.id, 'cats')}
                      disabled={hasVoted}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        hasVoted
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-purple-500 hover:bg-purple-600 text-white hover:scale-105'
                      }`}
                    >
                      {hasVoted ? 'Voted!' : 'Vote for Cats'}
                    </button>
                    {result && (
                      <div className="mt-4">
                        <div className="text-2xl font-bold text-purple-600">
                          {result.catPercent}%
                        </div>
                        <div className="text-sm text-gray-500">
                          {votes[category.id].cats} votes
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl mb-4">🐶</div>
                    <p className="text-gray-600 mb-4 italic">{category.dogDesc}</p>
                    <button
                      onClick={() => vote(category.id, 'dogs')}
                      disabled={hasVoted}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        hasVoted
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
                      }`}
                    >
                      {hasVoted ? 'Voted!' : 'Vote for Dogs'}
                    </button>
                    {result && (
                      <div className="mt-4">
                        <div className="text-2xl font-bold text-blue-600">
                          {result.dogPercent}%
                        </div>
                        <div className="text-sm text-gray-500">
                          {votes[category.id].dogs} votes
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {result && result.total > 0 && (
                  <div className="mt-6">
                    <div className="flex bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-purple-500 transition-all duration-500"
                        style={{ width: `${result.catPercent}%` }}
                      ></div>
                      <div 
                        className="bg-blue-500 transition-all duration-500"
                        style={{ width: `${result.dogPercent}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-2 text-sm text-gray-600">
                      {result.winner === 'tie' ? "It's a tie!" : 
                       result.winner === 'cats' ? "Cats are winning!" : "Dogs are winning!"}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Totally Scientific Fun Facts
          </h3>
          <div className="grid gap-4">
            {funFacts.map((fact, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">"{fact}"</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center text-white">
          <p className="opacity-75">Made with ❤️ for pet lovers everywhere</p>
          <p className="opacity-50 text-sm mt-2">No animals were harmed in the making of this website</p>
        </footer>
      </div>
    </div>
  )
}

export default App
