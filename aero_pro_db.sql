-- MySQL dump 10.13  Distrib 8.3.0, for macos13.6 (x86_64)
--
-- Host: localhost    Database: aero_pro_db
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Aircrafts`
--

DROP TABLE IF EXISTS `Aircrafts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Aircrafts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registration_number` varchar(20) NOT NULL,
  `manufacturer` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `year_of_manufacture` int DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `fuel_capacity` decimal(10,2) DEFAULT NULL,
  `max_speed` decimal(10,2) DEFAULT NULL,
  `max_range` decimal(10,2) DEFAULT NULL,
  `current_location` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `registration_number` (`registration_number`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Aircrafts`
--

LOCK TABLES `Aircrafts` WRITE;
/*!40000 ALTER TABLE `Aircrafts` DISABLE KEYS */;
INSERT INTO `Aircrafts` VALUES (1,'2131231','Airbus','004',2018,3245235,7304.00,52.00,3077.00,'Airport B',1,'2024-05-28 09:15:44','2024-06-19 14:04:00'),(2,'2131230','Airbus','003',2013,3245235,274.00,799.00,3282.00,'Airport B',1,'2024-05-28 09:16:22','2024-06-19 14:16:00'),(3,'2131221','Airbus','002',2012,3245235,1817.00,43.00,3582.00,'Airport B',1,'2024-05-28 09:16:40','2024-06-19 14:20:00'),(4,'2131222','Airbus','001',2012,3245235,6903.00,214.00,4251.00,'Airport B',1,'2024-05-28 09:17:02','2024-06-19 14:17:00'),(5,'00012','Airbus','005',2020,1000,8888.00,641.00,1689.00,'Airport B',1,'2024-06-05 09:27:17','2024-06-19 14:21:00');
/*!40000 ALTER TABLE `Aircrafts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ComplianceReports`
--

DROP TABLE IF EXISTS `ComplianceReports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ComplianceReports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `aircraft_id` int NOT NULL,
  `report_date` datetime NOT NULL,
  `report_type` varchar(100) NOT NULL,
  `description` text,
  `findings` text,
  `corrective_actions` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ComplianceReports`
--

LOCK TABLES `ComplianceReports` WRITE;
/*!40000 ALTER TABLE `ComplianceReports` DISABLE KEYS */;
INSERT INTO `ComplianceReports` VALUES (1,2,'2024-06-11 10:58:00','Routine Inspection','Emergency inspection conducted due to unexpected issue.','No issues found.','Aircraft grounded for further inspection.','2024-06-11 10:58:00','2024-06-11 10:58:00'),(2,3,'2024-06-11 10:59:00','Emergency Check','Emergency inspection conducted due to unexpected issue.','System requires immediate attention.','Major repairs performed.','2024-06-11 10:59:00','2024-06-11 10:59:00'),(3,1,'2024-06-11 11:00:00','Unscheduled Maintenance','Scheduled maintenance as per maintenance plan.','System requires immediate attention.','Major repairs performed.','2024-06-11 11:00:00','2024-06-11 11:00:00'),(4,1,'2024-06-11 11:01:00','Scheduled Maintenance','Scheduled maintenance as per maintenance plan.','No issues found.','Aircraft grounded for further inspection.','2024-06-11 11:01:00','2024-06-11 11:01:00'),(5,4,'2024-06-11 11:02:00','Unscheduled Maintenance','Routine compliance check performed.','System requires immediate attention.','Aircraft grounded for further inspection.','2024-06-11 11:02:00','2024-06-11 11:02:00'),(6,2,'2024-06-11 11:03:00','Unscheduled Maintenance','Routine compliance check performed.','No issues found.','Minor adjustments made.','2024-06-11 11:03:00','2024-06-11 11:03:00'),(7,3,'2024-06-11 11:04:00','Scheduled Maintenance','Routine compliance check performed.','System requires immediate attention.','Minor adjustments made.','2024-06-11 11:04:00','2024-06-11 11:04:00'),(8,3,'2024-06-11 11:05:00','Unscheduled Maintenance','Routine compliance check performed.','Major issues detected.','None required.','2024-06-11 11:05:00','2024-06-11 11:05:00'),(9,5,'2024-06-11 11:06:00','Scheduled Maintenance','Routine compliance check performed.','Minor issues detected.','Minor adjustments made.','2024-06-11 11:06:00','2024-06-11 11:06:00'),(10,4,'2024-06-11 11:07:00','Routine Inspection','Routine compliance check performed.','Major issues detected.','Major repairs performed.','2024-06-11 11:07:00','2024-06-11 11:07:00'),(11,3,'2024-06-11 11:08:00','Emergency Check','Scheduled maintenance as per maintenance plan.','Minor issues detected.','None required.','2024-06-11 11:08:00','2024-06-11 11:08:00'),(12,5,'2024-06-11 11:09:00','Scheduled Maintenance','Emergency inspection conducted due to unexpected issue.','System requires immediate attention.','Major repairs performed.','2024-06-11 11:09:00','2024-06-11 11:09:00'),(13,1,'2024-06-11 11:10:00','Unscheduled Maintenance','Scheduled maintenance as per maintenance plan.','No issues found.','Aircraft grounded for further inspection.','2024-06-11 11:10:00','2024-06-11 11:10:00'),(14,5,'2024-06-11 11:11:00','Routine Inspection','Unscheduled maintenance due to reported anomaly.','Major issues detected.','None required.','2024-06-11 11:11:00','2024-06-11 11:11:00'),(15,5,'2024-06-11 11:12:00','Emergency Check','Unscheduled maintenance due to reported anomaly.','Major issues detected.','Minor adjustments made.','2024-06-11 11:12:00','2024-06-11 11:12:00');
/*!40000 ALTER TABLE `ComplianceReports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Documents`
--

DROP TABLE IF EXISTS `Documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `document_type` enum('maintenance_manual','service_bulletin','technical_document') NOT NULL,
  `document_name` varchar(100) NOT NULL,
  `document_description` text,
  `document_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Documents`
--

LOCK TABLES `Documents` WRITE;
/*!40000 ALTER TABLE `Documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `Documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flights`
--

DROP TABLE IF EXISTS `Flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Flights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `flight_number` varchar(20) NOT NULL,
  `departure_airport` varchar(100) NOT NULL,
  `departure_datetime` datetime NOT NULL,
  `arrival_airport` varchar(100) NOT NULL,
  `arrival_datetime` datetime NOT NULL,
  `aircraft_id` int NOT NULL,
  `pilot_id` int NOT NULL,
  `co_pilot_id` int DEFAULT NULL,
  `crew_members` json DEFAULT NULL,
  `passengers` json DEFAULT NULL,
  `status` enum('scheduled','delayed','in_progress','completed','cancelled') DEFAULT 'scheduled',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `flight_number` (`flight_number`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flights`
--

LOCK TABLES `Flights` WRITE;
/*!40000 ALTER TABLE `Flights` DISABLE KEYS */;
INSERT INTO `Flights` VALUES (1,'TK1234','LAX','2024-06-05 14:23:00','JFK','2024-06-10 10:00:00',2,5678,5678,'4','132','completed','2024-06-05 09:48:38','2024-06-10 13:55:00'),(4,'TK1233','LAX','2024-06-05 14:23:00','JFK','2024-06-10 10:00:00',5,5678,5678,'4','132','completed','2024-06-05 09:49:04','2024-06-10 13:55:00'),(5,'TK1230','LAX','2024-06-05 14:23:00','JFK','2024-06-10 10:00:00',3,5678,5678,'4','132','completed','2024-06-05 09:49:14','2024-06-10 13:55:00'),(6,'FL7062','Airport A','2024-06-10 15:15:00','Airport B','2024-06-10 19:15:00',4,2,NULL,NULL,NULL,'completed','2024-06-10 13:15:00','2024-06-10 13:15:00'),(7,'FL7949','Airport A','2024-06-10 15:16:00','Airport B','2024-06-10 19:16:00',4,2,NULL,NULL,NULL,'completed','2024-06-10 13:16:00','2024-06-10 13:16:00'),(8,'FL1612','Airport A','2024-06-10 15:17:00','Airport B','2024-06-10 19:17:00',3,4,NULL,NULL,NULL,'completed','2024-06-10 13:17:00','2024-06-10 13:17:00'),(9,'FL3259','Airport A','2024-06-10 15:18:00','Airport B','2024-06-10 19:18:00',2,3,NULL,NULL,NULL,'completed','2024-06-10 13:18:00','2024-06-10 13:18:00'),(10,'FL6352','Airport A','2024-06-10 15:19:00','Airport B','2024-06-10 19:19:00',1,1,NULL,NULL,NULL,'completed','2024-06-10 13:19:00','2024-06-10 13:19:00'),(11,'FL7032','Airport A','2024-06-10 15:32:00','Airport B','2024-06-10 19:32:00',0,5,NULL,NULL,NULL,'completed','2024-06-10 13:32:00','2024-06-11 08:48:00'),(12,'FL7333','Airport A','2024-06-10 15:34:00','Airport B','2024-06-10 19:34:00',4,2,NULL,NULL,NULL,'completed','2024-06-10 13:34:00','2024-06-11 08:48:00'),(13,'FL2646','Airport A','2024-06-10 15:36:00','Airport B','2024-06-10 19:36:00',1,4,NULL,NULL,NULL,'completed','2024-06-10 13:36:00','2024-06-11 08:48:00'),(14,'FL4652','Airport A','2024-06-10 15:38:00','Airport B','2024-06-10 19:38:00',2,3,NULL,NULL,NULL,'completed','2024-06-10 13:38:00','2024-06-11 08:48:00'),(15,'FL4194','Airport A','2024-06-10 15:40:00','Airport B','2024-06-10 19:40:00',4,1,NULL,NULL,NULL,'completed','2024-06-10 13:40:00','2024-06-11 08:48:00'),(16,'FL7470','Airport A','2024-06-11 11:00:00','Airport B','2024-06-11 15:00:00',1,1,NULL,NULL,NULL,'completed','2024-06-11 09:00:00','2024-06-11 13:00:00'),(17,'FL7847','Airport A','2024-06-11 11:30:00','Airport B','2024-06-11 15:30:00',1,3,NULL,NULL,NULL,'completed','2024-06-11 09:30:00','2024-06-12 11:36:00'),(18,'FL8457','Airport A','2024-06-11 14:00:00','Airport B','2024-06-11 18:00:00',4,2,NULL,NULL,NULL,'completed','2024-06-11 12:00:00','2024-06-12 11:36:00'),(19,'FL1180','Airport A','2024-06-11 14:30:00','Airport B','2024-06-11 18:30:00',4,4,NULL,NULL,NULL,'completed','2024-06-11 12:30:00','2024-06-12 11:36:00'),(20,'FL7877','Airport A','2024-06-11 15:00:00','Airport B','2024-06-11 19:00:00',3,5,NULL,NULL,NULL,'completed','2024-06-11 13:00:00','2024-06-12 11:36:00'),(21,'FL8139','Airport A','2024-06-12 14:00:00','Airport B','2024-06-12 18:00:00',3,3,NULL,NULL,NULL,'completed','2024-06-12 12:00:00','2024-06-18 14:02:00'),(22,'FL9940','Airport A','2024-06-12 14:30:00','Airport B','2024-06-12 18:30:00',3,5,NULL,NULL,NULL,'completed','2024-06-12 12:30:00','2024-06-18 14:02:00'),(23,'FL3821','Airport A','2024-06-12 15:00:00','Airport B','2024-06-12 19:00:00',2,1,NULL,NULL,NULL,'completed','2024-06-12 13:00:00','2024-06-18 14:02:00'),(24,'FL1658','Airport A','2024-06-12 15:30:00','Airport B','2024-06-12 19:30:00',2,4,NULL,NULL,NULL,'completed','2024-06-12 13:30:00','2024-06-18 14:02:00'),(25,'FL8213','Airport A','2024-06-12 16:00:00','Airport B','2024-06-12 20:00:00',0,2,NULL,NULL,NULL,'completed','2024-06-12 14:00:00','2024-06-18 14:02:00'),(26,'FL3307','Airport A','2024-06-18 16:30:00','Airport B','2024-06-18 20:30:00',2,1,NULL,NULL,NULL,'completed','2024-06-18 14:30:00','2024-06-18 18:51:00'),(27,'FL2456','Airport A','2024-06-18 19:00:01','Airport B','2024-06-18 23:00:01',1,4,NULL,NULL,NULL,'completed','2024-06-18 17:00:01','2024-06-18 21:29:00'),(28,'FL3194','Airport A','2024-06-18 19:30:00','Airport B','2024-06-18 23:30:00',3,5,NULL,NULL,NULL,'completed','2024-06-18 17:30:00','2024-06-18 22:00:00'),(29,'FL4718','Airport A','2024-06-18 20:00:00','Airport B','2024-06-19 00:00:00',0,3,NULL,NULL,NULL,'completed','2024-06-18 18:00:00','2024-06-18 22:00:00'),(30,'FL5545','Airport A','2024-06-19 00:00:00','Airport B','2024-06-19 04:00:00',1,2,NULL,NULL,NULL,'completed','2024-06-18 22:00:00','2024-06-19 08:02:06'),(31,'FL9962','Airport A','2024-06-19 00:30:00','Airport B','2024-06-19 04:30:00',4,5,NULL,NULL,NULL,'completed','2024-06-18 22:30:00','2024-06-19 08:02:06'),(32,'FL1144','Airport A','2024-06-19 10:30:00','Airport B','2024-06-19 14:30:00',0,1,NULL,NULL,NULL,'completed','2024-06-19 08:30:00','2024-06-19 12:48:00'),(33,'FL9549','Airport A','2024-06-19 11:00:00','Airport B','2024-06-19 15:00:00',1,2,NULL,NULL,NULL,'completed','2024-06-19 09:00:00','2024-06-19 13:00:00'),(34,'FL8160','Airport A','2024-06-19 15:00:00','Airport B','2024-06-19 19:00:00',4,5,NULL,NULL,NULL,'scheduled','2024-06-19 13:00:00','2024-06-19 13:00:00'),(35,'FL1764','Airport A','2024-06-19 15:30:00','Airport B','2024-06-19 19:30:00',0,4,NULL,NULL,NULL,'scheduled','2024-06-19 13:30:00','2024-06-19 13:30:00'),(36,'FL1316','Airport A','2024-06-19 16:00:00','Airport B','2024-06-19 20:00:00',0,1,NULL,NULL,NULL,'scheduled','2024-06-19 14:00:00','2024-06-19 14:00:00');
/*!40000 ALTER TABLE `Flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaintenanceActivities`
--

DROP TABLE IF EXISTS `MaintenanceActivities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaintenanceActivities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity_type` enum('maintenance','repair') NOT NULL,
  `activity_description` text NOT NULL,
  `aircraft_id` int NOT NULL,
  `technician_id` int DEFAULT NULL,
  `priority` int DEFAULT '3',
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `parts_replaced` json DEFAULT NULL,
  `issues_resolved` text,
  `status` enum('scheduled','in_progress','completed') DEFAULT 'scheduled',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaintenanceActivities`
--

LOCK TABLES `MaintenanceActivities` WRITE;
/*!40000 ALTER TABLE `MaintenanceActivities` DISABLE KEYS */;
INSERT INTO `MaintenanceActivities` VALUES (1,'maintenance','dsdsdsds',1,2,1,'2024-05-28 11:33:00','2024-05-28 11:34:00','[{\"id\": 4, \"status\": \"available\", \"location\": \"N/A\", \"quantity\": 2, \"part_name\": \"ScrewDriver\", \"created_at\": \"2024-06-05T08:53:29.000Z\", \"unit_price\": \"1200.00\", \"updated_at\": \"2024-06-05T09:01:34.000Z\", \"description\": \"something to screw and unscrew\", \"part_number\": \"12300\", \"manufacturer\": \"Yamahxasa\"}]','','completed','2024-05-28 09:36:57','2024-06-05 12:38:22'),(2,'repair','dsdsdsds',1,2,4,'2024-05-28 11:33:00','2024-05-28 11:34:00','[{\"id\": 4, \"status\": \"available\", \"location\": \"N/A\", \"quantity\": 3, \"part_name\": \"ScrewDriver\", \"created_at\": \"2024-06-05T08:53:29.000Z\", \"unit_price\": \"1200.00\", \"updated_at\": \"2024-06-05T09:01:34.000Z\", \"description\": \"something to screw and unscrew\", \"part_number\": \"12300\", \"manufacturer\": \"Yamahxasa\"}]','','completed','2024-05-28 09:37:11','2024-06-10 09:49:15'),(4,'maintenance','ScrewDriver',1,2,3,'2024-06-11 14:42:00','2024-06-11 18:37:00','[{\"id\": 5, \"status\": \"available\", \"location\": \"N/A\", \"quantity\": 3, \"part_name\": \"Hammer\", \"created_at\": \"2024-06-10T12:15:36.000Z\", \"unit_price\": \"20000.00\", \"updated_at\": \"2024-06-10T12:16:13.000Z\", \"description\": \"something to screw and unscrew\", \"part_number\": \"1\", \"manufacturer\": \"Yamaha\"}]','','completed','2024-06-11 12:37:47','2024-06-12 12:10:31'),(5,'maintenance','Fix that plane',3,2,1,'2024-06-11 14:59:00','2024-06-11 15:54:00','[{\"id\": 6, \"status\": \"available\", \"location\": \"N/A\", \"quantity\": 3, \"part_name\": \"Screw\", \"created_at\": \"2024-06-10T12:15:56.000Z\", \"unit_price\": \"3000.00\", \"updated_at\": \"2024-06-10T12:16:04.000Z\", \"description\": \"sdsds\", \"part_number\": \"2\", \"manufacturer\": \"dsds\"}, {\"id\": 5, \"status\": \"available\", \"location\": \"N/A\", \"quantity\": 1, \"part_name\": \"Hammer\", \"created_at\": \"2024-06-10T12:15:36.000Z\", \"unit_price\": \"20000.00\", \"updated_at\": \"2024-06-10T12:16:13.000Z\", \"description\": \"something to screw and unscrew\", \"part_number\": \"1\", \"manufacturer\": \"Yamaha\"}]','','completed','2024-06-11 12:54:47','2024-06-12 12:17:54'),(6,'maintenance','odo',5,2,1,'2024-06-11 15:10:00','2024-06-11 16:06:00','[{\"id\": 5, \"status\": \"available\", \"location\": \"N/A\", \"quantity\": 2, \"part_name\": \"Hammer\", \"created_at\": \"2024-06-10T12:15:36.000Z\", \"unit_price\": \"20000.00\", \"updated_at\": \"2024-06-10T12:16:13.000Z\", \"description\": \"something to screw and unscrew\", \"part_number\": \"1\", \"manufacturer\": \"Yamaha\"}, {\"id\": 6, \"status\": \"available\", \"location\": \"N/A\", \"quantity\": 1, \"part_name\": \"Screw\", \"created_at\": \"2024-06-10T12:15:56.000Z\", \"unit_price\": \"3000.00\", \"updated_at\": \"2024-06-10T12:16:04.000Z\", \"description\": \"sdsds\", \"part_number\": \"2\", \"manufacturer\": \"dsds\"}]','','completed','2024-06-11 13:06:16','2024-06-12 12:12:22');
/*!40000 ALTER TABLE `MaintenanceActivities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notifications`
--

DROP TABLE IF EXISTS `Notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `timestamp` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifications`
--

LOCK TABLES `Notifications` WRITE;
/*!40000 ALTER TABLE `Notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `Notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `part_id` int NOT NULL,
  `quantity` int NOT NULL,
  `order_date` date NOT NULL,
  `expected_delivery_date` date DEFAULT NULL,
  `status` enum('placed','shipped','delivered','cancelled') DEFAULT 'placed',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (1,4,1,'2024-06-10','2024-06-10','placed','2024-06-10 12:08:03','2024-06-10 12:08:03'),(4,5,1,'2024-06-10','2024-06-10','placed','2024-06-10 12:44:28','2024-06-10 12:44:28'),(5,6,1,'2024-06-10','2024-06-10','placed','2024-06-10 12:45:03','2024-06-10 12:45:03');
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parts`
--

DROP TABLE IF EXISTS `Parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Parts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `part_number` varchar(50) NOT NULL,
  `part_name` varchar(100) NOT NULL,
  `manufacturer` varchar(100) DEFAULT NULL,
  `description` text,
  `unit_price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `location` varchar(100) NOT NULL,
  `status` enum('available','reserved','in_use','damaged') DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `part_number` (`part_number`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parts`
--

LOCK TABLES `Parts` WRITE;
/*!40000 ALTER TABLE `Parts` DISABLE KEYS */;
INSERT INTO `Parts` VALUES (5,'1','Hammer','Yamaha','something to screw and unscrew',20000.00,2,'N/A','available','2024-06-10 12:15:36','2024-06-10 12:16:13'),(6,'2','Screw','dsds','sdsds',3000.00,2,'N/A','available','2024-06-10 12:15:56','2024-06-10 12:16:04');
/*!40000 ALTER TABLE `Parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pilots`
--

DROP TABLE IF EXISTS `Pilots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pilots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `experience_years` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pilots`
--

LOCK TABLES `Pilots` WRITE;
/*!40000 ALTER TABLE `Pilots` DISABLE KEYS */;
INSERT INTO `Pilots` VALUES (1,'John Smith',35,10),(2,'Alice Johnson',40,15),(3,'Michael Brown',30,8),(4,'Emily Davis',45,20),(5,'James Wilson',38,12);
/*!40000 ALTER TABLE `Pilots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','inventory_manager','activity_manager','technician') NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `password_reset_required` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'James','$2b$10$tc7jDfxfg7bEPyG9SOWH4OtWrBq0IZYFwDdXxYSoBm.cdqmVmDPZu','james@rwandair.rw','admin','James Williams',1,'2024-05-28 07:56:19','2024-06-18 14:51:22',0),(2,'test_user','$2b$10$OtWK6sU.7251VTQgwhIIc.ykTDXpZyVvsy3Ak4.EAWmWa/LLvXZO6','test@rwandair.rw','technician','Test User',1,'2024-05-28 08:57:32','2024-06-18 14:28:49',0),(3,'sexyredd','$2b$10$01gdYiHDyCHDK3OGQxaKe.98cw9HR9k3k5N7nBBzCQxpb5YG/LtF6','redd@rwandair.rw','technician','Redd',1,'2024-05-28 09:02:53','2024-06-18 14:30:21',0),(4,'unreal_unearth','$2b$10$v8A3Gq8T48DvTnxVdP9l.O3HZkOcO.SwJnMiIhgg7abyjAk6tIPvW','unreal_unearth@rwandair.rw','activity_manager','Hozier',1,'2024-06-05 09:05:16','2024-06-18 14:00:04',1),(6,'unreal_unerath','$2b$10$RGlhDz6HSzW6hqkIZKEQIeZLSbT8yDXlrMdTT5JL7t0njxk0V6A7e','unreal_unerath@rwandair.rw','inventory_manager','Hozier',0,'2024-06-05 09:08:10','2024-06-18 14:00:46',1);
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

-- Dump completed on 2024-06-22 14:26:16
