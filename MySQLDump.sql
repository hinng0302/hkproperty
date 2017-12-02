CREATE DATABASE  IF NOT EXISTS `hkproperties` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `hkproperties`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: hkproperties
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agent`
--

DROP TABLE IF EXISTS `agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_pic` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agent_name_zh` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `agent_name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `agent_phone` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agent_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agent_reg_no` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('enable','disable') COLLATE utf8mb4_unicode_ci DEFAULT 'enable',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent`
--

LOCK TABLES `agent` WRITE;
/*!40000 ALTER TABLE `agent` DISABLE KEYS */;
INSERT INTO `agent` VALUES (1,'/images/agent/1.jpeg','管理員','root','21234567','no-reply@gmail.com','root-no-reg-no','enable','2017-10-09 04:18:13','2017-11-30 08:33:53'),(2,'/images/agent/1.jpeg','陳大文','Chan Tai Man','34737968','tmchan@gmail.com','SD79-QE','enable','2017-10-21 07:51:34','2017-11-30 08:33:53'),(3,'/images/agent/1.jpeg','黃郁雯','Wong Yuk Man','28881887','ymwong@gmail.com','SOD3244','enable','2017-10-21 07:51:34','2017-11-30 08:33:53'),(4,'/images/agent/1.jpeg','梁靜琳','Leung Chang Lam','26443411','CL.Leung@gmail.com','SOAB3254','enable','2017-10-21 07:51:34','2017-11-30 08:33:53'),(5,'/images/agent/1.jpeg','張一心','Cheung Yi Sum','34562568','YSCheung@gmail.com','TD994324','enable','2017-10-21 07:51:34','2017-11-30 08:33:53'),(6,'/images/agent/1.jpeg','謝婉雯','Tse Yuen Man','34124321','YMTse@gmail.com','TPL233452','enable','2017-10-21 07:51:34','2017-11-30 08:33:53');
/*!40000 ALTER TABLE `agent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agent_password`
--

DROP TABLE IF EXISTS `agent_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agent_password` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `agent_id` int(11) NOT NULL,
  `agent_password` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_agent_password_id` (`agent_id`),
  CONSTRAINT `fk_agent_password_id` FOREIGN KEY (`agent_id`) REFERENCES `agent` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent_password`
--

LOCK TABLES `agent_password` WRITE;
/*!40000 ALTER TABLE `agent_password` DISABLE KEYS */;
INSERT INTO `agent_password` VALUES (1,'admin',1,'0d7e76381fa2c773311787b58c658bac'),(2,'TM.Chan',2,'0d7e76381fa2c773311787b58c658bac'),(3,'YM.Wong',3,'0d7e76381fa2c773311787b58c658bac'),(4,'CL.Leung',4,'0d7e76381fa2c773311787b58c658bac'),(5,'YS.Cheung',5,'0d7e76381fa2c773311787b58c658bac'),(6,'YM.Tse',6,'0d7e76381fa2c773311787b58c658bac');
/*!40000 ALTER TABLE `agent_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `default_pic` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager_id` int(11) NOT NULL,
  `location` mediumtext COLLATE utf8mb4_unicode_ci,
  `phone` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `branch_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `branch_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `agent` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'置地分行','/images/branch/206_display.JPG',2,'香港中半山皇后大道中9號2樓206號舖','29218383','HKI001','2017-10-21 07:44:56','2017-11-30 16:53:14'),(2,'西半山豪宅組 - 輝煌豪園分行','/images/branch/2_g.jpeg',3,'香港西半山西摩道1號輝煌臺2號地舖','91901234','HKI002','2017-10-21 07:44:56','2017-11-30 16:44:06'),(3,'灣仔 - 嘉薈軒分行','/images/branch/IMG_46.jpg',4,'香港灣仔莊士敦道46號地舖','28651633','HKI003','2017-10-21 07:44:56','2017-11-30 16:44:06'),(4,'九龍豪宅 - 達之路分行','/images/branch/30E.jpeg',5,'九龍又一村達之路30號E地舖','23814356','KLN001','2017-10-21 07:44:56','2017-11-30 16:44:06'),(5,'九龍豪宅 - 何文田站分行','/images/branch/312.jpeg',6,'九龍九龍塘太子道西312號地舖','23438878','KLN002','2017-10-21 07:44:56','2017-11-30 16:44:06');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch_agent_relation`
--

DROP TABLE IF EXISTS `branch_agent_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch_agent_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `branch_id` int(11) NOT NULL,
  `agent_id` int(11) NOT NULL,
  `status` enum('enable','disabled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'enable',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_agent_id` (`agent_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `branch_agent_relation_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_agent_id` FOREIGN KEY (`agent_id`) REFERENCES `agent` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch_agent_relation`
--

LOCK TABLES `branch_agent_relation` WRITE;
/*!40000 ALTER TABLE `branch_agent_relation` DISABLE KEYS */;
INSERT INTO `branch_agent_relation` VALUES (1,1,2,'enable','2017-10-21 08:10:55',NULL),(2,2,3,'enable','2017-10-21 08:10:55',NULL),(3,3,4,'enable','2017-10-21 08:10:55',NULL),(4,4,5,'enable','2017-10-21 08:10:55',NULL),(5,5,6,'enable','2017-10-21 08:10:55',NULL);
/*!40000 ALTER TABLE `branch_agent_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` enum('Mr','Ms') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `p_district` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `p_school_network` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `p_estate` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Mr','Choi Chi Hong','91083342','HKI','11','珍珠閣'),(2,'Mr','Tam Wai Chun','68923071','HKI','11','Kennedy Town Pearl Court'),(3,'Ms','Hong Yi Man','76549664','KLN','31',NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `district` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_zh` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area` enum('HKI','KLN','NT') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
INSERT INTO `district` VALUES (1,'中西區','Central & Western District','HKI'),(2,'灣仔區','Wanchai District','HKI'),(3,'東區','Eastern District','HKI'),(4,'南區','Southern District','HKI'),(5,'九龍城區','Kowloon City District','KLN'),(6,'黃大仙區','Wong Tai Sin District','KLN'),(7,'觀塘區','Kwun Tong District','KLN'),(8,'油尖旺區','Yau Tsim Mong District','KLN'),(9,'深水埗區','Sham Shui Po District','KLN'),(10,'荃灣區','Tsuen Wan District','NT'),(11,'葵青區','Kwai Tsing District','NT'),(12,'西貢區','Sai Kung District','NT'),(13,'沙田區','Shatin District','NT'),(14,'大埔區','Tai Po District','NT'),(15,'北區','Northern District','NT'),(16,'屯門區','Tuen Mun District','NT'),(17,'元朗區','Yuen Long District','NT'),(18,'離島區','Islands District','NT');
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `district` int(2) NOT NULL,
  `estate_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estate_name_en` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `block_number` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `floor_number` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `flat_number` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gross_building_area` int(5) DEFAULT NULL,
  `practical_building_area` int(5) DEFAULT NULL,
  `num_room` int(1) DEFAULT NULL,
  `num_livingrm` int(1) DEFAULT NULL,
  `car_park` tinyint(1) DEFAULT NULL,
  `selling_price` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rental_price` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `image_page` text COLLATE utf8mb4_unicode_ci,
  `lat` float(10,6) DEFAULT NULL,
  `lng` float(10,6) DEFAULT NULL,
  `ref_no` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('enable','disabled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'enable',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dist_id` (`district`),
  CONSTRAINT `fk_dist_id` FOREIGN KEY (`district`) REFERENCES `district` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,2,'堅尼地城 - 泓都','Kennedy Town - Hongdu','1','1','1',659,470,2,1,0,'91000000',NULL,'罕有放盤,簡單裝修,煙花海景,連露台,獨家盤,有匙即約即睇\n\n有裝修,露台,設施齊備,管理完善,廳大房大','/images/property_1/property001.jpg',22.283184,114.124046,'A496468','enable','2017-10-21 09:03:18',NULL),(2,2,'堅尼地城 - 傲翔灣畔','Kennedy Town - The Sail At Victoria','1','1','1',1584,1054,2,1,0,NULL,'53000','特色裝修，四房改二房，書房，配備優質廚具，焗爐，洗碗機。 罕有放盤,豪華靚裝,煙花海景,連露台,高實用率,獨家盤,有匙即約即睇,全海景,山園雙景,露台,傢電靚裝,開揚清爽,實用率高,新樓會所,環境清幽,連綿山景,豪宅氣派','/images/property_2/property002.jpg',22.281099,114.118248,'A496456','enable','2017-10-21 09:03:18',NULL),(3,1,'西半山 - 俊傑花園','Mid-levels West - Junjie Garden','1','1','1',979,781,3,1,0,NULL,'41000','- 3房（1套房）\n- 高層海景\n-間隔四正\n-廚房設備齊全\n- 11名校網\n- 鄰近西營盤地鐵站\n- 交通便利\n- 可連車位，價格商意','/images/property_3/property003.jpg',22.283747,114.139473,'463090','enable','2017-10-21 09:07:23',NULL),(4,5,'澐瀚','LE CAP','3','1','5',543,555,2,1,0,'50056000',NULL,'麗坪路83號','/images/property/sample.jpg',22.272034,114.192833,'FID1235','enable','2017-12-01 11:30:48',NULL),(5,5,'柏逸','PARK HILLCREST','5','5','5',435,440,3,2,0,'53427000',NULL,'新世界發展旗下西營盤瑧蓺及元朗柏逸的市場反應熱烈，兩盤暫已共收逾430票。瑧蓺今日(周一)加推第2張價單涉25伙，並上載最新銷售安排，將於本周五(24日)進行首輪銷售，推售單位共65伙，包括30伙開放式單位、15伙一房單位及20伙兩房單位。市場消息指，項目累收逾140票，超額認購','/images/property/sample.jpg',22.272034,114.192833,'SOD32','enable','2017-12-01 11:31:55',NULL),(6,5,'海璇','VICTORIA HARBOUR','5','5','5',124,130,1,1,0,'53000000',NULL,'海璇發展項目','/images/property/sample.jpg',22.272034,114.192833,'TOHT537','enable','2017-12-01 11:32:13',NULL),(7,1,'匯璽II','CULLINAN WEST II','3','5','5',320,355,5,5,0,NULL,'45000','中國銀行(香港)個人金融及財富管理部副總經理林敏儀表示，凡身分證有「BOCHK2388」任何一個字母或數字，即可享用該定存計劃，港元及美金息率1.3及1.9厘。另公司為匯璽II買家提供按揭的計劃，標準息率為銀行同業拆息(HIBOR)加1.4厘，亦會視乎客戶條件作調整。','/images/property/sample.jpg',22.303165,114.180473,'6ASDF','enable','2017-12-01 11:57:24',NULL),(8,2,'溱柏','Park Signature','1','5','1',410,435,1,1,0,'66000000',NULL,'9座 (第1座至第10座), 不設第4座','/images/property/sample.jpg',22.199577,114.127602,'GHJFSC_21','enable','2017-12-01 12:23:56',NULL),(9,2,'玉寶閣','Jade Court','1','5','1',200,236,1,1,0,'7564500',NULL,'租金回報率 : 2.8%/年 心動不如行動','/images/property/sample.jpg',22.199577,114.127602,'GHJFSC_2','enable','2017-12-01 12:24:25',NULL);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_owner`
--

DROP TABLE IF EXISTS `property_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner_phone_number` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_owner`
--

LOCK TABLES `property_owner` WRITE;
/*!40000 ALTER TABLE `property_owner` DISABLE KEYS */;
INSERT INTO `property_owner` VALUES (1,'Li Wing Yee','97873234','2017-10-21 11:10:23',NULL),(2,'Suen Wai Sue','63229842','2017-10-21 11:10:23',NULL),(3,'Yau Fa Fa','23879652','2017-10-21 11:10:23',NULL),(4,'Tai Chun Fat','23451456','2017-12-01 17:22:38','2017-12-01 18:42:46'),(5,'Chen Tai Ham','23451456','2017-12-01 17:23:04','2017-12-01 18:48:58'),(6,'Nethon Lee','90623133','2017-12-01 17:26:38','2017-12-01 18:48:58'),(7,'chan tai man','23451456','2017-12-01 17:38:42',NULL),(8,'Chan Siu Ming','23451456','2017-12-01 17:40:22','2017-12-01 18:42:46'),(9,'Lo Yue Yee','90638927','2017-12-01 17:40:28','2017-12-01 18:42:46'),(10,'Hun Yee Man','23451456','2017-12-01 17:40:42','2017-12-01 18:48:58'),(11,'Ng Yee Ting','92745545','2017-12-01 17:41:25','2017-12-01 18:48:58'),(12,'Wong Chi Fung','23451456','2017-12-01 17:41:26','2017-12-01 18:48:58'),(13,'Cho Chi Hong','98037629','2017-12-01 17:41:49','2017-12-01 18:48:58'),(14,'Lo Tai Wai','23451456','2017-12-01 17:42:10','2017-12-01 18:48:58'),(15,'Cheung Kown Wing','23451456','2017-12-01 17:42:19','2017-12-01 18:48:58'),(16,'Lai Tai Wing','23464363','2017-12-01 17:58:22','2017-12-01 18:48:58'),(17,'Cheung Do Do','92325462','2017-12-01 17:58:52','2017-12-01 18:48:58'),(18,'Luk Wing','23452586','2017-12-01 18:01:20','2017-12-01 18:48:58'),(19,'Luk Kwok Fung','64853948','2017-12-01 18:01:49','2017-12-01 18:48:58'),(20,'chan tai man','37495234','2017-12-01 18:03:45',NULL),(21,'chan Tai man','23453246','2017-12-01 18:04:44',NULL),(22,'Billy Yeung','43562345','2017-12-01 18:06:21',NULL),(23,'Chan Tai Gi','23253453','2017-12-01 18:07:59','2017-12-01 18:48:58'),(24,'Bill NG','23417463','2017-12-01 18:10:13',NULL),(25,'chan ta','23435678','2017-12-01 18:11:27',NULL),(26,'Chan Tai Man','23413245','2017-12-01 18:11:49',NULL),(27,'Bill Tung','23453452','2017-12-01 18:12:36','2017-12-01 18:48:58'),(28,'Ting Chan','23458572','2017-12-01 18:14:26',NULL),(29,'Chan Tai','43562345','2017-12-01 18:15:54',NULL),(30,'Wong Chi Hin','23456781','2017-12-01 18:17:37','2017-12-01 18:48:58'),(31,'Chan Gee','43221356','2017-12-01 18:18:01',NULL),(32,'Lai Hon Kin','63829063','2017-12-01 18:19:18','2017-12-01 18:48:58'),(33,'Cheung Hong','47362831','2017-12-01 18:20:16','2017-12-01 18:48:58'),(34,'Mary Wong','65483823','2017-12-01 18:20:43','2017-12-01 18:48:58'),(35,'Candy Fan','68391234','2017-12-01 18:22:24','2017-12-01 18:48:58'),(36,'David Chun','12345678','2017-12-01 18:23:11','2017-12-01 18:48:58'),(37,'Chan Chun','67894326','2017-12-01 18:25:19','2017-12-01 18:48:58'),(38,'Yi Hui','93112328','2017-12-01 18:26:11','2017-12-01 18:48:58'),(39,'Wong Yun Fan ','32452345','2017-12-01 18:27:15','2017-12-01 18:48:58'),(40,'Gin Lee','64392934','2017-12-01 18:28:21','2017-12-01 18:48:58'),(41,'Cheung Pin','63890247','2017-12-01 18:32:18','2017-12-01 18:48:58');
/*!40000 ALTER TABLE `property_owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_owner_relation`
--

DROP TABLE IF EXISTS `property_owner_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_owner_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `status` enum('enable','disabled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'enable',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_owner_relation_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `property_owner` (`id`),
  CONSTRAINT `property_owner_relation_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_owner_relation`
--

LOCK TABLES `property_owner_relation` WRITE;
/*!40000 ALTER TABLE `property_owner_relation` DISABLE KEYS */;
INSERT INTO `property_owner_relation` VALUES (1,1,1,'enable','2017-10-21 12:05:19'),(2,2,2,'enable','2017-10-21 12:05:19'),(3,3,3,'enable','2017-10-21 12:05:19'),(4,3,2,'enable','2017-11-15 02:26:49'),(5,6,5,'enable','2017-12-01 17:26:38'),(6,7,5,'enable','2017-12-01 17:38:42'),(7,8,6,'enable','2017-12-01 17:40:22'),(8,9,6,'enable','2017-12-01 17:40:28'),(9,10,5,'enable','2017-12-01 17:40:42'),(10,11,7,'enable','2017-12-01 17:41:25'),(11,12,9,'enable','2017-12-01 17:41:26'),(12,13,5,'enable','2017-12-01 17:41:49'),(13,14,8,'enable','2017-12-01 17:42:10'),(14,15,9,'enable','2017-12-01 17:42:19'),(15,41,7,'enable','2017-12-01 18:32:18');
/*!40000 ALTER TABLE `property_owner_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_schoolnetwork_relation`
--

DROP TABLE IF EXISTS `property_schoolnetwork_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_schoolnetwork_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) NOT NULL,
  `school_network_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_propertysn_property_id` (`property_id`),
  KEY `school_network_id` (`school_network_id`),
  CONSTRAINT `fk_propertysn_property_id` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`),
  CONSTRAINT `property_schoolnetwork_relation_ibfk_1` FOREIGN KEY (`school_network_id`) REFERENCES `school_network` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_schoolnetwork_relation`
--

LOCK TABLES `property_schoolnetwork_relation` WRITE;
/*!40000 ALTER TABLE `property_schoolnetwork_relation` DISABLE KEYS */;
INSERT INTO `property_schoolnetwork_relation` VALUES (1,1,1),(2,2,1),(3,3,1);
/*!40000 ALTER TABLE `property_schoolnetwork_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_network`
--

DROP TABLE IF EXISTS `school_network`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `school_network` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sn_name_zh` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sn_name_en` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `district_id` (`district_id`),
  CONSTRAINT `school_network_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_network`
--

LOCK TABLES `school_network` WRITE;
/*!40000 ALTER TABLE `school_network` DISABLE KEYS */;
INSERT INTO `school_network` VALUES (1,'11校網','11 ',1),(2,'12校網','12 ',2),(3,'14校網','14',3),(4,'16校網','16',3),(5,'18校網','18',4),(6,'34校網','34',5),(7,'35校網','35',5),(8,'41校網','41',5),(9,'43校網','43',6),(10,'45校網','45',6),(11,'46校網','46',7),(12,'48校網','48',7),(13,'31校網','31',8),(14,'32校網','32',8),(15,'38校網','38',9),(16,'40校網','40',9),(17,'62校網','62',10),(18,'64校網','64',11),(19,'65校網','65',11),(20,'66校網','66',11),(21,'95校網','95',12),(22,'89校網','88',13),(23,'89校網','89',13),(24,'91校網','91',13),(25,'84校網','84',14),(26,'80校網','80',15),(27,'81校網','81',15),(28,'83校網','83',15),(29,'70校網','70',16),(30,'71校網','71',16),(31,'72校網','72',17),(32,'73校網','73',17),(33,'74校網','74',17),(34,'96校網','96',18),(35,'97校網','97',18),(36,'98校網','98',18),(37,'99校網','99',18);
/*!40000 ALTER TABLE `school_network` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transection`
--

DROP TABLE IF EXISTS `transection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref_no` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` int(11) NOT NULL,
  `agent_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transection_branch` (`branch_id`),
  KEY `fk_transection_agent` (`agent_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `fk_transection_agent` FOREIGN KEY (`agent_id`) REFERENCES `agent` (`id`),
  CONSTRAINT `transection_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transection`
--

LOCK TABLES `transection` WRITE;
/*!40000 ALTER TABLE `transection` DISABLE KEYS */;
INSERT INTO `transection` VALUES (1,'20171001_HK0001',1,2,1,'2017-10-21 12:38:40',NULL),(2,'20171002_HK0002',1,3,2,'2017-12-02 07:09:08',NULL),(3,'20171002_HK0003',1,2,3,'2017-12-02 07:09:08',NULL);
/*!40000 ALTER TABLE `transection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transection_item`
--

DROP TABLE IF EXISTS `transection_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transection_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transection_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `commission` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rental_price` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rentald_per_month` int(3) DEFAULT NULL,
  `selling_price` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_transection_items_property_id` (`property_id`),
  KEY `transection_id` (`transection_id`),
  CONSTRAINT `fk_transection_items_property_id` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`),
  CONSTRAINT `transection_item_ibfk_1` FOREIGN KEY (`transection_id`) REFERENCES `transection` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transection_item`
--

LOCK TABLES `transection_item` WRITE;
/*!40000 ALTER TABLE `transection_item` DISABLE KEYS */;
INSERT INTO `transection_item` VALUES (1,1,1,'15%',NULL,NULL,'90000000','2017-10-21 12:44:07'),(2,1,3,'1','41000',12,NULL,'2017-10-21 12:44:07'),(3,2,5,'15%',NULL,NULL,'53427000','2017-12-02 07:08:39'),(4,3,2,'1','50000',13,NULL,'2017-12-02 07:08:39');
/*!40000 ALTER TABLE `transection_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-02 17:47:07
