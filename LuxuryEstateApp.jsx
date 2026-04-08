import React, { useState, useEffect, useMemo } from 'react';
import { 
  Layout, Menu, Button, Card, Row, Col, Typography, Input, 
  Badge, Modal, Form, message, Carousel, Empty, Tabs, 
  Divider, InputNumber, Drawer, Radio, Space, Spin, Tooltip
} from 'antd';
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  HomeOutlined, 
  LogoutOutlined, 
  PhoneOutlined, 
  CreditCardOutlined, 
  BankOutlined, 
  DollarOutlined, 
  WhatsAppOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
  StarOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  LineChartOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// --- CONFIGURACIÓN DE DATOS ---
const WHATSAPP_NUMBER = "+54364369163";
const apiKey = ""; // La plataforma proporciona la clave automáticamente

const CATEGORIES = [
  { key: 'all', label: 'Todas las Gamas' },
  { key: 'social', label: 'Vivienda Social y Emergencia' },
  { key: 'modern', label: 'Dúplex, PH y Lofts' },
  { key: 'luxury', label: 'Mansiones y Ultra Residencias' }
];

const CASAS_DATA = [
  {
    id: 1,
    category: 'social',
    title: 'Departamentos de Interés Social',
    price: 45000,
    description: 'Solución habitacional eficiente con diseño optimizado para familias jóvenes.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    category: 'social',
    title: 'Mediaguas - Vivienda de Madera',
    price: 12000,
    description: 'Viviendas de emergencia fabricadas en madera tratada, rápida instalación y funcionalidad inmediata.',
    image: 'https://images.unsplash.com/photo-1449156001447-fd698256f48b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    category: 'social',
    title: 'Monoambientes Periféricos',
    price: 28000,
    description: 'Ideal para primera vivienda o inversión. Espacios funcionales y duraderos en zonas en desarrollo.',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 13,
    category: 'social',
    title: 'Viviendas Prefabricadas Básicas',
    price: 18500,
    description: 'Modelos modulares de alta resistencia y bajo costo. Instalación técnica garantizada en 72 horas.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    category: 'modern',
    title: 'Dúplex Modernos',
    price: 85000,
    description: 'Arquitectura vanguardista con dos niveles y acabados de alta calidad para la vida urbana.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    category: 'modern',
    title: 'Lofts Urbanos',
    price: 72000,
    description: 'Concepto abierto en el corazón de la ciudad. Espacios amplios, techos altos y gran luminosidad.',
    image: 'https://images.unsplash.com/photo-1536376073347-913a277432fb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    category: 'modern',
    title: 'PH (Propiedad Horizontal) Renovados',
    price: 95000,
    description: 'Unidades con encanto histórico y renovación total a estrenar. Sin expensas y con patio propio.',
    image: 'https://images.unsplash.com/photo-1512914890251-2f96a9b0bbe2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 7,
    category: 'modern',
    title: 'Pisos de 3 Ambientes',
    price: 125000,
    description: 'Departamentos exclusivos por piso, gran balcón aterrazado y suite principal con vestidor.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 8,
    category: 'luxury',
    title: 'Residencias Ultra',
    price: 1200000,
    description: 'El pináculo del lujo. Tecnología smart-home total, helipuerto privado y vistas de 360 grados.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 14,
    category: 'luxury',
    title: 'Villas Mediterráneas de Lujo',
    price: 890000,
    description: 'Diseño clásico europeo con jardines paisajistas, columnas de mármol y acceso directo a costa privada.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 9,
    category: 'luxury',
    title: 'Mansiones Contemporáneas',
    price: 450000,
    description: 'Residencias de gran escala con líneas modernas, ventanales panorámicos y acabados de mármol.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 10,
    category: 'luxury',
    title: 'Palacetes Urbanos',
    price: 680000,
    description: 'Lujo clásico redefinido. Ubicados en las zonas más exclusivas, con detalles arquitectónicos históricos.',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 11,
    category: 'luxury',
    title: 'Country Houses de Élite',
    price: 250000,
    description: 'Residencia exclusiva rodeada de naturaleza con máximo confort, piscina y privacidad absoluta.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 12,
    category: 'luxury',
    title: 'Diseño Minimalista Extremo',
    price: 320000,
    description: 'Obra maestra donde el cristal y el hormigón se fusionan en un entorno único.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800'
  }
];

// --- FUNCIONES GEMINI ---
async function fetchGemini(prompt, systemPrompt = "") {
  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      if (i === 4) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Estados para IA
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const [analysisModal, setAnalysisModal] = useState({ open: false, data: null, loading: false });

  useEffect(() => {
    const savedUser = localStorage.getItem('luxury_house_user');
    const savedCart = localStorage.getItem('luxury_house_cart');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('luxury_house_cart', JSON.stringify(cart));
  }, [cart]);

  // Lógica de IA: Recomendador de Hogar
  const handleAiSearch = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);
    try {
      const systemPrompt = `Eres un asistente experto en bienes raíces de "Luxury Estate". Basándote en la descripción del usuario, selecciona las 3 mejores propiedades de nuestro catálogo: ${JSON.stringify(CASAS_DATA)}. Responde en español con un tono profesional, elegante y persuasivo. Usa Markdown para el formato.`;
      const result = await fetchGemini(`Encuéntrame un hogar ideal basándote en: ${aiInput}`, systemPrompt);
      setAiResponse(result);
    } catch (error) {
      message.error("Error al conectar con el Asistente IA");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Lógica de IA: Analista de Propiedad
  const handleAnalyzeProperty = async (property) => {
    setAnalysisModal({ open: true, data: null, loading: true });
    try {
      const prompt = `Analiza detalladamente esta propiedad: ${JSON.stringify(property)}. Proporciona 1) Potencial de revalorización en 5 años, 2) Ideas de reformas inteligentes para aumentar su valor y 3) Perfil de inquilino ideal si se usa para renta. Sé muy específico.`;
      const result = await fetchGemini(prompt, "Eres un analista de inversiones inmobiliarias de élite.");
      setAnalysisModal({ open: true, data: result, loading: false });
    } catch (error) {
      message.error("No se pudo generar el análisis.");
      setAnalysisModal(prev => ({ ...prev, loading: false }));
    }
  };

  const handleAuth = (values) => {
    if (authMode === 'register') {
      const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
      if (users.find(u => u.username === values.username)) {
        return message.error('El usuario ya existe');
      }
      users.push(values);
      localStorage.setItem('registered_users', JSON.stringify(users));
      message.success('Registro exitoso. Ahora puedes iniciar sesión.');
      setAuthMode('login');
    } else {
      const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const found = users.find(u => u.username === values.username && u.password === values.password);
      if (found) {
        setUser(found);
        localStorage.setItem('luxury_house_user', JSON.stringify(found));
        setIsAuthModalOpen(false);
        message.success(`Bienvenido de nuevo, ${found.username}`);
      } else {
        message.error('Credenciales inválidas');
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('luxury_house_user');
    message.info('Sesión cerrada');
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    message.success(`${product.title} añadido al carrito`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = useMemo(() => cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0), [cart]);

  const handleCheckout = () => {
    const orderDetails = cart.map(item => `• ${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString()}`).join('%0A');
    const totalMsg = `*TOTAL: $${cartTotal.toLocaleString()}*`;
    const paymentMsg = `Método de Pago: ${paymentMethod.toUpperCase()}`;
    const userMsg = `Cliente: ${user?.username || 'Invitado'}`;
    
    const finalMsg = `*NUEVA SOLICITUD DE COMPRA*%0A------------------%0A${userMsg}%0A%0A*Detalle:*%0A${orderDetails}%0A%0A------------------%0A${totalMsg}%0A${paymentMsg}%0A------------------%0APor favor, contactarme para coordinar la documentación.`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${finalMsg}`, '_blank');
    
    setCart([]);
    setIsCheckoutModalOpen(false);
    setIsCartOpen(false);
    Modal.success({
      title: '¡Pedido enviado!',
      content: 'Tu pedido ha sido procesado. Serás redirigido a WhatsApp para finalizar la coordinación con un asesor.',
    });
  };

  const filteredCasas = useMemo(() => {
    if (activeCategory === 'all') return CASAS_DATA;
    return CASAS_DATA.filter(casa => casa.category === activeCategory);
  }, [activeCategory]);

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* HEADER */}
      <Header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 bg-white shadow-md h-16">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveCategory('all')}>
          <HomeOutlined className="text-2xl text-blue-600" />
          <Title level={4} style={{ margin: 0, fontWeight: 800, letterSpacing: -1 }}>LUXURY ESTATE</Title>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            type="primary" 
            shape="round" 
            icon={<RobotOutlined />} 
            className="bg-purple-600 border-none shadow-md hidden sm:flex"
            onClick={() => setIsAiModalOpen(true)}
          >
            Asistente IA ✨
          </Button>

          <Badge count={cart.length} offset={[0, 0]}>
            <Button 
              type="text" 
              icon={<ShoppingCartOutlined className="text-xl" />} 
              onClick={() => setIsCartOpen(true)}
            />
          </Badge>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Text strong className="hidden md:inline">Hola, {user.username}</Text>
              <Button type="primary" danger ghost icon={<LogoutOutlined />} onClick={handleLogout} />
            </div>
          ) : (
            <Button type="primary" icon={<UserOutlined />} onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}>
              Ingresar
            </Button>
          )}
        </div>
      </Header>

      <Content>
        {/* BOTÓN FLOTANTE IA PARA MÓVILES */}
        <div className="fixed bottom-6 right-6 z-50 sm:hidden">
          <Button 
            type="primary" 
            shape="circle" 
            size="large" 
            icon={<RobotOutlined />} 
            className="w-16 h-16 bg-purple-600 shadow-2xl border-none"
            onClick={() => setIsAiModalOpen(true)}
          />
        </div>

        {/* HERO SECTION */}
        <section className="relative h-[600px] overflow-hidden">
          <Carousel autoplay effect="fade">
            {CASAS_DATA.filter(item => [8, 14, 10].includes(item.id)).map(item => (
              <div key={item.id}>
                <div 
                  className="h-[600px] bg-cover bg-center flex items-center px-8 md:px-24"
                  style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), transparent), url(${item.image})` }}
                >
                  <div className="max-w-2xl text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <StarOutlined className="text-yellow-400" />
                      <Text className="text-blue-300 uppercase tracking-widest font-bold">Inversiones de Clase Mundial</Text>
                    </div>
                    <Title level={1} style={{ color: 'white', fontSize: '4rem', marginBottom: 16, lineHeight: 1 }}>{item.title}</Title>
                    <Paragraph className="text-xl opacity-90 mb-8 font-light">{item.description}</Paragraph>
                    <Button type="primary" size="large" className="h-14 px-12 text-lg rounded-full shadow-lg" onClick={() => addToCart(item)}>
                      Reservar Unidad
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </section>

        {/* CATÁLOGO PRINCIPAL */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <Title level={2} style={{ fontSize: '2.5rem' }}>Portafolio de Propiedades</Title>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-2 rounded-full"></div>
            <Paragraph className="mt-4 text-gray-500 text-lg">Descubra su próximo hogar con nuestra tecnología de búsqueda inteligente ✨.</Paragraph>
          </div>

          <Tabs 
            activeKey={activeCategory} 
            onChange={setActiveCategory} 
            centered 
            size="large"
            className="mb-12"
          >
            {CATEGORIES.map(cat => (
              <TabPane tab={cat.label} key={cat.key} />
            ))}
          </Tabs>

          <Row gutter={[32, 40]}>
            {filteredCasas.map(casa => (
              <Col xs={24} sm={12} lg={8} key={casa.id}>
                <Card
                  hoverable
                  className="overflow-hidden rounded-3xl border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-white"
                  cover={
                    <div className="relative group overflow-hidden h-80">
                      <img 
                        alt={casa.title} 
                        src={casa.image} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 gap-2">
                        <Button type="primary" block shape="round" icon={<PlusOutlined />} size="large" onClick={() => addToCart(casa)}>
                          Añadir al Carrito
                        </Button>
                        <Button block shape="round" icon={<LineChartOutlined />} size="large" className="bg-white/20 text-white border-white/40 hover:bg-white/40" onClick={() => handleAnalyzeProperty(casa)}>
                          Analista IA ✨
                        </Button>
                      </div>
                      <div className="absolute top-5 left-5">
                        <Badge 
                          count={casa.price > 500000 ? 'LUJO SUPREMO' : casa.category.toUpperCase()} 
                          style={{ 
                            backgroundColor: casa.price > 500000 ? '#722ed1' : casa.category === 'social' ? '#52c41a' : '#1677ff',
                            padding: '0 12px',
                            height: 28,
                            lineHeight: '28px',
                            borderRadius: '14px'
                          }} 
                        />
                      </div>
                    </div>
                  }
                >
                  <div className="flex justify-between items-start mb-3">
                    <Title level={4} style={{ margin: 0, fontSize: '1.25rem' }}>{casa.title}</Title>
                    <div className="text-right">
                      <Text strong className="text-blue-600 text-xl block">${casa.price.toLocaleString()}</Text>
                    </div>
                  </div>
                  <Paragraph type="secondary" ellipsis={{ rows: 2 }} className="mb-4">{casa.description}</Paragraph>
                  <Divider className="my-4" />
                  <Button block type="primary" ghost size="large" className="rounded-xl border-2 h-12" onClick={() => addToCart(casa)}>
                    Consultar Propiedad
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>

      <Footer className="bg-gray-900 text-white py-20 px-8">
        <Row gutter={[48, 40]} className="max-w-7xl mx-auto">
          <Col xs={24} md={10}>
            <Title level={3} style={{ color: 'white', marginBottom: 24 }}>LUXURY ESTATE</Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Líderes regionales en desarrollo habitacional. Ahora potenciados por Inteligencia Artificial para ofrecerle el hogar que mejor se adapta a su estilo de vida.
            </Paragraph>
          </Col>
          <Col xs={24} md={7}>
            <Title level={4} style={{ color: 'white', marginBottom: 24 }}>Atención Personalizada</Title>
            <div className="space-y-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <div className="flex items-center gap-3">
                <WhatsAppOutlined className="text-2xl text-green-500" />
                <Text style={{ color: 'white' }}>+54 3643 69163</Text>
              </div>
              <div className="flex items-center gap-3">
                <HomeOutlined className="text-2xl" />
                <Text style={{ color: 'white' }}>Sede Central: Distrito Financiero</Text>
              </div>
            </div>
          </Col>
          <Col xs={24} md={7}>
            <Title level={4} style={{ color: 'white', marginBottom: 24 }}>Presencia Digital</Title>
            <Space size="large">
              <Button type="primary" shape="circle" size="large" icon={<WhatsAppOutlined />} className="bg-green-600 border-none" />
              <Button type="primary" shape="circle" size="large" icon={<UserOutlined />} />
              <Button type="primary" shape="circle" size="large" icon={<HomeOutlined />} />
            </Space>
          </Col>
        </Row>
        <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', marginTop: 60 }} />
        <div className="text-center text-gray-500 mt-8">
          © 2026 Luxury Estate - Compromiso con la Excelencia Inmobiliaria.
        </div>
      </Footer>

      {/* MODAL ASISTENTE IA ✨ */}
      <Modal
        title={<span><RobotOutlined className="mr-2 text-purple-600" /> Búsqueda por Estilo de Vida ✨</span>}
        open={isAiModalOpen}
        onCancel={() => { setIsAiModalOpen(false); setAiResponse(null); setAiInput(""); }}
        footer={null}
        width={700}
        centered
        className="ai-modal"
      >
        <div className="py-4">
          <Paragraph className="text-gray-500 mb-6">
            Descríbenos quién eres y qué buscas. Por ejemplo: <i>"Soy un emprendedor soltero que busca un espacio moderno con mucha luz y cerca de la zona tecnológica"</i>. Nuestra IA encontrará las mejores opciones.
          </Paragraph>
          <Input.TextArea 
            rows={4} 
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Escriba su descripción aquí..."
            className="rounded-2xl p-4 border-2 focus:border-purple-500"
          />
          <Button 
            type="primary" 
            block 
            size="large" 
            onClick={handleAiSearch} 
            loading={isAiLoading}
            className="mt-4 h-12 rounded-xl bg-purple-600 border-none"
            icon={<ThunderboltOutlined />}
          >
            Generar Recomendaciones ✨
          </Button>

          {aiResponse && (
            <div className="mt-8 p-6 bg-purple-50 rounded-2xl border border-purple-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Title level={4} className="text-purple-800 mb-4">Análisis de la Inteligencia Artificial:</Title>
              <div className="markdown-content text-gray-700 leading-relaxed">
                {aiResponse.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* MODAL ANALISTA DE INVERSIÓN IA ✨ */}
      <Modal
        title={<span><LineChartOutlined className="mr-2 text-blue-600" /> Análisis de Inversión IA ✨</span>}
        open={analysisModal.open}
        onCancel={() => setAnalysisModal({ ...analysisModal, open: false })}
        footer={null}
        centered
        width={600}
      >
        {analysisModal.loading ? (
          <div className="flex flex-col items-center py-20">
            <Spin size="large" />
            <Text className="mt-4 text-gray-400">Calculando proyecciones de mercado...</Text>
          </div>
        ) : (
          <div className="py-4 animate-in fade-in duration-500">
            <Title level={4} className="mb-4">Perspectiva Estratégica</Title>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <Paragraph className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {analysisModal.data}
              </Paragraph>
            </div>
            <div className="mt-6 flex justify-end">
              <Button type="primary" className="rounded-xl h-10 px-8" onClick={() => setAnalysisModal({ ...analysisModal, open: false })}>
                Entendido
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL AUTH */}
      <Modal
        title={authMode === 'login' ? 'Bienvenido a Luxury Estate' : 'Cree su Perfil de Inversor'}
        open={isAuthModalOpen}
        onCancel={() => setIsAuthModalOpen(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden"
      >
        <Form layout="vertical" onFinish={handleAuth} className="mt-6">
          <Form.Item name="username" label="Usuario / Email" rules={[{ required: true, message: 'Requerido' }]}>
            <Input prefix={<UserOutlined />} placeholder="Su identificador" size="large" className="rounded-xl" />
          </Form.Item>
          <Form.Item name="password" label="Clave de Acceso" rules={[{ required: true, message: 'Requerido' }]}>
            <Input.Password placeholder="Su contraseña" size="large" className="rounded-xl" />
          </Form.Item>
          <Button type="primary" block size="large" htmlType="submit" className="h-12 rounded-xl text-lg font-bold">
            {authMode === 'login' ? 'Acceder al Portal' : 'Confirmar Registro'}
          </Button>
          <div className="text-center mt-6">
            <Button type="link" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-blue-600">
              {authMode === 'login' ? '¿No tiene cuenta? Iníciese aquí' : '¿Ya es miembro? Acceso aquí'}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* CARRITO */}
      <Drawer
        title={<Title level={4} style={{ margin: 0 }}>Portfolio Seleccionado</Title>}
        placement="right"
        onClose={() => setIsCartOpen(false)}
        open={isCartOpen}
        width={window.innerWidth > 768 ? 480 : '100%'}
        className="luxury-drawer"
        footer={
          <div className="p-6 bg-white border-t-2">
            <div className="flex justify-between items-center mb-8">
              <Text style={{ fontSize: '1.2rem' }}>Total de Inversión:</Text>
              <Title level={2} type="success" style={{ margin: 0 }}>${cartTotal.toLocaleString()}</Title>
            </div>
            <Button 
              type="primary" 
              block 
              size="large" 
              className="h-16 text-xl font-bold rounded-2xl shadow-xl" 
              disabled={cart.length === 0}
              onClick={() => {
                if(!user) {
                  message.warning('Inicie sesión para proceder con la reserva');
                  setIsAuthModalOpen(true);
                  return;
                }
                setIsCheckoutModalOpen(true);
              }}
            >
              Confirmar Reserva
            </Button>
          </div>
        }
      >
        {cart.length === 0 ? (
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
            description="No ha seleccionado unidades aún" 
            className="mt-32" 
          />
        ) : (
          <div className="space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 p-5 bg-gray-50 rounded-2xl border-l-4 border-blue-500 shadow-sm">
                <img src={item.image} className="w-24 h-24 object-cover rounded-xl shadow-md" alt={item.title} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <Text strong style={{ fontSize: '1rem' }}>{item.title}</Text>
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeFromCart(item.id)} />
                  </div>
                  <Text type="secondary" className="block mt-1">${item.price.toLocaleString()}</Text>
                  <div className="flex items-center gap-4 mt-4">
                    <Button size="small" shape="circle" icon={<MinusOutlined />} onClick={() => updateQuantity(item.id, -1)} />
                    <Text strong style={{ fontSize: '1.1rem' }}>{item.quantity}</Text>
                    <Button size="small" shape="circle" icon={<PlusOutlined />} onClick={() => updateQuantity(item.id, 1)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Drawer>

      {/* PAGO */}
      <Modal
        title="Validación de Pago y Reserva"
        open={isCheckoutModalOpen}
        onCancel={() => setIsCheckoutModalOpen(false)}
        footer={null}
        width={650}
        centered
      >
        <div className="mb-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <Text className="text-blue-800">Usted está por reservar <b>{cart.length} unidad(es)</b> por un valor de <b>${cartTotal.toLocaleString()}</b>.</Text>
        </div>

        <Radio.Group 
          onChange={(e) => setPaymentMethod(e.target.value)} 
          value={paymentMethod} 
          className="w-full flex flex-col gap-4 mb-8"
        >
          <Radio.Button value="card" className="h-20 flex items-center p-6 w-full rounded-xl border-2">
            <CreditCardOutlined className="text-2xl mr-4" /> 
            <div>
              <Text strong className="block">Tarjeta de Crédito / Débito</Text>
              <Text type="secondary" size="small">Visa, Mastercard, Amex</Text>
            </div>
          </Radio.Button>
          <Radio.Button value="mercadopago" className="h-20 flex items-center p-6 w-full rounded-xl border-2">
            <DollarOutlined className="text-2xl mr-4" />
            <div>
              <Text strong className="block">Mercado Pago / Transferencia</Text>
              <Text type="secondary" size="small">Acreditación instantánea</Text>
            </div>
          </Radio.Button>
        </Radio.Group>

        <Form layout="vertical" onFinish={handleCheckout}>
          {paymentMethod === 'card' && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-500">
              <Form.Item label="Titular de la Cuenta" className="col-span-2">
                <Input placeholder="Como figura en la tarjeta" size="large" />
              </Form.Item>
              <Form.Item label="Número de Plástico">
                <Input prefix={<CreditCardOutlined />} placeholder="XXXX XXXX XXXX XXXX" size="large" />
              </Form.Item>
              <Form.Item label="Cód. Seguridad">
                <Input placeholder="CVV" maxLength={4} size="large" />
              </Form.Item>
            </div>
          )}
          <Divider />
          <Button 
            type="primary" 
            size="large" 
            htmlType="submit" 
            icon={<WhatsAppOutlined />} 
            block 
            className="h-20 text-xl bg-green-600 border-none hover:bg-green-700 rounded-2xl shadow-xl transform transition hover:scale-[1.02]"
          >
            Confirmar Reserva vía WhatsApp
          </Button>
          <div className="text-center mt-4">
            <Text type="secondary" className="text-xs">Sus datos están protegidos por encriptación de nivel bancario.</Text>
          </div>
        </Form>
      </Modal>

      <style>{`
        .ant-layout-header { border-bottom: 1px solid #f0f0f0; }
        .ant-carousel .slick-dots li button { width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; }
        .ant-carousel .slick-dots li.slick-active button { background: #1677ff; border-color: #1677ff; }
        .ant-tabs-tab { font-size: 1.1rem !important; }
        .ant-tabs-tab-active .ant-tabs-tab-btn { color: #1677ff !important; font-weight: 800 !important; }
        .ant-tabs-ink-bar { height: 4px !important; border-radius: 2px; }
        .ant-card { box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
        .ant-drawer-header { border-bottom: 2px solid #f0f2f5; }
        .ai-modal .ant-modal-content { border-radius: 32px; overflow: hidden; }
        .markdown-content p { margin-bottom: 12px; }
      `}</style>
    </Layout>
  );
}