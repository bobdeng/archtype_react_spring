package com.xperp.clothing.implemations;

import cn.bobdeng.rbac.utils.TableHasNoTenantId;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@Primary
public class TableHasNoTenantImpl implements TableHasNoTenantId {
    @Override
    public Set<String> tables() {
        return Set.of(
                "t_invite_code",
                "t_invite_accept",
                "t_promotion_subcontract");
    }
}
