-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-11-2024 a las 12:47:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cartvm`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `idCarrito` varchar(30) NOT NULL,
  `dniCliente` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `dniCliente` varchar(9) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `email` varchar(75) NOT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `administrador` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`dniCliente`, `nombre`, `direccion`, `email`, `pwd`, `administrador`) VALUES
('1234', 'Manolo', 'Direccion', 'correo@gmail.com', '$2y$10$YsDcT6mGvSitzjtDEjJuZuPVlEVWoDs3CVPWiRHpaOWzB9XN0kGxm', ''),
('12345678A', 'Juan Pérez', 'Calle Falsa 123', 'juan.perez@example.com', '$2y$10$9OnVS2v1U2UNisjpjARaqetnZKYUbIg5G3Cb0u5am35BGmrKnDDEO', ''),
('287384', 'Prueba', 'Calle 3', 'prueba@gmail.com', '$2y$10$4NnaUFkJC3GTb4CecCUNyOXNw.pbk2zA19e4zyACrqHSt5Sy.AXgm', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineascarro`
--

CREATE TABLE `lineascarro` (
  `idCarrito` varchar(30) NOT NULL,
  `nlinea` int(2) NOT NULL,
  `idProducto` int(6) NOT NULL,
  `cantidad` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineaspedidos`
--

CREATE TABLE `lineaspedidos` (
  `idPedido` int(4) NOT NULL,
  `nlinea` int(2) NOT NULL,
  `idProducto` int(6) DEFAULT NULL,
  `cantidad` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(4) NOT NULL,
  `fecha` date NOT NULL,
  `dirEntrega` varchar(50) NOT NULL,
  `nTarjeta` varchar(50) DEFAULT NULL,
  `fechaCaducidad` date DEFAULT NULL,
  `matriculaRepartidor` varchar(8) DEFAULT NULL,
  `dniCliente` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProducto` int(6) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `foto` varchar(50) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `tipo` enum('alimentos','limpieza','electronica') DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `etiquetas` varchar(100) DEFAULT NULL,
  `descripcion` varchar(320) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProducto`, `nombre`, `foto`, `marca`, `tipo`, `precio`, `etiquetas`, `descripcion`) VALUES
(1, 'Macarrones', '../img/macarron.png', 'gallo', 'alimentos', 0.79, 'pasta', 'Macarrones de alta calidad de la marca Gallo. Estos macarrones rayados son ideales para un buen plato de carbonara, boloñesa o menú vegetariano a base de verduras salteadas.'),
(2, 'Tallarines', '../img/tallarines.png', 'gallo', 'alimentos', 0.9, 'pasta', 'Pasta compuesta por una exclusiva mezcla de trigos seleccionados de la mejor calidad. No se pasa ni se pega, siempre al dente. Ideal para preparar tus recetas de pasta preferidas. '),
(3, 'Atun', '../img/atun.jpg', 'calvo', 'alimentos', 3.37, 'pescado', 'Al estar inmersos en aceite de girasol son capaces de conservar ese divino sabor y frescura que tanto le encanta; ideal para acompañar sus ensaladas, guisos e incluso crear deliciosos aperitivos para compartir en sus fiestas o reuniones.'),
(4, 'Sardinillas', '../img/sardinillas.jpg', 'dia', 'alimentos', 1.96, 'pescado', 'Conservar en lugar fresco y seco. Una vez abierto, mantener en refrigeración y consumir en el mismo día de su apertura.'),
(5, 'Mejillones', '../img/mejillones.webp', 'calvo', 'alimentos', 3.15, 'molusco', 'mejillones en escabeche DOP de las rías gallegas pack 3 lata 40 g neto escurrido'),
(6, 'Fideos', '../img/fideos.png', 'gallo', 'alimentos', 1.84, 'pasta', 'Gracias a su presentación tan fina y delicada será el alimento perfecto para combinar con sus sopas y cremas, ofreciéndoles a estas mucha más densidad en su consistencia.'),
(7, 'Galletas Cuadradas', '../img/galletas.jpg', 'gullon', 'alimentos', 4.55, 'galleta,dulce', 'Condiciones y/o fecha de consumo una vez abierto el envase: Almacenar en lugar fresco y seco. Proteger de los rayos solares. Una vez abierto, mantener en las mismas condiciones y cerrar después de cada uso.'),
(8, 'Barquillos', '../img/barquillos.jpg', 'cuetara', 'alimentos', 5.29, 'dulce', 'Deliciosos rollitos de barquillo perfectos para tomar con helados y ricos postres, así como para picotear a modo de aperitivo.'),
(9, 'Leche entera', '../img/leche.png', 'pascual', 'alimentos', 1.14, 'bebida,lacteo', 'La leche constituye un pilar de la alimentación desde el punto de vista nutricional porque es uno de los alimentos más nutritivos que existen. Ya que en su composición tienen una gran variedad de minerales y un correcto balance entre grasa, proteínas y carbohidratos que lo convierte en un alimento ideal para toda la fa'),
(10, 'Hamburguesa Completa', '../img/hamburguesa.jpg', 'Cart VM', 'alimentos', 6.2, 'precocinado,carne,pan,verdura', 'Hamburguesa de 110 g con jamón, queso, bacon, huevo, lechuga, tomate, cebolla, pepinillo y salsa burger.'),
(11, 'Detergente', '../img/detergente.jpg', 'Norit', 'limpieza', 7.34, 'liquido', 'Norit Complet Detergente 35 Lavados Detergente líquido con la máxima calidad que otorga una marca de prestigio como Norit. Hasta 35 lavados en profundidad, respetando todos los componentes del tejido.'),
(12, 'Suavizante aroma azul', '../img/suavizante.jpg', 'Flor', 'limpieza', 5.99, 'ropa,concentrado', 'El suavizante Flor concentrado deja en tu ropa una sensación de frescor ahora x12 veces más duradero. Descubre el frescor superior de Flor Azul. Déjate deleitar por el auténtico frescor de Flor Azul y disfruta del placer de una fragancia moderna que hará que tu ropa esté fresca y suave.'),
(13, 'Lejía normal', '../img/lejia.jpg', 'Neutrex', 'limpieza', 2.79, 'lavadora,ropa', 'Lejía Neutrex. Máxima blancura. Apto para lavadora, ropa y limpieza diaria.'),
(14, 'Limpiacristales', '../img/limpiacristales.jpg', 'Cristasol', 'limpieza', 1.89, 'cristalino,pistola', 'Multiusos recambio. Cristales más brillantes.\r\nEl Cristasol Cristalino ahora con nueva fórmula mejorada, respectivamente, con protección anti-manchas y efecto repelente del agua.\r\nSiempre 100% sin rastros.\r\nPara superficies brillantes durante más tiempo y una limpieza más fácil.\r\n\r\nCristasol Cristalino con amoniaco, di'),
(15, 'Fregona', '../img/fregona.jpg', 'Vileda', 'limpieza', 5.73, 'super absorbente,cabezal', 'Es muy resistente y limpia hasta la suciedad más incrustada. El material de la fregona, es decir las tiras, incorporan un 30% de microfibras que incrementa la absorción y capacidad de limpieza de la fregona. Además, seca los suelos rápida y eficazmente.'),
(16, 'PS5', '../img/ps5.webp', 'Sony', 'electronica', 850, 'consola,playstation', 'Disfruta de velocidades de fotogramas más altas y fluidas en una selección de juegos de PS4 y PS VR. Déjate sorprender con gráficos increíbles y experimenta nuevas funciones de PS5. Aprovecha la potencia de una unidad de estado sólido con E/S integradas y una CPU y GPU personalizadas que reinventan las reglas de lo que'),
(17, 'GeForce RTX 3060', '../img/gpu.webp', 'Gigabyte', 'electronica', 332.99, 'gpu,grafica', 'RTX.  IT’S ON. Disfruta de los mayores éxitos de ventas de hoy como nunca antes con la fidelidad visual del trazado de rayos en tiempo real y el rendimiento definitivo de DLSS con tecnología de IA.\r\n\r\nLA VICTORIA SE MIDE EN MILISEGUNDOS: NVIDIA Reflex ofrece la máxima ventaja competitiva. La latencia más baja. La mejor'),
(18, 'RAM 2 x 16GB', '../img/ram.jpg', 'Corsair', 'electronica', 85.99, 'vengance,ddr4,32gb,negro', 'Con diseños únicos y modernos, Corsair es una de las marcas más elegidas por los usuarios al momento de comprar una memoria ram. Cargar programas más rápido, aumentar la capacidad de responder y ejecutar aplicaciones de uso intensivo son algunas de las características y ventajas que tendrás al momento de adquirir esta '),
(19, 'SSD 1TB', '../img/discoduro.jpg', 'Samsung', 'electronica', 107.99, 'disco duro', 'Da rienda suelta a la potencia del Samsung PCIe 4.0 NVMe? SSD 980 PRO para un funcionamiento de siguiente nivel. Aprovechando la interfaz PCIe 4.0, el 980 PRO ofrece el doble de velocidad de transferencia de datos que PCIe 3.0 y, al mismo tiempo, es compatible con PCIe 3.0 para una mayor versatilidad. El disipador añad'),
(20, 'Cafetera', '../img/cafetera.jpg', 'Nespresso', 'electronica', 119.9, 'capsulas,cafe', 'Esenza Mini roja es nuestra máquina de café más compacta hasta la fecha, sin renunciar a un sabor de máxima calidad. Esta extraordinaria cafetera pequeña ofrece dos tamaños de taza programables, garantizando que pueda preparar el café perfecto, exactamente como a ti te gusta.\r\n\r\nTanto si prefieres un Espresso como un L');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`idCarrito`),
  ADD KEY `dniCliente` (`dniCliente`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`dniCliente`);

--
-- Indices de la tabla `lineascarro`
--
ALTER TABLE `lineascarro`
  ADD PRIMARY KEY (`idCarrito`,`nlinea`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `lineaspedidos`
--
ALTER TABLE `lineaspedidos`
  ADD PRIMARY KEY (`idPedido`,`nlinea`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`dniCliente`) REFERENCES `clientes` (`dniCliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `lineascarro`
--
ALTER TABLE `lineascarro`
  ADD CONSTRAINT `lineascarro_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lineascarro_ibfk_2` FOREIGN KEY (`idCarrito`) REFERENCES `carrito` (`idCarrito`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
