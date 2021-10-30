USE SUPPLY_DB;

CREATE TABLE SUPPLIERS(
          SUPPLIER_ID INT NOT NULL AUTO_INCREMENT,
          NAME VARCHAR(50),
          PRIMARY KEY (ID)
);


CREATE TABLE SHOPS(
          SHOP_ID INT NOT NULL AUTO_INCREMENT,
          NAME VARCHAR(50),
          PRIMARY KEY (ID)
);

CREATE TABLE PRODUCTS(
          PRODUCT_ID INT NOT NULL AUTO_INCREMENT,
          NAME VARCHAR(50),
          SKU INT NOT NULL,
          WEIGHT INT NOT NULL,
          PRIMARY KEY (ID)
);

CREATE TABLE TRANSACTIONS(
          TRANSACTION_ID INT NOT NULL AUTO_INCREMENT,
          USER_ID INT NOT NULL,
          PRODUCT_ID INT NOT NULL,
          STATUS INT NOT NULL,
          METHOD INT NOT NULL,
          PRIMARY KEY (USER_ID)
);

CREATE TABLE INVENTORIES(
          PRODUCT_ID INT NOT NULL,
          NAME VARCHAR(50),
          SUPPLIER_ID INT NOT NULL,
          SHOP_ID INT NOT NULL,
          QUANTITY INT NOT NULL,
          PRICE INT NOT NULL,
          PRIMARY KEY (USER_ID)
);
