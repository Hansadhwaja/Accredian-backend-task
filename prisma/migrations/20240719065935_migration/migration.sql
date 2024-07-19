-- CreateTable
CREATE TABLE `Referral` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `referrerName` TEXT NOT NULL,
    `referrerEmail` TEXT NOT NULL,
    `refereeName` TEXT NOT NULL,
    `refereeEmail` TEXT NOT NULL,
    `course` TEXT NOT NULL,
    `comments` TEXT,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
);

