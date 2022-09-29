CREATE TABLE t_invite_accept
(
    `id`             int NOT NULL AUTO_INCREMENT,
    `invite_code_id` int,
    `created_at`     bigint(20),
    `created_by`     int,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;
CREATE TABLE t_partner
(
    `id`         int NOT NULL AUTO_INCREMENT,
    `tenant_id`  int,
    `partner_id` int(20),
    `created_at` bigint(20),
    `created_by` int,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;
