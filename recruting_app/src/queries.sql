CREATE TABLE `recruiting_app`.`feedbacks` ( `id` INT(3) NOT NULL AUTO_INCREMENT , `feedback` VARCHAR(100) NOT NULL , `recruit_id` INT(3) NOT NULL , `recruiter_id` INT(3) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;