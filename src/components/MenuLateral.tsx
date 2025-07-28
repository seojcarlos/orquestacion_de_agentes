'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, FileCode, BookOpen, ChevronRight, ChevronDown, Route, Wrench, Database, Palette, FolderOpen, Bot, Sparkles, Zap, Code2, Loader2, Server, Rocket, GitBranch, Monitor, Layers, Bug } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface MenuItem {
  titulo: string;
  href?: string;
  icono: any;
  submenu?: MenuItem[];
  badge?: string;
  isNew?: boolean;
}

export default function MenuLateral() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Tutoriales']);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      titulo: 'Inicio',
      href: '/',
      icono: Home
    },
    {
      titulo: 'Tutoriales',
      icono: BookOpen,
      submenu: [
        { titulo: 'Ver Todos', href: '/tutoriales', icono: BookOpen },
        { titulo: '── Básicos ──', icono: null },
        { titulo: 'Sintaxis TSX', href: '/tutoriales/sintaxis-tsx', icono: Code2 },
        { titulo: 'Hooks de React', href: '/tutoriales/hooks-react', icono: Wrench },
        { titulo: 'Estado y Props', href: '/tutoriales/estado-props', icono: Database },
        { titulo: 'CSS en Next.js', href: '/tutoriales/css-nextjs', icono: Palette },
        { titulo: 'Gitignore Correcto', href: '/tutoriales/gitignore-correcto', icono: GitBranch, badge: 'NEW' },
        { titulo: '── Intermedios ──', icono: null },
        { titulo: 'Sistema de Rutas', href: '/tutoriales/sistema-rutas', icono: Route },
        { titulo: 'Formularios', href: '/tutoriales/formularios', icono: FileCode },
        { titulo: 'Asistente Inteligente', href: '/tutoriales/asistente-inteligente', icono: Bot, badge: 'IA' },
        { titulo: 'Art Tool', href: '/tutoriales/art-tool', icono: Palette, badge: 'NEW' },
        { titulo: 'Errores Comunes', href: '/tutoriales/errores-comunes', icono: Bug },
        { titulo: 'Estilos Next.js', href: '/tutoriales/estilos-nextjs', icono: Palette },
        { titulo: 'Texto Responsive', href: '/tutoriales/texto-responsive-overflow', icono: Monitor, badge: 'NEW' },
        { titulo: '── Avanzados ──', icono: null },
        { titulo: 'Server Components', href: '/tutoriales/server-components', icono: Server, badge: 'NEW' },
        { titulo: 'Optimización', href: '/tutoriales/optimizacion', icono: Rocket, badge: 'NEW' },
        { titulo: 'Context Engineering SaaS', href: '/tutoriales/context-engineering-saas', icono: Layers, badge: 'HOT' },
        { titulo: '── Especiales ──', icono: null },
        { titulo: 'Gestión con IA', href: '/tutoriales/gestion-proyecto', icono: FolderOpen },
        { titulo: 'Claude Monitor Ubuntu', href: '/tutoriales/claude-monitor-ubuntu', icono: Server, badge: 'NEW' },
        { titulo: 'Claude Flow', href: '/tutoriales/un-curso-de-como-se-utiliza-httpsgithubcomruvnetclaude-flow-en-esta-web-que-aporta-y-desafios-con-ejemplos-visuales', icono: Sparkles, badge: 'HOT' },
      ]
    },
    {
      titulo: 'Agencia Digital IA',
      href: '/agencia',
      icono: Rocket,
      badge: 'FORMACIÓN',
      isNew: true
    },
    {
      titulo: 'Playground',
      href: '/playground',
      icono: Zap,
      badge: 'BETA',
      isNew: true
    }
  ];

  const toggleExpanded = (titulo: string) => {
    setExpandedItems(prev =>
      prev.includes(titulo)
        ? prev.filter(item => item !== titulo)
        : [...prev, titulo]
    );
  };

  // Cerrar menú al cambiar de página en móvil
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [pathname]);

  // Detectar si es desktop al cargar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 bg-white shadow-lg rounded-lg p-2 hover:shadow-xl transition-all lg:hidden"
        aria-label="Abrir menú"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Menú lateral */}
      <aside className={`
        fixed left-0 top-0 h-full w-72 bg-white border-r border-gray-200 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:w-64
        overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300
      `}>
        {/* Header del menú */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-purple-600" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">Orquestación IA</h2>
              <p className="text-xs text-gray-500">Tutoriales y Formación</p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                // Item con submenu
                <div className="mb-1">
                  <button
                    onClick={() => toggleExpanded(item.titulo)}
                    className={`
                      w-full flex items-center justify-between p-2.5 rounded-lg
                      transition-all duration-200 group
                      ${expandedItems.includes(item.titulo)
                        ? 'bg-gray-100 text-gray-900'
                        : 'hover:bg-gray-50 text-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <item.icono className={`
                        w-5 h-5 transition-colors
                        ${expandedItems.includes(item.titulo) ? 'text-purple-600' : 'text-gray-500'}
                        group-hover:text-purple-600
                      `} />
                      <span className="font-medium text-sm">{item.titulo}</span>
                    </div>
                    {expandedItems.includes(item.titulo) ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {/* Submenu con animación */}
                  <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${expandedItems.includes(item.titulo) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    <div className="ml-2 mt-1 space-y-0.5">
                      {item.submenu.map((subitem, subindex) => {
                        // Separadores de categoría
                        if (subitem.titulo.startsWith('──')) {
                          return (
                            <div key={subindex} className="px-4 py-2 mt-2">
                              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                {subitem.titulo.replace(/─/g, '').trim()}
                              </span>
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={subindex}
                            href={subitem.href!}
                            className={`
                              flex items-center gap-2 px-4 py-2 ml-6 text-sm
                              rounded-md transition-all duration-200
                              ${isActive(subitem.href!)
                                ? 'bg-purple-50 text-purple-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }
                            `}
                          >
                            {subitem.icono && <subitem.icono className="w-4 h-4 flex-shrink-0" />}
                            <span className="flex-1 truncate">{subitem.titulo}</span>
                            {subitem.badge && (
                              <span className={`
                                text-xs px-1.5 py-0.5 rounded-full font-semibold
                                ${subitem.badge === 'NEW' ? 'bg-green-100 text-green-700' : ''}
                                ${subitem.badge === 'HOT' ? 'bg-red-100 text-red-700' : ''}
                                ${subitem.badge === 'IA' ? 'bg-purple-100 text-purple-700' : ''}
                              `}>
                                {subitem.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                // Item simple
                <Link
                  href={item.href!}
                  className={`
                    flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 group
                    ${isActive(item.href!)
                      ? 'bg-purple-100 text-purple-700 font-medium shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icono className={`
                    w-5 h-5 transition-colors
                    ${isActive(item.href!) ? 'text-purple-600' : 'text-gray-500'}
                    group-hover:text-purple-600
                  `} />
                  <span className="text-sm flex-1">{item.titulo}</span>
                  {item.badge && (
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full font-semibold
                      ${item.isNew ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' : ''}
                      ${item.badge === 'FORMACIÓN' ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700' : ''}
                      ${item.badge === 'BETA' ? 'bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700' : ''}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer del menú con info de progreso */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold text-purple-700">Progreso de Tutoriales</span>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              14 tutoriales disponibles
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{width: '35%'}}></div>
            </div>
            <p className="text-xs text-purple-600 mt-1">
              ¡Sigue aprendiendo! 🚀
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
