CREATE TABLE t_promotion
(
    `id`           int          NOT NULL AUTO_INCREMENT,
    `tenant_id`    int,
    `commodity_id` int,
    `keyword`      varchar(100) NOT null,
    `joint`        varchar(100),
    `created_at`   bigint(20),
    `created_by`   int,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;


