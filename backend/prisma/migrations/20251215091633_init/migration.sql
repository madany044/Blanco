-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `contact_number` VARCHAR(191) NOT NULL,
    `role` ENUM('CANDIDATE', 'ADMIN') NOT NULL DEFAULT 'CANDIDATE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `native_place` VARCHAR(191) NULL,
    `highest_qualification` VARCHAR(191) NULL,
    `tekla_years` INTEGER NULL,
    `aisc_experience` BOOLEAN NULL,
    `editing_experience` BOOLEAN NULL,
    `checking_experience` BOOLEAN NULL,
    `modeling_experience` BOOLEAN NULL,
    `lead_experience` VARCHAR(191) NULL,
    `technical_skills` VARCHAR(191) NULL,
    `basis_for_interview` VARCHAR(191) NULL,
    `companies_worked` INTEGER NULL,
    `current_salary` INTEGER NULL,
    `last_increment_date` DATETIME(3) NULL,
    `reason_for_leaving` VARCHAR(191) NULL,
    `expected_salary` INTEGER NULL,
    `notice_period` VARCHAR(191) NULL,
    `additional_comments` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'SUBMITTED', 'NEW', 'SHORTLISTED', 'REJECTED', 'INTERVIEW_SCHEDULED', 'HIRED') NOT NULL DEFAULT 'DRAFT',
    `admin_notes` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Application_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
