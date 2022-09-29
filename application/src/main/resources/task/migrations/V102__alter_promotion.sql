alter table t_promotion drop column `keyword`;
alter table t_promotion drop column `joint`;
CREATE TABLE t_promotion_keyword
(
    `id`           int          NOT NULL AUTO_INCREMENT,
    `tenant_id`    int,
    `promotion_id` int,
    `keyword`      varchar(100) NOT null,
    `joint`        varchar(100),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;
