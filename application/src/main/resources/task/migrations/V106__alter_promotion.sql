alter table t_promotion
    add column `commission` decimal(6, 2);
alter table t_promotion
    add column `commodity` varchar(1000);

alter table t_promotion
    add column `owner` int;
alter table t_promotion
DROP
column `commodity_id`;

alter table t_promotion_keyword MODIFY column `joint` varchar(2000);