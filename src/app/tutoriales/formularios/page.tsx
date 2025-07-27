'use client';

import React, { useState, useReducer, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText, CheckCircle, AlertCircle, Upload,
  Loader2, Save, Eye, EyeOff, Plus, Trash2,
  ArrowRight, ArrowLeft, Check, X, Send,
  RefreshCw, Zap, Shield, Clock, Code2,
  Database, Server, Activity, Globe, Settings,
  BarChart3, Timer, Gauge
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                   Tipos                                    */
/* -------------------------------------------------------------------------- */

type FormField = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio';
  value: string | boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | null;
  };
  options?: { value: string; label: string }[];
  error?: string;
};

type FormAction =
  | { type: 'UPDATE_FIELD'; fieldId: string; value: any }
  | { type: 'ADD_FIELD'; field: FormField }
  | { type: 'REMOVE_FIELD'; fieldId: string }
  | { type: 'SET_ERROR'; fieldId: string; error: string }
  | { type: 'CLEAR_ERROR'; fieldId: string }
  | { type: 'RESET_FORM' }
  | { type: 'SET_FIELDS'; fields: FormField[] };

function formReducer(state: FormField[], action: FormAction): FormField[] {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return state.map((field) =>
        field.id === action.fieldId
          ? { ...field, value: action.value, error: undefined }
          : field
      );
    case 'ADD_FIELD':
      return [...state, action.field];
    case 'REMOVE_FIELD':
      return state.filter((field) => field.id !== action.fieldId);
    case 'SET_ERROR':
      return state.map((field) =>
        field.id === action.fieldId ? { ...field, error: action.error } : field
      );
    case 'CLEAR_ERROR':
      return state.map((field) =>
        field.id === action.fieldId ? { ...field, error: undefined } : field
      );
    case 'RESET_FORM':
      return state.map((field) => ({ ...field, value: '', error: undefined }));
    case 'SET_FIELDS':
      return action.fields;
    default:
      return state;
  }
}

/* -------------------------------------------------------------------------- */
/*                              Componente raíz                               */
/* -------------------------------------------------------------------------- */

export default function FormulariosAvanzados() {
  /* ------------------------------- Fundamentos ------------------------------ */
  const [seccionActiva, setSeccionActiva] = useState('fundamentos');

  /* ----------------------------- Form básico -------------------------------- */
  const [formBasico, setFormBasico] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
  });
  const [erroresBasico, setErroresBasico] = useState<Record<string, string>>({});
  const [mostrarPassword, setMostrarPassword] = useState(false);

  /* -------------------------- Form dinámico (reducer) ----------------------- */
  const camposIniciales: FormField[] = [
    {
      id: 'nombre',
      label: 'Nombre Completo',
      type: 'text',
      value: '',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
    },
    {
      id: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      value: '',
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
    },
  ];

  const [camposDinamicos, dispatch] = useReducer(formReducer, camposIniciales);

  /* ---------------------------- Form multi‑paso ----------------------------- */
  const [pasoActual, setPasoActual] = useState(1);
  const [datosMultiPaso, setDatosMultiPaso] = useState({
    paso1: { nombre: '', apellido: '', fechaNacimiento: '' },
    paso2: { direccion: '', ciudad: '', codigoPostal: '' },
    paso3: { telefono: '', emailContacto: '', preferencias: [] as string[] },
  });

  /* ------------------------- Upload / drag & drop --------------------------- */
  const [archivo, setArchivo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------------------------- Auto‑guardado ------------------------------- */
  const [autoGuardando, setAutoGuardando] = useState(false);
  const [ultimoGuardado, setUltimoGuardado] = useState<Date | null>(null);

  /* ---------------------------- Server Actions ------------------------------ */
  const [serverActionLoading, setServerActionLoading] = useState(false);
  const [serverActionResult, setServerActionResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
    errors?: Record<string, string>;
  } | null>(null);

  /* ---------------------------- Optimización -------------------------------- */
  const [optimizationDemo, setOptimizationDemo] = useState('basic');
  const [debounceInput, setDebounceInput] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [autoSaveData, setAutoSaveData] = useState({ nombre: '', email: '', mensaje: '' });
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);
  const [formMetrics, setFormMetrics] = useState({
    renderCount: 0,
    validationTime: 0,
    submitTime: 0
  });

  // Debounce effect para optimización
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(debounceInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [debounceInput]);

  // Auto-save effect para optimización
  useEffect(() => {
    if (autoSaveData.nombre || autoSaveData.email || autoSaveData.mensaje) {
      const timer = setTimeout(() => {
        setLastAutoSave(new Date());
        // Simular guardado automático
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [autoSaveData]);

  /* --------------------------- Validación básica ---------------------------- */
  const validarCampo = (nombre: string, valor: string): string => {
    switch (nombre) {
      case 'email':
        if (!valor) return 'El email es requerido';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return 'Email inválido';
        return '';
      case 'password':
        if (!valor) return 'La contraseña es requerida';
        if (valor.length < 8) return 'Mínimo 8 caracteres';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(valor))
          return 'Debe contener mayúsculas, minúsculas y números';
        return '';
      case 'confirmarPassword':
        if (valor !== formBasico.password) return 'Las contraseñas no coinciden';
        return '';
      case 'nombre':
        if (!valor) return 'El nombre es requerido';
        if (valor.length < 3) return 'Mínimo 3 caracteres';
        return '';
      default:
        return '';
    }
  };

  /* -------------------- Debounce para la validación básica ------------------ */
  useEffect(() => {
    const timer = setTimeout(() => {
      const nuevosErrores: Record<string, string> = {};
      Object.keys(formBasico).forEach((campo) => {
        const error = validarCampo(campo, (formBasico as any)[campo]);
        if (error) nuevosErrores[campo] = error;
      });
      setErroresBasico(nuevosErrores);
    }, 500);

    return () => clearTimeout(timer);
  }, [formBasico]);

  /* -------------------------- Auto‑guardado local --------------------------- */
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (
        JSON.stringify(formBasico) !==
        JSON.stringify({
          nombre: '',
          email: '',
          password: '',
          confirmarPassword: '',
        })
      ) {
        setAutoGuardando(true);
        setTimeout(() => {
          setAutoGuardando(false);
          setUltimoGuardado(new Date());
          console.log('Formulario auto‑guardado:', formBasico);
        }, 1000);
      }
    }, 3000);

    return () => clearTimeout(autoSaveTimer);
  }, [formBasico]);

  /* --------------------------- Manejadores upload --------------------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setArchivo(file);
    setUploadProgress(0);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setArchivo(file);
      setUploadProgress(0);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);
      }
    }
  };

  /* -------------------------- Dinámicos: helpers --------------------------- */
  const agregarCampoDinamico = () =>
    dispatch({
      type: 'ADD_FIELD',
      field: {
        id: `campo_${Date.now()}`,
        label: 'Nuevo Campo',
        type: 'text',
        value: '',
        validation: { required: false },
      },
    });

  const validarFormularioDinamico = (): boolean => {
    let esValido = true;
    camposDinamicos.forEach((campo) => {
      let error = '';

      if (campo.validation?.required && !campo.value) {
        error = 'Este campo es requerido';
      } else if (
        campo.validation?.minLength &&
        String(campo.value).length < campo.validation.minLength
      ) {
        error = `Mínimo ${campo.validation.minLength} caracteres`;
      } else if (
        campo.validation?.maxLength &&
        String(campo.value).length > campo.validation.maxLength
      ) {
        error = `Máximo ${campo.validation.maxLength} caracteres`;
      } else if (
        campo.validation?.pattern &&
        !campo.validation.pattern.test(String(campo.value))
      ) {
        error = 'Formato inválido';
      } else if (campo.validation?.custom) {
        const customError = campo.validation.custom(campo.value);
        if (customError) error = customError;
      }

      if (error) {
        dispatch({ type: 'SET_ERROR', fieldId: campo.id, error });
        esValido = false;
      }
    });

    return esValido;
  };

  const handleSubmitAvanzado = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormularioDinamico()) {
      alert('Por favor corrige los errores antes de enviar');
      return;
    }

    console.log('Enviando formulario:', camposDinamicos);
    setTimeout(() => {
      if (Math.random() > 0.5) {
        dispatch({
          type: 'SET_ERROR',
          fieldId: 'email',
          error: 'Este email ya está registrado',
        });
      } else {
        alert('Formulario enviado exitosamente!');
        dispatch({ type: 'RESET_FORM' });
      }
    }, 1500);
  };

  /* -------------------------------------------------------------------------- */
  /*                     Secciones (tutorial paso a paso)                       */
  /* -------------------------------------------------------------------------- */

  const secciones = [
    { id: 'fundamentos', titulo: 'Fundamentos', icon: FileText },
    { id: 'validacion', titulo: 'Validación Avanzada', icon: Shield },
    { id: 'dinamicos', titulo: 'Formularios Dinámicos', icon: RefreshCw },
    { id: 'multipaso', titulo: 'Formularios Multi‑paso', icon: ArrowRight },
    { id: 'archivos', titulo: 'Manejo de Archivos', icon: Upload },
    { id: 'serveractions', titulo: 'Server Actions', icon: Zap },
    { id: 'optimizacion', titulo: 'Optimización y UX', icon: Clock },
  ];

  /* --------------------------- Render condicional --------------------------- */
  const renderContenido = () => {
    switch (seccionActiva) {
      /* ----------------------------- FUNDAMENTOS ---------------------------- */
      case 'fundamentos':
        return (
          <div className="space-y-6">
            {/* Introducción */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                Fundamentos de Formularios en React
              </h3>
              <p className="text-gray-600 mb-4">
                Los formularios son una parte fundamental de cualquier aplicación web. 
                En React, tenemos múltiples formas de manejarlos, desde formularios controlados hasta no controlados.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Formularios Controlados</h4>
                  <p className="text-sm text-blue-700">
                    React maneja el estado del formulario. Cada cambio actualiza el estado.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Formularios No Controlados</h4>
                  <p className="text-sm text-green-700">
                    El DOM maneja el estado. Usamos refs para acceder a los valores.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo: Formulario Básico Controlado */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-orange-600" />
                🎮 Demo: Formulario Controlado Básico
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Formulario en vivo */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">Prueba el formulario:</h5>
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nombre:</label>
                      <input
                        type="text"
                        value={formBasico.nombre}
                        onChange={(e) => setFormBasico(prev => ({...prev, nombre: e.target.value}))}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Tu nombre completo"
                      />
                      {erroresBasico.nombre && (
                        <p className="text-red-500 text-xs mt-1">{erroresBasico.nombre}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email:</label>
                      <input
                        type="email"
                        value={formBasico.email}
                        onChange={(e) => setFormBasico(prev => ({...prev, email: e.target.value}))}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                      {erroresBasico.email && (
                        <p className="text-red-500 text-xs mt-1">{erroresBasico.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Contraseña:</label>
                      <div className="relative">
                        <input
                          type={mostrarPassword ? 'text' : 'password'}
                          value={formBasico.password}
                          onChange={(e) => setFormBasico(prev => ({...prev, password: e.target.value}))}
                          className="w-full p-2 pr-10 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Mínimo 8 caracteres"
                        />
                        <button
                          type="button"
                          onClick={() => setMostrarPassword(!mostrarPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {mostrarPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {erroresBasico.password && (
                        <p className="text-red-500 text-xs mt-1">{erroresBasico.password}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirmar Contraseña:</label>
                      <input
                        type="password"
                        value={formBasico.confirmarPassword}
                        onChange={(e) => setFormBasico(prev => ({...prev, confirmarPassword: e.target.value}))}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Repite la contraseña"
                      />
                      {erroresBasico.confirmarPassword && (
                        <p className="text-red-500 text-xs mt-1">{erroresBasico.confirmarPassword}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={Object.keys(erroresBasico).length > 0}
                      className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Registrarse
                    </button>
                  </form>
                  
                  {/* Auto-save indicator */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                    {autoGuardando && (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Guardando automáticamente...
                      </>
                    )}
                    {ultimoGuardado && !autoGuardando && (
                      <>
                        <Save className="w-3 h-3" />
                        Guardado: {ultimoGuardado.toLocaleTimeString()}
                      </>
                    )}
                  </div>
                </div>
                
                {/* Estado en tiempo real */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">Estado del formulario:</h5>
                  <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{JSON.stringify({
  valores: formBasico,
  errores: erroresBasico,
  valido: Object.keys(erroresBasico).length === 0
}, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Código del ejemplo */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">📝 Código del Ejemplo</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
{`const [formData, setFormData] = useState({
  nombre: '',
  email: '',
  password: '',
  confirmarPassword: ''
});

const [errores, setErrores] = useState({});

const validarCampo = (nombre, valor) => {
  switch (nombre) {
    case 'email':
      if (!valor) return 'El email es requerido';
      if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(valor)) 
        return 'Email inválido';
      return '';
    case 'password':
      if (!valor) return 'La contraseña es requerida';
      if (valor.length < 8) return 'Mínimo 8 caracteres';
      return '';
    default:
      return '';
  }
};

// Auto-validación con debounce
useEffect(() => {
  const timer = setTimeout(() => {
    const nuevosErrores = {};
    Object.keys(formData).forEach(campo => {
      const error = validarCampo(campo, formData[campo]);
      if (error) nuevosErrores[campo] = error;
    });
    setErrores(nuevosErrores);
  }, 500);
  
  return () => clearTimeout(timer);
}, [formData]);`}
              </pre>
            </div>

            {/* Tips importantes */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                💡 Tips Importantes
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Validación en tiempo real:</strong> Usa debounce para evitar validar en cada tecla</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Auto-guardado:</strong> Implementa guardado automático para mejorar UX</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Estados visuales:</strong> Muestra claramente errores y estados de carga</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Accesibilidad:</strong> Usa labels correctos y mensajes de error descriptivos</span>
                </li>
              </ul>
            </div>
          </div>
        );

      /* ------------------------- VALIDACIÓN AVANZADA ------------------------ */
      case 'validacion':
        return (
          <div className="space-y-6">
            {/* Introducción a validación avanzada */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-600" />
                Validación Avanzada con Zod y React Hook Form
              </h3>
              <p className="text-gray-600 mb-4">
                La validación avanzada nos permite crear formularios robustos con reglas complejas, 
                mensajes de error personalizados y validación asíncrona.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Validación Síncrona</h4>
                  <p className="text-sm text-blue-700">
                    Reglas que se ejecutan inmediatamente al cambiar el valor.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Validación Asíncrona</h4>
                  <p className="text-sm text-purple-700">
                    Validación que requiere consultas al servidor (emails únicos, etc.).
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Validación Condicional</h4>
                  <p className="text-sm text-green-700">
                    Reglas que dependen de otros campos del formulario.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo: Validación con diferentes tipos */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-orange-600" />
                🎮 Demo: Validación Avanzada en Tiempo Real
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Formulario de validación avanzada */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">Formulario con validación compleja:</h5>
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Username (debe ser único):
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Ingresa un username"
                        onChange={(e) => {
                          // Simular validación asíncrona
                          const value = e.target.value;
                          if (value.length > 3) {
                            setTimeout(() => {
                              console.log('Validando username:', value);
                            }, 1000);
                          }
                        }}
                      />
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600">Username disponible</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Edad (18-65 años):
                      </label>
                      <input
                        type="number"
                        min="18"
                        max="65"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Tu edad"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Teléfono (formato: +1-555-123-4567):
                      </label>
                      <input
                        type="tel"
                        pattern="\\+1-\\d{3}-\\d{3}-\\d{4}"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="+1-555-123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Confirmar Email:
                      </label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Debe coincidir con el email anterior"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="w-4 h-4 text-orange-600 rounded"
                      />
                      <label htmlFor="terms" className="text-sm">
                        Acepto los términos y condiciones *
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Validar Formulario
                    </button>
                  </form>
                </div>
                
                {/* Indicadores de validación */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">Estado de validación:</h5>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Username disponible</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                      <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
                      <span className="text-sm">Validando edad...</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-red-50 rounded">
                      <X className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Formato de teléfono inválido</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                      <AlertCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Emails no coinciden</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Términos requeridos</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-800 rounded text-green-400 text-xs">
                    <div>Validación en tiempo real activa</div>
                    <div>Próxima validación: 1.2s</div>
                    <div>Campos válidos: 1/5</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ejemplo con Zod */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">📝 Ejemplo con Zod Schema</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
{`import { z } from 'zod';

const userSchema = z.object({
  username: z
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(20, 'Máximo 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos'),
  
  email: z
    .string()
    .email('Email inválido')
    .refine(async (email) => {
      // Validación asíncrona - verificar si email existe
      const response = await fetch(\`/api/check-email?email=\${email}\`);
      const data = await response.json();
      return !data.exists;
    }, 'Este email ya está registrado'),
  
  age: z
    .number()
    .min(18, 'Debes ser mayor de 18 años')
    .max(65, 'Edad máxima 65 años'),
  
  phone: z
    .string()
    .regex(/^\\+1-\\d{3}-\\d{3}-\\d{4}$/, 'Formato: +1-555-123-4567'),
  
  confirmEmail: z.string(),
  
  terms: z
    .boolean()
    .refine(val => val === true, 'Debes aceptar los términos')
}).refine(data => data.email === data.confirmEmail, {
  message: 'Los emails no coinciden',
  path: ['confirmEmail']
});

// Uso en el formulario
const validateForm = async (formData) => {
  try {
    await userSchema.parseAsync(formData);
    return { success: true, errors: {} };
  } catch (error) {
    return { 
      success: false, 
      errors: error.formErrors.fieldErrors 
    };
  }
};`}
              </pre>
            </div>

            {/* Validación condicional */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">🔀 Validación Condicional</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3">Ejemplo: Campos que dependen de otros</h5>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <form className="space-y-3">
                      <div>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="userType" value="student" />
                          <span>Estudiante</span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="userType" value="professional" />
                          <span>Profesional</span>
                        </label>
                      </div>
                      
                      {/* Campos condicionales */}
                      <div className="mt-4 p-3 bg-blue-50 rounded">
                        <input
                          type="text"
                          placeholder="Nombre de la universidad"
                          className="w-full p-2 border rounded text-sm"
                        />
                        <p className="text-xs text-blue-600 mt-1">
                          Campo visible solo para estudiantes
                        </p>
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded opacity-50">
                        <input
                          type="text"
                          placeholder="Empresa actual"
                          className="w-full p-2 border rounded text-sm"
                          disabled
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Campo visible solo para profesionales
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-3">Código del ejemplo:</h5>
                  <pre className="bg-gray-900 text-white p-4 rounded-lg text-xs overflow-x-auto">
{`const conditionalSchema = z.object({
  userType: z.enum(['student', 'professional']),
  university: z.string().optional(),
  company: z.string().optional(),
}).refine(data => {
  if (data.userType === 'student') {
    return data.university && data.university.length > 0;
  }
  if (data.userType === 'professional') {
    return data.company && data.company.length > 0;
  }
  return true;
}, {
  message: 'Campo requerido según tu tipo de usuario',
  path: ['university'] // o ['company']
});`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Tips para validación avanzada */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                🛡️ Mejores Prácticas para Validación
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Validación progresiva:</strong> Valida campos individualmente antes del envío completo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Debounce en validación asíncrona:</strong> Evita llamadas excesivas al servidor</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Mensajes descriptivos:</strong> Explica claramente qué está mal y cómo corregirlo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Validación del cliente Y servidor:</strong> Nunca confíes solo en la validación frontend</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Estados visuales claros:</strong> Usa colores e iconos para mostrar el estado de validación</span>
                </li>
              </ul>
            </div>
          </div>
        );

      /* ------------------------ FORMULARIOS DINÁMICOS ----------------------- */
      case 'dinamicos':
        return (
          <div className="space-y-6">
            {/* Introducción a formularios dinámicos */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-orange-600" />
                Formularios Dinámicos con useReducer
              </h3>
              <p className="text-gray-600 mb-4">
                Los formularios dinámicos permiten agregar/eliminar campos sobre la marcha, 
                perfectos para casos como listas de contactos, productos variables, o configuraciones personalizables.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">useReducer para Estado Complejo</h4>
                  <p className="text-sm text-blue-700">
                    Maneja múltiples campos con lógica centralizada y predecible.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Arrays de Campos</h4>
                  <p className="text-sm text-green-700">
                    Genera campos dinámicamente basados en arrays del estado.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo interactiva de formulario dinámico */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-orange-600" />
                🎮 Demo: Constructor de Formularios
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Formulario dinámico funcional */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-medium">Construye tu formulario:</h5>
                    <button
                      onClick={agregarCampoDinamico}
                      className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Agregar Campo
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmitAvanzado} className="space-y-4">
                    {camposDinamicos.map((campo, index) => (
                      <div key={campo.id} className="border rounded-lg p-3 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium">
                            {campo.label}
                            {campo.validation?.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {index > 1 && ( // Mantener los 2 primeros campos fijos
                            <button
                              type="button"
                              onClick={() => dispatch({ type: 'REMOVE_FIELD', fieldId: campo.id })}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        
                        {campo.type === 'select' && campo.options ? (
                          <select
                            value={String(campo.value)}
                            onChange={(e) => dispatch({ 
                              type: 'UPDATE_FIELD', 
                              fieldId: campo.id, 
                              value: e.target.value 
                            })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="">Selecciona una opción</option>
                            {campo.options.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : campo.type === 'checkbox' ? (
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={Boolean(campo.value)}
                              onChange={(e) => dispatch({ 
                                type: 'UPDATE_FIELD', 
                                fieldId: campo.id, 
                                value: e.target.checked 
                              })}
                              className="w-4 h-4 text-orange-600 rounded"
                            />
                            <span className="text-sm">Sí, acepto</span>
                          </label>
                        ) : (
                          <input
                            type={campo.type}
                            value={String(campo.value)}
                            onChange={(e) => dispatch({ 
                              type: 'UPDATE_FIELD', 
                              fieldId: campo.id, 
                              value: e.target.value 
                            })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder={`Ingresa tu ${campo.label.toLowerCase()}`}
                          />
                        )}
                        
                        {campo.error && (
                          <p className="text-red-500 text-xs mt-1">{campo.error}</p>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex gap-2 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        Enviar Formulario
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch({ type: 'RESET_FORM' })}
                        className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Inspector de estado en tiempo real */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">Estado del formulario dinámico:</h5>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Total de campos:</span>
                      <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                        {camposDinamicos.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Campos con errores:</span>
                      <span className="font-mono bg-red-100 px-2 py-1 rounded">
                        {camposDinamicos.filter(c => c.error).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Campos completados:</span>
                      <span className="font-mono bg-green-100 px-2 py-1 rounded">
                        {camposDinamicos.filter(c => c.value && String(c.value).length > 0).length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs">
{camposDinamicos.map(campo => 
`${campo.label}: "${campo.value}"${campo.error ? ` ❌ ${campo.error}` : ' ✅'}`
).join('\n')}
                    </pre>
                  </div>
                  
                  {/* Botones para agregar tipos específicos */}
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-medium text-gray-600">Agregar campo específico:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => dispatch({
                          type: 'ADD_FIELD',
                          field: {
                            id: `select_${Date.now()}`,
                            label: 'Selección',
                            type: 'select',
                            value: '',
                            options: [
                              { value: 'opcion1', label: 'Opción 1' },
                              { value: 'opcion2', label: 'Opción 2' },
                              { value: 'opcion3', label: 'Opción 3' }
                            ],
                            validation: { required: true }
                          }
                        })}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        + Select
                      </button>
                      <button
                        onClick={() => dispatch({
                          type: 'ADD_FIELD',
                          field: {
                            id: `number_${Date.now()}`,
                            label: 'Número',
                            type: 'number',
                            value: '',
                            validation: { required: true }
                          }
                        })}
                        className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                      >
                        + Number
                      </button>
                      <button
                        onClick={() => dispatch({
                          type: 'ADD_FIELD',
                          field: {
                            id: `checkbox_${Date.now()}`,
                            label: 'Checkbox',
                            type: 'checkbox',
                            value: false,
                            validation: { required: false }
                          }
                        })}
                        className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        + Checkbox
                      </button>
                      <button
                        onClick={() => dispatch({
                          type: 'ADD_FIELD',
                          field: {
                            id: `password_${Date.now()}`,
                            label: 'Password',
                            type: 'password',
                            value: '',
                            validation: { required: true, minLength: 6 }
                          }
                        })}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        + Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Código del reducer */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">📝 Código del useReducer</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
{`// Tipos para el formulario dinámico
type FormField = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox';
  value: string | boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
  options?: { value: string; label: string }[];
  error?: string;
};

type FormAction =
  | { type: 'UPDATE_FIELD'; fieldId: string; value: any }
  | { type: 'ADD_FIELD'; field: FormField }
  | { type: 'REMOVE_FIELD'; fieldId: string }
  | { type: 'SET_ERROR'; fieldId: string; error: string }
  | { type: 'RESET_FORM' };

// Reducer function
function formReducer(state: FormField[], action: FormAction): FormField[] {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return state.map(field =>
        field.id === action.fieldId
          ? { ...field, value: action.value, error: undefined }
          : field
      );
    
    case 'ADD_FIELD':
      return [...state, action.field];
    
    case 'REMOVE_FIELD':
      return state.filter(field => field.id !== action.fieldId);
    
    case 'SET_ERROR':
      return state.map(field =>
        field.id === action.fieldId 
          ? { ...field, error: action.error } 
          : field
      );
    
    case 'RESET_FORM':
      return state.map(field => ({ 
        ...field, 
        value: field.type === 'checkbox' ? false : '', 
        error: undefined 
      }));
    
    default:
      return state;
  }
}

// Uso en el componente
const [fields, dispatch] = useReducer(formReducer, initialFields);

// Agregar campo dinámico
const addField = () => dispatch({
  type: 'ADD_FIELD',
  field: {
    id: \`field_\${Date.now()}\`,
    label: 'Nuevo Campo',
    type: 'text',
    value: '',
    validation: { required: false }
  }
});`}
              </pre>
            </div>

            {/* Casos de uso comunes */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">🎯 Casos de Uso Comunes</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3">Lista de Contactos</h5>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="Nombre" className="flex-1 p-1 border rounded text-sm" />
                      <input type="email" placeholder="Email" className="flex-1 p-1 border rounded text-sm" />
                      <button className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="Nombre" className="flex-1 p-1 border rounded text-sm" />
                      <input type="email" placeholder="Email" className="flex-1 p-1 border rounded text-sm" />
                      <button className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="w-full text-center py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-orange-500 hover:text-orange-500">
                      + Agregar Contacto
                    </button>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-3">Configuración de Permisos</h5>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked />
                      <span>Leer documentos</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" />
                      <span>Escribir documentos</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked />
                      <span>Ver usuarios</span>
                    </label>
                    <button className="w-full text-center py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-orange-500 hover:text-orange-500">
                      + Agregar Permiso
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips para formularios dinámicos */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-green-600" />
                💡 Tips para Formularios Dinámicos
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>IDs únicos:</strong> Usa timestamps o UUIDs para evitar colisiones de keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Validación por campo:</strong> Valida individualmente cada campo dinámico</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>useReducer vs useState:</strong> useReducer es mejor para estado complejo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Límites razonables:</strong> Evita que el usuario agregue campos infinitos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>UX clara:</strong> Indica visualmente qué campos se pueden eliminar</span>
                </li>
              </ul>
            </div>
          </div>
        );

      /* ------------------------- FORM MULTI‑PASO --------------------------- */
      case 'multipaso':
        return (
          <div className="space-y-6">
            {/* Introducción a formularios multi-paso */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-orange-600" />
                Formularios Multi-paso (Wizard)
              </h3>
              <p className="text-gray-600 mb-4">
                Los formularios multi-paso dividen formularios largos en secciones manejables, 
                mejorando la experiencia del usuario y las tasas de completado.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Mejor UX</h4>
                  <p className="text-sm text-blue-700">
                    Reduce la sensación de formulario "abrumador" para el usuario.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Validación Progresiva</h4>
                  <p className="text-sm text-green-700">
                    Valida cada paso antes de avanzar al siguiente.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Guardado Parcial</h4>
                  <p className="text-sm text-purple-700">
                    Permite guardar progreso si el usuario abandona temporalmente.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo interactiva de formulario multi-paso */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-orange-600" />
                🎮 Demo: Wizard de Registro Completo
              </h4>
              
              {/* Indicador de progreso */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progreso del registro</span>
                  <span className="text-sm text-gray-500">{pasoActual}/3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(pasoActual / 3) * 100}%` }}
                  ></div>
                </div>
                
                {/* Steps indicator */}
                <div className="flex justify-between mt-4">
                  {[
                    { num: 1, label: 'Información Personal', icon: '👤' },
                    { num: 2, label: 'Dirección', icon: '🏠' },
                    { num: 3, label: 'Contacto y Preferencias', icon: '📞' }
                  ].map((step) => (
                    <div key={step.num} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        pasoActual >= step.num
                          ? 'bg-orange-600 text-white'
                          : pasoActual === step.num
                          ? 'bg-orange-100 text-orange-600 border-2 border-orange-600'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {pasoActual > step.num ? '✓' : step.num}
                      </div>
                      <span className="text-xs mt-1 text-center max-w-20">
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Formulario multi-paso */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    {/* Paso 1: Información Personal */}
                    {pasoActual === 1 && (
                      <div className="space-y-4">
                        <h5 className="font-medium text-lg mb-4 flex items-center gap-2">
                          👤 Paso 1: Información Personal
                        </h5>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Nombre:</label>
                          <input
                            type="text"
                            value={datosMultiPaso.paso1.nombre}
                            onChange={(e) => setDatosMultiPaso(prev => ({
                              ...prev,
                              paso1: { ...prev.paso1, nombre: e.target.value }
                            }))}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Apellido:</label>
                          <input
                            type="text"
                            value={datosMultiPaso.paso1.apellido}
                            onChange={(e) => setDatosMultiPaso(prev => ({
                              ...prev,
                              paso1: { ...prev.paso1, apellido: e.target.value }
                            }))}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Tu apellido"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Fecha de Nacimiento:</label>
                          <input
                            type="date"
                            value={datosMultiPaso.paso1.fechaNacimiento}
                            onChange={(e) => setDatosMultiPaso(prev => ({
                              ...prev,
                              paso1: { ...prev.paso1, fechaNacimiento: e.target.value }
                            }))}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Paso 2: Dirección */}
                    {pasoActual === 2 && (
                      <div className="space-y-4">
                        <h5 className="font-medium text-lg mb-4 flex items-center gap-2">
                          🏠 Paso 2: Información de Dirección
                        </h5>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Dirección:</label>
                          <input
                            type="text"
                            value={datosMultiPaso.paso2.direccion}
                            onChange={(e) => setDatosMultiPaso(prev => ({
                              ...prev,
                              paso2: { ...prev.paso2, direccion: e.target.value }
                            }))}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Calle y número"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">Ciudad:</label>
                            <input
                              type="text"
                              value={datosMultiPaso.paso2.ciudad}
                              onChange={(e) => setDatosMultiPaso(prev => ({
                                ...prev,
                                paso2: { ...prev.paso2, ciudad: e.target.value }
                              }))}
                              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              placeholder="Tu ciudad"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Código Postal:</label>
                            <input
                              type="text"
                              value={datosMultiPaso.paso2.codigoPostal}
                              onChange={(e) => setDatosMultiPaso(prev => ({
                                ...prev,
                                paso2: { ...prev.paso2, codigoPostal: e.target.value }
                              }))}
                              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              placeholder="12345"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Paso 3: Contacto y Preferencias */}
                    {pasoActual === 3 && (
                      <div className="space-y-4">
                        <h5 className="font-medium text-lg mb-4 flex items-center gap-2">
                          📞 Paso 3: Contacto y Preferencias
                        </h5>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Teléfono:</label>
                          <input
                            type="tel"
                            value={datosMultiPaso.paso3.telefono}
                            onChange={(e) => setDatosMultiPaso(prev => ({
                              ...prev,
                              paso3: { ...prev.paso3, telefono: e.target.value }
                            }))}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="+1-555-123-4567"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Email de Contacto:</label>
                          <input
                            type="email"
                            value={datosMultiPaso.paso3.emailContacto}
                            onChange={(e) => setDatosMultiPaso(prev => ({
                              ...prev,
                              paso3: { ...prev.paso3, emailContacto: e.target.value }
                            }))}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="contacto@email.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Preferencias de notificación:</label>
                          <div className="space-y-2">
                            {['Email promocional', 'SMS urgente', 'Newsletter semanal'].map((pref) => (
                              <label key={pref} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 text-orange-600 rounded"
                                  onChange={(e) => {
                                    const prefs = [...datosMultiPaso.paso3.preferencias];
                                    if (e.target.checked) {
                                      prefs.push(pref);
                                    } else {
                                      const index = prefs.indexOf(pref);
                                      if (index > -1) prefs.splice(index, 1);
                                    }
                                    setDatosMultiPaso(prev => ({
                                      ...prev,
                                      paso3: { ...prev.paso3, preferencias: prefs }
                                    }));
                                  }}
                                />
                                <span className="text-sm">{pref}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Botones de navegación */}
                    <div className="flex justify-between pt-6 border-t">
                      <button
                        type="button"
                        onClick={() => setPasoActual(Math.max(1, pasoActual - 1))}
                        disabled={pasoActual === 1}
                        className="flex items-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Anterior
                      </button>
                      
                      {pasoActual < 3 ? (
                        <button
                          type="button"
                          onClick={() => setPasoActual(Math.min(3, pasoActual + 1))}
                          className="flex items-center gap-2 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Siguiente
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                          Completar Registro
                        </button>
                      )}
                    </div>
                  </form>
                </div>
                
                {/* Vista del estado completo */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">Datos del formulario completo:</h5>
                  
                  {/* Resumen visual por paso */}
                  <div className="space-y-4">
                    {/* Paso 1 */}
                    <div className={`p-3 rounded-lg border-2 ${pasoActual >= 1 ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-gray-100'}`}>
                      <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                        {pasoActual > 1 ? <CheckCircle className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4 rounded-full bg-orange-500"></div>}
                        👤 Información Personal
                      </h6>
                      <div className="text-xs space-y-1">
                        <div>Nombre: <span className="font-mono">{datosMultiPaso.paso1.nombre || '(vacío)'}</span></div>
                        <div>Apellido: <span className="font-mono">{datosMultiPaso.paso1.apellido || '(vacío)'}</span></div>
                        <div>F. Nacimiento: <span className="font-mono">{datosMultiPaso.paso1.fechaNacimiento || '(vacío)'}</span></div>
                      </div>
                    </div>
                    
                    {/* Paso 2 */}
                    <div className={`p-3 rounded-lg border-2 ${pasoActual >= 2 ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-gray-100'}`}>
                      <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                        {pasoActual > 2 ? <CheckCircle className="w-4 h-4 text-green-500" /> : pasoActual === 2 ? <div className="w-4 h-4 rounded-full bg-orange-500"></div> : <div className="w-4 h-4 rounded-full bg-gray-300"></div>}
                        🏠 Dirección
                      </h6>
                      <div className="text-xs space-y-1">
                        <div>Dirección: <span className="font-mono">{datosMultiPaso.paso2.direccion || '(vacío)'}</span></div>
                        <div>Ciudad: <span className="font-mono">{datosMultiPaso.paso2.ciudad || '(vacío)'}</span></div>
                        <div>Código Postal: <span className="font-mono">{datosMultiPaso.paso2.codigoPostal || '(vacío)'}</span></div>
                      </div>
                    </div>
                    
                    {/* Paso 3 */}
                    <div className={`p-3 rounded-lg border-2 ${pasoActual >= 3 ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-gray-100'}`}>
                      <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                        {pasoActual === 3 ? <div className="w-4 h-4 rounded-full bg-orange-500"></div> : <div className="w-4 h-4 rounded-full bg-gray-300"></div>}
                        📞 Contacto
                      </h6>
                      <div className="text-xs space-y-1">
                        <div>Teléfono: <span className="font-mono">{datosMultiPaso.paso3.telefono || '(vacío)'}</span></div>
                        <div>Email: <span className="font-mono">{datosMultiPaso.paso3.emailContacto || '(vacío)'}</span></div>
                        <div>Preferencias: <span className="font-mono">{datosMultiPaso.paso3.preferencias.length} seleccionadas</span></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* JSON completo */}
                  <div className="mt-4">
                    <h6 className="font-medium text-sm mb-2">JSON del formulario:</h6>
                    <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto max-h-32">
{JSON.stringify(datosMultiPaso, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Código del ejemplo */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">📝 Código del Formulario Multi-paso</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
{`// Estado para manejar los pasos
const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState({
  step1: { name: '', lastName: '', birthDate: '' },
  step2: { address: '', city: '', zipCode: '' },
  step3: { phone: '', email: '', preferences: [] }
});

// Validación por paso
const validateStep = (step: number): boolean => {
  switch (step) {
    case 1:
      return formData.step1.name && formData.step1.lastName;
    case 2:
      return formData.step2.address && formData.step2.city;
    case 3:
      return formData.step3.phone && formData.step3.email;
    default:
      return false;
  }
};

// Navegación entre pasos
const nextStep = () => {
  if (validateStep(currentStep)) {
    setCurrentStep(prev => Math.min(3, prev + 1));
  } else {
    alert('Por favor completa todos los campos requeridos');
  }
};

const prevStep = () => {
  setCurrentStep(prev => Math.max(1, prev - 1));
};

// Componente de progreso
const ProgressBar = ({ current, total }: { current: number, total: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: \`\${(current / total) * 100}%\` }}
    />
  </div>
);

// Render condicional del contenido
const renderStepContent = () => {
  switch (currentStep) {
    case 1:
      return <PersonalInfoStep data={formData.step1} onChange={updateStep1} />;
    case 2:
      return <AddressStep data={formData.step2} onChange={updateStep2} />;
    case 3:
      return <ContactStep data={formData.step3} onChange={updateStep3} />;
    default:
      return null;
  }
};`}
              </pre>
            </div>

            {/* Tips para formularios multi-paso */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-blue-600" />
                🧭 Mejores Prácticas para Multi-paso
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Indicador de progreso claro:</strong> Muestra cuántos pasos quedan y en cuál está</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Validación por paso:</strong> No permitas avanzar con datos inválidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Navegación bidireccional:</strong> Permite ir atrás para corregir información</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Persistencia:</strong> Guarda el progreso localmente por si el usuario cierra la página</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Resumen final:</strong> Muestra todos los datos antes del envío definitivo</span>
                </li>
              </ul>
            </div>
          </div>
        );

      /* ------------------------- MANEJO DE ARCHIVOS ------------------------- */
      case 'archivos':
        return (
          <div className="space-y-6">
            {/* Introducción a manejo de archivos */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-orange-600" />
                Manejo de Archivos y Drag & Drop
              </h3>
              <p className="text-gray-600 mb-4">
                El manejo de archivos es fundamental en aplicaciones modernas. 
                Aprende a implementar drag & drop, previsualización, validación y progreso de subida.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Drag & Drop</h4>
                  <p className="text-sm text-blue-700">
                    Interfaz intuitiva para arrastrar y soltar archivos.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Previsualización</h4>
                  <p className="text-sm text-green-700">
                    Muestra previews de imágenes y información de archivos.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Validación</h4>
                  <p className="text-sm text-purple-700">
                    Controla tipo, tamaño y cantidad de archivos permitidos.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo interactiva de drag & drop */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-orange-600" />
                🎮 Demo: Subida de Archivos Avanzada
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Zona de drag & drop */}
                <div className="space-y-4">
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 hover:bg-orange-50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h5 className="text-lg font-medium text-gray-700 mb-2">
                      Arrastra archivos aquí
                    </h5>
                    <p className="text-sm text-gray-500 mb-4">
                      O haz clic para seleccionar archivos
                    </p>
                    <p className="text-xs text-gray-400">
                      Admite: JPG, PNG, PDF (máx. 5MB)
                    </p>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className="hidden"
                    />
                  </div>
                  
                  {/* Archivo seleccionado */}
                  {archivo && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h6 className="font-medium">Archivo seleccionado:</h6>
                        <button
                          onClick={() => {
                            setArchivo(null);
                            setPreviewUrl('');
                            setUploadProgress(0);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          {archivo.type.startsWith('image/') ? (
                            <img 
                              src={previewUrl} 
                              alt="Preview" 
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <FileText className="w-6 h-6 text-blue-600" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <p className="font-medium text-sm">{archivo.name}</p>
                          <p className="text-xs text-gray-500">
                            {(archivo.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {archivo.type || 'Tipo desconocido'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Barra de progreso */}
                      {uploadProgress > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Subiendo archivo...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{width: `${uploadProgress}%`}}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {uploadProgress === 100 && (
                        <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
                          <CheckCircle className="w-4 h-4" />
                          Archivo subido exitosamente
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Vista previa expandida para imágenes */}
                  {previewUrl && archivo?.type.startsWith('image/') && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h6 className="font-medium mb-3">Vista previa:</h6>
                      <img 
                        src={previewUrl} 
                        alt="Vista previa"
                        className="w-full max-h-64 object-contain rounded-lg border"
                      />
                    </div>
                  )}
                </div>
                
                {/* Panel de información y controles */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h6 className="font-medium mb-3">Configuración de subida:</h6>
                    
                    <div className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-orange-600 rounded" />
                        <span className="text-sm">Redimensionar imágenes automáticamente</span>
                      </label>
                      
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-orange-600 rounded" />
                        <span className="text-sm">Convertir a WebP</span>
                      </label>
                      
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-orange-600 rounded" />
                        <span className="text-sm">Generar thumbnails</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Estadísticas del archivo */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h6 className="font-medium mb-3">Información técnica:</h6>
                    
                    {archivo ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Nombre:</span>
                          <span className="font-mono text-xs">{archivo.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tamaño:</span>
                          <span className="font-mono">{(archivo.size / 1024).toFixed(1)} KB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tipo MIME:</span>
                          <span className="font-mono text-xs">{archivo.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Última modificación:</span>
                          <span className="font-mono text-xs">
                            {new Date(archivo.lastModified).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No hay archivo seleccionado</p>
                    )}
                  </div>
                  
                  {/* Validaciones */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h6 className="font-medium mb-3">Validaciones:</h6>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {archivo && archivo.size <= 5 * 1024 * 1024 ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm">Tamaño menor a 5MB</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {archivo && (archivo.type.startsWith('image/') || archivo.type === 'application/pdf') ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm">Tipo de archivo permitido</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {archivo ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm">Archivo seleccionado</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Acciones */}
                  <div className="space-y-2">
                    <button
                      disabled={!archivo}
                      className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Subir Archivo
                    </button>
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Seleccionar Otro Archivo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Código del ejemplo */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">📝 Implementación de Drag & Drop</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
{`import { useRef, useState } from 'react';

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manejar drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  // Procesar archivo seleccionado
  const processFile = (selectedFile: File) => {
    // Validar tipo y tamaño
    if (!validateFile(selectedFile)) return;
    
    setFile(selectedFile);
    
    // Generar preview para imágenes
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
    
    // Simular progreso de subida
    simulateUpload();
  };

  // Validar archivo
  const validateFile = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (file.size > maxSize) {
      alert('El archivo es demasiado grande (máx. 5MB)');
      return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
      alert('Tipo de archivo no permitido');
      return false;
    }
    
    return true;
  };

  // Simular progreso de subida
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50"
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) processFile(file);
        }}
        accept="image/*,.pdf"
        className="hidden"
      />
      
      {file ? (
        <FilePreview file={file} previewUrl={previewUrl} />
      ) : (
        <DropZoneContent />
      )}
      
      {uploadProgress > 0 && (
        <ProgressBar progress={uploadProgress} />
      )}
    </div>
  );
}`}
              </pre>
            </div>

            {/* Casos de uso avanzados */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">🎯 Casos de Uso Avanzados</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3">Múltiples Archivos</h5>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">documento1.pdf</span>
                        <button className="text-red-500"><X className="w-4 h-4" /></button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">imagen.jpg</span>
                        <button className="text-red-500"><X className="w-4 h-4" /></button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">video.mp4</span>
                        <button className="text-red-500"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <button className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-orange-500">
                      + Agregar más archivos
                    </button>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-3">Upload a Cloud Storage</h5>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <Upload className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">AWS S3</p>
                          <p className="text-xs text-gray-500">Subida directa al bucket</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                          <Upload className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Cloudinary</p>
                          <p className="text-xs text-gray-500">Optimización automática</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                          <Upload className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Firebase Storage</p>
                          <p className="text-xs text-gray-500">Integración con Auth</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips para manejo de archivos */}
            <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Upload className="w-5 h-5 text-teal-600" />
                📁 Mejores Prácticas para Archivos
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Validación client-side Y server-side:</strong> Nunca confíes solo en la validación frontend</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Límites de tamaño claros:</strong> Informa al usuario las restricciones antes de la subida</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Feedback visual:</strong> Muestra progreso, previews y estado de validación</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Manejo de errores:</strong> Proporciona mensajes claros cuando algo falla</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Optimización:</strong> Comprime imágenes y usa formatos modernos como WebP</span>
                </li>
              </ul>
            </div>
          </div>
        );

      /* --------------------------- SERVER ACTIONS --------------------------- */
      case 'serveractions':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">
                Server Actions en Next.js 14+
              </h3>

              {/* Ejemplo 1 */}
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm mb-6">
                {`// app/actions.ts
'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mínimo 10 caracteres')
});

export async function createContact(prevState: any, formData: FormData) {
  // Validar datos
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos inválidos. Por favor revisa el formulario.'
    };
  }

  try {
    // Guardar en base de datos
    // await db.contact.create({ data: validatedFields.data });

    // Revalidar caché
    revalidatePath('/contacts');
  } catch (error) {
    return { message: 'Error de base de datos: No se pudo crear el contacto.' };
  }

  // Redireccionar tras éxito
  redirect('/contacts/success');
}`}
              </pre>

              {/* Ejemplo 2 */}
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`// app/contact/form.tsx
'use client'

import { useFormState } from 'react-dom';
import { createContact } from '@/app/actions';

const initialState = { errors: {}, message: null };

export function ContactForm() {
  const [state, dispatch] = useFormState(createContact, initialState);

  return (
    <form action={dispatch} className="space-y-4">
      {/* ...campos... */}
      {state.message && <p className="text-red-500">{state.message}</p>}
      <button type="submit" className="btn-primary">Enviar</button>
    </form>
  );
}`}
              </pre>
            </div>
          </div>
        );

      /* ----------------------- OPTIMIZACIÓN Y UX --------------------------- */
      case 'optimizacion':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-purple-600" />
                Optimización de Formularios y UX
              </h3>
              <p className="text-gray-600 mb-4">
                La optimización de formularios es crucial para una buena experiencia de usuario. 
                Incluye debouncing, auto-guardado, validación en tiempo real y métricas de rendimiento.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    Debouncing
                  </h4>
                  <p className="text-sm text-purple-700">
                    Reduce las llamadas innecesarias al servidor con delays inteligentes.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Auto-guardado
                  </h4>
                  <p className="text-sm text-green-700">
                    Guarda automáticamente el progreso para evitar pérdida de datos.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Métricas
                  </h4>
                  <p className="text-sm text-blue-700">
                    Monitorea rendimiento y experiencia del usuario en tiempo real.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo interativa */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-purple-600" />
                🎮 Demo de Debouncing Interactivo
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">Prueba el debouncing:</h5>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Buscar usuarios (con debounce de 500ms):
                      </label>
                      <input
                        type="text"
                        value={debounceInput}
                        onChange={(e) => setDebounceInput(e.target.value)}
                        placeholder="Escribe para buscar..."
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        La búsqueda se ejecuta solo después de dejar de escribir por 500ms
                      </p>
                    </div>

                    <div className="bg-white border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Estado actual:</span>
                        {debounceInput !== debouncedValue && (
                          <span className="text-yellow-600 text-xs flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            Esperando...
                          </span>
                        )}
                      </div>
                      <div className="text-sm space-y-1">
                        <div>Input actual: <code className="bg-gray-100 px-1 rounded">{debounceInput || '(vacío)'}</code></div>
                        <div>Valor procesado: <code className="bg-gray-100 px-1 rounded">{debouncedValue || '(vacío)'}</code></div>
                      </div>
                    </div>

                    {debouncedValue && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-800">Resultados de búsqueda:</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 p-2 bg-white rounded">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">JD</span>
                            </div>
                            <span>Juan Díaz relacionado con "{debouncedValue}"</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-white rounded">
                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">AM</span>
                            </div>
                            <span>Ana Martín relacionada con "{debouncedValue}"</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">Análisis de rendimiento:</h5>
                  <div className="space-y-3">
                    <div className="bg-white rounded p-3">
                      <div className="text-sm font-medium mb-2">Llamadas al servidor evitadas:</div>
                      <div className="text-2xl font-bold text-green-600">
                        {debounceInput.length > 0 ? Math.max(0, debounceInput.length - 1) : 0}
                      </div>
                      <div className="text-xs text-gray-500">
                        Sin debounce: {debounceInput.length} llamadas
                      </div>
                    </div>

                    <div className="bg-white rounded p-3">
                      <div className="text-sm font-medium mb-2">Tiempo de espera activo:</div>
                      <div className={`text-lg font-bold ${
                        debounceInput !== debouncedValue ? 'text-yellow-600' : 'text-gray-400'
                      }`}>
                        {debounceInput !== debouncedValue ? '⏳ 500ms' : '✅ Inactivo'}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <div className="text-sm font-medium text-blue-800 mb-1">💡 Ventajas:</div>
                      <ul className="text-xs text-blue-700 space-y-1">
                        <li>• Reduce carga del servidor en {Math.max(0, debounceInput.length - 1)} llamadas</li>
                        <li>• Mejora la experiencia de usuario</li>
                        <li>• Evita resultados intermedios</li>
                        <li>• Conserva ancho de banda</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   JSX                                      */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Tutorial de Formularios Avanzados en React
          </h1>
          <p className="text-lg text-gray-600">
            Desde los fundamentos hasta técnicas modernas con Next.js y Server Actions.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Barra lateral */}
          <aside className="lg:w-1/4">
            <nav className="sticky top-8 space-y-2">
              {secciones.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSeccionActiva(s.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                    seccionActiva === s.id
                      ? 'bg-orange-500 text-white shadow'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <s.icon size={20} />
                  <span className="font-semibold">{s.titulo}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Contenido principal */}
          <main className="lg:w-3/4">{renderContenido()}</main>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>¿Necesitas más ejemplos o tienes preguntas específicas?</p>
          <p className="mt-1">
            Este tutorial cubre desde conceptos básicos hasta técnicas avanzadas.
          </p>
        </footer>
      </div>
    </div>
  );
}
