package com.xperp.clothing.application;

import org.flywaydb.core.Flyway;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

@Service
public class InfluencerDBMigrate {
    private Flyway flyway;
    private final DataSource dataSource;

    public InfluencerDBMigrate(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @PostConstruct
    public void init() {
        configFlyway();
        migration();
    }

    public void configFlyway() {
        flyway = Flyway.configure()
                .locations("classpath:db/migrations")
                .table("task_flyway_schema_history")
                .dataSource(dataSource)
                .baselineOnMigrate(true)
                .load();
    }

    public void migration() {
        flyway.migrate();
    }
}
