import Link from 'next/link'
import { Home, ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  quickLinks?: Array<{
    label: string
    href: string
  }>
}

export function Breadcrumbs({ items, quickLinks }: BreadcrumbsProps) {
  return (
    <nav className="bg-gray-900/30 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-500" />}
              {item.href && !item.isActive ? (
                <Link 
                  href={item.href}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  {item.label}
                </Link>
              ) : (
                <span className={`${item.isActive ? 'text-white font-medium' : 'text-gray-400'}`}>
                  {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
        
        {quickLinks && quickLinks.length > 0 && (
          <div className="flex items-center gap-4 mt-2">
            {quickLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-xs text-gray-600">|</span>}
                <Link 
                  href={link.href}
                  className="text-xs text-gray-400 hover:text-gray-300 transition-colors hover:underline"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
