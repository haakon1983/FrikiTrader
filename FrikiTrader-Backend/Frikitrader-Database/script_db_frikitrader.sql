-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: frikitraderbd
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20251218134633_InitialMySQLMigration','8.0.22'),('20260128124554_AddProfilePictureToUser','8.0.22'),('20260214101005_AddProductStatus','8.0.22'),('20260214193518_AddFavoritesTable','8.0.22');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Comics y Manga','Editorial americana o japonesa','2025-12-18 13:56:40.000000'),(2,'Figuras y muñecos','Figuras de acción, estatuas y Funko Pops','2025-12-18 13:56:40.000000'),(3,'Videojuegos','Juegos y consolas antiguas, Nes, Megadrive...','2025-12-18 13:56:40.000000'),(4,'Juegos de Mesa','Juegos de mesa, rol, expansiones','2025-12-18 13:56:40.000000'),(5,'Juegos de cartas','TCG (Magic, Pokemon, One piece), LCG (LOTR, Arkham horror..., ','2025-12-18 13:56:40.000000'),(6,'Wargames','Games-Workshop (warhammer 40k, Age of Sigmar, Kill-Team..), Infinity, Bolt...','2025-12-18 13:56:40.000000'),(7,'Merchandising','Tazas, camisetas, otros objetos','2025-12-18 13:56:40.000000');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatconversations`
--

DROP TABLE IF EXISTS `chatconversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatconversations` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirebaseChannelId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductId` int NOT NULL,
  `InitiatorUserId` int NOT NULL,
  `ReceiverUserId` int NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_ChatConversations_InitiatorUserId` (`InitiatorUserId`),
  KEY `IX_ChatConversations_ProductId` (`ProductId`),
  KEY `IX_ChatConversations_ReceiverUserId` (`ReceiverUserId`),
  CONSTRAINT `FK_ChatConversations_Products_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `products` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ChatConversations_Users_InitiatorUserId` FOREIGN KEY (`InitiatorUserId`) REFERENCES `users` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_ChatConversations_Users_ReceiverUserId` FOREIGN KEY (`ReceiverUserId`) REFERENCES `users` (`Id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatconversations`
--

LOCK TABLES `chatconversations` WRITE;
/*!40000 ALTER TABLE `chatconversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatconversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Condition` int NOT NULL,
  `ImageUrl` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `UserId` int NOT NULL,
  `CategoryId` int NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `Status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `IX_Products_CategoryId` (`CategoryId`),
  KEY `IX_Products_UserId` (`UserId`),
  CONSTRAINT `FK_Products_Categories_CategoryId` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Products_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'string','string',99999999.99,2,'string',1,1,'2026-01-09 23:24:09.671819',1),(3,'Figura Trunks','Figura de Trunks de DBZ superchula',5.00,2,'https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/productos%2F1770211718554_Figura%20Trunks.jpg?alt=media&token=981cb47a-10cc-4a6d-a256-d57e460f21c7',6,2,'2026-02-04 13:28:39.403737',0),(4,'Figura de Naruto','Figura sin usar de Naruto Shipudden',10.00,1,'https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/productos%2F1770211919518_Figura%20Naruto.jpg?alt=media&token=55f1cdb0-6ae6-493c-aa3d-662aa66dfbb0',5,2,'2026-02-04 13:32:00.737875',0),(5,'Capitan Exterminador W40k','Figura de Capitan exterminador de w40k',10.00,3,'https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/productos%2F1770214388939_figura%20warhammer.jpg?alt=media&token=238e2c23-9c09-4bb7-a7cd-d7ab5c4ea18f',6,6,'2026-02-04 14:13:10.370670',0),(6,'Carta Magic: Black Lotus','Carta Back Lotus, usado, de edicion Alpha, es una ganga!',500000.00,3,'https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/productos%2F1771060332414_carta%20black%20lotus.jpg?alt=media&token=9c3537a8-8376-4447-abd2-b507ad845b4b',6,5,'2026-02-14 09:12:13.861144',0),(7,'Comic de Spiderman nº 25','Comic de Spiderman nº 25 de la saga del multiverso',6.00,3,'https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/productos%2F1771071466267_comic%20spiderman.jpg?alt=media&token=7883aff6-2fea-4122-8014-708c7508d314',4,1,'2026-02-14 12:17:47.557911',0),(8,'Manga de Dragon Ball Super','Manga de dragon ball super, numero 1, edicion especial',3.00,2,'https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/productos%2F1772061834466_Manga%20DBS.jpg?alt=media&token=2dbceabb-8618-49a8-801b-22b248f3fb75',2,1,'2026-02-25 23:23:55.555707',0),(13,'Comic de DC','Comic de Marvel superchulo, único.',3.00,3,'https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/productos%2F1773337807263_comic%20vengadores.jpg?alt=media&token=98756116-6ff8-4979-92de-acd5cb14bc8d',9,1,'2026-03-12 17:50:08.785264',1),(16,'videajuego COD','videojuego',20.00,2,'https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/productos%2F1773514640081_videojuego.jpg?alt=media&token=b5ca31ef-d642-4081-8f0d-d13a111caeda',6,2,'2026-03-14 18:57:21.227842',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userfavorites`
--

DROP TABLE IF EXISTS `userfavorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userfavorites` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `ProductId` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_UserFavorites_UserId_ProductId` (`UserId`,`ProductId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userfavorites`
--

LOCK TABLES `userfavorites` WRITE;
/*!40000 ALTER TABLE `userfavorites` DISABLE KEYS */;
INSERT INTO `userfavorites` VALUES (1,2,3),(17,2,5),(19,2,6),(21,5,16),(20,9,8);
/*!40000 ALTER TABLE `userfavorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Username` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PasswordHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `ProfilePictureUrl` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Users_Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'frikimaster','test@frikimaster.com','$2a$11$Khdi0tlh0g4eA2EM7rxxyem68H.q5eZOaQnZbt5EWroqiZmhHExM6','2026-01-04 12:48:48.213554',NULL),(2,'User_A','user_A@pruebas.com','$2a$11$gNn5cj9XSpINKq5Me3le7uKjzEV8xV0yQAUryQ8x508K.M.tO1fRC','2026-01-12 11:42:03.966963',NULL),(3,'User_B','user_B@pruebas.com','$2a$11$n0Ha44cHvou8XAwIGEXEb.jCHneIg7r/Wc2bcx1VeiiKHXC/5cafS','2026-01-12 11:43:05.767912',NULL),(4,'User_C','User_C@pruebas.com','$2a$11$t3JJEfJEpVa9hdjVq8qwe.MUdvIBXcgnf37S3DTc5A3rdMZa5xiRK','2026-01-28 12:06:49.249318',NULL),(5,'User_D','User_D@pruebas.com','$2a$11$SqVggtm6aH1WS/rvHpqs7O188Qz.lnHhXeFnw0ZuikmUQu/8r6UIK','2026-01-28 13:44:34.654443','https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/avatars%2F1769607868255_1738693669361.jpg?alt=media&token=09a081ab-0e24-4abc-acaf-d80ab6d0980c'),(6,'User_E','User_E@pruebas.com','$2a$11$3RCILySTP3.pE5S.gGmifeL376C0oomj/93rMcrEocSHWbK/OLNya','2026-01-28 13:57:33.107537','https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/avatars%2F1769608649383_IMG_20230414_172208.jpg?alt=media&token=9096e108-719e-49ca-b675-8e88d76e6e35'),(7,'User_F','User_F@pruebas.com','$2a$11$oQreBVmpsO0Zs6o.JFBb/.wCLnyOz1VftxY0zT.F.Tpa82MLS2JMO','2026-03-12 17:37:39.253101','https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/avatars%2F1773337052312_1000125962.jpg?alt=media&token=808b8b46-b974-4f10-b60b-78fd5c5ffefe'),(8,'User_FF','User_FF@pruebas.com','$2a$11$OaxF68ZbBXG0viz6HBq7D.aC9Vl9G8Ta9U.d9NT9v7wjg0rOQC.Y2','2026-03-12 17:42:36.067677','https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/avatars%2F1773337352765_1000125962.jpg?alt=media&token=7ca62655-ca6f-423a-83e0-704b28a40b9a'),(9,'User_V','User_V@pruebas.com','$2a$11$HkRXbULTBC0Sww2wLpF/GOFcjOwdSi53OT.fFUE4btSV8fGMovDRW','2026-03-12 17:47:15.602137','https://firebasestorage.googleapis.com/v0/b/frikitrader-78a99.firebasestorage.app/o/avatars%2F1773337632546_1000125962.jpg?alt=media&token=5765258c-8df7-4dc3-a9cd-ee602473f0fa');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-14 20:56:53
