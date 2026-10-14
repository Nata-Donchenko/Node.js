CREATE DATABASE  IF NOT EXISTS `shop_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shop_db`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shop_db
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `product_attributes`
--

DROP TABLE IF EXISTS `product_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_attributes` (
  `attribute_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `attribute_name` varchar(100) NOT NULL,
  `attribute_value` varchar(255) NOT NULL,
  PRIMARY KEY (`attribute_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_attributes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_attributes`
--

LOCK TABLES `product_attributes` WRITE;
/*!40000 ALTER TABLE `product_attributes` DISABLE KEYS */;
INSERT INTO `product_attributes` VALUES (1,1,'color','білий'),(2,1,'size','M'),(3,1,'material','бавовна'),(4,3,'size','42'),(5,3,'color','чорний'),(6,5,'cpu','Intel i5'),(7,5,'ram','16 GB'),(8,5,'screen','14 inch');
/*!40000 ALTER TABLE `product_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `owner_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Футболка біла','Бавовна 100%, унісекс',450.50,1,'2026-10-14 16:28:19','2026-10-14 16:28:19'),(2,'Кепка','Регульований розмір',249.00,1,'2026-10-14 16:28:29','2026-10-14 16:36:53'),(3,'Кросівки бігові','Легкі, з амортизацією',2899.00,2,'2026-10-14 16:28:50','2026-10-14 16:28:50'),(4,'Рюкзак міський','Об\'єм 25 л, водовідштовхувальний',1350.00,2,'2026-10-14 16:29:08','2026-10-14 16:29:08'),(5,'Ноутбук','14 дюймів, легкий',32999.00,3,'2026-10-14 16:29:28','2026-10-14 16:29:28'),(6,'Термочашка',NULL,399.99,3,'2026-10-14 16:29:33','2026-10-14 16:29:33');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_owner` tinyint(1) NOT NULL DEFAULT '0',
  `language` varchar(10) NOT NULL DEFAULT 'uk',
  `currency` varchar(3) NOT NULL DEFAULT 'UAH',
  `settings` json DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'owner1@shop.com','$2b$10$2J6CVBAJXGNQmabIxBMncuL6WZTZPS.vB25w2vFi4a.V52dlBqdZO',1,'en','USD','{\"theme\": \"dark\", \"notifications\": {\"sms\": false, \"push\": false, \"email\": true}}','2026-10-14 16:24:59'),(2,'owner2@shop.com','$2b$10$Owl9aaHld.9CnTOBmFxQDeDzV2fij8LLM/e3Jx5uX.oaU8f8LzgRe',1,'uk','UAH','{\"theme\": \"light\", \"notifications\": {\"push\": true, \"email\": true}}','2026-10-14 16:25:06'),(3,'owner3@shop.com','$2b$10$fhAbcqUMmIFJKjodYW/emex16GBlnthDwhosTz4kcdYq274WjW1EC',1,'uk','UAH','{}','2026-10-14 16:25:11'),(4,'buyer1@shop.com','$2b$10$14qW1QnvQjpH5hb/6EbsBuIQLfylr.gnCXb1js0olh/oJhWJSiQH.',0,'pl','EUR','{\"theme\": \"system\", \"notifications\": {\"email\": false, \"telegram\": true}}','2026-10-14 16:25:15'),(5,'buyer2@shop.com','$2b$10$WYMp.IcgTaXN3LCe0WH8EulIz2S4iEQLthc/ub1UW1tITDGI8nEku',0,'uk','UAH','{}','2026-10-14 16:25:20');
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

-- Dump completed on 2026-10-14 19:47:08
