-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2021 at 05:35 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11
-- Author: Christian Yesael Ochoa Hernandez

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `minisuper`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `ID` int(10) UNSIGNED NOT NULL,
  `ZIP` int(5) NOT NULL,
  `Street` varchar(30) NOT NULL,
  `State` varchar(30) NOT NULL,
  `City` varchar(30) NOT NULL,
  `Country` varchar(30) NOT NULL,
  `Ext_number` int(7) NOT NULL,
  `Int_number` int(7) DEFAULT NULL,
  `FK_user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`ID`, `ZIP`, `Street`, `State`, `City`, `Country`, `Ext_number`, `Int_number`, `FK_user`) VALUES
(1, 44900, 'Ciruelo', 'Jalisco', 'Guadalajara', 'México', 1357, NULL, 20000001),
(2, 44340, 'Calzada Independencia Norte', 'Jalisco', 'Guadalajara', 'México', 1046, NULL, 20000005),
(3, 44240, 'Ruperto Martínez', 'Jalisco', 'Guadalajara', 'México', 1111, NULL, 20000004);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `FK_user` int(10) UNSIGNED NOT NULL,
  `FK_product` int(10) UNSIGNED NOT NULL,
  `Quantity` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `ID` tinyint(3) UNSIGNED NOT NULL,
  `Name` varchar(30) DEFAULT NULL,
  `Description` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `Name`, `Description`) VALUES
(1, 'Despensa básica', 'Despensa básica para el hogar.'),
(2, 'Medicamentos', 'Medicamentos y multivitamínicos.'),
(3, 'Higiénicos y limpieza', 'Productos de limpieza para el hogar.'),
(4, 'Jugos y bebidas', 'Jugos y bebidas para consumo.'),
(5, 'Carnes frías y lácteos', 'Embutidos, lacteos, carnes frias'),
(6, 'Mascotas', 'Alimento y productos para mascotas'),
(7, 'Juguetes', 'Juguetes.'),
(8, 'Vinos, cervezas y licores', 'Bebidas sólo para la venta a mayores de edad.'),
(9, 'Cuidado y belleza personal', 'Sección de productos de uso personal para la higine.');

-- --------------------------------------------------------

--
-- Table structure for table `discount_codes`
--

CREATE TABLE `discount_codes` (
  `Code` varchar(20) NOT NULL,
  `Value` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discount_codes`
--

INSERT INTO `discount_codes` (`Code`, `Value`) VALUES
('BRUNOCABALLO', 10),
('ADRIANACIEN', 30),
('EJEMPLOCIEN', 100),
('VIERNESFELIZ', 5),
('YOMEQUEDOENCASA', 7);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `ID` int(10) UNSIGNED NOT NULL,
  `FK_user` int(10) UNSIGNED NOT NULL,
  `FK_address` int(10) UNSIGNED NOT NULL,
  `FK_paymethod` tinyint(3) UNSIGNED NOT NULL,
  `Total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `ID` int(10) UNSIGNED NOT NULL,
  `FK_order` int(10) UNSIGNED NOT NULL,
  `FK_product` int(10) UNSIGNED NOT NULL,
  `Quantity` smallint(5) UNSIGNED DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `paymethod`
--

CREATE TABLE `paymethod` (
  `ID` tinyint(3) UNSIGNED NOT NULL,
  `Name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paymethod`
--

INSERT INTO `paymethod` (`ID`, `Name`) VALUES
(1, 'Credit card'),
(2, 'Cash');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Name` varchar(40) NOT NULL,
  `Price` smallint(5) UNSIGNED NOT NULL,
  `Description` text DEFAULT NULL,
  `Stock` smallint(5) UNSIGNED NOT NULL,
  `Image` varchar(150) DEFAULT NULL,
  `FK_Category` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ID`, `Name`, `Price`, `Description`, `Stock`, `Image`, `FK_Category`) VALUES
(100, 'Maruchan carne asada', 20, 'Producto de importación americana, maruchan de res.', 15, '1607681322maruchan.png', 1),
(101, 'Harina para hotcakes', 28, 'Harina tradicional para hotcakes gamesa 850 gr. ', 20, '1607681856harinagamesa.jpg', 1),
(102, 'Nescafe original', 43, 'Café instantaneo regular marca nescafe.', 20, '1607682367nescafeoriginal-min.jpg', 1),
(103, 'Los portales intenso', 90, 'Cáfe gourmet \"Los portales de córdoba\" intenso 454 gr.', 0, '1607682740losportales-min.jpg', 1),
(104, 'Los Portales premium gold', 83, 'Café artesanal los portales de córdoba premium gold 370 gr.', 23, '16076831320750103835032L-min.jpg', 1),
(105, 'Nescafe Decaf', 65, 'Café descafeinado 120 gr.', 30, '16076835320750105862847L-min.jpg', 1),
(106, 'Cheetos flamimg hot', 18, 'CHEETOS snacks are the much-loved cheesy treats that are fun for everyone! You just can\'t eat a CHEETOS snack without licking the \"cheetle\" off your fingertips. And wherever the CHEETOS brand and CHESTER CHEETAH go, cheesy smiles are sure to follow.', 15, '1609889801images (1).jpeg', 1),
(200, 'Refresco Coca Cola de vidrio 500 ml', 16, 'Coca-Cola es el refresco de cola de mayor éxito por su delicioso sabor refrescante y es un buen compañero para la comida o cualquier momento. Sin grasas saturadas, contiene sodio, 500 ml', 16, '16096384440750105530208L.jpg', 4),
(205, 'Néctar Del Valle durazno ', 20, 'Como su presentación durazno de 946 ml, una bebida muy fresca con ese sabor tan original que le encantará a toda la familia. Inclúyelo como parte del desayuno o simplemente para refrescarte por las tardes y quitarte la sed.', 2, '16095674970750105535675L.jpg', 4),
(302, 'Leche deslactosada', 25, 'Acompaña tus desayunos y cenas con leche deslactosada Santa Clara, Leche deslactosada, Producto 100% puro de vaca, Contiene vitaminas A y D, Necesita refrigeración', 8, '16094564530750129560015L.jpg', 5),
(303, 'Malteada Yoplait Placer Cook&Cream 220g', 13, 'Si eres fan de las malteadas Yoplait te ofrece esta malteada hecha a base de yoghurt con un original sabor cookies and cream. Disfrútala como un postre o a la hora que se te antoje, consistencia cremosa rica para beber', 8, '16096530287501040095948-00-CH515Wx515H.jpg', 5),
(306, 'Rufles de queso', 12, '¡Ruffles Queso con su inconfundible forma ondulada, la misma textura crujiente y su característico sabor son la mejor opción para cualquier momento del día! ', 12, '16095610120750101116767L.jpg', 1),
(307, 'Pedigree sobre res en filete', 10, 'Deliciosos y nutritivos trocitos de carne que no alteran la calidad de las heces y que proporcionan una alimentación tan completa y balanceada como nuestro alimento seco que ya conoces. Puedes servirlos solos o combinados con alimento seco.', 20, '1609564679.jpg', 6),
(308, 'Whiskas fillets salmón', 12, 'Alimento para gatos sabor salmón.', 14, '1611884944.jpg', 6),
(500, 'Gato de silicona', 200, 'Lampara de noche de silicón en forma de gato.', 14, '16085091396941347718538_2.jpg', 7),
(800, 'Maestro Dobel Diamante', 645, 'Tequila Maestro Dobel Diamante 750 ml.', 15, '1608070575maestrodoble-min.jpg', 8),
(801, 'Johnnie Walker Black Label', 760, 'Johnnie Walker Black Label es un verdadero icono, tiene un carácter inconfundiblemente suave y profundo. Un whisky impresionante para compartir en cualquier ocasión, ya sea en casa o en una noche de fiesta con amigos.', 20, '1608071186Johnnie-Walker-Black-Label-07L-min.jpg', 8),
(802, 'José Cuervo especial', 200, 'Tequila reposado José Cuervo especial 750 ml.', 15, '1608076177.jpg', 8),
(803, 'Whisky Chivas Regal 12', 720, 'Para los amantes de bebidas afrutadas, tenemos el whisky Chivas Regal escocés 12 años, podrás tomarlo sólo o preparar un whisky en las rocas o diferentes cocteles, y es que su sabor dulce a manzana y caramelo, es perfecto para paladares exigentes.', 14, '1609637133whisky-chivas-regal-12-anos-750ml.jpg', 8),
(804, 'Cerveza Noche Buena Bohemia 12 pzas', 198, 'Cerveza Noche Buena en pack de 12 piezas de 355 ml cada una, ideal para compartir. La venta se realizará únicamente a mayores de edad. El abuso en el consumo de este producto es nocivo para la salud.', 20, '16096374480750104991212L1.jpg', 8);

-- --------------------------------------------------------

--
-- Table structure for table `typeuser`
--

CREATE TABLE `typeuser` (
  `ID` tinyint(3) UNSIGNED NOT NULL,
  `Role` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `typeuser`
--

INSERT INTO `typeuser` (`ID`, `Role`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Name` varchar(30) NOT NULL,
  `LastName` varchar(40) NOT NULL,
  `Address` varchar(80) NOT NULL,
  `Email` varchar(60) NOT NULL,
  `Phone` int(10) UNSIGNED NOT NULL,
  `Password` varchar(255) NOT NULL,
  `FK_TypeUser` tinyint(3) UNSIGNED NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Name`, `LastName`, `Address`, `Email`, `Phone`, `Password`, `FK_TypeUser`, `updated_at`, `created_at`) VALUES
(20000001, 'Christian Yesael', 'Ochoa', 'Ciruelo 1357', 'deadchri5h@gmail.com', 3315734116, 'eyJpdiI6IlF0OWZtTnVRZFZwcVlNd3hPWmQ5YWc9PSIsInZhbHVlIjoiZzBTaEloanhNSXV4bmlDd0tldXMwUT09IiwibWFjIjoiNjZmZmViYWI4NjZkYTdhY2I2NDRlOWNhYWIyMTQxOThhZGMzZmQ1ZTljZGY0NGVlOWE2ZjAyMmQ5NzA3OTU3MyJ9', 1, '2021-02-01 10:50:02', '2020-11-06 02:38:04'),
(20000003, 'Sergio', 'Ochoa', 'Av Topacio 2698', 'sergiogdl23@hotmail.com', 3316897421, 'eyJpdiI6InZWZzV1UklsdWlMSHBGdlBzMVRpeXc9PSIsInZhbHVlIjoibVlSSzBWZFNQMldSbGJMeFRPZ2RYUT09IiwibWFjIjoiNzI0NWM3ZTBmMDgwNTE2M2UwYjEzZDA0NzVlNmVhMDBiNjUzM2Y3MDM2ZDk0MTg2Y2ZkMzYxNTk3ZjdiN2JiZiJ9', 2, '2020-11-25 10:17:30', '2020-11-06 02:41:19'),
(20000004, 'Mario El trunco', 'Villalpando', 'Caracol 2968', 'a13100375@ceti.mx', 3315348578, 'eyJpdiI6IkJiMk9ReDM0L0VhZG1IcEpzdlkrN0E9PSIsInZhbHVlIjoiR25FSW5NemtQNnVsNmN0RkNxUlBjZz09IiwibWFjIjoiZTM1NDc4YjExYmFjMzZhZmZmODU4OWIwMDc0MzIzY2E0YjQyMjZlYjFlMjRlZGI1NDU5MDZlODkwMzQxNzhiYiJ9', 2, '2021-01-23 07:15:21', '2020-11-06 02:43:31'),
(20000005, 'Adriana', 'Espinosa', 'Calzada Independecia Norte 2000', 'liloth00814@gmail.com', 3315894745, 'eyJpdiI6IkJiMk9ReDM0L0VhZG1IcEpzdlkrN0E9PSIsInZhbHVlIjoiR25FSW5NemtQNnVsNmN0RkNxUlBjZz09IiwibWFjIjoiZTM1NDc4YjExYmFjMzZhZmZmODU4OWIwMDc0MzIzY2E0YjQyMjZlYjFlMjRlZGI1NDU5MDZlODkwMzQxNzhiYiJ9', 2, '2020-11-19 06:27:33', '2020-11-06 02:46:22'),
(20000007, 'Mattew', 'Sanders', 'Av Diamante 7898', 'matt@sanders.com', 3312659874, 'eyJpdiI6ImRqN0JvOWpwQWNGWi9MeUlyUkhQcWc9PSIsInZhbHVlIjoiS0RFQ1ZlUytFVHZaVVRLbUxtVm90Zz09IiwibWFjIjoiOTRkYTg5N2FkMThlMmQ2NGZiZjNjYzhiODUzYTFkZjQ4NDNhYTM1OTdkNjliZmFiNDAyYzBjNThjMmY3Yjg5NyJ9', 2, '2020-11-27 00:54:33', '2020-11-27 00:54:33'),
(20000009, 'Edward', 'Kenway', 'Esmeralda 4562', 'edward@ubisoft.com', 3312659876, 'eyJpdiI6IjZaa01xeXlsbVpKUXN5WE15U3NQSlE9PSIsInZhbHVlIjoidlJtZy8wdTgwcFdKT2ZJTFRET2lhZz09IiwibWFjIjoiNzBjNDc1N2VhNDc5NGE4YmRmYzM5OTkyMGFlZGFhNDgwY2E0NzE1NmNjOWY0NTJiMTZhZTQ4Mjg5MDE3MDM4NCJ9', 2, '2020-11-27 01:37:00', '2020-11-27 01:37:00'),
(20000013, 'Niko', 'Bellic', 'Hove Beach 1500', 'nbellic@eyefriend.com', 3312857498, 'eyJpdiI6IlNqUkY2WlpIdEcxWlAydGJMdVBnREE9PSIsInZhbHVlIjoiNFNkbXc4S2xiMG8xcjN0UUN4YjNrdz09IiwibWFjIjoiNmY1M2I4NDhkODQwMDExYjcxZDI2Y2NmZmRlYzM3ZDFhNWRmOGMyY2NiMzFiMzdlYjhiNDBjOTZhZjA0M2ZiNiJ9', 2, '2020-11-27 11:57:33', '2020-11-27 11:57:33'),
(20000014, 'Christian Yesael', 'Ochoa', 'Admin', 'admin@admin.com', 3333333333, 'eyJpdiI6IjVxQVFOam9DbitwOXRtNlBaUVBPdEE9PSIsInZhbHVlIjoiUjd5QVRaSHJNbU9wZXoxOFdERlNrdz09IiwibWFjIjoiYWI1MzQ5YzgxODdhOTRlZjM4ZTg0ODlkMWM5ZTQwNTAwZTIyZWZkZTM3YmE4ZGVmNDYzOGU4YjRjOGMwOTYzNCJ9', 1, '2021-01-21 04:12:38', '2020-11-29 06:12:15'),
(21000015, 'Louis Silvie', 'Zamperini', 'Av Diamante 34', 'louiszamperini@gmail.com', 3316788544, 'eyJpdiI6IjN5d0V6aFFOaWVweEZBdGZxaGl1VUE9PSIsInZhbHVlIjoibUhxYTFEcU5mNXcxamVPU0dxUFZKZz09IiwibWFjIjoiNGZmMzZkNzFjZGVkMDU0MmU3OGYwYjg4ODNlOTgyZTJmMmVhNzA2NWYwNTA4YzkyNThjOWExZTAzOWVhMzFhZSJ9', 1, '2021-01-22 09:31:54', '2021-01-21 10:18:39'),
(21000016, 'David Santana', 'Grohl', 'Av Lapizlazuli 569', 'david@david.com', 3312857449, 'eyJpdiI6IkdsYnJsdFFuZHhHU1ZYQytGSW1xbHc9PSIsInZhbHVlIjoiUDZDNXB5cEF4d3ZKbmZOeTNrYlRwZz09IiwibWFjIjoiNDA2M2RkYTA0YjExMjQzOWU0MDcwZDc2OWEzYzNiZmI5MDhmMDVmMWJiMTUzZjZjMjAyNmE2ZGYzNjgyMDMzYyJ9', 2, '2021-02-03 12:41:39', '2021-02-03 12:37:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_user` (`FK_user`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD KEY `FK_user` (`FK_user`),
  ADD KEY `FK_product` (`FK_product`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_user` (`FK_user`),
  ADD KEY `FK_address` (`FK_address`),
  ADD KEY `FK_paymethod` (`FK_paymethod`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_order` (`FK_order`),
  ADD KEY `FK_product` (`FK_product`);

--
-- Indexes for table `paymethod`
--
ALTER TABLE `paymethod`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_Category` (`FK_Category`);

--
-- Indexes for table `typeuser`
--
ALTER TABLE `typeuser`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_TypeUser` (`FK_TypeUser`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`FK_user`) REFERENCES `user` (`ID`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`FK_user`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`FK_product`) REFERENCES `product` (`ID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`FK_user`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`FK_address`) REFERENCES `address` (`ID`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`FK_paymethod`) REFERENCES `paymethod` (`ID`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`FK_order`) REFERENCES `orders` (`ID`),
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`FK_product`) REFERENCES `product` (`ID`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`FK_Category`) REFERENCES `category` (`ID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`FK_TypeUser`) REFERENCES `typeuser` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
