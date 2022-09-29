CREATE TABLE t_invite_code
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `host`        int,
    `verify_code` varchar(20),
    `expire_at`   bigint(20),
    `created_at`  bigint(20),
    `created_by`  int,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;
