-- CreateTable
CREATE TABLE `ReferenceCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `supertype` VARCHAR(191) NOT NULL,
    `hp` VARCHAR(191) NOT NULL,
    `types` JSON NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `attacks` JSON NOT NULL,
    `weaknesses` JSON NOT NULL,
    `abilities` JSON NULL,
    `pokeIndex` INTEGER NOT NULL,
    `rarity` VARCHAR(191) NOT NULL,
    `flavorText` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardForSale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `condition` ENUM('MINT', 'NEAR_MINT', 'EXCELLENT', 'LIGHTLY_PLAYED', 'PLAYED', 'HEAVILY_PLAYED', 'DAMAGED') NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `status` ENUM('SELLED', 'SALE', 'PENDING') NOT NULL,
    `referenceCardId` INTEGER NOT NULL,
    `orderId` INTEGER NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalPrice` DOUBLE NOT NULL,
    `status` ENUM('APPROVED', 'CANCELLED', 'PENDING') NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NULL,
    `telephone` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CardForSale` ADD CONSTRAINT `CardForSale_referenceCardId_fkey` FOREIGN KEY (`referenceCardId`) REFERENCES `ReferenceCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardForSale` ADD CONSTRAINT `CardForSale_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardForSale` ADD CONSTRAINT `CardForSale_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
