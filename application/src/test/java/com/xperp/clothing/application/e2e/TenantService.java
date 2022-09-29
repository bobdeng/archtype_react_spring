package com.xperp.clothing.application.e2e;

import cn.bobdeng.rbac.RbacDBMigrate;
import cn.bobdeng.rbac.domain.*;
import cn.bobdeng.rbac.domain.function.Function;
import cn.bobdeng.rbac.domain.function.FunctionRepository;
import cn.bobdeng.rbac.domain.rbac.*;
import com.xperp.clothing.application.ClothDBMigrate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Service
public class TenantService {
    TenantRepository tenantRepository;
    RbacContext rbacContext;
    private Tenant tenant;
    private User boss;
    private User nobody;
    private DomainRepository domainRepository;
    private final JdbcTemplate jdbcTemplate;
    private Tenant xiaoli;
    private Map<String, Tenant> tenants = new HashMap<>();
    private final FunctionRepository functionRepository;
    @Autowired
    RbacDBMigrate rbacDBMigrate;
    @Autowired
    ClothDBMigrate clothDBMigrate;

    public TenantService(TenantRepository tenantRepository, RbacContext rbacContext, DomainRepository domainRepository, JdbcTemplate jdbcTemplate, FunctionRepository functionRepository) {
        this.tenantRepository = tenantRepository;
        this.rbacContext = rbacContext;
        this.domainRepository = domainRepository;
        this.jdbcTemplate = jdbcTemplate;
        this.functionRepository = functionRepository;
    }

    @PostConstruct
    public void init() {
        jdbcTemplate.execute("truncate table t_rbac_tenant");
        jdbcTemplate.execute("truncate table t_rbac_user");
        jdbcTemplate.execute("truncate table t_rbac_login_name");
        jdbcTemplate.execute("truncate table t_rbac_password");
        jdbcTemplate.execute("truncate table t_rbac_domain");
        jdbcTemplate.execute("truncate table t_rbac_role");
        jdbcTemplate.execute("truncate table t_rbac_user_role");
        jdbcTemplate.execute("truncate table t_rbac_organization");

        Domains domains = new Domains(domainRepository);
        Tenants tenants = new Tenants(tenantRepository);
        createMainTenant(domains, tenants);

        xiaoli = tenants.add(new TenantDescription("小李"));
        this.tenants.put("小李", xiaoli);
    }

    private void createMainTenant(Domains domains, Tenants tenants) {
        tenant = tenants.add(new TenantDescription("Bob公司"));
        domains.newDomain(new DomainDescription("localhost:8080", tenant.identity()));
        domains.newDomain(new DomainDescription("localhost", tenant.identity()));
        domains.newDomain(new DomainDescription("host.docker.internal", tenant.identity()));
        domains.newDomain(new DomainDescription("host.testcontainers.internal", tenant.identity()));
        RbacContext.Rbac rbac = rbacContext.asRbac(tenant);
        Role boss = createBossRole();
        createBossUser(rbac, boss);
        createNobody(rbac);
    }

    private void createNobody(RbacContext.Rbac rbac) {
        nobody = rbac.addUser(new UserDescription("nobody"));
        rbac.addLoginName(new LoginNameDescription("nobody", nobody.getId()));
        nobody.savePassword(new RawPassword("123456"));
    }

    private void createBossUser(RbacContext.Rbac rbac, Role boss) {
        this.boss = rbac.addUser(new UserDescription("张三"));
        rbac.addLoginName(new LoginNameDescription("zhangsan", this.boss.getId()));
        this.boss.savePassword(new RawPassword("123456"));
        this.boss.setRoles(List.of(boss));
    }

    private Role createBossRole() {
        RbacContext.Roles roles = rbacContext.roles(tenant);
        List<String> allows = functionRepository.list().flatMap(function -> childrenOfFunction(function))
                .map(Function::getKey).toList();
        Role boss = roles.save(new Role(new RoleDescription("全功能", allows)));
        return boss;
    }

    private Stream<Function> childrenOfFunction(Function function) {
        if (function.getDescription().getChildren() != null) {
            return function.getDescription().getChildren().stream()
                    .flatMap(this::childrenOfFunction);
        }
        return Stream.of(function);
    }

    public Tenant getTenant() {
        return tenant;
    }

    public Tenant getTenantByName(String name) {
        return tenants.get(name);
    }

    public User userByLoginName(String loginName) {
        return boss;
    }

    public Tenant newTenant(String partnerName) {
        return new Tenants(tenantRepository).add(new TenantDescription(partnerName));
    }

    public User boss() {
        return boss;
    }

    public User nobody() {
        return nobody;
    }
}
