import { MapPin, Wallet, CheckSquare, MessageCircle, Images, User } from 'lucide-react'

type Screen = 'trips' | 'wallet' | 'checklist' | 'chat' | 'memories' | 'profile'

interface NavigationProps {
  currentScreen: Screen
  onScreenChange: (screen: Screen) => void
}

export function Navigation({ currentScreen, onScreenChange }: NavigationProps) {
  const navItems = [
    { id: 'trips', label: 'Trips', icon: MapPin },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'memories', label: 'Memories', icon: Images },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id

          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id as Screen)}
              className={`flex flex-col items-center justify-center py-3 px-2 flex-1 transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={item.label}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
