CREATE TABLE t_promotion_subcontract
(
    `id`                int NOT NULL AUTO_INCREMENT,
    `host`              int,
    `promotion_id`      int,
    `contractor`        varchar(20),
    `created_at`        bigint(20),
    `created_by`        int,
    `promotion_content` varchar(2000),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;
