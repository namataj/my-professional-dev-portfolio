-- James Namata Portfolio — MySQL schema
-- Run once:  mysql -u root -p < database/schema.sql

CREATE DATABASE IF NOT EXISTS james_namata_portfolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE james_namata_portfolio;

-- Quote requests from the Hire Me page
CREATE TABLE IF NOT EXISTS inquiries (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name     VARCHAR(100)  NOT NULL,
  email         VARCHAR(254)  NOT NULL,
  phone         VARCHAR(20)   NULL,
  organization  VARCHAR(150)  NULL,
  service       VARCHAR(60)   NOT NULL,
  description   TEXT          NOT NULL,
  budget        VARCHAR(40)   NOT NULL,
  timeline      VARCHAR(40)   NOT NULL,
  status        ENUM('new', 'contacted', 'proposal_sent', 'won', 'lost', 'archived') NOT NULL DEFAULT 'new',
  ip_address    VARCHAR(45)   NULL,
  user_agent    VARCHAR(255)  NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_inquiries_status_created (status, created_at),
  KEY idx_inquiries_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Messages from the Contact page
CREATE TABLE IF NOT EXISTS contact_messages (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(254)  NOT NULL,
  subject     VARCHAR(150)  NULL,
  message     TEXT          NOT NULL,
  is_read     TINYINT(1)    NOT NULL DEFAULT 0,
  ip_address  VARCHAR(45)   NULL,
  user_agent  VARCHAR(255)  NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contact_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Least-privilege application user: it can only add and read rows.
-- Change the password, then uncomment and run (as an admin user):
--
-- CREATE USER IF NOT EXISTS 'portfolio_app'@'%' IDENTIFIED BY 'use-a-long-random-password';
-- GRANT SELECT, INSERT ON james_namata_portfolio.* TO 'portfolio_app'@'%';
-- FLUSH PRIVILEGES;
